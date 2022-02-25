import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Question = ({ name,score,setScore,currentQuestion,options,data,fetchCurrent })=>{
     const notify =()=>toast.error('Please Answer The Question!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    const [selected , setSelected] = useState();
    const navigate= useNavigate()

    const checkHandler =(item)=>{
        setSelected(item)
        if(item == currentQuestion.correct_answer){
            setScore(score + 1)
        }
    }

  const selectHandler =(item)=>{
        if(selected===item && selected===currentQuestion.correct_answer){
            return "right"
        }else if(selected === item && selected !== currentQuestion.correct_answer){
            return "wrong"
        }else if(item === currentQuestion.correct_answer ){
            return "right"
        }
  }

  const nextHandler = ()=>{
    const index = data.questions.findIndex(item => item.correct_answer === currentQuestion.correct_answer)
    if(index === 9){
      navigate("/result")
    }else{
        if(!selected){
            notify()
            return
        }
        fetchCurrent(index + 1)
        setSelected()

    }
  }

  const numberQuestion =()=>{
    const index = data.questions.findIndex(item => item.correct_answer === currentQuestion.correct_answer)
    return index + 1
  }

    return(
        <>
        <ToastContainer />
        <div className="info">
            
            <h1>Welcome , {name}</h1>
            <span className="score">{score}</span>
            <span>{currentQuestion.category}</span>
        </div>
        <div className="details">
            
        </div>
        <div className="question-box">
          
            <h2>
                <span>Question {numberQuestion()} / 10 :</span>{currentQuestion.question} 
            </h2>
            <div className="options">
                {
                    options.map(item => (
                        <button 
                          onClick={()=>checkHandler(item)}
                          key={item}
                          className={`option ${selected && selectHandler(item)}`}
                          disabled={selected && true}  
                        >
                            {item}
                        </button>
                    ))
                }
            </div>
            <div className="buttons">
                <button className="quit" onClick={()=>navigate("/result",{replace:true})}>quit</button>
                <button className="next" onClick={nextHandler}>next</button>
            </div>
        </div>
        
    </>
    )
}

export default Question;