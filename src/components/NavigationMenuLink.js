import {NavLink} from "react-router-dom";

export const NavigationMenuLink = (props) => {
    return (
        <NavLink to={props.toPage} className={props => props.isActive ? "active-page" : ""}>
            {props.children}
        </NavLink>
    )
}