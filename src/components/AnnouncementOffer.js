import {NavLink} from "react-router-dom";

export const AnnouncementOffer = (props) => {
    return (
        <div className="announcement-offer" onClick={() => {
            if (props.isSelected) {
                props.setChosenOffer(null)
            } else {
                props.setChosenOffer(props.offer)
            }
        }}>
            <NavLink to={`/profile/${props.userPastry.username}`}>
                <div className="pastry-info">
                    <div className="pastry-picture">
                        <img src={props.userPastry.userPicture?.pictureURL} alt={""}/>
                    </div>
                    <div className="pastry-name">
                        {props.userPastry.firstName + " " + props.userPastry.lastName}
                    </div>
                </div>
            </NavLink>
            <div className="offer-price">
                {props.price} ₴
            </div>
            <input className="checkbox" type="checkbox" checked={props.isSelected} readOnly={true}/>
        </div>
    )
}