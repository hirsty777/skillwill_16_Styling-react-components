import React from "react"
import leftArrow from "../assets/leftArrow.svg"
import Remove from "../assets/remove.svg"
import { IconImg } from "../styles/style";
import InProgressStyle from "../styles/StateElements.module.css"
import { BorderStyles } from "../styles/style";  // ← styled component

const colorArray = ["122, 20, 20","134, 138, 25","25, 53, 138","25, 138, 48"]


const Done = ({name, id, actionReturn, actionRemove}) => {
    return (
        <BorderStyles className={InProgressStyle["done-box"]} color={colorArray[Math.floor(Math.random() * 4)]}>
            <div className={InProgressStyle["done"]}>
                <span  className={InProgressStyle["done-text"]}>{name}</span>
                <div className={InProgressStyle["btn-box"]}>
                    <button  className={InProgressStyle["done-btn"]} onClick={() => actionReturn(id)}>
                    <   IconImg src={leftArrow} alt="right arrow icon" />
                    </button>
                    <button  className={InProgressStyle["done-btn"]} onClick={() => actionRemove(id)}>
                        <IconImg src={Remove} alt="remove icon" color="remove"/>    
                    </button> 
                </div>
            </div>
        </BorderStyles>
    )
}

export default React.memo(Done)