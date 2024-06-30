import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { ProductService } from './product.service'
import { ProductDto } from './dto/ProductDto.dto'
import { TProductReturn } from './types/product.types'
import { Auth } from 'src/auth/decorators/auth.decaorator'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}
	@Get()
	@HttpCode(200)
	getProductAll(
		@Query('searchTerm') searchTerm?: string
	): Promise<TProductReturn[]> {
		return this.productService.getProductAllWithSearchTerm(searchTerm)
	}

	@Get('getProductByCategory/:slug')
	@HttpCode(200)
	getProductByCategory(@Param('slug') slug: string): Promise<TProductReturn> {
		return this.getProductByCategory(slug)
	}

	@Get('getProductBySlug/:slug')
	@HttpCode(200)
	getProductBySlug(@Param('slug') slug: string): Promise<TProductReturn> {
		return this.getProductBySlug(slug)
	}

	@Auth()
	@Post('createProduct')
	@HttpCode(201)
	createProduct(): Promise<TProductReturn> {
		return this.createProduct()
	}

	@Auth()
	@Put('updateProductById/:id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	updateProductById(
		@Param('id') id: string,
		@Body() dto: ProductDto
	): Promise<TProductReturn> {
		return this.updateProductById(id, dto)
	}

	@Auth()
	@Delete('deleteProductById/:id')
	@HttpCode(200)
	deleteProductById(@Param('id') id: string): Promise<string> {
		return this.deleteProductById(id)
	}
}
