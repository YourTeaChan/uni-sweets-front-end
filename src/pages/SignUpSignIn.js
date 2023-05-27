import {useState} from "react";
import {DefaultSignInSignUpWindow} from "../components/DefaultSignInSignUpWindow";
import {SignInWindow} from "../components/SignInWindow";
import {SignUpWindow} from "../components/SignUpWindow";

export const SignUpSignIn = (props) => {
    const [state, setState] = useState("default")
    props.setMenuVisibility(false)
    return (
        <div className="sign-in-sign-up-wrapper">
            <div className="sign-in-sign-up-card">
                <div className="sign-in-sign-up-card-content">
                    <SignInWindow isVisible={state === "sign-in"} setState={setState} setSignInSignUpPage={props.setSignInSignUpPage}/>
                    <DefaultSignInSignUpWindow isVisible={state === "default"} setState={setState}/>
                    <SignUpWindow isVisible={state === "sign-up"} setState={setState} setSignInSignUpPage={props.setSignInSignUpPage}/>
                </div>
            </div>
        </div>
    )
}