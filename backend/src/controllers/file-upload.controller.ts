// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-transfer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from "@loopback/core";
import {
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from "@loopback/rest";
import { FILE_UPLOAD_SERVICE } from "../keys";
import { FileUploadHandler } from "../types";

import dotenv from "dotenv";

import AWS from "aws-sdk";

import fs from "fs";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export class FileUploadController {
  /**
   * Constructor
   * @param handler - Inject an express request handler to deal with the request
   */
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler
  ) {}
  @post("/files", {
    responses: {
      200: {
        content: {
          "application/json": {
            schema: {
              type: "object",
            },
          },
        },
        description: "Files and fields",
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, (err: unknown) => {
        if (err) reject(err);
        else {
          resolve(FileUploadController.getFilesAndFields(request));
        }
      });
    });
  }

  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;

    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }

    const upload_to_bucket = (f: globalThis.Express.Multer.File) => {
      fs.readFile(f.path, (err, data) => {
        if (err) {
          throw err;
        }
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME ?? "",
          Key: f.originalname,
          Body: data,
        };

        s3.upload(params, (s3err: Error, _: any) => {
          if (s3err) throw s3err;
          console.log(`File ${f.originalname} is uploaded successfully`);
        });
      });
    };

    if (Array.isArray(uploadedFiles)) {
      uploadedFiles.forEach(upload_to_bucket);
    } else {
      for (const filename in uploadedFiles) {
        uploadedFiles[filename].forEach(upload_to_bucket);
      }
    }

    return { files, fields: request.body };
  }
}
