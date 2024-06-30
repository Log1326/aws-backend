import { IsEmail, IsString, MinLength } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

type TAuth = {
	email: string
	password: string
}
export class AuthDto implements TAuth {
	@ApiProperty({
		example: 'user@example.com',
		description: 'User email address'
	})
	@IsEmail()
	email: string

	@ApiProperty({ example: 'password123', description: 'User password' })
	@MinLength(6, { message: 'Password must be at least 6' })
	@IsString()
	password: string
}
