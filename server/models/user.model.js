import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { sequelize } from "#config/db.config.js";

const UserModel = sequelize.define(
  "UserModel",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  },
);

UserModel.prototype.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default UserModel;

/*import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";
import { sequelize } from "#config/db.config.js";
class UserModel extends Model {
  async matchPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}
UserModel.init(
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password"))
          user.password = await bcrypt.hash(user.password, 10);
      },
    },
  },
);
export default UserModel;
*/
