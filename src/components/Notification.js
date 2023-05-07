export const Notification = (props) => {
    return (
        <div className="notification-group-item">
            <div className="notification-item-content">
                <div className="notification-item-user-info">
                    <div className="notification-item-user-info-pic"></div>
                </div>
                <div className="notification-item-text">{props.comment}</div>
            </div>
        </div>
    )
}