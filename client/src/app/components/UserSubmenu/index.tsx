import { Link } from "react-router-dom";
import { LogOutButton } from "../LogOutButton";
import { useState } from "react";
import { useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { MenuType } from "../UserMenu";

interface Props { 
    dropDown: MenuType | undefined;
    setDropDown: React.Dispatch<React.SetStateAction<MenuType | undefined>>;
}

export default function UserSubmenu(props: Props) {
    const { dropDown, setDropDown } = props;
    const { user } = useAppSelector(getAuth);
    const isDropDown = dropDown === MenuType.user;

    const handleDropDownClick = () => {
      setDropDown(isDropDown ? undefined : MenuType.user);
    }

    return (
        <ul
          className="sub-menu"
          style={{ display: isDropDown ? 'block' : 'none' }}
        >
          <li className="menu-item wpqa-profile">
            <Link to={`/home/profile/${user?.id}`} onClick={handleDropDownClick}>
              <i className="icon-user" />
                Thông tin cá nhân
            </Link>
          </li>
          <li className="menu-item wpqa-edit-profile">
            <Link to="/home/profile/edit" onClick={handleDropDownClick}>
                <i className="icon-pencil" />
                Chỉnh sửa thông tin
            </Link>
          </li>
          <LogOutButton />
        </ul>
    )
}