import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { CategoryService } from './category.service'
import { CategoryDto } from './dto/CategoryDto.dto'
import { TCategoryReturn } from './types/category.types'
import { Category } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decaorator'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}
	@Get()
	@HttpCode(200)
	async getAllCategory() {
		return this.categoryService.getAllCategory()
	}

	@HttpCode(200)
	@Get('getCategoryById/:id')
	async getCategoryById(@Param('id') id: string): Promise<TCategoryReturn> {
		return this.categoryService.getCategoryById(id)
	}

	@HttpCode(200)
	@Get('getCategoryBySlug/:slug')
	async getCategoryBySlug(
		@Param('slug') slug: string
	): Promise<TCategoryReturn> {
		return this.categoryService.getCategoryBySlug(slug)
	}

	@HttpCode(201)
	@Post('createCategory')
	@Auth()
	async createCategory(): Promise<Category> {
		return this.categoryService.createCategory()
	}

	@HttpCode(200)
	@Put('updateCategoryById/:id')
	@Auth()
	@UsePipes(new ValidationPipe())
	async updateCategoryById(
		@Param('id') id: string,
		@Body() dto: CategoryDto
	): Promise<Category> {
		return this.categoryService.updateCategoryById(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete('deleteCategoryById/:id')
	async deleteCategoryById(@Param('id') id: string): Promise<string> {
		return this.deleteCategoryById(id)
	}
}
