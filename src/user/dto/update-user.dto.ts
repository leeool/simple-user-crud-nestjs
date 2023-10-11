import { PartialType } from "@nestjs/mapped-types"
import { CreateUserDto } from "./create-user.dto"
import { IsOptional, IsString, MaxLength } from "class-validator"

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username: string

  @IsOptional()
  @IsString()
  @MaxLength(250)
  about: string
}
