import {ReactComponent as StarIcon} from "../images/svg/star-icon.svg";
import {NavLink} from "react-router-dom";

export const Comment = (props) => {
    return (
        <div className="comment-wrapper">
            <div className="comment-header">
                <NavLink to={`/profile/${props.comment?.sender.username}`}>
                    <div className="comment-header-user-information">
                        <div className="comment-header-user-picture-wrapper">
                            <div className="comment-header-user-picture">
                                <img src={props.comment?.sender.userPicture?.pictureURL} alt={""}/>
                            </div>
                        </div>
                        <div className="comment-header-username">
                            {`${props.comment?.sender.firstName} ${props.comment?.sender.lastName}`}
                        </div>
                    </div>
                </NavLink>
                <div className="comment-header-rating-and-date">
                    <div className="comment-header-rating">
                        <StarIcon/>
                        {props.comment?.rating}
                    </div>
                    <div className="comment-header-date">
                        {new Date(props.comment?.time).toLocaleDateString()}
                    </div>
                </div>
            </div>
            {props.comment?.text.length > 0 && <div className="comment-body">
                {props.comment?.text}
            </div>}
        </div>
    )
}