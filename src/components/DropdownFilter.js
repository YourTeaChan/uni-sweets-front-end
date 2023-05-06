import {ReactComponent as ArrowDownIcon} from "../images/svg/arrow-down-icon.svg";
import {useEffect, useState} from "react";

export const DropdownFilter = (props) => {
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        const filterHeader = document.querySelector(`#dropdown-filter-header-${props.id}`)
        const filter = document.querySelector(`#dropdown-filter-${props.id}`)
        const closeFilter = (event) => {
            if (!filter.contains(event.target) && !filterHeader.contains(event.target)) {
                setOpen(false)
            }
        }
        document.body.addEventListener("click", closeFilter)
        return () => document.body.removeEventListener("click", closeFilter)
    }, [isOpen, props.id])

    return (
        <div id={`dropdown-filter-${props.id}`}
             className={`dropdown-filter ${isOpen ? "open" : ""}`}>
            <div className="dropdown-filter-header"
                 id={`dropdown-filter-header-${props.id}`}
                 onClick={() => setOpen(!isOpen)}>
                <div className="dropdown-filter-icon">
                    {props.icon}
                </div>
                <div className="dropdown-filter-name">
                    {props.name}
                </div>
                <div className={`dropdown-filter-arrow-${isOpen ? "up" : "down"}`}>
                    <ArrowDownIcon className={"arrow-down"}/>
                </div>
            </div>
            {
                <div className={`dropdown-filter-content ${isOpen ? "open" : ""}`}>
                    {props.filters[props.id].map((value, index, array) =>
                        <div key={index} className="dropdown-filter-content-item" onClick={() => {
                            if (props.multipleChoice) {
                                value.checked = !value.checked
                            } else {
                                array.forEach((value_, index_) => {
                                    value_.checked = index_ === index;
                                })
                            }
                            props.setFilter({...props.filters})
                        }}>
                            <input className="checkbox" checked={value.checked} type="checkbox" readOnly={true}/>
                            {value.title}
                        </div>
                    )}
                </div>}
        </div>
    )
}