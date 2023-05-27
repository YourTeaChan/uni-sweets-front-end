import {useContext, useEffect, useState} from "react";
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
import {AppContext} from "../App";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";

export const Profile = (props) => {
    const {authInfo} = useContext(AppContext)
    const sortingFromDB = ["Спочатку нові", "Спочатку старі", "Спочатку хороші", "Спочатку погані"]
    const {username} = useParams()
    const [userProfileInfo, setUserProfileInfo] = useState()

    useEffect(() => {
        axios.get(
            `http://192.168.0.106:8080/api/v1/users/${username}`,
            {
                headers: {
                    "Authorization": authInfo.token
                }
            }
        ).then(response => {
            setUserProfileInfo(response.data)
        })
    }, [username])

    const sorting = sortingFromDB.map((value, index) => {
        return {id: index, title: value, checked: false}
    })
    sorting[0].checked = true
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [sort, setSort] = useState([...sorting])

    return (
        <div className="profile-wrapper">
            <div className="profile-content">
                <div className="profile-main-part">
                    <div className="profile-main-part-user">
                        <div className="profile-main-part-user-information">
                            <div className="profile-main-part-user-information-left">
                                <div className="profile-main-part-user-picture-wrapper">
                                    <div className="profile-main-part-user-picture">
                                        {<img src={userProfileInfo?.userPicture?.pictureURL} alt={""}/>}
                                    </div>
                                </div>
                                <div className="profile-main-part-user-like-count">
                                    <HeartIcon/> 15
                                </div>
                            </div>
                            <div className="profile-main-part-user-information-right">
                                <div className="profile-main-part-user-name">
                                    {(userProfileInfo?.firstName || "") + " " + (userProfileInfo?.lastName || "")}
                                </div>
                                <div className="profile-main-part-user-location">
                                    <LocationIcon/> {userProfileInfo?.location?.locationName || "Місто"}
                                </div>
                                {userProfileInfo?.userRole === "ROLE_PASTRY" && <>
                                    <div className="profile-main-part-user-socials">
                                        {userProfileInfo?.instagram && <NavLink to={userProfileInfo.instagram} target="_blank"><InstagramIcon/></NavLink>}
                                        {userProfileInfo?.facebook && <NavLink to={userProfileInfo.facebook} target="_blank"><FacebookIcon/></NavLink>}
                                        {userProfileInfo?.youtube && <NavLink to={userProfileInfo.youtube} target="_blank"><YouTubeIcon/></NavLink>}
                                        {userProfileInfo?.tiktok && <NavLink to={userProfileInfo.tiktok} target="_blank"><TikTokIcon/></NavLink>}
                                    </div>
                                    <div className="user-rating">
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                    </div>
                                </>}
                            </div>
                        </div>
                        <div className="profile-main-part-user-about">
                            {userProfileInfo?.userRole === "ROLE_PASTRY" && userProfileInfo?.about}
                            {/*Текст ... текст ... текст ... текст ... текст ... текст ... текст ... текст ... текст ...*/}
                            {/*текст ... текст ... текст ... текст ... текст ... текст ... текст ... текст ...*/}
                        </div>
                    </div>
                    {userProfileInfo?.userRole === "ROLE_PASTRY" && <div className="pictures-comments-lists-switcher-wrapper">
                        <div className={`pictures-comments-lists-switcher ${commentsVisible ? "" : "active"}`} onClick={() => setCommentsVisible(false)}>
                            Фотографії
                        </div>
                        <div className={`pictures-comments-lists-switcher ${commentsVisible ? "active" : ""}`} onClick={() => setCommentsVisible(true)}>
                            Відгуки
                        </div>
                    </div>}
                </div>
                {userProfileInfo?.userRole === "ROLE_PASTRY" && <div className="profile-pictures-and-comments-part">
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
                            7 відгуків
                            <Dropdown name="Сортування" icon={<SortIcon/>} id="sort" filters={sort} setFilter={setSort} multipleChoice={false}/>
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
                </div>}
            </div>
        </div>
    )
}