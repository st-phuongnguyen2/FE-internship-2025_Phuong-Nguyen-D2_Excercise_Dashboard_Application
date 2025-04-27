import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCurrentUser } from '../../../redux-store/users/users-slice';
import FormInput from '../../../shared/components/form/FormInput';
import {
  useAppDispatch,
  useAppSelector
} from '../../../shared/hooks/redux-hook';
import { User } from '../../../shared/models/User';
import {
  IUserLoginFields,
  userLoginFormSchema
} from '../../../shared/schema-validations/login-form';
import { AppRoutes } from '../../../utils/constants/app-routes';

const Main = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLoginFormSchema)
  });
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IUserLoginFields> = (data) => {
    if (data.email && data.password) {
      const foundUser = users.find((item) => item.email === data.email);

      if (!foundUser) {
        toast.error("User with this email doesn't exist!");
      } else if (foundUser.password !== data.password) {
        toast.error('User credential is incorrect!');
      } else {
        const currentUser = new User(
          foundUser.id,
          foundUser.fullName,
          foundUser.email,
          foundUser.password
        );

        dispatch(setCurrentUser(currentUser));
        toast.success('Logged in successfully!');
        navigate(AppRoutes.HOME);
      }
    }
  };

  return (
    <main className="login-page">
      <section className="section-auth">
        <div className="container">
          <div className="section-content">
            <h2 className="title">Welcome Back!</h2>
            <form
              className="auth-form login-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                label="Username:"
                formRegister={register('email')}
                message={errors.email?.message}
              />
              <FormInput
                label="Password:"
                formRegister={register('password')}
                message={errors.password?.message}
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
export default Main;
