import {useState} from "react";
import {Comment} from "../components/Comment";
import {Dropdown} from "../components/Dropdown";
import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";
import {ReactComponent as HeartIcon} from "../images/svg/heart-icon.svg";
import {ReactComponent as StarIcon} from "../images/svg/star-icon.svg";
import {ReactComponent as InstagramIcon} from "../images/svg/instagram-icon.svg";
import {ReactComponent as FacebookIcon} from "../images/svg/facebook-icon.svg";
import {ReactComponent as YouTubeIcon} from "../images/svg/youtube-icon.svg";
import {ReactComponent as TikTokIcon} from "../images/svg/tiktok-icon.svg";
import {ReactComponent as SortIcon} from "../images/svg/sort-icon.svg";

export const Profile = (props) => {
    const sortingFromDB = ["First new", "First old", "First good", "First bad"]
    const sorting = sortingFromDB.map((value, index) => {
        return {id: index, title: value, checked: false}
    })
    sorting[0].checked = true

    const [commentsVisible, setCommentsVisible] = useState(false)
    const [sort, setSort] = useState({
        sort: [...sorting]
    })

    return (
        <div className="profile-wrapper">
            <div className="profile-content">
                <div className="profile-main-part">
                    <div className="profile-main-part-user">
                        <div className="profile-main-part-user-information">
                            <div className="profile-main-part-user-information-left">
                                <div className="profile-main-part-user-picture-wrapper">
                                    <div className="profile-main-part-user-picture">
                                        {props.userInformation.userPicture && <img src={URL.createObjectURL(props.userInformation.userPicture)} alt={""}/>}
                                    </div>
                                </div>
                                <div className="profile-main-part-user-like-count">
                                    <HeartIcon/> 15
                                </div>
                            </div>
                            <div className="profile-main-part-user-information-right">
                                <div className="profile-main-part-user-name">
                                    Tea Chan
                                </div>
                                <div className="profile-main-part-user-location">
                                    <LocationIcon/> Lviv
                                </div>
                                <div className="profile-main-part-user-socials">
                                    <InstagramIcon/>
                                    <FacebookIcon/>
                                    <YouTubeIcon/>
                                    <TikTokIcon/>
                                </div>
                                <div className="user-rating">
                                    <StarIcon/>
                                    <StarIcon/>
                                    <StarIcon/>
                                    <StarIcon/>
                                    <StarIcon/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-main-part-user-about">
                            About me^^
                            Info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ...
                            info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ... info ...
                        </div>
                    </div>
                    <div className="pictures-comments-lists-switcher-wrapper">
                        <div className={`pictures-comments-lists-switcher ${commentsVisible ? "" : "active"}`} onClick={() => setCommentsVisible(false)}>
                            Pictures
                        </div>
                        <div className={`pictures-comments-lists-switcher ${commentsVisible ? "active" : ""}`} onClick={() => setCommentsVisible(true)}>
                            Comments
                        </div>
                    </div>
                </div>
                <div className="profile-pictures-and-comments-part">
                    <div className={`desserts-pictures-list ${commentsVisible ? "non-visible" : ""}`}>
                        <div className="dessert-picture"></div>
                        <div className="dessert-picture"></div>
                        <div className="dessert-picture"></div>
                        <div className="dessert-picture"></div>
                        <div className="dessert-picture"></div>
                        <div className="dessert-picture"></div>
                        <div className="dessert-picture"></div>
                        <div className="dessert-picture"></div>
                        <div className="dessert-picture"></div>
                    </div>
                    <div className={`profile-comments ${commentsVisible ? "" : "non-visible"}`}>
                        <div className="profile-comments-count-and-sorting">
                            7 comments
                            <Dropdown name="Sort" icon={<SortIcon/>} id="sort" filters={sort} setFilter={setSort} multipleChoice={false}/>
                        </div>
                        <div className="profile-comments-list">
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}