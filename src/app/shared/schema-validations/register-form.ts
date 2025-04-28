import * as yup from 'yup';

export interface IUserRegisterFields {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const userRegisterFormSchema: yup.ObjectSchema<IUserRegisterFields> = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(10).max(50),
    confirmPassword: yup.string().required().min(10).max(50)
  })
  .required();
