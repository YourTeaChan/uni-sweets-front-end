import {useState} from "react";
import {AnnouncementCard} from "../components/AnnouncementCard";
import {Dropdown} from "../components/Dropdown";
import {CheckboxFilter} from "../components/CheckboxFilter";
import {ReactComponent as ArrowRightIcon} from "../images/svg/arrow-right-icon.svg";
import {ReactComponent as FilterIcon} from "../images/svg/filter-icon.svg";
import {ReactComponent as CloseIcon} from "../images/svg/close-icon.svg";
import {ReactComponent as CakeIcon} from "../images/svg/cake-icon.svg";
import {ReactComponent as HeartIcon} from "../images/svg/heart-icon.svg";
import {ReactComponent as FlashIcon} from "../images/svg/flash-icon.svg";
import {ReactComponent as ClockIcon} from "../images/svg/clock-icon.svg";
import {ReactComponent as SortIcon} from "../images/svg/sort-icon.svg";
import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";

export const Announcements = (props) => {
    const announcements = Array(30).fill("Клієнт")

    const [filtersAreOpen, setOpenFilters] = useState(false)

    return (
        <div className="announcements-wrapper">
            <div className="announcements-top-bar">
                <div className={`announcements-filters-button ${filtersAreOpen ? "non-visible" : ""}`} onClick={() => setOpenFilters(true)}>
                    <FilterIcon/>
                    Фільтри
                    <ArrowRightIcon/>
                    <div className="announcements-filters-button-chosen-filters">
                        <CakeIcon/>
                        <LocationIcon/>
                        <ClockIcon/>
                        <FlashIcon/>
                        <HeartIcon/>
                    </div>
                </div>
                <div className={`announcements-filters-wrapper ${filtersAreOpen ? "open" : ""}`}>
                    <div className="announcements-filters-header">
                        <div className="announcements-filters-title">
                            Фільтри
                        </div>
                        <div className="icon-button" onClick={() => setOpenFilters(false)}>
                            <CloseIcon/>
                        </div>
                    </div>
                    <div className="announcements-filters-content">
                        <Dropdown name="Тип десерту" icon={<CakeIcon/>} id="dessert" filters={props.filters} setFilter={props.setFilter} multipleChoice={true}/>
                        <Dropdown name="Місто" icon={<LocationIcon/>} id="location" filters={props.filters} setFilter={props.setFilter} multipleChoice={true}/>
                        <Dropdown name="Дата" icon={<ClockIcon/>} id="date" filters={props.filters} setFilter={props.setFilter} multipleChoice={false}/>
                        <Dropdown name="Сортування" icon={<SortIcon/>} id="sort" filters={props.filters} setFilter={props.setFilter} multipleChoice={false}/>
                        <CheckboxFilter name="Лише термінові" icon={<FlashIcon/>} id="quick" filters={props.filters} setFilter={props.setFilter}/>
                        <CheckboxFilter name="Лише улюблені" icon={<HeartIcon/>} id="favorites" filters={props.filters} setFilter={props.setFilter}/>
                    </div>
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