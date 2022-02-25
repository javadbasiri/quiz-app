import React,{useState} from "react"
import axios from "axios"
import { Route,Routes } from 'react-router';
import Header from "./components/Header";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Quiz from "./pages/Quiz";
import './App.css';

function App() {

  const [name , setName] = useState("")
  const [score , setScore] = useState(0)
  const [data , setData] = useState({
    loading:true,
    questions:[],
    error:""
  })

  const getQuestionsApi = (category , diff)=>{
    axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${diff}&type=multiple`)
      .then(response => setData({
        loading:false,
        questions:response.data.results
      }))
      .catch(err => setData({loading:false,questions:[],error:err.message}))
  }
  
  
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Home name={name} setName={setName} getQuestionsApi={getQuestionsApi}/>}/>
          <Route path="/quiz" element={<Quiz data={data} score={score} setScore={setScore} name={name} />}/>
          <Route path="/result" element={<Result score={score}/>}/>
      </Routes>
    </div>
  );
}

export default App;
