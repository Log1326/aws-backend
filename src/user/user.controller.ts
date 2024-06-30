import { Controller, Get, HttpCode, Param, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decaorator'

@Controller('profile')
export class UserController {
	constructor(private readonly userService: UserService) {}
	@HttpCode(200)
	@Get()
	@Auth()
	async getUserById(@CurrentUser('id') id: string) {
		return this.getUserById(id)
	}

	@HttpCode(200)
	@Patch('favorites/:productId')
	@Auth()
	async toggleFavorite(
		@CurrentUser('id') id: string,
		@Param('productId') productId: string
	) {
		return this.toggleFavorite(id, productId)
	}
}
