import { DocumentDefinition } from 'mongoose'
import UserModel, { UserDocument } from '../models/user.model'

export default class UserService {
  static async createUser(
    input: DocumentDefinition<
      Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePasswords'>
    >
  ) {
    try {
      return await UserModel.create(input)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
