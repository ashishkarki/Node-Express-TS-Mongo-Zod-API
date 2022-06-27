import { Request, Response } from 'express'
import { omit } from 'lodash'

import { logger } from '../../utils'
import { CreateUserInput } from '../schema/user.schema'
import { UserService } from '../services'

export default class UserController {
  static async createUserHandler(
    req: Request<{}, {}, CreateUserInput['body']>,
    res: Response
  ) {
    try {
      const user = await UserService.createUser(req.body)

      return res.status(201).json({
        status: 'User created',
        message: omit(user.toJSON(), 'password'),
      })
    } catch (error: any) {
      logger.error(error)

      return res.status(409).json({
        status: 'the entry already exists',
        message: error.message,
      }) // user is already registered
    }
  }
}
