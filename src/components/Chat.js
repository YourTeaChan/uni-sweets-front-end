import {useContext} from "react";
import {AppContext} from "../App";
import {useNavigate, useParams} from "react-router-dom";

export const Chat = (props) => {
    const {username} = useParams()
    const navigation = useNavigate()
    const {userInformation} = useContext(AppContext)
    const interlocutor = props.chat.firstUser.username === userInformation.username ? props.chat.secondUser : props.chat.firstUser;
    const messageTime = new Date(props.chat.time)
    const currentTime = Date.now()
    const daysBetween = Math.round((currentTime - messageTime) / (1000 * 60 * 60 * 24));

    return (
        <>
            <div className={`chat-wrapper ${username === interlocutor.username ? "active" : ""}`} onClick={() => {
                if (username === interlocutor.username) {
                    navigation("/messages")
                } else {
                    navigation(`/messages/${interlocutor.username}`)
                }
            }}>
                <div className="chat-content">
                    <div className="chat-user-picture-wrapper">
                        <div className="chat-user-picture">
                            {interlocutor?.userPicture && <img src={interlocutor?.userPicture?.pictureURL} alt={""}/>}
                        </div>
                    </div>
                    <div className="chat-username-and-text">
                        <div className="chat-username">
                            {interlocutor.firstName + " " + interlocutor.lastName}
                        </div>
                        <div className="chat-text">
                            {props.chat.messages[props.chat.messages.length - 1]?.text}
                        </div>
                    </div>
                    <div className="chat-time-and-new-messages-sign">
                        <div className="chat-time">
                            {daysBetween > 0 ? messageTime.toLocaleDateString() : messageTime.toLocaleTimeString()}
                        </div>
                        <div className="chat-new-messages-sign-wrapper">
                            <div className="chat-new-messages-sign"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}