import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule } from "@nestjs/config"
import { AuthGuard } from "./auth/auth.guard"
import { ThrottlerModule } from "@nestjs/throttler"

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 10000, limit: 10 }]),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
