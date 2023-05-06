export const CheckboxFilter = (props) => {
    return (
        <div id={`checkbox-filter-${props.id}`} className="checkbox-filter">
            <div className="checkbox-filter-wrapper" onClick={() => {
                props.filters[props.id] = !props.filters[props.id]
                props.setFilter({...props.filters})
            }}>
                <div className="checkbox-filter-icon">
                    {props.icon}
                </div>
                <div className="checkbox-filter-name">
                    {props.name}
                </div>
                <input className={"checkbox"} type="checkbox" checked={props.filters[props.id]} readOnly={true}/>
            </div>
        </div>
    )
}