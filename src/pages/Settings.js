export const Settings = (props) => {
    return (
        <div className="settings-wrapper">
            <div className="theme-preferences-buttons">
                <div id="green-theme-button" className="theme-preference-button" onClick={() => props.setTheme("green")}>
                    Mint
                </div>
                <div id="blue-theme-button" className="theme-preference-button" onClick={() => props.setTheme("blue")}>
                    Blueberry
                </div>
                <div id="purple-theme-button" className="theme-preference-button" onClick={() => props.setTheme("purple")}>
                    Lavender
                </div>
                <div id="pink-theme-button" className="theme-preference-button" onClick={() => props.setTheme("pink")}>
                    Raspberry
                </div>
                <div id="orange-theme-button" className="theme-preference-button" onClick={() => props.setTheme("orange")}>
                    Caramel
                </div>
                <div id="yellow-theme-button" className="theme-preference-button" onClick={() => props.setTheme("yellow")}>
                    Vanilla
                </div>
            </div>
        </div>)
}