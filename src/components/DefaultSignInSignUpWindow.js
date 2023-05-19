export const DefaultSignInSignUpWindow = (props) => {
    return (
        <div className={`default-sign-in-sign-up-window-wrapper ${props.isVisible ? "visible" : ""}`}>
            <div className="sign-in-sign-up-card-logo">
                <img className="unicorn-logo" src={require("../images/png/unicorn-logo.png")} alt="logo"/>
                <img className="uni-sweets-logo" src={require("../images/png/uni-sweets-logo.png")} alt="logo"/>
            </div>
            <div className="sign-in-sign-up-card-buttons">
                <div className="sign-in-sign-up-button" onClick={() => props.setState("sign-in")}>
                    Увійти
                </div>
                або
                <div className="sign-in-sign-up-button" onClick={() => props.setState("sign-up")}>
                    Зареєструватися
                </div>
            </div>
        </div>
    )
}