import React from "react"
import Questions from "./Questions";
import he from "he"

export default function Quiz(){
    
    const [questions, setQuestions] = React.useState({})
    const [load, setLoad] = React.useState(false)
    
    React.useEffect(() => {
        apiCall()
    },[])
    
    

    async function apiCall(){
        setLoad(false)
        // normal api https://opentdb.com/api.php?amount=5&type=multiple
        const response = await fetch('https://opentdb.com/api.php?amount=5&category=29&type=multiple&')
        const data = await response.json()
        const questions = data.results

        const updatedQuestions = await questions.map(item => {
            return {...item, 'answers' : shuffle(answerArray(item))}
        })
        // console.log(updatedQuestions)
        setQuestions(updatedQuestions)
        setLoad(true)
        return questions
    }

    function answerArray(obj){
       const incorrectAnswers = obj.incorrect_answers.map(answer => {
            return {'answer' : answer, 'correct': false}
        })
        const correctAnswer = { 'answer' : obj.correct_answer, 'correct' : true}
        const answerArray = [...incorrectAnswers, correctAnswer]
        return answerArray
    }

    function shuffle(array){
        let m = array.length
        let t
        let i 

        // while there are elements to shuffle
        while(m) {
            // Pick a random item from the array
            i = Math.floor(Math.random() * m--);

            // Swap elements
            t = array[m]
            array[m] = array[i]
            array[i] = t
        }
        return array
    }


    function handleChange(e){
        const {name, value} = e.target
        setAnswers(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

   function validate(e){
        e.preventDefault()
        setSubmitted(prevState => !prevState)   
    }
 
    return (
// make this into its own component with props
        <div>
            <h1>Quizzical</h1>
            <form >
                {/* if load is true map out the question array and render each question with a random order of answer choices */}
                {load && <Questions questions={questions} apiCall={() => apiCall} />}
              
                    {/* <button onClick={validate} >{!submitted ? 'Submit' : 'Restart'}</button> */}

            </form>    
        </div>
        )

      
    
       
    

}