/**
 *
 * UserMenu
 *
 */
import { useState } from 'react';
import { LogOutButton } from '../LogOutButton';
import { useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import { Link } from 'react-router-dom';
import { Avatar } from '../ReportLine';
import UserNotificationMenu from '../UserNotificationMenu';
import UserSubmenu from '../UserSubmenu';

export enum MenuType {
  user = 'user',
  notification = 'notification',
}

export function UserMenu() {
  const [menuToggled, setMenuToggled] = useState<MenuType | undefined>(undefined);
  const { user } = useAppSelector(getAuth);
  return (
    <div className="user-login-area">
      <UserNotificationMenu dropDown={menuToggled} setDropDown={setMenuToggled}/>
      <div
        className={
          'user-login-click float_r ' + (menuToggled === MenuType.user ? 'user-click-open' : '')
        }
      >
        <span
          className="user-click"
          onClick={() => {
            setMenuToggled(menuToggled === MenuType.user ? undefined : MenuType.user);
          }}
        />
        <div className="user-image float_l">
          <img
            className="avatar avatar-29 photo"
            alt={user?.name}
            title={user?.name}
            width={29}
            height={29}
            style={{ maxBlockSize: '29px' }}
            src={user?.avatar}
          />
        </div>
        <div className="user-login float_l ">
          <span>Xin chào</span>
          <br /> <div className="float_l">{user?.name}</div>
        </div>
        <i className="icon-down-open-mini" />
        <UserSubmenu dropDown={menuToggled} setDropDown={setMenuToggled}/>
      </div>
    </div>
  );
}
