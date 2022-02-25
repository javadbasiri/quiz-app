import React,{useState} from "react"
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { MenuItem } from "@mui/material";
import Categories from "../components/data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import svg from "../quiz.svg";
import "./home.css"

const Home =({ name,setName,getQuestionsApi })=>{
    const notify =()=>toast.error('Complete All Fields!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    
    const [category , setCategory] = useState("")
    const [difficulity , setDifficulity] = useState("")

    const navigate = useNavigate()

    const startHandler =()=>{
        if(name=="" || category=="" || difficulity==""){
            notify()
        }else{
            getQuestionsApi(category , difficulity)
            navigate("/quiz")
        }
    }
    return(
        <div className="home-container">
            <ToastContainer />
            <div className="inputs">
                <TextField value={name} onChange={(e)=>setName(e.target.value)} className="input" id="outlined-basic" label="Enter your name" variant="outlined" />

                <TextField
                    className="input"
                    id="outlined-select-currency"
                    select
                    label="Select category"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                >
                   {
                       Categories.map(item=>(
                           <MenuItem key={item.category} value={item.value}>{item.category}</MenuItem>
                       ))
                   }
                </TextField>

                <TextField
                    className="input"
                    id="outlined-select-currency"
                    select
                    label="Select dificality"
                    value={difficulity}
                    onChange={(e)=>setDifficulity(e.target.value)}
                >
                    <MenuItem value="easy">
                        Easy
                    </MenuItem>
                    <MenuItem value="medium">
                        Medium
                    </MenuItem>
                    <MenuItem value="hard">
                        Hard
                    </MenuItem>
                </TextField>

                <Button onClick={startHandler} variant="contained">Start quiz</Button>
            </div>
            <img src={svg} alt="svg"/>
        </div>
    )
}

export default Home;