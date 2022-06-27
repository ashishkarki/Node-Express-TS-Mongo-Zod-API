import { createUserSchema } from './../schema/user.schema'
import { Express, Request, Response } from 'express'
import { UserController } from '../controllers'
import validateResource from '../middlewares/validateResource'

const indexRoutes = (app: Express) => {
  app.get('/healthcheck', (_req: Request, res: Response) => {
    return res.sendStatus(200)
  })

  app.post(
    '/api/users',
    validateResource(createUserSchema),
    UserController.createUserHandler
  )
}

export default indexRoutes
