import { IsNumber, IsString } from 'class-validator'

import { Product } from '@prisma/client'

export type TProductDto = Pick<
	Product,
	'name' | 'description' | 'image' | 'categoryId' | 'price'
>
export class ProductDto implements TProductDto {
	@IsString()
	name: string

	@IsString()
	description: string

	@IsString()
	image: string

	@IsString()
	categoryId: string

	@IsNumber()
	price: number
}
