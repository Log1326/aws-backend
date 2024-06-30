import { IsArray, IsString } from 'class-validator'

import { TProductReturn } from 'src/product/types/product.types'
import { TUserReturn } from '../types/user.types'

export class UserDto implements TUserReturn {
	@IsArray()
	favorites: TProductReturn[]

	@IsString()
	id: string

	@IsString()
	email: string

	@IsString()
	name: string

	@IsString()
	avatarPath: string

	@IsString()
	password: string

	@IsString()
	phone: string
}
