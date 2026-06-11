"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// database model import
const indexes_model_1 = require("./models/indexes.model");
const issues_model_1 = require("./models/issues.model");
const user_model_1 = require("./models/user.model");
const modelInitiation = async () => {
    await (0, user_model_1.UsersModelDB)();
    await (0, issues_model_1.IssuesModelDB)();
    await (0, indexes_model_1.DBIndexes)();
};
exports.default = modelInitiation;
//# sourceMappingURL=db.model.js.map