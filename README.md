# Deploy Web API on AWS EB

To deploy an app built with Typescript, we have to deploy its artifacts rather than source code managed by git.

## 0 - Install EB CLI

To manipulate Elasticbeanstalk, we need to use EB CLI, written in Python. We install this with PIP.

```sh
pip install awsebcli --upgrade --user
```

> If you don't have Python, you can download from https://www.python.org/. Any version above v2.7 or v3.4 should work.
>
> Also, you have to install `pip`. Check this link too. https://pypi.python.org/pypi/pip/
>
> To uninstall EB CLI, type `pip uninstall awsebcli`

OR

Install EB CLI using setup script at https://github.com/aws/aws-elastic-beanstalk-cli-setup

## 1 - Set up AWS credentials

Link: https://aws.amazon.com/getting-started/hands-on/set-up-command-line-elastic-beanstalk/

## 2 - Install dependencies and build the application

```sh
cd udagram-api
npm i
npm run build
```

### 3 - Prepare Artifact

```sh
npm run deploy
```

### 5 - Deploy app

```sh
# Initialize app to EB
eb init

# Initialize environment
eb create
```

Add the below 2 lines to the bottom of `.elasticbeanstalk/config.yml`.

```yml
deploy:
  artifact: dist/aws-eb-typescript-app.zip
```

Deploy again

```sh
eb deploy --staged
```
