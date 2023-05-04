import {useEffect, useState} from "react";
import {NavigationMenuLink} from "./NavigationMenuLink";
import {ReactComponent as BurgerMenuIcon} from "../images/svg/burger-menu-icon.svg";
import {ReactComponent as ProfileIcon} from "../images/svg/profile-icon.svg";
import {ReactComponent as AnnouncementsIcon} from "../images/svg/announcements-icon.svg";
import {ReactComponent as NotificationsIcon} from "../images/svg/notifications-icon.svg";
import {ReactComponent as MessagesIcon} from "../images/svg/messages-icon.svg";
import {ReactComponent as TasksIcon} from "../images/svg/tasks-icon.svg";
import {ReactComponent as CalendarIcon} from "../images/svg/calendar-icon.svg";
import {ReactComponent as RecipesIcon} from "../images/svg/recipes-icon.svg";
import {ReactComponent as SettingsIcon} from "../images/svg/settings-icon.svg";
import {BackgroundBlur} from "./BackgroundBlur";

export const NavigationMenu = () => {
    const [expandedState, setExpandedState] = useState(false);

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
                        <NavigationMenuLink toPage={"/profile"}>
                            <div className="menu-item">
                                <ProfileIcon/>
                                <p className="menu-item-title">Profile</p>
                            </div>
                        </NavigationMenuLink>
                    </div>
                    <div className="menu-group">
                        <NavigationMenuLink toPage={"/announcements"}>
                            <div className="menu-item">
                                <AnnouncementsIcon/>
                                <p className="menu-item-title">Announcements</p>
                            </div>
                        </NavigationMenuLink>
                        <div className="menu-item">
                            <NotificationsIcon/>
                            <p className="menu-item-title">Notifications</p>
                        </div>
                        <NavigationMenuLink toPage={"/messages"}>
                            <div className="menu-item">
                                <MessagesIcon/>
                                <p className="menu-item-title">Messages</p>
                            </div>
                        </NavigationMenuLink>
                    </div>
                    <div className="menu-group">
                        <NavigationMenuLink toPage={"/tasks"}>
                            <div className="menu-item">
                                <TasksIcon/>
                                <p className="menu-item-title">Tasks</p>
                            </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink toPage={"/calendar"}>
                            <div className="menu-item">
                                <CalendarIcon/>
                                <p className="menu-item-title">Calendar</p>
                            </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink toPage={"/recipes"}>
                            <div className="menu-item">
                                <RecipesIcon/>
                                <p className="menu-item-title">Recipes</p>
                            </div>
                        </NavigationMenuLink>
                    </div>
                    <div className="menu-group">
                        <NavigationMenuLink toPage={"/settings"}>
                            <div className="menu-item">
                                <SettingsIcon/>
                                <p className="menu-item-title">Settings</p>
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
                        <NavigationMenuLink toPage={"/announcements"}>
                            <AnnouncementsIcon/>
                        </NavigationMenuLink>
                        <NavigationMenuLink toPage={"/messages"}>
                            <MessagesIcon/>
                        </NavigationMenuLink>
                        <NavigationMenuLink toPage={"/tasks"}>
                            <TasksIcon/>
                        </NavigationMenuLink>
                        <div>
                            <NotificationsIcon/>
                        </div>
                        <NavigationMenuLink toPage={"/profile"}>
                            <ProfileIcon/>
                        </NavigationMenuLink>
                    </div>
                </div>
            </div>
            <BackgroundBlur blurLayer={2} isActive={expandedState}/>
        </>
    )
}