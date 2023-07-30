import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AppContext} from "../App";
import {Notification} from "./Notification";
import {ReactComponent as CloseIcon} from "../images/svg/close-icon.svg";

export const Notifications = (props) => {
    const {authInfo} = useContext(AppContext)
    const [notifications, setNotifications] = useState([])
    const [currentInterval, setCurrentInterval] = useState(null)

    const getCurrentNotifications = () => {
        axios.get(`http://192.168.0.106:8080/api/v1/notifications/${authInfo.username}`)
            .then(value => {
                setNotifications([...value.data])
            })
    }

    useEffect(() => {
        if (notifications.filter(notification => !notification.isRead).length > 0) {
            document.querySelectorAll(".notification-icon").forEach(value => value.classList.add("unread"))
        } else {
            document.querySelectorAll(".notification-icon").forEach(value => value.classList.remove("unread"))
        }
    }, [notifications])


    useEffect(() => {
        getCurrentNotifications()
        setCurrentInterval(setInterval(() => {
            getCurrentNotifications()
        }, 5000))
        return () => clearInterval(currentInterval)
    }, [])

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
                    notifications.map((notification, i) => <Notification key={i} notification={notification} setNotifications={setNotifications}/>)
                }
            </div>
        </div>
    )
}