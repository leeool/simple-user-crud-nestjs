import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { SignInDto } from "./dto/signIn-user.dto"
import { AuthGuard } from "src/auth/auth.guard"
import { Throttle, ThrottlerGuard } from "@nestjs/throttler"

@UseGuards(ThrottlerGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Throttle({ default: { ttl: 60000, limit: 1 } })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id)
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, updateUserDto)
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Req() req) {
    return this.userService.remove(req)
  }
}
