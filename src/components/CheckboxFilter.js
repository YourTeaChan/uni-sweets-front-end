import {useEffect, useState} from "react";

export const CheckboxFilter = (props) => {
    const [isChecked, setCheck] = useState(false)
    useEffect(() => {
        const filter = document.querySelector(`#checkbox-filter-${props.id}`)
        const toggleCheckState = () => setCheck(!isChecked)
        filter.addEventListener("click", toggleCheckState)
        return () => filter.removeEventListener("click", toggleCheckState)
    }, [isChecked, props.id, props.name])

    return (
        <div id={`checkbox-filter-${props.id}`} className="checkbox-filter">
            <div className="checkbox-filter-wrapper">
                <div className="checkbox-filter-icon">
                    {props.icon}
                </div>
                <div className="checkbox-filter-name">
                    {props.name}
                </div>
                <input className={"checkbox"} type="checkbox" checked={isChecked}>
                </input>
            </div>
        </div>
    )
}