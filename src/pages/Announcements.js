import {AnnouncementCard} from "../components/AnnouncementCard";
import {DropdownFilter} from "../components/DropdownFilter";
import {CheckboxFilter} from "../components/CheckboxFilter";
import {ReactComponent as ArrowRightIcon} from "../images/svg/arrow-right-icon.svg";
import {ReactComponent as FilterIcon} from "../images/svg/filter-icon.svg";
import {ReactComponent as CakeIcon} from "../images/svg/cake-icon.svg";
import {ReactComponent as HeartIcon} from "../images/svg/heart-icon.svg";
import {ReactComponent as FlashIcon} from "../images/svg/flash-icon.svg";
import {ReactComponent as ClockIcon} from "../images/svg/clock-icon.svg";
import {ReactComponent as SortIcon} from "../images/svg/sort-icon.svg";
import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";

export const Announcements = (props) => {
    const announcements = Array(30).fill("User name")

    return (
        <div className="announcements-wrapper">
            <div className="announcements-top-bar">
                <div className="announcements-filters-button">
                    <FilterIcon/>
                    Filters
                    <ArrowRightIcon/>
                    <div className="announcements-filters-button-chosen-filters">
                        <CakeIcon/>
                        <LocationIcon/>
                        <ClockIcon/>
                        <FlashIcon/>
                        <HeartIcon/>
                    </div>
                </div>
                <div className="announcements-filters-wrapper">
                    <DropdownFilter name="Dessert type" icon={<CakeIcon/>} id="dessert" filters={props.filters} setFilter={props.setFilter} multipleChoice={true}/>
                    <DropdownFilter name="Location" icon={<LocationIcon/>} id="location" filters={props.filters} setFilter={props.setFilter} multipleChoice={true}/>
                    <DropdownFilter name="Date" icon={<ClockIcon/>} id="date" filters={props.filters} setFilter={props.setFilter} multipleChoice={false}/>
                    <DropdownFilter name="Sort" icon={<SortIcon/>} id="sort" filters={props.filters} setFilter={props.setFilter} multipleChoice={false}/>
                    <CheckboxFilter name="Only quick order" icon={<FlashIcon/>} id="quick" filters={props.filters} setFilter={props.setFilter}/>
                    <CheckboxFilter name="Only favorites" icon={<HeartIcon/>} id="favorites" filters={props.filters} setFilter={props.setFilter}/>
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