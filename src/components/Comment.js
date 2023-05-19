import {ReactComponent as StarIcon} from "../images/svg/star-icon.svg";

export const Comment = () => {
    return (
        <div className="comment-wrapper">
            <div className="comment-header">
                <div className="comment-header-user-information">
                    <div className="comment-header-user-picture-wrapper">
                        <div className="comment-header-user-picture"></div>
                    </div>
                    <div className="comment-header-username">
                        Клієнт
                    </div>
                </div>
                <div className="comment-header-rating-and-date">
                    <div className="comment-header-rating">
                        <StarIcon/>
                        5
                    </div>
                    <div className="comment-header-date">
                        09/05/2023
                    </div>
                </div>
            </div>
            <div className="comment-body">
                Текст ... текст ... текст ... текст ... текст ... текст ... текст ... текст ... текст ...
                ... текст ... текст ... текст ... текст ... текст ... текст ... текст ... текст ...
            </div>
        </div>
    )
}