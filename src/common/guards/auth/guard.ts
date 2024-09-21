import { NextFunction, Request, Response } from 'express'

export interface Guard {
	guard(
		...roles: readonly string[]
	): (req: Request, res: Response, next: NextFunction) => void
}
