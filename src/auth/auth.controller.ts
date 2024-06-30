import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { Auth } from './decorators/auth.decaorator'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('tokens')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Get tokens' })
	@ApiResponse({ status: 200, description: 'Success' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiBody({ type: RefreshTokenDto })
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.tokens(dto.refreshToken)
	}

	@Post('access-token')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@Post('register')
	@HttpCode(201)
	@UsePipes(new ValidationPipe())
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}
}
