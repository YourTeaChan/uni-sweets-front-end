export const BackgroundBlur = (props) => {
    return (
        <div
            className={`background-blur ${props.isActive ? "background-blur-active" : ""}`}
            style={{zIndex: props.blurLayer}}>
        </div>
    )
}