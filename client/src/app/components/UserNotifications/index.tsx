import { useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { useEffect, useState } from "react";
import { getUserNotifications, markNotificationAsRead, Notify, NotiType } from "services/notification.service";
import { MenuType } from "../UserMenu";
import Notification from "../Notification";
import { ReportedType } from "services/report.service";

export default function UserNotifications() {
    const [notifications, setNotifications] = useState<Notify[]>([]);
    const { user } = useAppSelector(getAuth);

    const loadNotifications = async (userId) => {
        if (!user) return;
        const result = await getUserNotifications(userId);
        for (let i = 0; i < result.length; i++) {
            if (result[i].type === NotiType.newMessageFromAdmin) {
                await markNotificationAsRead(user?.id, result[i].id);
            }
        }
        setNotifications(result);
    }

    useEffect(() => {
        if (user) {
            loadNotifications(user.id);
        }
    }, [])

    return (
        <div
            id="section-notifications"
            className="user-notifications user-profile-area section-page-div custom__notifications"
            >
            <div className="notifications-dropdown-menu">
                <ul className="list-unstyled mb-0">
                    {notifications.map(notification => <Notification notification={notification} key={notification.id} inSection={true} />)}
                </ul>
            </div>
        </div>
    )
}