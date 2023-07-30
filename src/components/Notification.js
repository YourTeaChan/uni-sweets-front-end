import {useContext} from "react";
import axios from "axios";
import {AppContext} from "../App";

export const Notification = (props) => {
    const {authInfo} = useContext(AppContext)

    return (
        <div className={`notification-group-item${props.notification.isRead ? " read" : ""}`} onClick={() => {
            axios.patch(`http://192.168.0.106:8080/api/v1/notifications/${authInfo.username}/${props.notification.id}`)
                .then(value => {
                    props.setNotifications([...value.data])
                })
        }}>
            <div className="notification-item-content">
                <div className="notification-item-user-info">
                    <div className="notification-item-user-info-pic">
                        <img src={props.notification.senderUser.userPicture?.pictureURL} alt={""}/>
                    </div>
                </div>
                <div className="notification-item-text">{props.notification.text}</div>
            </div>
        </div>
    )
}