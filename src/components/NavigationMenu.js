import {useContext, useEffect, useState} from "react";
import {NavigationMenuLink} from "./NavigationMenuLink";
import {BackgroundBlur} from "./BackgroundBlur";
import {Notifications} from "./Notifications";
import {ReactComponent as BurgerMenuIcon} from "../images/svg/burger-menu-icon.svg";
import {ReactComponent as ProfileIcon} from "../images/svg/profile-icon.svg";
import {ReactComponent as AnnouncementsIcon} from "../images/svg/announcements-icon.svg";
import {ReactComponent as NotificationsIcon} from "../images/svg/notifications-icon.svg";
import {ReactComponent as MessagesIcon} from "../images/svg/messages-icon.svg";
import {ReactComponent as TasksIcon} from "../images/svg/tasks-icon.svg";
import {ReactComponent as SettingsIcon} from "../images/svg/settings-icon.svg";
import {AppContext} from "../App";

export const NavigationMenu = () => {
    const {userInformation, setUserInformation} = useContext(AppContext)
    const [expandedState, setExpandedState] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false)

    useEffect(() => {
        const menuElement = document.querySelector(".navigation-menu.expanded")
        const closeMenu = (event) => {
            if (!menuElement.contains(event.target) && !event.target.classList.contains('burger-menu')) {
                setExpandedState(false)
            }
        }
        if (menuElement !== null) {
            document.body.addEventListener('click', closeMenu)
            return () => document.body.removeEventListener('click', closeMenu)
        }
    }, [expandedState])

    return (
        <>
            <div className={`navigation-menu ${expandedState ? "expanded" : "non-expanded"}`}>
                <div className="menu-groups">
                    <div className="menu-group">
                        <div className="burger-menu" onClick={() => setExpandedState(!expandedState)}>
                            <BurgerMenuIcon/>
                        </div>
                    </div>
                    <div className="menu-group">
                        <NavigationMenuLink toPage={`/profile/${userInformation?.username}`}>
                            <div className="menu-item">
                                <ProfileIcon/>
                                <p className="menu-item-title">Профіль</p>
                            </div>
                        </NavigationMenuLink>
                    </div>
                    <div className="menu-group">
                        <NavigationMenuLink toPage={"/announcements"}>
                            <div className="menu-item">
                                <AnnouncementsIcon/>
                                <p className="menu-item-title">Оголошення</p>
                            </div>
                        </NavigationMenuLink>
                        <div className="menu-item-wrapper">
                            <div className={`menu-item ${notificationVisible ? "active-page" : ""}`} onClick={() => {
                                setNotificationVisible(!notificationVisible)
                            }}>
                                <NotificationsIcon/>
                                <p className="menu-item-title">Сповіщення</p>
                            </div>
                            <Notifications visible={notificationVisible} setVisible={setNotificationVisible}/>
                        </div>
                        <NavigationMenuLink toPage={"/messages"}>
                            <div className="menu-item">
                                <MessagesIcon/>
                                <p className="menu-item-title">Повідомлення</p>
                            </div>
                        </NavigationMenuLink>
                    </div>
                    <div className="menu-group">
                        <NavigationMenuLink toPage={"/tasks"}>
                            <div className="menu-item">
                                <TasksIcon/>
                                <p className="menu-item-title">Завдання</p>
                            </div>
                        </NavigationMenuLink>
                    </div>
                    <div className="menu-group">
                        <NavigationMenuLink toPage={"/settings"}>
                            <div className="menu-item">
                                <SettingsIcon/>
                                <p className="menu-item-title">Налаштування</p>
                            </div>
                        </NavigationMenuLink>
                    </div>
                </div>

                <div className={"logo"}>
                    <img className={`image-${expandedState ? "" : "small-"}logo`} src={require("../images/png/unicorn-logo.png")} alt={"logo"}/>
                    <img className={`text-logo-${expandedState ? "" : "non-"}visible`} src={require("../images/png/uni-sweets-logo.png")} alt={"logo"}/>
                </div>
            </div>

            <div className="adaptive-menu">
                <div className="burger-menu" onClick={() => setExpandedState(!expandedState)}>
                    <BurgerMenuIcon/>
                </div>
                <div className={"mobile-top-bar"}>
                    <img className={"text-logo"} src={require("../images/png/uni-sweets-logo.png")} alt={"logo"}/>
                </div>

                <div className={"mobile-bottom-navigation"}>
                    <div className="mobile-navigation-items">
                        <div className={`mobile-notification-button ${notificationVisible ? "active-page" : ""}`} onClick={() => setNotificationVisible(!notificationVisible)}>
                            <NotificationsIcon/>
                        </div>
                        <NavigationMenuLink toPage={"/tasks"} onClick={() => setNotificationVisible(false)}>
                            <TasksIcon/>
                        </NavigationMenuLink>
                        <NavigationMenuLink toPage={"/announcements"} onClick={() => setNotificationVisible(false)}>
                            <AnnouncementsIcon/>
                        </NavigationMenuLink>
                        <NavigationMenuLink toPage={"/messages"} onClick={() => setNotificationVisible(false)}>
                            <MessagesIcon/>
                        </NavigationMenuLink>
                        <NavigationMenuLink toPage={`/profile/${userInformation?.username}`} onClick={() => setNotificationVisible(false)}>
                            <ProfileIcon/>
                        </NavigationMenuLink>
                    </div>
                </div>
                <Notifications visible={notificationVisible} setVisible={setNotificationVisible}/>
            </div>
            <BackgroundBlur blurLayer={18} isActive={expandedState}/>
        </>
    )
}