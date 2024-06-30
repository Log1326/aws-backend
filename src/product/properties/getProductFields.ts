import { Prisma } from '@prisma/client'
import { getCategoryFields } from 'src/category/properties/getCategoryFields'

export const getProductFields: Prisma.ProductSelect = {
	id: true,
	name: true,
	description: true,
	price: true,
	createdAt: true,
	slug: true,
	image: true,
	category: { select: getCategoryFields }
}
