import React from "react"
import rightArrow from "../assets/rightArrow.svg"
import leftArrow from "../assets/leftArrow.svg"
import { IconImg } from "../styles/style"
import InProgressStyle from "../styles/StateElements.module.css"
import { BorderStyles } from "../styles/style";  // ← styled component

const colorArray = ["122, 20, 20","134, 138, 25","25, 53, 138","25, 138, 48"]

const InProgress = ({name, id, actionReturn, actionDone}) => {
        return(
            <BorderStyles className={InProgressStyle["in-progress-box"]} color={colorArray[Math.floor(Math.random() * 4)]}>
               <div className={InProgressStyle["in-progress"]}>
                    <span className={InProgressStyle["in-progress-text"]}>{name}</span >
                    <div className={InProgressStyle["btn-box"]}>
                        <button onClick={() => actionReturn(id)} className={InProgressStyle["in-progress-btn"]}>
                            <IconImg src={leftArrow} alt="right arrow icon" />
                        </button>
                        <button onClick={() => actionDone(id)} className={InProgressStyle["in-progress-btn"]}>
                            <IconImg src={rightArrow} alt="left arrow icon" />    
                        </button>  
                    </div>
               </div>
            </BorderStyles>
        )
}

export default React.memo(InProgress)