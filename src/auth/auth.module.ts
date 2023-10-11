import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UserModule } from "src/user/user.module"
import { JwtModule } from "@nestjs/jwt"
import { jwtContants } from "./constants"
import { UserService } from "src/user/user.service"
import { AuthGuard } from "./auth.guard"

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtContants.secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: "AUTH_GUARD", useClass: AuthGuard }],
})
export class AuthModule { }
