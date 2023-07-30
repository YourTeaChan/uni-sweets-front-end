import {useContext, useEffect, useRef, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AppContext} from "../App";
import {ReactComponent as CakeIcon} from "../images/svg/cake-icon.svg";
import {ReactComponent as LocationIcon} from "../images/svg/location-icon.svg";
import {ReactComponent as ClockIcon} from "../images/svg/clock-icon.svg";
import {ReactComponent as FlashIcon} from "../images/svg/flash-icon.svg";
import {ReactComponent as HeartIcon} from "../images/svg/heart-icon.svg";
import {ReactComponent as CheckIcon} from "../images/svg/check-icon.svg";
import {ReactComponent as WalletIcon} from "../images/svg/wallet-icon.svg";
import {ReactComponent as PlusIcon} from "../images/svg/plus-icon.svg";
import {ReactComponent as MinusIcon} from "../images/svg/minus-icon.svg";
import {AnnouncementOffer} from "../components/AnnouncementOffer";
import {FinalAnnouncementOffer} from "../components/FinalAnnouncementOffer";
import {ReactComponent as StarIcon} from "../images/svg/star-icon.svg";
import {ReactComponent as StarIconRated} from "../images/svg/star-icon-rated.svg";
import {ReactComponent as GalleryRemoveIcon} from "../images/svg/gallery-remove-icon.svg";
import {ReactComponent as PrevIcon} from "../images/svg/prev-icon.svg";
import {ReactComponent as NextIcon} from "../images/svg/next-icon.svg";

export const Announcement = () => {
    const {announcementId} = useParams()
    const {authInfo, userInformation} = useContext(AppContext)
    const [announcement, setAnnouncement] = useState(null)
    const [chosenOffer, setChosenOffer] = useState(null)
    const announcementPrice = useRef()
    const navigation = useNavigate()
    const [currentRating, setCurrentRating] = useState(null)
    const [currentHoverRating, setCurrentHoverRating] = useState(null)
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0)
    const announcementFeedbackInput = useRef(null)
    useEffect(() => {
        axios.get(
            `http://192.168.0.106:8080/api/v1/announcements/${authInfo.username}/${announcementId}`,
            {
                headers: {
                    "Authorization": authInfo.token
                }
            }
        ).then(value => {
            console.log(value.data)
            setAnnouncement(value.data)
        })
    }, [announcementId])

    const handlePictureIndexChange = (delta) => {
        if (currentPictureIndex + delta >= 0 && currentPictureIndex + delta < announcement?.pictures.length) {
            setCurrentPictureIndex(currentPictureIndex + delta)
        }
    }
    return (
        <div className={"announcement-wrapper"}>
            <div className="announcement-all-info">
                <div className="announcement-big-card-header">
                    <div className="announcement-header">
                        <NavLink to={`/profile/${announcement?.creator.username}`}><div className="announcement-user-info">
                            <div className="announcement-user-picture">
                                <img src={announcement?.creator.userPicture?.pictureURL} alt={""}/>
                            </div>
                            <div className="announcement-user-name-info">
                                <div>{announcement?.creator.firstName}</div>
                                <div>{announcement?.creator.lastName}</div>
                            </div>
                        </div></NavLink>
                        <div className="announcement-info">
                            <div className="announcement-info-item-group">
                                <div className="announcement-info-item">
                                    <LocationIcon/>
                                    {announcement?.location.locationName}
                                </div>
                                <div className="announcement-info-item">
                                    <ClockIcon/>
                                    {announcement?.deadline}
                                </div>
                            </div>
                            <div className="announcement-info-item-group">
                                <div className="announcement-info-item">
                                    <CakeIcon/>
                                    {announcement?.dessertType.dessertTypeName}
                                </div>
                                <div>
                                    {announcement?.isQuick && <div className="announcement-info-item">
                                        <FlashIcon/>
                                    </div>}
                                </div>
                                <div>
                                    {announcement?.notifyFavorites && <div className="announcement-info-item">
                                        <HeartIcon/>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="announcement-big-card-main-info">
                    <div className="announcement-main-info">
                        <div className="announcement-main-info-left">
                            <div className="announcement-main-info-title">
                                {announcement?.title}
                            </div>
                            <div className="announcement-main-info-description">
                                {announcement?.description}
                            </div>
                        </div>
                        {announcement?.pictures.length > 0 && <div className="announcement-main-info-right">
                            {announcement?.pictures.length > 1 && <div className="icon-button" onClick={() => handlePictureIndexChange(-1)}>
                                <PrevIcon/>
                            </div>}
                            {announcement?.pictures.map((value, index) =>
                                <div key={index} className={"dessert-picture"}>
                                    <img src={value.pictureURL} alt={""}/>
                                </div>)[currentPictureIndex]}
                            {announcement?.pictures.length > 1 && <div className="icon-button" onClick={() => handlePictureIndexChange(1)}>
                                <NextIcon/>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>
            {authInfo.userRole === "ROLE_PASTRY" ?
                <>
                    {announcement?.state !== "CREATED" && announcement?.pastry.username === authInfo.username &&
                        <>
                            <FinalAnnouncementOffer
                                userPastry={announcement?.pastry}
                                price={announcement?.finalOffer?.price}
                                announcementPaymentState={announcement?.paid}
                                announcementState={announcement?.state}
                            />
                        </>
                    }
                    {(announcement?.state === "CREATED" || announcement?.state === "TAKEN") && !announcement.pastry &&
                        <>
                            <div className="announcement-actions">
                                <div className="announcement-actions-input">
                                    <WalletIcon/>
                                    <input ref={announcementPrice} className={"input price-input"} placeholder={"Вартість замовлення"}/>
                                </div>
                                <div className="button" onClick={() => {
                                    if (userInformation?.paymentCard.length !== 16) {
                                        alert("Вам потрібно вказати метод оплати!")
                                        return
                                    }
                                    const price = announcementPrice.current.value
                                    announcementPrice.current.value = ""
                                    axios.post(
                                        `http://192.168.0.106:8080/api/v1/announcements/${announcementId}/offers/${authInfo.username}/${price}`,
                                        {
                                            headers: {
                                                "Authorization": authInfo.token
                                            }
                                        }
                                    ).then(value => setAnnouncement(value.data))
                                }}>
                                    <PlusIcon/>
                                    Запропонувати
                                </div>
                            </div>
                            {announcement.offers.length > 0 &&
                                <>
                                    <div className={"announcement-offers"}>
                                        Мої пропозиції
                                        {announcement && announcement.offers.map((value, index) =>
                                            <AnnouncementOffer
                                                key={index}
                                                userPastry={value.userPastry}
                                                price={value.price}
                                                isSelected={value === chosenOffer}
                                                offer={value}
                                                setChosenOffer={setChosenOffer}
                                            />
                                        )}
                                    </div>
                                    <div className="button" onClick={() => {
                                        if (chosenOffer) {
                                            axios.delete(
                                                `http://192.168.0.106:8080/api/v1/announcements/${announcementId}/offers/${chosenOffer.id}`,
                                                {
                                                    headers: {
                                                        "Authorization": authInfo.token
                                                    }
                                                }
                                            ).then(value => setAnnouncement(value.data))
                                        }
                                    }}>
                                        <MinusIcon/>
                                        Скасувати пропозицію
                                    </div>
                                </>
                            }
                        </>}
                    {announcement?.state === "IN_PROGRESS" && announcement?.pastry.username === authInfo.username &&
                        <>
                            <div className="button" onClick={() => {
                                axios.put(
                                    `http://192.168.0.106:8080/api/v1/announcements/${announcementId}/finish`,
                                    {
                                        headers: {
                                            "Authorization": authInfo.token
                                        }
                                    }
                                ).then(value => setAnnouncement(value.data))
                            }}>
                                <CheckIcon/>
                                Завершити виконання
                            </div>
                        </>
                    }
                </>
                :
                <>
                    <FinalAnnouncementOffer
                        userPastry={announcement?.pastry}
                        price={announcement?.finalOffer?.price}
                        announcementPaymentState={announcement?.paid}
                        announcementState={announcement?.state}
                    />
                    {announcement?.state === "CREATED" &&
                        <>
                            {announcement.offers.length > 0 ?
                                <>
                                    <div className={"announcement-offers"}>
                                        Пропозиції від кондитерів
                                        {
                                            announcement && announcement.offers.map((value, index) =>
                                                <AnnouncementOffer
                                                    key={index}
                                                    userPastry={value.userPastry}
                                                    price={value.price}
                                                    isSelected={value === chosenOffer}
                                                    offer={value}
                                                    setChosenOffer={setChosenOffer}
                                                />
                                            )
                                        }
                                    </div>

                                    <div className="button" onClick={() => {
                                        if (chosenOffer) {
                                            axios.put(
                                                `http://192.168.0.106:8080/api/v1/announcements/${announcementId}/final-pastry/${chosenOffer.id}`,
                                                {
                                                    headers: {
                                                        "Authorization": authInfo.token
                                                    }
                                                }
                                            ).then(value => setAnnouncement(value.data))
                                        }
                                    }}>
                                        <CheckIcon/>
                                        Обрати пропозицію
                                    </div>
                                </> :
                                <div className={"announcement-offers"}>
                                    Список пропозицій від кондитерів порожній
                                </div>
                            }
                        </>
                    }
                    {announcement?.state === "TAKEN" &&
                        <>
                            <NavLink to={"https://easypay.ua/ua/moneytransfer"} target={"_blank"}>
                                <div className="button" onClick={() => {
                                    axios.put(
                                        `http://192.168.0.106:8080/api/v1/announcements/${announcementId}/payment`,
                                        {
                                            headers: {
                                                "Authorization": authInfo.token
                                            }
                                        }
                                    ).then(value => setAnnouncement(value.data))
                                }}>
                                    <WalletIcon/>
                                    Оплатити замовлення
                                </div>
                            </NavLink>
                        </>
                    }
                    {announcement?.state === "DONE" &&
                        <>
                            <div className="announcement-feedback">
                                Оцініть роботу кондитера
                                <div className="user-rating">
                                    {Array(5).fill(1).map((_, index) =>
                                        <div
                                            key={index}
                                            onClick={() => setCurrentRating(index + 1)}
                                            className={"rating-star-wrapper"}
                                            onMouseEnter={() => setCurrentHoverRating(index + 1)}
                                            onMouseLeave={() => setCurrentHoverRating(null)}
                                        >
                                            <StarIconRated
                                                className={`rating-star ${(currentHoverRating || currentRating) > index ? "selected" : ""} ${currentHoverRating > index ? "hover" : ""}`}
                                            />
                                            <StarIcon/>
                                        </div>
                                    )}
                                </div>
                                <textarea ref={announcementFeedbackInput} className={"text-area announcement-feedback-input"}
                                          placeholder={"Залиште відгук щодо роботи кондитера..."}/>
                            </div>
                            <div className="button" onClick={() => {
                                axios.post(
                                    `http://192.168.0.106:8080/api/v1/announcements/${announcementId}/close`,
                                    {
                                        senderUsername: authInfo.username,
                                        rating: currentRating,
                                        text: announcementFeedbackInput.current.value.trim()
                                    },
                                    {
                                        headers: {
                                            "Authorization": authInfo.token
                                        }
                                    }
                                ).then(value => setAnnouncement(value.data))
                            }}>
                                <CheckIcon/>
                                Закрити замовлення
                            </div>
                        </>
                    }
                </>
            }
        </div>
    )
}