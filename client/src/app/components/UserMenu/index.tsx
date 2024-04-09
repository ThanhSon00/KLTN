/**
 *
 * UserMenu
 *
 */
import { useState } from 'react';
import { LogOutButton } from '../LogOutButton';
import { useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';

export function UserMenu() {
  const [menuToggled, setMenuToggled] = useState(false);
  const { user } = useAppSelector(getAuth);

  return (
    <div className="user-login-area">
      <div className="notifications-area user-notifications float_r">
        <span className="notifications-click" />
        <i className="icon-bell" />
        <div>
          <ul>
            <li className="notifications__item d-flex notifications__gift_site">
              <i className="icon-bucket" />
              <div className="notification__body">
                Gift of the site - 20 Points.
                <span className="notifications-date notification__date d-block mt-2">
                  January 18, 2024 at 4:14 am
                </span>
              </div>
            </li>
          </ul>
          <a href="notifications/index.html">Show all notifications.</a>
        </div>
      </div>
      <div
        className={
          'user-login-click float_r ' + (menuToggled ? 'user-click-open' : '')
        }
      >
        <span
          className="user-click"
          onClick={() => {
            setMenuToggled(!menuToggled);
          }}
        />
        <div className="user-image float_l">
          <img
            className="avatar avatar-29 photo"
            alt={user?.name}
            title={user?.name}
            width={29}
            height={29}
            srcSet="https://secure.gravatar.com/avatar/3d0ca3a8f84a11626fb89b1c3384291e?s=96&d=mm&r=g 1x, https://secure.gravatar.com/avatar/3d0ca3a8f84a11626fb89b1c3384291e?s=96&d=mm&r=g 2x"
            src={user?.avatar}
          />
        </div>
        <div className="user-login float_l ">
          <span>Welcome</span>
          <br /> <div className="float_l">{user?.name}</div>
        </div>
        <i className="icon-down-open-mini" />
        <ul
          className="sub-menu"
          style={{ display: menuToggled ? 'block' : 'none' }}
        >
          <li className="menu-item wpqa-profile">
            <a href="profile/son/index.html">
              <i className="icon-user" />
              Profile
            </a>
          </li>
          <li className="menu-item wpqa-edit-profile">
            <a href="settings/edit/index.html">
              <i className="icon-pencil" />
              Edit Profile
            </a>
          </li>
          <li className="menu-item wpqa-messages">
            <a href="messages/index.html">
              <i className="icon-mail" />
              Messages
            </a>
          </li>
          <li className="menu-item wpqa-groups">
            <a href="profile/son/groups/index.html">
              <i className="icon-network" />
              Groups
            </a>
          </li>
          <li className="menu-item wpqa-referrals">
            <a href="referrals/index.html">
              <i className="icon-user-add" />
              Referrals
            </a>
          </li>
          <li className="menu-item wpqa-asked_questions">
            <a href="profile/son/asked-questions/index.html">
              <i className="icon-sound" />
              Waiting Questions
            </a>
          </li>
          <li className="menu-item wpqa-asked">
            <a href="profile/son/asked/index.html">
              <i className="icon-sound" />
              Asked Questions
            </a>
          </li>
          <li className="menu-item wpqa-best_answers">
            <a href="profile/son/best-answers/index.html">
              <i className="icon-graduation-cap" />
              Best Answers
            </a>
          </li>
          <li className="menu-item wpqa-points">
            <a href="profile/son/points/index.html">
              <i className="icon-bucket" />
              Points
            </a>
          </li>
          <li className="menu-item wpqa-activities">
            <a href="activities/index.html">
              <i className="icon-chart-line" />
              Activities
            </a>
          </li>
          <LogOutButton />
        </ul>
      </div>
    </div>
  );
}
