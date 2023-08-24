import styled from "styled-components";
import Light from "../assets/light.png" //light mode icon
import Dark from "../assets/dark.png"   //dark mode icon

export const Wrapper = styled.div`
    max-width: 1200px;
    min-height: 400px;
    margin: 20px auto 0;
    padding: 0 10px 10px 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: min-content;
    row-gap: 1.5rem;
    column-gap:10px;
    border-radius: 1rem;

    background-color:${props => props.color.backgroundColor};
    box-shadow: ${props => props.color.boxShadow};
`

export const SwitchMode = styled.div`
    user-select: none;
    cursor: pointer;
    position: relative;
    width: 30px;
    height: 30px;
    margin:10px auto;
    background-image: url("${props =>props.color=== 'light'? Light : Dark}");
    background-repeat: no-repeat;
    background-size:cover;
    transition: all 0.5s ease-in-out;
`

export const ToDoTitle = styled.h3`
    position:relative;
    width:100%;
    padding:0 0 20px 0;
    text-align:center;

    &:after{
        position:absolute;
        content:"";
        width:80%;
        height:3px;
        bottom:-10px;
        left:10%;
        border-radius:5px;
        background:rgb(${({tabIndex})=>tabIndex===1? "105, 56, 19":tabIndex===2?"203, 209, 15":"9, 171, 41"});
    }
`

export const IconImg = styled.img`
    position: absolute;
    transform: translate(-50%,-50%);
    filter:${({color})=>color === "remove" ? "invert(17%) sepia(88%) saturate(3389%) hue-rotate(353deg) brightness(71%) contrast(121%)"
                                            :"invert(26%) sepia(65%) saturate(1008%) hue-rotate(86deg) brightness(98%) contrast(89%)"};
`

export const BorderStyles = styled.div`
    border: 1px solid rgb(${({color})=>color});
    border-left: 5px solid rgb(${({color})=>color});
    background-color:rgb(255, 255, 255);
`
