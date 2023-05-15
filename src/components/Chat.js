export const Chat = (props) => {
    return (
        <>
            <div className={`chat-wrapper ${props.activeChat === props.chat ? "active" : ""}`} onClick={() => {
                if (props.activeChat === props.chat) {
                    props.setActiveChat(null)
                } else {
                    props.setActiveChat(props.chat)
                }
            }}>
                <div className="chat-content">
                    <div className="chat-user-picture-wrapper">
                        <div className="chat-user-picture"></div>
                    </div>
                    <div className="chat-username-and-text">
                        <div className="chat-username">
                            {props.chat.username}
                        </div>
                        <div className="chat-text">
                            {props.chat.messages[props.chat.messages.length - 1].messageContent}
                        </div>
                    </div>
                    <div className="chat-time-and-new-messages-sign">
                        <div className="chat-time">
                            {props.chat.messages[props.chat.messages.length - 1].messageTime}
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