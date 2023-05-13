export const Chat = (props) => {
    return (
        <>
            <div className="chat-wrapper" onClick={() => {
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
                    <div className="chat-time-and-messages-count">
                        <div className="chat-time">
                            {props.chat.messages[props.chat.messages.length - 1].messageTime}
                        </div>
                        <div className="chat-messages-count-wrapper">
                            <div className="chat-messages-count">
                                2
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}