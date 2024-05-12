/**
 *
 * LogOutButton
 *
 */
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from 'services/auth.service';
import { useAppDispatch } from 'store/hooks';

interface Props {}

export function LogOutButton(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    await dispatch(logout());
    navigate('/');
  };
  return (
    <li className="menu-item wpqa-logout">
      <a href="/" onClick={handleClick}>
        <i className="icon-logout" />
        Log Out
      </a>
    </li>
  );
}
