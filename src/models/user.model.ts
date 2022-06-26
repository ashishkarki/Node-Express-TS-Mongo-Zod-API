import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserDocument extends mongoose.Document {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePasswords(inputPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next: any) {
  let user = this as UserDocument

  if (!user.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
  const hash = bcrypt.hashSync(user.password, salt)
  user.password = hash

  return next()
})

userSchema.methods.comparePasswords = async function (
  inputPassword: string
): Promise<boolean> {
  const user = this as UserDocument

  return bcrypt.compare(inputPassword, user.password).catch((e) => false)
}

const UserModel = mongoose.model('User', userSchema)

export default UserModel