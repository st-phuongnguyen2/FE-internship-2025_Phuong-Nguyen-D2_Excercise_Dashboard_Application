import { yupResolver } from '@hookform/resolvers/yup';
import { AppRoutes } from '@src/app/core/constants/app-routes';
import FormInput from '@src/app/shared/components/form/FormInput';
import { userService } from '@src/app/shared/services/user.service';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  IUserLoginFields,
  userLoginFormSchema
} from '../../../shared/schema-validations/login-form';
import { useContext } from 'react';
import { AuthContext } from '@src/app/shared/contexts/auth.context';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLoginFormSchema)
  });
  const { setUserSession } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IUserLoginFields> = async (data) => {
    if (data.email && data.password) {
      try {
        const res = await userService.loginUser(data);

        setUserSession(res);
        toast.success('Logged in successfully!');
        navigate(AppRoutes.HOME);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    }
  };

  return (
    <main className="login-page">
      <section className="section-auth">
        <div className="container">
          <div className="section-content">
            <h2 className="title">Welcome Back!</h2>
            <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                label="Username:"
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
              <button
                // disabled={Object.keys(errors).length > 0}
                className={'btn btn-primary'}
                type="submit"
              >
                Submit
              </button>
            </form>
            <p className="auth-prompt">
              Don’t have and account?{' '}
              <Link to={AppRoutes.REGISTER} className="auth-link">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Login;
