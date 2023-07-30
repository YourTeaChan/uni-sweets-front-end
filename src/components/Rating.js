import {ReactComponent as StarIcon} from "../images/svg/star-icon.svg";
import {ReactComponent as StarIconRated} from "../images/svg/star-icon-rated.svg";

export const Rating = (props) => {

    return (
        <div className="user-rating">
            {Array(5).fill(1).map((_, index) =>
                <div key={index} className={"rating-star-wrapper"}>
                    {index <= Math.floor(props.value - 1) && <StarIconRated className={`rating-star ${index <= Math.floor(props.value - 1) ? "selected" : ""}`}/>}
                    {index > Math.floor(props.value - 1) && index < Math.ceil(props.value) && (props.value - 1) % 1 !== 0 && <StarIconRated style={{clipPath: `inset(0 calc(100% - ${(props.value - 1) % 1 * 100}%) 0 0)`}} className={`rating-star selected half`}/>}
                    <StarIcon/>
                </div>
            )}
        </div>
    )
}