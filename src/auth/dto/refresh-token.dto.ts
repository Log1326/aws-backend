import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
export type TRefreshToken = {
	refreshToken: string
}
export class RefreshTokenDto implements TRefreshToken {
	@ApiProperty({
		example: 'your token refresh',
		description: 'token'
	})
	@IsString()
	refreshToken: string
}
