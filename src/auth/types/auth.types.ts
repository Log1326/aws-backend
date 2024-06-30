export type TUserReturn = {
	user: TUserIdAndEmail
} & TTokens
export type TUserIdAndEmail = {
	id: string
	email: string
}
export type TTokens = {
	accessToken: string
	refreshToken: string
}
