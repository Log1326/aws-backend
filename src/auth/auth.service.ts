import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { TTokens, TUserIdAndEmail, TUserReturn } from './types/auth.types'
import { hash, verify } from 'argon2'

import { AuthDto } from './dto/auth.dto'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/ prisma.service'
import { User } from '@prisma/client'
import { faker } from '@faker-js/faker'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) {}

	public async login(dto: AuthDto): Promise<TUserReturn> {
		const user = await this.validateUser(dto)

		return this.getTokensAndReturnUser(user)
	}

	public async register(dto: AuthDto): Promise<TUserReturn> {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (oldUser) throw new BadRequestException('User is already exist')

		const newUser = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: faker.person.firstName(),
				avatarPath: faker.image.avatar(),
				phone: faker.phone.number(),
				password: await hash(dto.password)
			}
		})

		return this.getTokensAndReturnUser(newUser)
	}

	public async tokens(refreshToken: string): Promise<TUserReturn> {
		const valid = await this.jwt.verifyAsync(refreshToken)
		if (!valid) throw new UnauthorizedException('Invalid refresh token')
		const userValid = await this.prisma.user.findUnique({
			where: { id: valid.id }
		})

		return this.getTokensAndReturnUser(userValid)
	}

	private getTokensAndReturnUser(user: User): TUserReturn {
		const tokens = this.issueTokens(user.id)

		return { user: this.returnUserFields(user), ...tokens }
	}

	private issueTokens(userId: string): TTokens {
		const data = { id: userId }
		const accessToken = this.jwt.sign(data, { expiresIn: '1h' }),
			refreshToken = this.jwt.sign(data, { expiresIn: '3d' })

		return { accessToken, refreshToken }
	}

	private returnUserFields(user: Pick<User, 'id' | 'email'>): TUserIdAndEmail {
		return {
			id: user.id,
			email: user.email
		}
	}

	private async validateUser(dto: AuthDto): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})
		if (!user) throw new NotFoundException('User not found')
		const isValid = await verify(user.password, dto.password)
		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}
}
