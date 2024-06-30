import { Prisma } from '@prisma/client'
import { getProductFields } from 'src/product/properties/getProductFields'

export const getUserFields: Prisma.UserSelect = {
	id: true,
	email: true,
	name: true,
	avatarPath: true,
	password: true,
	phone: true,
	favorites: { select: getProductFields }
}
