import {ReactComponent as CakeIcon} from "../images/svg/cake-icon.svg";
import {ReactComponent as HeartIcon} from "../images/svg/heart-icon.svg";
import {ReactComponent as FlashIcon} from "../images/svg/flash-icon.svg";
import {ReactComponent as ClockIcon} from "../images/svg/clock-icon.svg";
import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";

export const AnnouncementCard = (props) => {
    return (
        <div className="announcement-card">
            <div className="announcement-card-information">
                <div className="announcement-card-client-information">
                    <div className="announcement-card-client-information-photo-and-marks">
                        <div className="announcement-card-client-information-user-photo"></div>
                        <div className="announcement-card-client-information-marks">
                            <FlashIcon/>
                            <HeartIcon/>
                        </div>
                    </div>
                    <div className="announcement-card-client-information-username">
                        {props.name}
                    </div>
                    <div className="announcement-card-client-information-location">
                        <LocationIcon/>
                        City
                    </div>
                    <div className="announcement-card-client-information-date">
                        <ClockIcon/>
                        14/02/2023
                    </div>
                </div>
                <div className="announcement-card-div-between">
                    <span className="announcement-card-line-between"></span>
                </div>
                <div className="announcement-card-order-information">
                    <div className="announcement-card-order-information-title">
                        Title Title Title Title Title Title Title Title Title
                    </div>
                    <div className="announcement-card-order-information-description">
                        Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description
                    </div>
                    <div className="announcement-card-order-information-dessert-type">
                        <CakeIcon/>
                        #cake #cupcake #cookie
                    </div>
                </div>
            </div>
        </div>
    )
}