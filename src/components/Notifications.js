import {Notification} from "./Notification";
import {ReactComponent as CloseIcon} from "../images/svg/close-icon.svg";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import axios from "axios";

export const Notifications = (props) => {
    const {authInfo} = useContext(AppContext)
    const [notifications, setNotifications] = useState([])


    useEffect(() => {
        axios.get(`http://192.168.0.106:8080/api/v1/notifications/${authInfo.username}`)
            .then(value => {
                setNotifications(value.data)
            })
    }, [authInfo])

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
                    notifications.map((notification, i) =>
                        <Notification key={i} notification={notification} setNotifications={setNotifications}/>
                    )
                }
            </div>
        </div>
    )
}