import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		CategoryModule,
		ProductModule,
		UserModule
	]
})
export class AppModule {}
