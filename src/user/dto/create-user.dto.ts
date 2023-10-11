import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from "class-validator"

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username: string

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  email: string

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minSymbols: 1 })
  password: string

  @IsOptional()
  @IsString()
  about: string
}
