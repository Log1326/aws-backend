import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'src/ prisma.service'
import { Product } from '@prisma/client'
import { ProductDto } from './dto/ProductDto.dto'
import { TProductReturn } from './types/product.types'
import { generateSlug } from 'src/utils/slug'
import { getProductFields } from './properties/getProductFields'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	public async getProductAllWithSearchTerm(
		searchTerm?: string
	): Promise<TProductReturn[]> {
		if (searchTerm) return this.searchProduct(searchTerm)

		return this.prisma.product.findMany({
			select: getProductFields,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	public async getProductByCategory(slug: string): Promise<TProductReturn[]> {
		const products = await this.prisma.product.findMany({
			where: { category: { slug } },
			select: getProductFields
		})
		if (!products) throw new NotFoundException('Products not found')

		return products
	}

	public async getProductBySlug(slug: string): Promise<TProductReturn> {
		const product = await this.prisma.product.findUnique({
			where: { slug },
			select: getProductFields
		})
		if (!product) throw new NotFoundException('product not found by slug')

		return product
	}

	public async createProduct(): Promise<Product> {
		return this.prisma.product.create({
			data: {
				name: '',
				slug: '',
				image: '',
				description: '',
				price: 0
			}
		})
	}

	public async updateProductById(
		id: string,
		dto: ProductDto
	): Promise<Product> {
		const { categoryId, description, image, name, price } = dto

		return this.prisma.product.update({
			where: { id },
			data: {
				name,
				description,
				price,
				image,
				slug: generateSlug(dto.name),
				category: { connect: { id: categoryId } }
			}
		})
	}

	public async deleteProductById(id: string): Promise<string> {
		const isDeleted = await this.prisma.product.delete({ where: { id } })
		if (isDeleted) return 'This category have been deleted'
		else throw new NotFoundException('Category was not found')
	}

	private async searchProduct(searchTerm?: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			},
			select: getProductFields
		})
	}
}
