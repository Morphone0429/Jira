import { useAuth } from 'context/auth-context';
import { FormEvent } from 'react';

export const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = () => {
  const { register, user } = useAuth();
  // console.log();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'></label>
        <input type='text' id={'username'} />
      </div>
      <div>
        <label htmlFor='password'></label>
        <input type='password' id={'password'} />
      </div>
      <button type='submit'>注册</button>
    </form>
  );
};
