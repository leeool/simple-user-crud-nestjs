import { FactoryProvider } from "@nestjs/common"
import { DataSource } from "typeorm"

export const databaseProvider: FactoryProvider = {
  provide: "DATA_SOURCE",
  useFactory: async () => {
    const dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123",
      database: "usercrud",
      entities: [__dirname + "/../**/entities/*.entity.{ts,js}"],
      migrations: [__dirname + "/../**/src/migrations/*.{ts,js}"],
      synchronize: true,
    })

    return dataSource.initialize()
  },
}
