import { DataSource } from "typeorm"
import { User } from "./entities/user.entity"
import { FactoryProvider } from "@nestjs/common"

export const UserProvider: FactoryProvider = {
  provide: "USER_REPOSITORY",
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: ["DATA_SOURCE"],
}
