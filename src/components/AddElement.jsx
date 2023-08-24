import BackLog from "./BackLog";            // ← components               
import InProgress from "./InProgress";      // ← 
import Done from "./Done";                  // ← 
import addLogo from "../assets/arrow.svg"   // ← assets/logos/icons etc 
import { useCallback, useState, useRef, useEffect } from "react";  // ← react states 
import useLocalStorage from "../hooks/useLocalStorage";            // ← custom hooks 
import useDetectMobile from "../hooks/useDetectMobile";            // ← custom hooks 
import { Wrapper, SwitchMode, ToDoTitle, IconImg } from "../styles/style";  // ← styled component
import AddElementStyle from "../styles/AddElement.module.css"      // ← Modules Stylesheet

const AddElement = () => {
    const inputValue = useRef(null);
    const [idNumber, setIdNumber] = useState(0);
    const [backLog, setBackLog] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [localKey, setLocalKey] = useLocalStorage('keyName', false);
    const device = useDetectMobile();
    const colorsObject = [
        // colors for light mode
        {backgroundColor:"rgb(220, 224, 228)", boxShadow:"0 0 1rem rgba(0, 0, 0, 0.377)", titleColor:"rgb(255, 255, 255)"}, 
        // colors for dark mode
        {backgroundColor:"rgb(50, 50, 77)", boxShadow:"0 0 1rem rgba(255, 255, 255, 0.377)", titleColor:"rgb(7, 7, 8)"} 
    ]


    //here we declare wich string needs to be returned light or dark (We use this to change classnames)
    const wichModeIsActive = useCallback(() => {
        if(device==="desktop"){
          return  localKey === true ? "light" : "dark"
        }else{
            return "light"
        }
    },[device, localKey])
    //here we controll body background color based on wich mode light/dark was choosen
    useEffect(() => {
        document.body.style.backgroundColor = wichModeIsActive() === 'light' ? "rgb(220, 224, 228)" : "rgb(29,29,41)" 
    }, [wichModeIsActive])

    // add entered text to backLog when add button is clicked
    const addToDo = (e) => {
        e.preventDefault();
        //prevent from empty entries
        if(inputValue.current.value.trim().length ===0 )return 

        setBackLog((prevState) => [...prevState, {id:idNumber, name:inputValue.current.value}])
        setIdNumber((prevState) => prevState+1)
        //simpe solution tu reset input (timeout becouse  i need async so input reset don`t run before setstate)
        setTimeout(()=>{
            inputValue.current.value = ''
        })
    };
    // 1 backlogs state 
    const moveToInProgress = useCallback((id) => {
        setInProgress((prevState) => [...prevState, {id, name:backLog.filter(el=> el.id === id)[0].name}])
        setBackLog((prevState) => prevState.filter(el=> el.id !== id))
    },[backLog])
    //2 inpogress state 
    const returnToBackLog = useCallback((id) => {
        setBackLog((prevState) => [...prevState, {id, name:inProgress.filter((el) => el.id === id)[0].name}])
        setInProgress((prevState) => [...prevState.filter((el) => el.id !== id)])
    },[inProgress])
    const moveToDone = useCallback((id) => {
        setDone((prevState) => [...prevState, {id, name:inProgress.filter((el) => el.id === id)[0].name}])
        setInProgress((prevState) => [...prevState.filter((el) => el.id !== id)])
    }, [inProgress])
     //3 done state 
    const returnToInProgress = useCallback((id) => {
        setInProgress((prevState) => [...prevState, {id, name:done.filter((el) => el.id === id)[0].name}])
        setDone((prevState) => [...prevState.filter((el) => el.id !== id)])
    }, [done])
    const removeElement = useCallback((id) => {
        setDone((prevState) => [...prevState.filter(el=> el.id !== id)])
    },[])
        return(
            // since we get from  wichModeIsActive()  either light or dark string, we use it  to pass colors to color prop
            <Wrapper color = { wichModeIsActive() === "light" ? colorsObject[0] : colorsObject[1] } >
                <div className={AddElementStyle['add-wrapper']}>
                    {/* light-dark mode */}
                    <SwitchMode color={ wichModeIsActive() === "light" ? "light" : "dark"}  onClick={() => {setLocalKey((prev)=>!prev)}}></SwitchMode> 
                    {/* form to add input text */}
                    <form onSubmit={addToDo} className={AddElementStyle['add-box']}>
                        <input ref={inputValue} type="text" placeholder="Add New Task"/>
                        <button type="submit">
                        <IconImg src={addLogo} alt="logo" />
                        </button>
                    </form>
                </div>
                <div className={AddElementStyle['flex-box']}>
                    <ToDoTitle tabIndex={1}>Backlog | {backLog.length}</ToDoTitle>
                    {backLog.map((el) => (
                       <BackLog key={el.id} id={el.id} name={el.name} modeStatus={wichModeIsActive} action={moveToInProgress}/>
                    ))}
                </div>
                <div className={AddElementStyle['flex-box']}>
                    <ToDoTitle tabIndex={2}>In Progress | {inProgress.length}</ToDoTitle>
                    {inProgress.map((e) => ( 
                       <InProgress key={e.id} id={e.id} name={e.name} modeStatus={wichModeIsActive}  actionReturn={returnToBackLog} actionDone={moveToDone}/>
                    ))}
                </div>
                <div className={AddElementStyle['flex-box']}>
                    <ToDoTitle tabIndex={3}>Done | {done.length}</ToDoTitle>
                    {done.map((e) => (
                        <Done key={e.id} id={e.id} name={e.name} modeStatus={wichModeIsActive} actionReturn={returnToInProgress} actionRemove={removeElement}/>
                    ))}
                </div>
            </Wrapper>
        )
}
export default AddElement