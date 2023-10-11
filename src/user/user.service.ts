import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Req,
} from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import * as bcrypt from "bcrypt"
import { SignInDto } from "./dto/signIn-user.dto"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { password, email, username, about } = createUserDto

    const userExists = await this.userRepository.findOneBy({ email })

    if (userExists)
      throw new HttpException("This email already exists", HttpStatus.CONFLICT)

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      about,
    })

    await this.userRepository.save(user)

    return
  }

  async findAll() {
    return await this.userRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  async findByEmailOrUsername(usernameOrEmail: string) {
    const user = await this.userRepository.findOne({
      select: ["username", "email", "password", "id"],
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    })

    return user
  }

  async update(req, updateUserDto: UpdateUserDto) {
    const id = req.user.id

    const updatedData = {
      ...updateUserDto,
    }

    const isEmptyObject = !Boolean(Object.keys(updatedData).length)

    if (isEmptyObject) throw new BadRequestException("The data is empty")

    await this.userRepository.update(id, updatedData)

    return updatedData
  }

  async remove(req) {
    const id = req.user.id

    await this.userRepository.delete(id)

    return
  }
}
