import {useContext, useEffect, useState} from "react";
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
import axios from "axios";
import {AppContext} from "../App";

export const Announcements = (props) => {
    const {authInfo, locations, setLocations, date, setDate, dessertTypes, setDessertType, sortingOrder, setSortingOrder} = useContext(AppContext)
    const [filtersAreOpen, setOpenFilters] = useState(false)

    const convertFiltersForDb = (filter, singleValue) => {
        if (singleValue) {
            return filter.filter(filter => filter.checked).map(filter => filter.title)[0]
        }
        return filter.filter(filter => filter.checked).map(filter => filter.title)
    }

    const [filters, setFilters] = useState({
        dessertTypes: convertFiltersForDb(dessertTypes),
        locations: convertFiltersForDb(locations),
        date: convertFiltersForDb(date, true),
        isQuick: false,
        fromFavorites: false,
        sortingOrder: convertFiltersForDb(sortingOrder, true)
    })

    const [announcements, setAnnouncements] = useState([])
    useEffect(() => {
        axios.post(
            `http://192.168.0.106:8080/api/v1/announcements/${authInfo.username}`,
            filters,
            {
                headers: {
                    "Authorization": authInfo.token
                }
            }
        ).then(value => setAnnouncements(value.data))
    }, [filters])


    useEffect(() => {
        setFilters({
            ...filters,
            dessertTypes: convertFiltersForDb(dessertTypes),
            locations: convertFiltersForDb(locations),
            date: convertFiltersForDb(date, true),
            sortingOrder: convertFiltersForDb(sortingOrder, true)
        })
    }, [locations, date, dessertTypes, sortingOrder])


    return (
        <div className="announcements-wrapper">
            <div className="announcements-top-bar">
                <div className={`announcements-filters-button ${filtersAreOpen ? "non-visible" : ""}`} onClick={() => setOpenFilters(true)}>
                    <FilterIcon/>
                    Фільтри
                    <ArrowRightIcon/>
                    <div className="announcements-filters-button-chosen-filters">
                        {filters.dessertTypes.length > 0 && <CakeIcon/>}
                        {filters.locations.length > 0 && <LocationIcon/>}
                        <ClockIcon/>
                        {filters.isQuick && <FlashIcon/>}
                        {filters.fromFavorites && <HeartIcon/>}
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
                        <Dropdown name="Тип десерту" icon={<CakeIcon/>} id="dessertTypes" filters={dessertTypes} setFilter={setDessertType} multipleChoice={true}/>
                        <Dropdown name="Місто" icon={<LocationIcon/>} id="location" filters={locations} setFilter={setLocations} multipleChoice={true}/>
                        <Dropdown name="Дата" icon={<ClockIcon/>} id="date" filters={date} setFilter={setDate} multipleChoice={false}/>
                        <Dropdown name="Сортування" icon={<SortIcon/>} id="sort" filters={sortingOrder} setFilter={setSortingOrder} multipleChoice={false}/>
                        <CheckboxFilter nonDisabling={false} name="Лише термінові" icon={<FlashIcon/>} id="isQuick" filters={filters} setFilter={setFilters}/>
                        <CheckboxFilter nonDisabling={false} name="Лише улюблені" icon={<HeartIcon/>} id="fromFavorites" filters={filters} setFilter={setFilters}/>
                    </div>
                </div>
            </div>
            <div className="announcements-list">
                {announcements.map((value, index) =>
                    <AnnouncementCard key={index} announcement={value}/>
                )}
            </div>
        </div>
    )
}