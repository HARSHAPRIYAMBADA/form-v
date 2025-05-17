import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

interface FormData {
  registrationNumber: string;
  password: string;
}

const schema = Joi.object<FormData>({
  registrationNumber: Joi.string()
    .alphanum()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Registration number is required',
      'string.alphanum': 'Only letters and numbers allowed',
      'string.min': 'Minimum 6 characters',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Minimum 6 characters',
    }),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(`Logged in as ${data.registrationNumber}`);
        resolve(data);
      }, 1000);
    });
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Registration Number
          <input type="text" {...register('registrationNumber')} />
          {errors.registrationNumber && (
            <p className="error">{errors.registrationNumber.message}</p>
          )}
        </label>

        <label>
          Password
          <input type="password" {...register('password')} />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default App;
