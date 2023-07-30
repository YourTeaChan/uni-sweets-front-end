import {ReactComponent as CakeIcon} from "../images/svg/cake-icon.svg";
import {ReactComponent as HeartIcon} from "../images/svg/heart-icon.svg";
import {ReactComponent as FlashIcon} from "../images/svg/flash-icon.svg";
import {ReactComponent as ClockIcon} from "../images/svg/clock-icon.svg";
import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";
import {NavLink} from "react-router-dom";

export const AnnouncementCard = (props) => {
    return (
        <NavLink to={`/announcement/${props.announcement.id}`}>
            <div className="announcement-card">
                <div className="announcement-card-information">
                    <div className="announcement-card-client-information">
                        <div className="announcement-card-client-information-photo-and-marks">
                            <div className="announcement-card-client-information-user-photo">
                                <img src={props.announcement.creator.userPicture?.pictureURL} alt={""}/>
                            </div>
                            <div className="announcement-card-client-information-marks">
                                {props.announcement.isQuick && <FlashIcon/>}
                                {props.announcement.notifyFavorites && <HeartIcon/>}
                            </div>
                        </div>
                        <div className="announcement-card-client-information-username">
                            {props.announcement.creator.firstName + " " + props.announcement.creator.lastName}
                        </div>
                        <div className="announcement-card-client-information-location">
                            <LocationIcon/>
                            {props.announcement.location.locationName}
                        </div>
                        <div className="announcement-card-client-information-date">
                            <ClockIcon/>
                            {props.announcement.deadline}
                        </div>
                    </div>
                    <div className="announcement-card-div-between">
                        <span className="announcement-card-line-between"></span>
                    </div>
                    <div className="announcement-card-order-information">
                        <div className="announcement-card-order-information-title">
                            {props.announcement.title}
                        </div>
                        <div className="announcement-card-order-information-description">
                            {props.announcement.description}
                        </div>
                        <div className="announcement-card-order-information-dessert-type">
                            <CakeIcon/>
                            #{props.announcement.dessertType.dessertTypeName}
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}