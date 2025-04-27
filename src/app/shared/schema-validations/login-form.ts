import * as yup from 'yup';

export interface IUserLoginFields {
  email: string;
  password: string;
}

export const userLoginFormSchema: yup.ObjectSchema<IUserLoginFields> = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(10).max(50)
  })
  .required();
