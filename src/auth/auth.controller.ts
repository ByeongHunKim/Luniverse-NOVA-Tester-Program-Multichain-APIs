import { Controller, Post, Body } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthTokenRequestDto } from './dto/auth.token.create.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiTags('auth')
  @ApiBody({ type: AuthTokenRequestDto })
  @ApiOperation({ summary: 'generate auth token', description: 'Luniverse API에 필요한 auth token을 nodeId, apiKeyId, apiKeySecret 을 통해 발급 받습니다' })
  async retrieveAuthToken(
      @Body() authTokenRequestDto: AuthTokenRequestDto
  ): Promise<string> {
    const { nodeId, apiKeyId, apiKeySecret } = authTokenRequestDto
    return await this.authService.fetchAuthTokenFromLuniverseAPI(nodeId, apiKeyId, apiKeySecret)
  }
}
