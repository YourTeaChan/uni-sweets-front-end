import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AppContext} from "../App";
import {Dropdown} from "../components/Dropdown";
import {CheckboxFilter} from "../components/CheckboxFilter";
import {ReactComponent as ClockIcon} from "../images/svg/clock-icon.svg";
import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";
import {ReactComponent as CakeIcon} from "../images/svg/cake-icon.svg";
import {ReactComponent as FlashIcon} from "../images/svg/flash-icon.svg";
import {ReactComponent as HeartIcon} from "../images/svg/heart-icon.svg";
import {ReactComponent as CheckIcon} from "../images/svg/check-icon.svg";
import {ReactComponent as PrevIcon} from "../images/svg/prev-icon.svg";
import {ReactComponent as NextIcon} from "../images/svg/next-icon.svg";
import {ReactComponent as GalleryAddIcon} from "../images/svg/gallery-add-icon.svg";
import FileResizer from "react-image-file-resizer";
import {ReactComponent as GalleryRemoveIcon} from "../images/svg/gallery-remove-icon.svg";

export const NewAnnouncement = () => {
    const {userInformation, authInfo} = useContext(AppContext)
    const [locations, setLocations] = useState([])
    const [dessertTypes, setDessertTypes] = useState([])
    const [announcementInfo, setAnnouncementInfo] = useState({})
    const [isQuick, setIsQuick] = useState(false)
    const [notifyFavorites, setNotifyFavorites] = useState(false)
    const titleInput = useRef()
    const descriptionInput = useRef()
    const deadlineInput = useRef()
    const navigation = useNavigate()
    const [announcementPictures, setAnnouncementPictures] = useState([])
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0)

    const createFiltersFromDB = (filters, fieldName) => {
        console.log(userInformation);
        return filters.map((value, index) => {
            return {id: index, title: fieldName ? value[fieldName] : value, checked: fieldName === "locationName" && userInformation?.location.locationName === value[fieldName]}
        })
    }

    useEffect(() => {
        axios.get("http://192.168.0.106:8080/api/v1/locations").then(value => {
            setLocations(createFiltersFromDB(value.data, "locationName"))
        })

        axios.get("http://192.168.0.106:8080/api/v1/dessert-types").then(value => {
            setDessertTypes(createFiltersFromDB(value.data, "dessertTypeName"))
        })
    }, [authInfo])


    useEffect(() => {
        setAnnouncementInfo({
            location: locations.filter(location => location.checked)[0]?.title,
            dessertType: dessertTypes.filter(dessertType => dessertType.checked)[0]?.title,
            isQuick: isQuick,
            notifyFavorites: notifyFavorites
        })

    }, [locations, dessertTypes])


    const handlePictureIndexChange = (delta) => {
        if (currentPictureIndex + delta >= 0 && currentPictureIndex + delta < announcementPictures.length + 1) {
            setCurrentPictureIndex(currentPictureIndex + delta)
        }
    }

    return (
        <div className={"new-announcement-wrapper"}>
            <div className="new-announcement-info">
                <div className="new-announcement-info-left">
                    <div className="new-announcement-deadline">
                        Вкажіть дату дедлайну
                        <div className="new-announcement-deadline-input">
                            <ClockIcon/>
                            <input ref={deadlineInput} className={"input"} type={"date"} min={new Date(Date.now()).toLocaleDateString().split(".").reverse().join("-")}/>
                        </div>
                    </div>
                    <div className="new-announcement-location">
                        Оберіть ваше місто
                        <Dropdown defaultName={"Місто"} name={announcementInfo?.location} icon={<LocationIcon/>} id="location" filters={locations} setFilter={setLocations}
                                  multipleChoice={false}/>
                    </div>
                    <div className="new-announcement-dessert-type">
                        Оберіть тип десерту
                        <Dropdown defaultName={"Тип десерту"} name={announcementInfo?.dessertType} icon={<CakeIcon/>} id="dessertType" filters={dessertTypes}
                                  setFilter={setDessertTypes}
                                  multipleChoice={false}/>
                    </div>
                    <div className="new-announcement-is-quick">
                        Терміновість
                        <CheckboxFilter nonDisabling={false} name="Терміновість оголошення" icon={<FlashIcon/>} id="isQuick" filters={announcementInfo}
                                        setFilter={setAnnouncementInfo}/>
                    </div>
                    <div className="new-announcement-notify-favorites">
                        Оповістити улюблених кондитерів
                        <CheckboxFilter nonDisabling={false} name="Оповіщення кондитерів" icon={<HeartIcon/>} id="notifyFavorites" filters={announcementInfo}
                                        setFilter={setAnnouncementInfo}/>
                    </div>
                </div>
                <div className="new-announcement-info-center">
                    <div className="new-announcement-info-title">
                        Назва оголошення
                        <textarea ref={titleInput} className={"text-area new-announcement-info-title-input"} placeholder={"Назва оголошення..."}/>
                    </div>
                    <div className="new-announcement-info-description">
                        Опис оголошення
                        <textarea ref={descriptionInput} className={"text-area new-announcement-info-description-input"} placeholder={"Кілька слів про оголошення..."}/>
                    </div>
                </div>
                <div className="new-announcement-info-pictures-wrapper default">
                    <div className={`icon-button ${announcementPictures.length > 0 ? "" : "non-visible"}`} onClick={() => handlePictureIndexChange(-1)}>
                        <PrevIcon/>
                    </div>
                    <div className="new-announcement-info-pictures">
                        {[
                            ...announcementPictures.map((value, index) =>
                                <div key={index} className={"dessert-picture"}>
                                    <div className="icon-button" onClick={() => {
                                        axios.delete(
                                            `http://192.168.0.106:8080/api/v1/content/${value.pictureName}`,
                                            {
                                                headers: {
                                                    "Authorization": authInfo.token
                                                }
                                            }
                                        ).then(_ => {
                                            announcementPictures.splice(index, 1)
                                            setAnnouncementPictures([...announcementPictures])
                                            setCurrentPictureIndex(currentPictureIndex)
                                        })
                                    }}>
                                        <GalleryRemoveIcon/>
                                    </div>
                                    <img src={value.pictureURL} alt={""}/>
                                </div>
                            ),
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
                                                        setAnnouncementPictures([...announcementPictures, response.data])
                                                        setCurrentPictureIndex([...announcementPictures, response.data].length - 1)
                                                    })
                                                },
                                                "file"
                                            )
                                        }
                                    }}/>
                                </div>
                            </div>
                        ][currentPictureIndex]}
                    </div>
                    <div className={`icon-button ${announcementPictures.length > 0 ? "" : "non-visible"}`} onClick={() => handlePictureIndexChange(1)}>
                        <NextIcon/>
                    </div>
                </div>
                <div className="new-announcement-info-pictures-wrapper adaptive">
                    <div className="new-announcement-info-pictures">
                        {[
                            ...announcementPictures.map((value, index) =>
                                <div key={index} className={"dessert-picture"}>
                                    <div className="icon-button" onClick={() => {
                                        axios.delete(
                                            `http://192.168.0.106:8080/api/v1/content/${value.pictureName}`,
                                            {
                                                headers: {
                                                    "Authorization": authInfo.token
                                                }
                                            }
                                        ).then(_ => {
                                            announcementPictures.splice(index, 1)
                                            setAnnouncementPictures([...announcementPictures])
                                            setCurrentPictureIndex(currentPictureIndex)
                                        })
                                    }}>
                                        <GalleryRemoveIcon/>
                                    </div>
                                    <img src={value.pictureURL} alt={""}/>
                                </div>
                            ),
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
                                                        setAnnouncementPictures([...announcementPictures, response.data])
                                                        setCurrentPictureIndex([...announcementPictures, response.data].length - 1)
                                                    })
                                                },
                                                "file"
                                            )
                                        }
                                    }}/>
                                </div>
                            </div>
                        ][currentPictureIndex]}
                    </div>
                    <div className={"new-announcement-info-pictures-buttons"}>
                        <div className={`icon-button ${announcementPictures.length > 0 ? "" : "non-visible"}`} onClick={() => handlePictureIndexChange(-1)}>
                            <PrevIcon/>
                        </div>
                        <div className={`icon-button ${announcementPictures.length > 0 ? "" : "non-visible"}`} onClick={() => handlePictureIndexChange(1)}>
                            <NextIcon/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"button"} onClick={() => {
                axios.post(
                    "http://192.168.0.106:8080/api/v1/announcements",
                    {
                        ...announcementInfo,
                        creatorUsername: authInfo.username,
                        title: titleInput.current.value,
                        description: descriptionInput.current.value,
                        deadline: deadlineInput.current.value,
                        pictures: announcementPictures
                    }
                ).then(value => {
                    navigation("/tasks")
                    console.log(value.data)
                })

            }}>
                <CheckIcon/>
                Опублікувати
            </div>
        </div>
    )
}