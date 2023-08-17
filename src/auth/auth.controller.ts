import { Controller, Post, Body, Get } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthTokenRequestDto } from './dto/auth.token.create.dto'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiTags('auth')
  @ApiBody({ type: AuthTokenRequestDto })
  @ApiOperation({ summary: 'generate auth token by using input values', description: 'Luniverse API에 필요한 auth token을 nodeId, apiKeyId, apiKeySecret 을 통해 발급 받습니다' })
  async retrieveAuthToken(
      @Body() authTokenRequestDto: AuthTokenRequestDto
  ): Promise<string> {
    const { nodeId, apiKeyId, apiKeySecret } = authTokenRequestDto
    return await this.authService.fetchAuthTokenFromLuniverseAPI(nodeId, apiKeyId, apiKeySecret)
  }

  @Get()
  @ApiTags('auth')
  @ApiOperation({ summary: 'generate auth token by using config values', description: 'config에 세팅한 값들을 통해 빠르게 auth token을 발급 받습니다' })
  async generateAuthToken(): Promise<string> {
    const { nodeId, apiKeyId, apiKeySecret } = this.configService.get('nodeInfos')
    return await this.authService.fetchAuthTokenFromLuniverseAPI(nodeId, apiKeyId, apiKeySecret)
  }

}
