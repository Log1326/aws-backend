import { Injectable, NotFoundException } from '@nestjs/common'

import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/ prisma.service'
import { getUserFields } from './properties/getUserFields'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	public async getUserById(id: string, selectFields: Prisma.UserSelect = {}) {
		const combinedSelectFields = {
			...getUserFields,
			...selectFields
		}
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: combinedSelectFields
		})
		if (!user) throw new NotFoundException('User not found')

		return user
	}

	public async toggleFavorite(userId: string, productId: string) {
		const user = await this.getUserById(userId)
		if (!user) throw new NotFoundException('User not found')
		const isExist = user.favorites.some(product => product.id === productId)
		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				favorites: {
					[isExist ? 'disconnect' : 'connect']: { id: productId }
				}
			}
		})

		return { message: 'Success' }
	}
}
