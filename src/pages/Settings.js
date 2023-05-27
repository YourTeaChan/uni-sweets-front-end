import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";
import {ReactComponent as InstagramIcon} from "../images/svg/instagram-icon.svg";
import {ReactComponent as FacebookIcon} from "../images/svg/facebook-icon.svg";
import {ReactComponent as YouTubeIcon} from "../images/svg/youtube-icon.svg";
import {ReactComponent as TikTokIcon} from "../images/svg/tiktok-icon.svg";
import {Dropdown} from "../components/Dropdown";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import axios from "axios";
import FileResizer from "react-image-file-resizer";

export const Settings = (props) => {
    const {userInformation, setUserInformation, authInfo} = useContext(AppContext)
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState()
    const [imageFile, setImageFile] = useState()
    useEffect(() => {
        axios.get("http://192.168.0.106:8080/api/v1/locations").then(value => {
            setLocations(createFiltersFromDB(value.data, "locationName"))
        })
    }, [userInformation])

    useEffect(() => {
        locations.forEach(value => {
            if (value.checked) {
                setSelectedLocation(value.title)
            }
        })
    }, [locations])

    const createFiltersFromDB = (filters, fieldName) => {
        return filters.map((value, index) => {
            return {id: index, title: value[fieldName], checked: userInformation?.location[fieldName] === value[fieldName]}
        })
    }

    return (
        <div className="settings-wrapper">
            <div className="settings-content">
                <div className="profile-settings">
                    <div className="profile-settings-title">
                        Налаштування профілю
                    </div>
                    <div className="profile-main-settings">
                        <div className="profile-main-settings-user-picture-wrapper">
                            <div className="profile-main-settings-user-picture" onClick={() => {
                                document.getElementById("image-input").click()
                            }}>
                                {<img src={imageFile ? URL.createObjectURL(imageFile) : userInformation?.userPicture?.pictureURL} alt={""}/>}
                                <div className="gallery-edit-button">
                                    <input id="image-input" type="file" onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            console.log(e.target.files[0])
                                            FileResizer.imageFileResizer(
                                                e.target.files[0],
                                                720,
                                                720,
                                                "jpg",
                                                100,
                                                0,
                                                (value) => setImageFile(value),
                                                "file"
                                            )
                                        }
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-main-settings-username-and-user-location-wrapper">
                            <div className="profile-main-settings-user-location">
                                <Dropdown
                                    filters={locations}
                                    setFilter={setLocations}
                                    name={selectedLocation}
                                    defaultName={"Місто"}
                                    icon={<LocationIcon/>}
                                    multipleChoice={false}
                                    id="location"
                                />
                            </div>
                            <div className="profile-main-settings-username">
                                <input id="settings-user-firstname" className="input" type="text" placeholder="Ім'я" defaultValue={userInformation?.firstName}/>
                            </div>
                            <div className="profile-main-settings-username">
                                <input id="settings-user-lastname" className="input" type="text" placeholder="Прізвище" defaultValue={userInformation?.lastName}/>
                            </div>
                        </div>
                    </div>
                    {authInfo?.userRole === "ROLE_PASTRY" &&
                        <div className="profile-socials-settings">
                            <div className="profile-socials-settings-title">
                                Соціальні мережі
                            </div>
                            <div className="profile-socials-settings-wrapper">
                                <div className="profile-socials-settings-links-wrapper">
                                    <div className="profile-socials-settings-link">
                                        <InstagramIcon/>
                                        <input id="settings-user-instagram" className="input" type="text" placeholder="Instagram" defaultValue={userInformation?.instagram}/>
                                    </div>
                                    <div className="profile-socials-settings-link">
                                        <FacebookIcon/>
                                        <input id="settings-user-facebook" className="input" type="text" placeholder="Facebook" defaultValue={userInformation?.facebook}/>
                                    </div>
                                </div>
                                <div className="profile-socials-settings-links-wrapper">
                                    <div className="profile-socials-settings-link">
                                        <YouTubeIcon/>
                                        <input id="settings-user-youtube" className="input" type="text" placeholder="YouTube" defaultValue={userInformation?.youtube}/>
                                    </div>
                                    <div className="profile-socials-settings-link">
                                        <TikTokIcon/>
                                        <input id="settings-user-tiktok" className="input" type="text" placeholder="TikTok" defaultValue={userInformation?.tiktok}/>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-main-settings-user-about-wrapper">
                                <div className="profile-main-settings-user-about-title">
                                    Кілька слів про себе
                                </div>
                                <div className="profile-main-settings-user-about">
                                    <textarea id="settings-user-about" className="text-area" placeholder="Про себе..." rows={3} maxLength={150}
                                              defaultValue={userInformation?.about}/>
                                </div>
                            </div>
                        </div>}
                </div>
                <div className="theme-preferences-settings">
                    <div className="theme-preferences-settings-title">
                        Зміна теми
                    </div>
                    <div className="theme-preferences-buttons">
                        <div id="green-theme-button" className={`theme-preference-button ${props.theme === "green" ? "active" : ""}`} onClick={() => props.setTheme("green")}>
                            Mint
                        </div>
                        <div id="purple-theme-button" className={`theme-preference-button ${props.theme === "purple" ? "active" : ""}`} onClick={() => props.setTheme("purple")}>
                            Lavender
                        </div>
                        <div id="orange-theme-button" className={`theme-preference-button ${props.theme === "orange" ? "active" : ""}`} onClick={() => props.setTheme("orange")}>
                            Caramel
                        </div>
                        <div id="blue-theme-button" className={`theme-preference-button ${props.theme === "blue" ? "active" : ""}`} onClick={() => props.setTheme("blue")}>
                            Blueberry
                        </div>
                        <div id="pink-theme-button" className={`theme-preference-button ${props.theme === "pink" ? "active" : ""}`} onClick={() => props.setTheme("pink")}>
                            Raspberry
                        </div>
                        <div id="yellow-theme-button" className={`theme-preference-button ${props.theme === "yellow" ? "active" : ""}`} onClick={() => props.setTheme("yellow")}>
                            Vanilla
                        </div>
                    </div>
                    <button onClick={() => {
                        const about = document.getElementById("settings-user-about")?.value.trim()
                        const tiktok = document.getElementById("settings-user-tiktok")?.value.trim()
                        const youtube = document.getElementById("settings-user-youtube")?.value.trim()
                        const facebook = document.getElementById("settings-user-facebook")?.value.trim()
                        const instagram = document.getElementById("settings-user-instagram")?.value.trim()
                        const firstName = document.getElementById("settings-user-firstname").value.trim()
                        const lastName = document.getElementById("settings-user-lastname").value.trim()

                        console.log(
                            {
                                username: authInfo.username,
                                firstName: firstName,
                                lastName: lastName,
                                instagram: instagram?.length > 0 ? instagram : null,
                                facebook: facebook?.length > 0 ? facebook : null,
                                youtube: youtube?.length > 0 ? youtube : null,
                                tiktok: tiktok?.length > 0 ? tiktok : null,
                                about: about?.length > 0 ? about : null,
                                location: selectedLocation
                            }
                        )
                        if (imageFile) {
                            const formData = new FormData()
                            formData.append("image", imageFile)
                            axios.post("http://192.168.0.106:8080/api/v1/content", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }).then((response) => {
                                axios.patch(
                                    `http://192.168.0.106:8080/api/v1/users/${authInfo.userRole === "ROLE_PASTRY" ? "pastries" : "clients"}/${authInfo.username}`,
                                    {
                                        username: authInfo.username,
                                        firstName: firstName,
                                        lastName: lastName,
                                        instagram: instagram?.length > 0 ? instagram : null,
                                        facebook: facebook?.length > 0 ? facebook : null,
                                        youtube: youtube?.length > 0 ? youtube : null,
                                        tiktok: tiktok?.length > 0 ? tiktok : null,
                                        about: about?.length > 0 ? about : null,
                                        location: selectedLocation,
                                        userPicture: response.data
                                    },
                                    {
                                        headers: {
                                            "Authorization": authInfo.token
                                        }
                                    }
                                ).then(response => setUserInformation(response.data))
                            })
                        } else {
                            axios.patch(
                                `http://192.168.0.106:8080/api/v1/users/${authInfo.userRole === "ROLE_PASTRY" ? "pastries" : "clients"}/${authInfo.username}`,
                                {
                                    username: authInfo.username,
                                    firstName: firstName,
                                    lastName: lastName,
                                    instagram: instagram?.length > 0 ? instagram : null,
                                    facebook: facebook?.length > 0 ? facebook : null,
                                    youtube: youtube?.length > 0 ? youtube : null,
                                    tiktok: tiktok?.length > 0 ? tiktok : null,
                                    about: about?.length > 0 ? about : null,
                                    location: selectedLocation,
                                    userPicture: userInformation.userPicture
                                },
                                {
                                    headers: {
                                        "Authorization": authInfo.token
                                    }
                                }
                            ).then(response => setUserInformation(response.data))
                        }
                    }}>
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}