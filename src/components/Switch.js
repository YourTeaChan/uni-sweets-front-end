export const Switch = (props) => {
    return (
        <div className={`switch ${props.roleIsPastry ? "is-pastry" : ""}`} onClick={() => props.setRolePastry(!props.roleIsPastry)}>
            <div className="switch-label">Клієнт</div>
            <div className="switch-label">Кондитер</div>
            <div className="slider"/>
        </div>
    )
}
