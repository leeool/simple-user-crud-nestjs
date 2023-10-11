import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { IncomingHttpHeaders } from "http"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(req.headers)

    if (!token) throw new UnauthorizedException()

    try {
      const payload = await this.jwtService.verifyAsync(token)
      console.log(payload)

      req["user"] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  extractTokenFromHeader(headers: IncomingHttpHeaders): string | undefined {
    const [type, token] = headers.authorization?.split(" ") || []

    return type === "Bearer" ? token : undefined
  }
}
