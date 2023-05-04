import {AnnouncementCard} from "../components/AnnouncementCard";
import {DropdownFilter} from "../components/DropdownFilter";
import {ReactComponent as CakeIcon} from "../images/svg/cake-icon.svg";
import {ReactComponent as HeartIcon} from "../images/svg/heart-icon.svg";
import {ReactComponent as FlashIcon} from "../images/svg/flash-icon.svg";
import {ReactComponent as ClockIcon} from "../images/svg/clock-icon.svg";
import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";
import {CheckboxFilter} from "../components/CheckboxFilter";

export const Announcements = () => {
    const announcements = Array(30).fill("User name")

    return (
        <div className="announcements-wrapper">
            <div className="announcements-top-bar">
                {/*<button onClick={()=>props.setTheme("green")}>GREEN</button>*/}
                {/*<button onClick={()=>props.setTheme("blue")}>BLUE</button>*/}
                {/*<button onClick={()=>props.setTheme("purple")}>PURPLE</button>*/}
                {/*<button onClick={()=>props.setTheme("pink")}>PINK</button>*/}
                {/*<button onClick={()=>props.setTheme("orange")}>ORANGE</button>*/}
                {/*<button onClick={()=>props.setTheme("yellow")}>YELLOW</button>*/}
                <div className="announcements-filters-wrapper">
                    <DropdownFilter name="Dessert type" icon={<CakeIcon/>} id="dessert"/>
                    <DropdownFilter name="Location" icon={<LocationIcon/>} id="location"/>
                    <DropdownFilter name="Date" icon={<ClockIcon/>} id="date"/>
                    <CheckboxFilter name="Only quick order" icon={<FlashIcon/>} id="quick"/>
                    <CheckboxFilter name="Only favorites" icon={<HeartIcon/>} id="favorite"/>
                </div>
            </div>
            <div className="announcements-list">
                {announcements.map((value, index) =>
                    <AnnouncementCard key={index} name={value}/>
                )}
            </div>
        </div>
    )
}