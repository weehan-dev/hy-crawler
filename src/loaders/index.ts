import { createConnection } from "typeorm";
import ormConfig from "../ormConfig";

export default () => createConnection(ormConfig);
