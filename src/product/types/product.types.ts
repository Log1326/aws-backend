import { Product } from '@prisma/client'
import { TCategoryReturn } from 'src/category/types/category.types'

export type TProductReturn = Omit<
	Product,
	'id' | 'name' | 'description' | 'price' | 'createdAt' | 'slug' | 'image'
> & { category: TCategoryReturn }
