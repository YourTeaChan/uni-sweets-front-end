import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ReactComponent as PrevIcon} from "../images/svg/prev-icon.svg";
import {ReactComponent as EyeIcon} from "../images/svg/eye-icon.svg";
import {ReactComponent as EyeSlashIcon} from "../images/svg/eye-slash-icon.svg";
import axios from "axios";
import {AppContext} from "../App";

export const SignInWindow = (props) => {
    const navigate = useNavigate();
    const [passwordIsVisible, setPasswordVisible] = useState(false)
    const {authInfo, setAuthInfo} = useContext(AppContext)
    return (
        <div className={`sign-in-sign-up-window-wrapper ${props.isVisible ? "visible" : ""}`}>
            <div className="sign-in-sign-up-window-header">
                <div className="icon-button" onClick={() => props.setState("default")}>
                    <PrevIcon/>
                </div>
                <img className="uni-sweets-logo" src={require("../images/png/uni-sweets-logo.png")} alt="logo"/>
            </div>
            <div className="sign-in-sign-up-window-main">
                <div className="sign-in-title">
                    <img className="unicorn-logo" src={require("../images/png/unicorn-logo.png")} alt="logo"/>
                    Приємно знову Вас бачити!
                </div>
                <div className="sign-in-sign-up-input-wrapper">
                    <input id={"sign-in-email-input"} className="input" placeholder={"Електронна пошта"} type="email"/>
                    <div className="password-input">
                        <input id={"sign-in-password-input"} className="input" placeholder="Пароль" type={passwordIsVisible ? "text" : "password"}/>
                        <div className="icon-button" onClick={() => setPasswordVisible(!passwordIsVisible)}>
                            {passwordIsVisible ? <EyeIcon/> : <EyeSlashIcon/>}
                        </div>
                    </div>
                </div>
                <div className="sign-in-sign-up-button" onClick={() => {
                    const email = document.getElementById("sign-in-email-input").value
                    const password = document.getElementById("sign-in-password-input").value
                    axios.post("http://192.168.0.106:8080/api/v1/auth/sign-in",
                        {
                            email: email,
                            password: password,
                        }
                    ).then(value => {
                        setAuthInfo(value.data)
                        navigate(`/profile/${value.data.username}`)
                    })
                }}>
                    Увійти
                </div>
            </div>
        </div>
    )
}