import {useContext} from "react";
import {AppContext} from "../App";

export const Message = (props) => {
    const {userInformation} = useContext(AppContext)

    return (
        <div className={`user-and-message-wrapper ${props.type}`}>
            <div className="message-user-picture">
                <img src={props.sender && userInformation.userPicture && URL.createObjectURL(userInformation.userPicture)} alt={""}/>
            </div>
            <div className="message-wrapper">
                <div className="message-content">
                    <div className="message-text">
                        {props.message}
                    </div>
                    <div className="message-time">
                        {props.time}
                    </div>
                </div>
            </div>
        </div>
    )
}