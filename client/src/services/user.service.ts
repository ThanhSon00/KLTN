import { User } from 'app/components/SignInPanel/slice/types';

export const getUser = async id => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw Error('Something went wrong');
  }
  const user = await response.json();
  return user as User;
};
