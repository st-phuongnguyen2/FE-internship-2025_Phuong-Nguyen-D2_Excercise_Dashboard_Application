import { yupResolver } from '@hookform/resolvers/yup';
import { AppRoutes } from '@src/app/core/constants/app-routes';
import { userService } from '@src/app/shared/services/user.service';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../../shared/components/form/FormInput';
import { User } from '../../../shared/models/User';
import {
  IUserRegisterFields,
  userRegisterFormSchema
} from '../../../shared/schema-validations/register-form';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: yupResolver(userRegisterFormSchema)
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IUserRegisterFields> = async (data) => {
    if (data.password === data.confirmPassword) {
      const newUser = new User(
        crypto.randomUUID(),
        data.fullName,
        data.email,
        data.password
      );
      try {
        await userService.registerUser(newUser);

        toast.success('Registered user successfully!');
        navigate(AppRoutes.LOGIN);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    } else {
      setError('confirmPassword', {
        message: 'Confirm password and password must be the same'
      });
      setError('password', {
        message: 'Confirm password and password must be the same'
      });
    }
  };

  return (
    <main className="register-page">
      <section className="section-auth">
        <div className="container">
          <div className="section-content">
            <h2 className="title">Register!</h2>
            <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                label="Full Name:"
                formRegister={register('fullName')}
                message={errors.fullName?.message}
              />
              <FormInput
                label="Email:"
                formRegister={register('email')}
                message={errors.email?.message}
              />
              <FormInput
                label="Password:"
                formRegister={register('password')}
                message={errors.password?.message}
                inputProps={{
                  type: 'password'
                }}
              />
              <FormInput
                label="Confirm Password:"
                formRegister={register('confirmPassword')}
                message={errors.confirmPassword?.message}
                inputProps={{
                  type: 'password'
                }}
              />
              <button
                // disabled={Object.keys(errors).length > 0}
                className={'btn btn-primary'}
                type="submit"
              >
                Submit
              </button>
            </form>
            <p className="auth-prompt">
              Yes I have an account?{' '}
              <Link to={AppRoutes.LOGIN} className="auth-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Register;
