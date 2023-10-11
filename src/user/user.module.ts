import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { UserProvider } from "./user.provider"
import { DatabaseModule } from "src/database/database.module"

@Module({
  controllers: [UserController],
  providers: [UserProvider, UserService],
  imports: [DatabaseModule],
  exports: [UserService],
})
export class UserModule { }
