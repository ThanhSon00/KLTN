import { isoToDateString } from "utils/date";
import { User } from "../SignInPanel/slice/types"
import { useState } from "react";
import { banUser } from "services/user.service";

interface Props {
    user: User;
    dropdownOpen: string;
    setDropdownOpen: (value: string) => void;
}

export default function UserLine(props: Props) {
    const [user, setUser] = useState(props.user);
    const { dropdownOpen, setDropdownOpen } = props;
    const reverseDropdown = () => {
        const newState = dropdownOpen === props.user.id ? "" : props.user.id;
        setDropdownOpen(newState);
    };

    const handleBanUserClick = async (e) => {
        e.preventDefault();
        await banUser(user.id, 'true');
        setUser({...user, isBanned: true});
        setDropdownOpen('');
    }

    const handleUnbanUserClick = async (e) => {
        e.preventDefault();
        await banUser(user.id, 'false');
        setUser({...user, isBanned: false});
        setDropdownOpen('');
    }

    const showDropdown = () => {
        return dropdownOpen === props.user.id ? " show" : "";
    };

    const colorButton = () => {
        if (user.isBanned) {
            return " btn-danger ";
        }
        return " btn-info ";
    }
    return (
        <tr className="odd gradeX">
            <td>
                <label className="rt-chkbox rt-chkbox-single rt-chkbox-outline">
                    <input
                    type="checkbox"
                    className="checkboxes"
                    defaultValue={1}
                    />
                    <span />
                </label>
            </td>
            <td className="center"> {user.name} </td>
            <td className="center">
                <a href={`mailto:${user.email}`}> {user.email} </a>
            </td>
            <td className="center"> {user.phoneNumber} </td>
            <td className="center"> {isoToDateString(user.createdAt)} </td>
            <td className="center">
                <div className="btn-group">
                    <button
                    className={"btn btn-xs" + colorButton() + "dropdown-toggle center no-margin" + showDropdown()}
                    type="button"
                    data-bs-toggle="dropdown"
                    onClick={reverseDropdown}
                    >
                    {" "}
                    {user.isBanned ? "Bị khóa" : "Bình thường"}
                    <i className="fa fa-angle-down" />
                    </button>
                    <ul
                    className={"dropdown-menu pull-left" + showDropdown()}
                    role="menu"
                    style={dropdownOpen ? {
                        position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(-98.6667px, 25.3333px)'
                    } : {}}
                    >
                    {/* <li>
                        <a href="/">
                        <i className="fa fa-trash-o" />
                        Delete{" "}
                        </a>
                    </li>
                    <li>
                        <a href="/">
                        <i className="fa fa-ban" />
                        Cancel{" "}
                        </a>
                    </li> */}
                    {!user.isBanned ? 
                        <li>
                            <a href="/" onClick={handleBanUserClick}>
                            <i className="fa fa-ban" />
                            {" "}Ban người dùng
                            </a>
                        </li> :
                        <li>
                            <a href="/" onClick={handleUnbanUserClick}>
                            <i className="fa fa-eraser" />
                            {" "}Gỡ ban người dùng
                            </a>
                        </li>
                    }
                    </ul>
                </div>
            </td>
        </tr>
    )
}