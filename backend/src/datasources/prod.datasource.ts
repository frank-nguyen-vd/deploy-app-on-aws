import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";
import * as dotenv from "dotenv";

dotenv.config();

const config = {
  name: "prod",
  connector: "postgresql",
  host: process.env.PG_PROD_HOST ?? "localhost",
  port: process.env.PG_PROD_PORT ?? 5432,
  user: process.env.PG_PROD_USER ?? "postgres",
  password: process.env.PG_PROD_PASS ?? "postgres",
  database: process.env.PG_PROD_DB ?? "prod",
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver("datasource")
export class ProdDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = "prod";
  static readonly defaultConfig = config;

  constructor(
    @inject("datasources.config.prod", { optional: true })
    dsConfig: object = config
  ) {
    super(dsConfig);
  }
}