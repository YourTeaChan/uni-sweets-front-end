import {useContext, useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AppContext} from "../App";
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
import {ReactComponent as GalleryAddIcon} from "../images/svg/gallery-add-icon.svg";
import {ReactComponent as GalleryRemoveIcon} from "../images/svg/gallery-remove-icon.svg";
import {ReactComponent as GalleryIcon} from "../images/svg/gallery-icon.svg";
import {ReactComponent as CommentIcon} from "../images/svg/comment-icon.svg";
import {ReactComponent as MessageIcon} from "../images/svg/messages-icon.svg";
import {ReactComponent as CheckIcon} from "../images/svg/check-icon.svg";
import FileResizer from "react-image-file-resizer";
import {Rating} from "../components/Rating";

export const Profile = (props) => {
    const {authInfo} = useContext(AppContext)
    const sortingFromDB = ["Спочатку нові", "Спочатку старі", "Спочатку хороші", "Спочатку погані"]
    const [selectedSorting, setSelectedSorting] = useState(null)
    const {username} = useParams()
    const [userProfileInfo, setUserProfileInfo] = useState()
    const [imageFile, setImageFile] = useState()
    const [userPictures, setUserPictures] = useState([])
    const [userComments, setUserComments] = useState([])
    const [totalClosedAnnouncements, setTotalClosedAnnouncements] = useState(null)
    const [likedByList, setLikedBy] = useState([])
    const [userFavorites, setUserFavorites] = useState([])
    const navigate = useNavigate()
    const [liked, setLiked] = useState(false)
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
            setUserPictures(response.data.pictures)
            setUserComments(response.data.comments)
            axios.get(`http://192.168.0.106:8080/api/v1/announcements/${response.data.userRole === "ROLE_PASTRY" ? "pastries" : "clients"}/closed/${response.data.username}`
            ).then(r => setTotalClosedAnnouncements(r.data))
            response.data.userRole === "ROLE_PASTRY" &&
            axios.get(`http://192.168.0.106:8080/api/v1/users/pastries/${response.data.username}/likedBy`).then(response => setLikedBy(response.data))
            response.data.userRole === "ROLE_CLIENT" &&
            axios.get(`http://192.168.0.106:8080/api/v1/users/clients/${response.data.username}/liked`).then(response => setUserFavorites(response.data))
        })
    }, [username])

    useEffect(() => {
        if (userProfileInfo?.userRole === "ROLE_PASTRY" && authInfo.userRole === "ROLE_CLIENT") {
            const likedList = likedByList.filter(value => value.username === authInfo.username)
            if (likedList.length > 0) {
                setLiked(true)
            }

        }
    }, [userProfileInfo, likedByList])


    const sorting = sortingFromDB.map((value, index) => {
        return {id: index, title: value, checked: false}
    })
    sorting[0].checked = true
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [sort, setSort] = useState([...sorting])
    useEffect(() => {
        setSelectedSorting(sort.filter(value => value.checked)[0])
    }, [sort])

    useEffect(() => {
        if (selectedSorting && userComments?.length > 0) {
            userComments.sort((c1, c2) => {
                if (selectedSorting.title === "Спочатку нові") {
                    return new Date(c2.time) - new Date(c1.time)
                }
                if (selectedSorting.title === "Спочатку старі") {
                    return new Date(c1.time) - new Date(c2.time)
                }
                if (selectedSorting.title === "Спочатку хороші") {
                    return c2.rating - c1.rating
                }
                return c1.rating - c2.rating
            })
            setUserComments([...userComments])
        }
    }, [selectedSorting, commentsVisible])
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
                                    <div><CheckIcon/></div>
                                    {totalClosedAnnouncements}
                                    {userProfileInfo?.userRole === "ROLE_PASTRY" &&
                                        <div className={`like-icon ${liked ? "liked" : ""}`} onClick={() => {
                                            if (authInfo.userRole !== "ROLE_PASTRY") {
                                                setLiked(!liked)
                                                axios.post(
                                                    `http://192.168.0.106:8080/api/v1/users/clients/${authInfo.username}/liked/${userProfileInfo.username}`,
                                                    {},
                                                    {
                                                        headers: {
                                                            "Authorization": authInfo.token
                                                        }
                                                    }
                                                ).then(value => {
                                                    setLikedBy(value.data)
                                                })
                                            }
                                        }}>
                                            <HeartIcon/>
                                        </div>}
                                    {userProfileInfo?.userRole === "ROLE_PASTRY" && likedByList?.length}
                                </div>
                            </div>
                            <div className="profile-main-part-user-information-right">
                                <div className="profile-main-part-user-name">
                                    {(userProfileInfo?.firstName || "") + " " + (userProfileInfo?.lastName || "")}
                                </div>
                                <div className="profile-main-part-user-location">
                                    <LocationIcon/> {userProfileInfo?.location?.locationName || "Місто"}
                                </div>
                                {<>
                                    <div className="profile-main-part-user-socials">
                                        {userProfileInfo?.instagram && <NavLink to={userProfileInfo.instagram} target="_blank"><InstagramIcon/></NavLink>}
                                        {userProfileInfo?.facebook && <NavLink to={userProfileInfo.facebook} target="_blank"><FacebookIcon/></NavLink>}
                                        {userProfileInfo?.youtube && <NavLink to={userProfileInfo.youtube} target="_blank"><YouTubeIcon/></NavLink>}
                                        {userProfileInfo?.tiktok && <NavLink to={userProfileInfo.tiktok} target="_blank"><TikTokIcon/></NavLink>}
                                    </div>
                                    {
                                        <div className="general-rating">
                                            {userProfileInfo?.userRole === "ROLE_PASTRY" &&
                                                <Rating value={userProfileInfo?.rating}/>}
                                        </div>
                                    }
                                </>}
                            </div>
                        </div>
                        {
                            userProfileInfo?.userRole === "ROLE_PASTRY" &&
                            <div className="profile-main-part-user-about">
                                {userProfileInfo?.about}
                            </div>
                        }
                    </div>
                    {authInfo.username !== userProfileInfo?.username &&
                        <div className="profile-buttons-wrapper">
                            <div className="button" onClick={() => {
                                navigate(`/messages/${userProfileInfo.username}`)
                            }}>
                                <MessageIcon/>
                                Написати
                            </div>
                        </div>}
                    {userProfileInfo?.userRole === "ROLE_PASTRY" && <div className="pictures-comments-lists-switcher-wrapper">
                        <div className={`pictures-comments-lists-switcher ${commentsVisible ? "" : "active"}`} onClick={() => setCommentsVisible(false)}>
                            <GalleryIcon/>
                            Фотографії
                        </div>
                        <div className={`pictures-comments-lists-switcher ${commentsVisible ? "active" : ""}`} onClick={() => setCommentsVisible(true)}>
                            <CommentIcon/>
                            Відгуки
                        </div>
                    </div>}
                    {userProfileInfo?.userRole === "ROLE_CLIENT" &&
                        <>
                            {userFavorites.length > 0 ?
                                <div className="favorites_title">Список вподобаних кондитерів</div> :
                                <div className="favorites_title">Список вподобаних кондитерів порожній</div>
                            }
                            <div className="favorites-list">
                                {userFavorites.map((favorite, i) =>
                                    <NavLink to={`/profile/${favorite.username}`}>
                                        <div className={"favorite-card"} key={i}>
                                            <div className="favorite-user-pic">
                                                <img src={favorite.userPicture?.pictureURL} alt={""}/>
                                            </div>
                                            <div className="favorite-user-name">
                                                {`${favorite.firstName} ${favorite.lastName}`}
                                            </div>
                                        </div>
                                    </NavLink>
                                )}
                            </div>
                        </>
                    }
                </div>
                {userProfileInfo?.userRole === "ROLE_PASTRY" &&
                    <div className="profile-pictures-and-comments-part">
                        <div className={`desserts-pictures-list ${commentsVisible ? "non-visible" : ""}`}>
                            {authInfo.username === userProfileInfo?.username &&
                                <div className="dessert-picture add-new">
                                    <div className="icon-button" onClick={() => {
                                        document.getElementById("desserts-image-input").click()
                                    }}>
                                        <GalleryAddIcon/>
                                        <input id="desserts-image-input" className="image-input" type="file" onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                FileResizer.imageFileResizer(
                                                    e.target.files[0],
                                                    720,
                                                    720,
                                                    "jpg",
                                                    100,
                                                    0,
                                                    (value) => {
                                                        const formData = new FormData()
                                                        formData.append("image", value)
                                                        axios.post("http://192.168.0.106:8080/api/v1/content", formData, {
                                                            headers: {
                                                                "Content-Type": "multipart/form-data",
                                                            },
                                                        }).then(response => {
                                                            axios.post(
                                                                `http://192.168.0.106:8080/api/v1/users/pastries/${username}/pictures`,
                                                                response.data,
                                                                {
                                                                    headers: {
                                                                        "Authorization": authInfo.token
                                                                    }
                                                                }
                                                            ).then(response => {
                                                                setUserPictures(response.data)
                                                            })
                                                        })
                                                    },
                                                    "file"
                                                )
                                            }
                                        }}/>
                                    </div>
                                </div>}
                            {
                                userPictures.map((value, index) =>
                                    <div key={index} className="dessert-picture">
                                        {userProfileInfo?.username === authInfo.username && <div className="icon-button" onClick={() => {
                                            axios.delete(
                                                `http://192.168.0.106:8080/api/v1/users/pastries/${username}/pictures/${value.pictureId}`,
                                                {
                                                    headers: {
                                                        "Authorization": authInfo.token
                                                    }
                                                }
                                            ).then(response => {
                                                setUserPictures(response.data)
                                            })
                                        }}>
                                            <GalleryRemoveIcon/>
                                        </div>}
                                        <img src={value.pictureURL} alt={""}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className={`profile-comments ${commentsVisible ? "" : "non-visible"}`}>
                            <div className="profile-comments-count-and-sorting">
                                {userComments.length} відгук (ів)
                                <Dropdown defaultName={"Сортування"} name={selectedSorting.title} icon={<SortIcon/>} id="sort" filters={sort} setFilter={setSort} multipleChoice={false}/>
                            </div>
                            <div className="profile-comments-list">
                                {
                                    userComments.map((value, index) => <Comment key={index} comment={value}/>)
                                }
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}