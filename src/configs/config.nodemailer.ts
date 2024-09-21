export const mailConfig = {
	service: 'Gmail',
	host: 'smtp.gmail.com',
	port: 587,
	auth: {
		user: process.env.WORKSPACE_EMAIL,
		pass: process.env.WORKSPACE_PASSWORD,
	},
}
