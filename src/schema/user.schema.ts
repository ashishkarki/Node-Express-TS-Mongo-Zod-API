import { object, string, TypeOf } from 'zod'

// the definition for our user input/payload
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password should be minimum 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password Confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Please enter valid email address'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password Confirmation failed',
    path: ['passwordConfirmation'],
  }),
})

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>
