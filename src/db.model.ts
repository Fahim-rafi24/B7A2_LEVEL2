// database model import
import { DBIndexes } from "./models/indexes.model";
import { IssuesModelDB } from "./models/issues.model";
import { UsersModelDB } from "./models/user.model";

const modelInitiation = async () => {
    await UsersModelDB();
    await IssuesModelDB();
    await DBIndexes();
}

export default modelInitiation;