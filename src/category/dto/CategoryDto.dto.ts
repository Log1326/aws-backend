import { Category } from '@prisma/client'
import { IsString } from 'class-validator'

type TCategory = Pick<Category, 'name' | 'image'>
export class CategoryDto implements TCategory {
	@IsString()
	name: string

	@IsString()
	image: string
}
