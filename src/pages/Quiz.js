import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import Button from '@mui/material/Button';
import loader from "../loader.gif"
import "./quiz.css"

const Quiz =({ name , score , setScore , data})=>{

    const [options , setOptions] = useState([])
    const [currentQuestion , setCurrentQuestion] = useState()
   

    const navigate=useNavigate()

    const fetchCurrent = (index)=>{
        setCurrentQuestion(data.questions[index])
       
        setOptions([
            data.questions.length && data.questions[index].correct_answer,
            ...data.questions.length && data.questions[index].incorrect_answers
        ].sort(()=>Math.random() - 0.5))
    }

    useEffect(()=>{

        if(data.loading){
            return
        }else {
            if(data.questions.length){
                fetchCurrent(0)
            }
         
        }

    },[data])    
    
    const quitHandler =()=>{
        navigate("/" , {replace:true})
        window.location.reload()
    }

    return(
        <div className="quiz-container">

            {
                
               data.loading ? <img style={{width:"6rem"}} src={loader}/> :
               data.error ? <Button onClick={quitHandler} variant="contained" color="error">Network Error,Try Again</Button>:
               !data.questions.length ? <Button onClick={quitHandler} variant="contained" color="error">Something Went Wrong,Try Again</Button> :
                currentQuestion &&  
                <Question score={score} setScore={setScore} name={name} data={data} fetchCurrent={fetchCurrent} currentQuestion={currentQuestion} options={options} />
            }
          
        </div>
    )
}

export default Quiz;