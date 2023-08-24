import React from "react"
import rightArrow from "../assets/rightArrow.svg"
import { IconImg } from "../styles/style";
import BackLogStyle from "../styles/StateElements.module.css"
import { BorderStyles } from "../styles/style";  // ← styled component

const colorArray = ["122, 20, 20","134, 138, 25","25, 53, 138","25, 138, 48"]
 

const BackLog = ({name, id, action}) => {
        return(
            <BorderStyles className={BackLogStyle["back-log-box"]} color={colorArray[Math.floor(Math.random() * 4)]}>
                <div className={BackLogStyle["back-log"]}>
                    <span className={BackLogStyle["back-log-text"]}>{name}</span>
                    <button onClick={() => action(id)} className={BackLogStyle["back-log-btn"]}>
                        <IconImg src={rightArrow} alt="arrow icon" />
                    </button>
                </div>
            </BorderStyles>
        )
}

export default React.memo(BackLog)