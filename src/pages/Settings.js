import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";
import {ReactComponent as InstagramIcon} from "../images/svg/instagram-icon.svg";
import {ReactComponent as FacebookIcon} from "../images/svg/facebook-icon.svg";
import {ReactComponent as YouTubeIcon} from "../images/svg/youtube-icon.svg";
import {ReactComponent as TikTokIcon} from "../images/svg/tiktok-icon.svg";
import {Dropdown} from "../components/Dropdown";

export const Settings = (props) => {
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
                                {props.userInformation.userPicture && <img src={URL.createObjectURL(props.userInformation.userPicture)} alt={""}/>}
                                <div className="gallery-edit-button">
                                    <input id="image-input" type="file" onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            props.setUserInformation({...props.userInformation, userPicture: e.target.files[0]});
                                        }
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-main-settings-username-and-user-location-wrapper">
                            <div className="profile-main-settings-user-location">
                                <Dropdown name={props.userInformation.userLocation} icon={<LocationIcon/>} id="location" filters={props.userInformation}
                                          setFilter={props.setUserInformation} multipleChoice={false}/>
                            </div>
                            <div className="profile-main-settings-username">
                                <input className="input" type="text" placeholder="Ім'я"/>
                            </div>
                            <div className="profile-main-settings-username">
                                <input className="input" type="text" placeholder="Прізвище"/>
                            </div>
                        </div>
                    </div>
                    <div className="profile-socials-settings">
                        <div className="profile-socials-settings-title">
                            Соціальні мережі
                        </div>
                        <div className="profile-socials-settings-wrapper">
                            <div className="profile-socials-settings-links-wrapper">
                                <div className="profile-socials-settings-link">
                                    <InstagramIcon/>
                                    <input className="input" type="text" placeholder="Instagram"/>
                                </div>
                                <div className="profile-socials-settings-link">
                                    <FacebookIcon/>
                                    <input className="input" type="text" placeholder="Facebook"/>
                                </div>
                            </div>
                            <div className="profile-socials-settings-links-wrapper">
                                <div className="profile-socials-settings-link">
                                    <YouTubeIcon/>
                                    <input className="input" type="text" placeholder="YouTube"/>
                                </div>
                                <div className="profile-socials-settings-link">
                                    <TikTokIcon/>
                                    <input className="input" type="text" placeholder="TikTok"/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-main-settings-user-about-wrapper">
                            <div className="profile-main-settings-user-about-title">
                                Кілька слів про себе
                            </div>
                            <div className="profile-main-settings-user-about">
                                <textarea className="text-area" placeholder="Про себе..." rows={3} maxLength={150}/>
                            </div>
                        </div>
                    </div>
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
                </div>
            </div>
        </div>
    )
}