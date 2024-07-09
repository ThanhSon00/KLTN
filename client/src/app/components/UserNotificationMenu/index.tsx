import { useEffect, useState } from "react"
import { MenuType } from "../UserMenu";
import { useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { Link } from "react-router-dom";
import { countUnSeenNotification, getUserNotifications, Notify } from "services/notification.service";
import Notification from "../Notification";

interface Props {
    dropDown: MenuType | undefined;
    setDropDown: (value: MenuType | undefined) => void;
}

export default function UserNotificationMenu(props: Props) {
    const [unseenNotificationsCount, setUnseenNotificationsCount] = useState<number>(0);
    const [notifications, setNotifications] = useState<Notify[]>([]);
    const { user } = useAppSelector(getAuth);
    const { dropDown, setDropDown } = props;
    const isDropDown = dropDown === MenuType.notification;
    const handleClick = () => {
        setDropDown(isDropDown ? undefined : MenuType.notification);
    }

    const isDropdownStyle = isDropDown ? ' user-notifications-seen' : '';
    const loadNotifications = async (userId) => {
        const result = await getUserNotifications(userId);
        setNotifications(result);
    }
    
    const loadUnseenNotificationsCount = async (userId) => {
        const result = await countUnSeenNotification(userId);
        setUnseenNotificationsCount(result);
    }
    useEffect(() => {
        if (user) {
            if(dropDown === MenuType.notification) {
                loadNotifications(user.id);
            }
            loadUnseenNotificationsCount(user.id);
        }

    }, [dropDown])

    return (
        <div className={"notifications-area user-notifications float_r" + isDropdownStyle} onClick={handleClick}>
            {" "}
            <span className="notifications-click notifications--click" />{" "}
            <i className="icon-bell" /> 
            {unseenNotificationsCount !== 0 && <span className="notifications-number">{unseenNotificationsCount}</span>}
            <div style={isDropDown ? { display: 'block', height: "auto", maxHeight: "400px", overflow: "scroll" } : { display: 'none' }}>
                <ul>
                    {notifications.map(notification => <Notification notification={notification} key={notification.id} />)}
                </ul>
                <Link to={`/home/profile/${user?.id}/notifications`} style={{ position: 'sticky', bottom: '-1px', background: 'white' }}>
                    Hiển thị tất cả thông báo
                </Link>
            </div>{" "}
        </div>
    )
}