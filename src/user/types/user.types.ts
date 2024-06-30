import { TProductReturn } from 'src/product/types/product.types'
import { User } from '@prisma/client'

export type TUserReturn = Pick<
	User,
	'id' | 'email' | 'name' | 'avatarPath' | 'password' | 'phone'
> & { favorites: TProductReturn[] }
