import {NavLink} from "react-router-dom";

export const FinalAnnouncementOffer = (props) => {
    const dictionary = {
        "CREATED": "Створено",
        "TAKEN": "Очікує оплати",
        "IN_PROGRESS": "В процесі",
        "DONE": "Виконано",
        "CLOSED": "Закрито"
    }
    return (
        <>
            <div className="final-announcement-offer">
                <table className={"final-announcement-offer-table"}>
                    <tbody className={"horizontal-table"}>
                    <tr>
                        <td>Кондитер-виконавець</td>
                        <td>Ціна</td>
                        <td>Оплата</td>
                        <td>Статус</td>
                    </tr>
                    <tr>
                        <td><NavLink to={`/profile/${props.userPastry?.username}`}>{props.userPastry ? props.userPastry.firstName + " " + props.userPastry.lastName : "-"}</NavLink></td>
                        <td>{props.price ? props.price + "₴" : "-"}</td>
                        <td>{props.announcementPaymentState ? "Оплачено" : "Не оплачено"}</td>
                        <td>{dictionary[props.announcementState]}</td>
                    </tr>
                    </tbody>
                    <tbody className={"vertical-table"}>
                    <tr>
                        <td>Кондитер-виконавець</td>
                        <td><NavLink to={`/profile/${props.userPastry?.username}`}>{props.userPastry ? props.userPastry.firstName + " " + props.userPastry.lastName : "-"}</NavLink></td>
                    </tr>
                    <tr>

                        <td>Оплата</td>
                        <td>{props.announcementPaymentState ? "Оплачено" : "Не оплачено"}</td>
                    </tr>
                    <tr>
                        <td>Статус</td>
                        <td>{dictionary[props.announcementState]}</td>
                    </tr>
                    <tr>
                        <td>Ціна</td>
                        <td>{props.price ? props.price + "₴" : "-"}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}