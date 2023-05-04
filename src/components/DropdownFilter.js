import {ReactComponent as ArrowDownIcon} from "../images/svg/arrow-down-icon.svg";
import {useEffect, useState} from "react";

export const DropdownFilter = (props) => {
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        const filter = document.querySelector(`#dropdown-filter-${props.id}`)
        const toggleOpenState = () => setOpen(!isOpen)
        filter.addEventListener("click", toggleOpenState)
        return () => filter.removeEventListener("click", toggleOpenState)
    }, [isOpen, props.id, props.name])

    return (
        <div id={`dropdown-filter-${props.id}`}
            className={`dropdown-filter ${isOpen ? "open" : ""}`}>
            <div className="dropdown-filter-wrapper">
                <div className="dropdown-filter-icon">
                    {props.icon}
                </div>
                <div className="dropdown-filter-name">
                    {props.name}
                </div>
                <div className={`dropdown-filter-arrow-${isOpen ? "up" : "down"}`}>
                    <ArrowDownIcon classname={"arrow-down"}/>
                </div>
            </div>
            {isOpen && <div></div>}
        </div>
    )
}