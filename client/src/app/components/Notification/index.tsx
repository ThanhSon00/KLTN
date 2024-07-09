import { Notify, NotiType } from "services/notification.service"
import parse from 'html-react-parser';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import vi from 'javascript-time-ago/locale/vi'
import { useState } from "react";
import { ReportStatus } from "services/report.service";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(vi)

interface Props {
    notification: Notify,
    inSection?: boolean
}

export default function Notification(props: Props) {
    const [notification, setNotification] = useState<Notify>(props.notification);
    const iconElement = () => {
        switch (props.notification.type) {
            case NotiType.newMessageFromAdmin:
                {   
                    switch (notification.report?.status) {
                        case ReportStatus.approved:
                            return (
                                <i className="fa fa-check"/>
                            )
                        case ReportStatus.rejected:
                            return (
                                <i className="fa fa-times"/>
                            )
                        default:
                            return (
                                <i className="icon-bucket" />
                            )
                    }
                }
            case NotiType.bestAnswer: {
                switch (notification.bestAnswer) {
                    case true:
                        return (
                            <i className="fa fa-thumbs-up" />
                        )
                    case false:
                        return (
                            <i className="fa fa-times" />
                        )
                    default:
                        return (
                            <i className="icon-bucket" />
                        )
                }
            }
            case NotiType.newComment: {
                return (
                    <i className="fa fa-comments" />
                )
            }
            case NotiType.newAnswer: {
                return (
                    <i className="fa fa-comment" />
                )
            }
            default:
                return (
                    <i className="icon-bucket" />
                )
        }
    }
    return (
        <li className="notifications__item d-flex notifications__gift_site" style={{ display: 'flex' }}>
            {iconElement()}
            <div className="notification__body">
                <div style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingRight: "15px",
                        width: props.inSection ? "auto" : "175px"
                    }}>
                    {parse(props.notification.details)}
                </div>
                <span className="notifications-date notification__date d-block mt-2">
                    <ReactTimeAgo date={new Date(props.notification.createdAt)} locale="vi-VN"/>
                </span>{" "}
            </div>
            {!props.inSection && props.notification.unread ?  
                <div style={{ alignContent: 'center' }}>
                    <i className="fa fa-dot-circle fa-sm"  aria-hidden="true" style={{ 
                        fontSize: '13px', 
                        marginRight: 'auto',
                        textAlign: 'center',
                        color: 'cornflowerblue'
                    }}></i>
                </div> : null
            }
        </li>
    )
}