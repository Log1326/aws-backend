import { Injectable, NotFoundException } from '@nestjs/common'

import { Category } from '@prisma/client'
import { CategoryDto } from './dto/CategoryDto.dto'
import { PrismaService } from 'src/ prisma.service'
import { TCategoryReturn } from './types/category.types'
import { generateSlug } from 'src/utils/slug'
import { getCategoryFields } from './properties/getCategoryFields'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}
	async getAllCategory(): Promise<TCategoryReturn[]> {
		return this.prisma.category.findMany({
			select: getCategoryFields
		})
	}

	async getCategoryById(id: string): Promise<TCategoryReturn> {
		const category = await this.prisma.category.findUnique({
			where: { id },
			select: getCategoryFields
		})
		if (!category) throw new NotFoundException('Category not found by id')

		return category
	}

	async getCategoryBySlug(slug: string): Promise<TCategoryReturn> {
		const category = await this.prisma.category.findUnique({
			where: { slug },
			select: getCategoryFields
		})
		if (!category) throw new NotFoundException('Category not found by slug')

		return category
	}

	async createCategory(): Promise<Category> {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: '',
				image: ''
			}
		})
	}

	async updateCategoryById(id: string, dto: CategoryDto): Promise<Category> {
		return this.prisma.category.update({
			where: { id },
			data: {
				name: dto.name,
				slug: generateSlug(dto.name),
				image: dto.image
			}
		})
	}

	async deleteCategoryById(id: string): Promise<string> {
		const isDeleted = await this.prisma.category.delete({ where: { id } })
		if (isDeleted) return 'This category have been deleted'
		else throw new NotFoundException('Category was not found')
	}
}
