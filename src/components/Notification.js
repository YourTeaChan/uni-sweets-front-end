import {useContext, useState} from "react";
import axios from "axios";
import {AppContext} from "../App";

export const Notification = (props) => {
    const {authInfo} = useContext(AppContext)
    const [isRead, setRead] = useState(props.notification.isRead)

    return (
        <div className={`notification-group-item${isRead ? " read" : ""}`} onClick={() => {
            setRead(true)
            axios.patch(`http://192.168.0.106:8080/api/v1/notifications/${authInfo.username}/${props.notification.id}`)
                .then(value => {
                    props.setNotifications(value.data)
                })
        }}>
            <div className="notification-item-content">
                <div className="notification-item-user-info">
                    <div className="notification-item-user-info-pic">
                        <img src={props.notification.senderUser.userPicture.pictureURL} alt={""}/>
                    </div>
                </div>
                <div className="notification-item-text">{props.notification.text}</div>
            </div>
        </div>
    )
}