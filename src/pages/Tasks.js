import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AppContext} from "../App";
import {AnnouncementCard} from "../components/AnnouncementCard";
import {CheckboxFilter} from "../components/CheckboxFilter";
import {ReactComponent as ClockIcon} from "../images/svg/clock-icon.svg";
import {ReactComponent as TimerIcon} from "../images/svg/timer-icon.svg";
import {ReactComponent as BoxIcon} from "../images/svg/box-icon.svg";
import {ReactComponent as CheckIcon} from "../images/svg/check-icon.svg";
import {ReactComponent as PlusIcon} from "../images/svg/plus-icon.svg";
import {ReactComponent as CloseIcon} from "../images/svg/close-icon.svg";

export const Tasks = (props) => {
    const {authInfo} = useContext(AppContext)
    const [filtersAreOpen, setOpenFilters] = useState(false)

    const [filter, setFilter] = useState(authInfo.userRole === "ROLE_PASTRY" ? {
            inProgress: true,
            waiting: false,
            done: false,
            closed: false,
        } :
        {
            inProgress: false,
            waiting: true,
            delivery: false,
            closed: false
        })
    const navigation = useNavigate()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.post(
            authInfo.userRole === "ROLE_PASTRY" ?
                `http://192.168.0.106:8080/api/v1/announcements/tasks/${authInfo.username}` :
                `http://192.168.0.106:8080/api/v1/announcements/clients/${authInfo.username}`,
            filter,
            {
                headers: {
                    "Authorization": authInfo.token
                }
            }
        ).then(value => setTasks(value.data))
    }, [authInfo, filter])

    useEffect(()=>{
        console.log(tasks)
    },[tasks])
    return (
        <div className="orders-wrapper">
            <div className="announcements-top-bar">
                <div className={`announcements-filters-button ${filtersAreOpen ? "non-visible" : ""}`} onClick={() => setOpenFilters(true)}>
                    <div className="announcements-filters-button-chosen-filters">
                        {
                            filter.waiting &&
                            <div className="filters-button-chosen-filter">
                                <ClockIcon/>
                                Очікують відповіді
                            </div>
                        }
                        {
                            filter.inProgress &&
                            <div className="filters-button-chosen-filter">
                                <TimerIcon/>
                                В процесі виконання
                            </div>
                        }
                        {
                            (authInfo.userRole === "ROLE_PASTRY" ? filter.done : filter.delivery) &&
                                <div className="filters-button-chosen-filter">
                                    <BoxIcon/>
                                    Виконані
                                </div>
                        }
                        {
                            filter.closed &&
                            <div className="filters-button-chosen-filter">
                                <CheckIcon/>
                                Закриті
                            </div>
                        }
                    </div>
                </div>
                {
                    <div className={`announcements-filters-wrapper ${filtersAreOpen ? "open" : ""}`}>
                        <div className="announcements-filters-header">
                            <div className="announcements-filters-title">
                                Стан оголошень
                            </div>
                            <div className="icon-button" onClick={() => setOpenFilters(false)}>
                                <CloseIcon/>
                            </div>
                        </div>
                        <div className="announcements-filters-content">
                            <CheckboxFilter nonDisabling={true} name="Очікують відповіді" icon={<ClockIcon/>} id="waiting" filters={filter} setFilter={setFilter}/>
                            <CheckboxFilter nonDisabling={true} name="В процесі виконання" icon={<TimerIcon/>} id="inProgress" filters={filter} setFilter={setFilter}/>
                            <CheckboxFilter nonDisabling={true}
                                            name="Виконані"
                                            icon={<BoxIcon/>}
                                            id={authInfo.userRole === "ROLE_PASTRY" ? "done" : "delivery"}
                                            filters={filter}
                                            setFilter={setFilter}/>
                            <CheckboxFilter nonDisabling={true} name="Закриті" icon={<CheckIcon/>} id="closed" filters={filter} setFilter={setFilter}/>
                            {authInfo.userRole === "ROLE_CLIENT" && <div className={"button"} onClick={() => {
                                navigation("/announcement/new")
                            }}>
                                <PlusIcon/>
                                Нове оголошення
                            </div>}
                        </div>
                    </div>
                }
            </div>
            <div className="announcements-list">
                {/*<div className="orders-list-items">*/}
                {tasks.map((value, index) =>
                    <AnnouncementCard key={index} announcement={value}/>
                )}
                {/*</div>*/}
            </div>
        </div>
    )
}