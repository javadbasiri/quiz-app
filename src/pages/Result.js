import React from "react"
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import "./result.css"
const Result =({score})=>{

    const navigate = useNavigate()
    const quitHandler =()=>{
        navigate("/")
        window.location.reload()
    }	    
    return(
        <div className="result-container">
            <span className="final-score">{score}</span>
            <h4>Your Final Score</h4>
            <Button onClick={quitHandler} variant="contained">Try Again</Button>
            {/* <button className="try" onClick={quitHandler}>try again</button> */}
        </div>
    )
}

export default Result;