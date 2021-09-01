import { sequelize } from "./sequelize";
import { V0_FEED_MODELS, V0_USER_MODELS } from "./controllers/v0/model.index";

const dbConnect = async () => {
  await sequelize.addModels(V0_FEED_MODELS);
  await sequelize.addModels(V0_USER_MODELS);
  await sequelize.sync();

  console.log("Database Connected");
};

export default dbConnect;
