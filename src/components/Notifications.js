import {Notification} from "./Notification";
import {ReactComponent as CloseIcon} from "../images/svg/close-icon.svg";

export const Notifications = (props) => {

    const notifications = [
        {
            date: "07/05/2023",
            notificationsList: [
                {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }
            ]
        },
        {
            date: "06/05/2023",
            notificationsList: [
                {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }, {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }
            ]
        },
        {
            date: "05/05/2023",
            notificationsList: [
                {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }, {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }, {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }
            ]
        },
        {
            date: "04/05/2023",
            notificationsList: [
                {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }, {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }, {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }, {
                    username: "Клієнт",
                    userPicture: "",
                    notificationText: "залишив коментар"
                }
            ]
        }
    ]

    return (
        <div className={`notifications-wrapper ${props.visible ? "visible" : ""}`}>
            <div className="notifications-header">
                <div className="notifications-title">Сповіщення</div>
                <div className="icon-button" onClick={() => props.setVisible(!props.visible)}>
                    <CloseIcon/>
                </div>
            </div>
            <div className="notifications-groups">
                {
                    notifications.map((notificationGroup, i) =>
                        <div className="notification-group" key={i}>
                            <div className="notification-group-title">{notificationGroup.date}</div>
                            <div className="notification-group-items">
                                {
                                    notificationGroup.notificationsList.map((notification, j) =>
                                        <Notification key={`${i}${j}`} comment={notification.username + " " + notification.notificationText}/>)
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}