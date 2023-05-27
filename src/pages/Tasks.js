import {CheckboxFilter} from "../components/CheckboxFilter";
import {ReactComponent as TimerIcon} from "../images/svg/timer-icon.svg";
import {ReactComponent as CheckIcon} from "../images/svg/check-icon.svg";
import {AnnouncementCard} from "../components/AnnouncementCard";

export const Tasks = (props) => {
    const announcements = Array(2).fill("Клієнт")

    return (
        <div className="tasks-wrapper">
            <div className="tasks-top-bar">
                <div className="tasks-filters-wrapper">
                    <CheckboxFilter name="До роботи" icon={<TimerIcon/>} id="todo" filters={props.filters} setFilter={props.setFilter}/>
                    <CheckboxFilter name="Виконані" icon={<CheckIcon/>} id="completed" filters={props.filters} setFilter={props.setFilter}/>
                </div>
            </div>
            <div className="tasks-list">
                <div className="task-list-todo">
                    {announcements.map((value, index) =>
                        <AnnouncementCard key={index} name={value}/>
                    )}
                </div>
                <div className="task-list-completed">
                    {announcements.map((value, index) =>
                        <AnnouncementCard key={index} name={value}/>
                    )}
                </div>
            </div>
        </div>
    )
}