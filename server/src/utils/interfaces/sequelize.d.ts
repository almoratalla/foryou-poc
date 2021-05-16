import * as Sequelize from "sequelize";
import { ApprovalAttributes, ApprovalCreationAttributes } from "../../models/dao/v0/approval";
import { DbbuUserAttributes, DbbuUserCreationAttributes } from "../../models/dao/v0/dbbu_users";

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Approval: Sequelize.Model<ApprovalAttributes, ApprovalCreationAttributes>;
  DbbuUser: Sequelize.ModelDefined<DbbuUserAttributes, DbbuUserCreationAttributes>;
}