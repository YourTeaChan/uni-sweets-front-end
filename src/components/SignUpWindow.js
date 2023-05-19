import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Switch} from "./Switch";
import {ReactComponent as PrevIcon} from "../images/svg/prev-icon.svg";
import {ReactComponent as EyeIcon} from "../images/svg/eye-icon.svg";
import {ReactComponent as EyeSlashIcon} from "../images/svg/eye-slash-icon.svg";

export const SignUpWindow = (props) => {
    const navigate = useNavigate();
    const [roleIsPastry, setRolePastry] = useState(false)
    const [passwordIsVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordIsVisible, setConfirmPasswordVisible] = useState(false)

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
                    <input className="input" placeholder={"Ім'я"}/>
                    <input className="input" placeholder={"Прізвище"}/>
                    <input className="input" placeholder={"Нікнейм"}/>
                    <input className="input" placeholder={"Електронна пошта"}/>
                    <div className="password-input">
                        <input className="input" placeholder="Пароль" type={passwordIsVisible ? "text" : "password"}/>
                        <div className="icon-button" onClick={() => setPasswordVisible(!passwordIsVisible)}>
                            {passwordIsVisible ? <EyeIcon/> : <EyeSlashIcon/>}
                        </div>
                    </div>
                    <div className="password-input">
                        <input className="input" placeholder="Повторити пароль" type={confirmPasswordIsVisible ? "text" : "password"}/>
                        <div className="icon-button" onClick={() => setConfirmPasswordVisible(!confirmPasswordIsVisible)}>
                            {confirmPasswordIsVisible ? <EyeIcon/> : <EyeSlashIcon/>}
                        </div>
                    </div>
                </div>
                <div className="sign-in-sign-up-button" onClick={() => {
                    props.setSignInSignUpPage(true)
                    navigate("/settings")
                }}>
                    Зареєструватися
                </div>
            </div>
        </div>
    )
}