import { Controller, Post, Body } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthTokenRequestDto } from './dto/auth.token.create.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiTags('auth')
  @ApiBody({ type: AuthTokenRequestDto })
  async retrieveAuthToken(
      @Body() authTokenRequestDto: AuthTokenRequestDto
  ): Promise<string> {
    const { nodeId, apiKeyId, apiKeySecret } = authTokenRequestDto
    return await this.authService.fetchAuthTokenFromLuniverseAPI(nodeId, apiKeyId, apiKeySecret)
  }
}
