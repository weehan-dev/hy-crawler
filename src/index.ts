import { createConnection } from "typeorm";
import ormConfig from "./ormConfig";
import App from "./apps";

createConnection({ ...ormConfig }).then(() => {
  console.log("APP 시작");
  App.libraryCrawlingApp().then(() => {
    console.log("APP 종료");
  });
});
