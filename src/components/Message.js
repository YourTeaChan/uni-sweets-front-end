export const Message = (props) => {
    return (
        <div className={`user-and-message-wrapper ${props.type}`}>
            <div className="message-user-picture"></div>
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