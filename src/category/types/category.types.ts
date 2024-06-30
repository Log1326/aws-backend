import { Category } from '@prisma/client'

export type TCategoryReturn = Pick<Category, 'id' | 'name' | 'slug' | 'image'>
