export const CheckboxFilter = (props) => {
    return (
        <div id={`checkbox-filter-${props.id}`} className="checkbox-filter">
            <div className="checkbox-filter-wrapper" onClick={() => {
                if (!props.nonDisabling) {
                    props.filters[props.id] = !props.filters[props.id]
                    props.setFilter({...props.filters})
                } else {
                    Object.keys(props.filters).forEach((key) => {
                        props.filters[key] = false
                    })
                    props.filters[props.id] = true
                    props.setFilter({...props.filters})
                }
            }}>
                <div className="checkbox-filter-icon">
                    {props.icon}
                </div>
                <div className="checkbox-filter-name">
                    {props.name}
                </div>
                <input className={"checkbox"} type="checkbox" checked={props.filters[props.id]?props.filters[props.id]:false} readOnly={true}/>
            </div>
        </div>
    )
}