import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { SignInDto } from "src/user/dto/signIn-user.dto"
import { AuthGuard } from "./auth.guard"
import { ThrottlerGuard } from "@nestjs/throttler"

@UseGuards(ThrottlerGuard)
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @UseGuards(AuthGuard)
  @Get("me")
  me(@Request() req) {
    return req.user
  }
}
