import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { SignInDto } from "src/user/dto/signIn-user.dto"
import { UserService } from "src/user/user.service"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(signInDto: SignInDto) {
    const { password, username } = signInDto
    const user = await this.userService.findByEmailOrUsername(username)

    const correctPass = await bcrypt.compare(password, user?.password || ".")

    if (!correctPass || !user)
      throw new UnauthorizedException("Incorrect password or email")

    const payload = { id: user.id }

    return {
      token: await this.jwtService.signAsync(payload),
    }
  }
}
