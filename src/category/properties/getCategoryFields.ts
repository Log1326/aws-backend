import { Prisma } from '@prisma/client'

export const getCategoryFields: Prisma.CategorySelect = {
	id: true,
	name: true,
	slug: true,
	image: true
}
