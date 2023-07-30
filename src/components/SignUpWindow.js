import {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Switch} from "./Switch";
import {ReactComponent as PrevIcon} from "../images/svg/prev-icon.svg";
import {ReactComponent as EyeIcon} from "../images/svg/eye-icon.svg";
import {ReactComponent as EyeSlashIcon} from "../images/svg/eye-slash-icon.svg";
import axios from "axios";
import {AppContext} from "../App";

export const SignUpWindow = (props) => {
    const navigate = useNavigate();
    const [roleIsPastry, setRolePastry] = useState(false)
    const [passwordIsVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordIsVisible, setConfirmPasswordVisible] = useState(false)
    const {setAuthInfo} = useContext(AppContext)
    return (
        <div className={`sign-in-sign-up-window-wrapper ${props.isVisible ? "visible" : ""}`}>
            <div className="sign-in-sign-up-window-header">
                <div className="icon-button" onClick={() => props.setState("default")}>
                    <PrevIcon/>
                </div>
                <img className="uni-sweets-logo" src={require("../images/png/uni-sweets-logo.png")} alt="logo"/>
            </div>
            <div className="sign-in-sign-up-window-main">
                <div className="sign-in-sign-up-input-wrapper">
                    <div className="role-slider">
                        <Switch roleIsPastry={roleIsPastry} setRolePastry={setRolePastry}/>
                    </div>
                    <input id={"first-name-input"} className="input" placeholder={"Ім'я"} autoComplete={"off"}/>
                    <input id={"last-name-input"} className="input" placeholder={"Прізвище"} autoComplete={"off"}/>
                    <input id={"username-input"} className="input" placeholder={"Нікнейм"} autoComplete={"off"}/>
                    <input id={"email-input"} className="input" placeholder={"Електронна пошта"} autoComplete={"off"}/>
                    <div className="password-input">
                        <input id={"password-input"} className="input" placeholder="Пароль" type={passwordIsVisible ? "text" : "password"} autoComplete={"off"}/>
                        <div className="icon-button" onClick={() => setPasswordVisible(!passwordIsVisible)}>
                            {passwordIsVisible ? <EyeIcon/> : <EyeSlashIcon/>}
                        </div>
                    </div>
                    <div className="password-input">
                        <input className="input" placeholder="Повторити пароль" type={confirmPasswordIsVisible ? "text" : "password"} autoComplete={"off"}/>
                        <div className="icon-button" onClick={() => setConfirmPasswordVisible(!confirmPasswordIsVisible)}>
                            {confirmPasswordIsVisible ? <EyeIcon/> : <EyeSlashIcon/>}
                        </div>
                    </div>
                </div>
                <div className="sign-in-sign-up-button" onClick={() => {
                    const firstName = document.getElementById("first-name-input").value
                    const lastName = document.getElementById("last-name-input").value
                    const username = document.getElementById("username-input").value
                    const email = document.getElementById("email-input").value
                    const password = document.getElementById("password-input").value
                    axios.post("http://192.168.0.106:8080/api/v1/auth/sign-up",
                        {
                            firstName: firstName,
                            lastName: lastName,
                            username: username,
                            email: email,
                            password: password,
                            userRole: roleIsPastry ? "ROLE_PASTRY" : "ROLE_CLIENT"
                        }
                    ).then(value => {
                        setAuthInfo(value.data)
                        navigate("/settings")
                    })
                }}>
                    Зареєструватися
                </div>
            </div>
        </div>
    )
}