import React from "react"
import Questions from "./Questions";
import he from "he"

export default function Quiz(){
    const [questions, setQuestions] = React.useState({})
    const [load, setLoad] = React.useState(false)
    const [answers, setAnswers] = React.useState({
        question1 : '',
        question2 : '',
        question3 : '',
        question4 : '',
        question5 : ''
    })

    const [newQuestion, setNewQuestion] = React.useState({
        question : '',
        answers : []
    })
    
    React.useEffect(() => {
        console.log(answers)
    },[answers])
    
    React.useEffect(() => {
        apiCall()
    },[])
    
    async function apiCall(){
        setLoad(false)
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        const data = await response.json()
        const questions = data.results
        console.log(questions)

        const updatedQuestions = await questions.map(item => {
            return {...item, 'answers' : shuffle(answerArray(item))}
        })
        setQuestions(updatedQuestions)
        setLoad(true)
    }

    // function answerArray(array){
    //     array.map(question => {
    //         const wrongAnswers = question.incorrect_answers
    //         const wrongAnswersObj = wrongAnswers.map(answer => {
    //             return {'answer': answer, 'correct': false}
    //         })
    //         const correctAnswer = question.correct_answer
    //         const correctAnswerObj = {'answer': correctAnswer, 'correct': true}
    //         const questionList = [...wrongAnswersObj, correctAnswerObj]
    //         console.log(questionList)
    //         return questionList
    //     })
    // }

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

//    function validate(e){
//         e.preventDefault()
//         console.log(answers)
//         document.querySelectorAll('.question-answer').forEach(answer => {
            
//             // console.log(answer.getAttribute('data-answer'))
//             // if (answer.data-answer === 'true'){
//             //     answer.setAttribute('class', 'green')
//             // }
//         })
//         // if (answers.question1 === 'true'){
            
//         // }
   
//     }
 
    console.log('answers',questions)
    return (
// make this into its own component with props
        <div>
            <h1>Quizzical</h1>
            <form>
                {/* if load is true map out the question array and render each question with a random order of answer choices */}
                {load && <Questions questions={questions} />}
                {/* {load && questions.map((item, questionIndex) => {
                    const question = item.question
                    const answers = item.answers
                    return (
                        <section key={`question${questionIndex+1}`}>
                            <h2>{he.decode(question)}</h2>
                            <div className="flex">
                            {answers.map((item, answerIndex) => {
                                const answer = item.answer
                                const correct = item.correct
                                return (
                                    <label key={`answer${answerIndex+1}`}>
                                     {correct.toString()}  
                                    <p className="question-answer" data-answer={correct.toString()} >{he.decode(answer)}</p>
                                    <input 
                                    className="hidden question-answer"
                                    type='radio'
                                    // name has to be the same name for the hook for the button to change
                                    name={`question${questionIndex+1}`}
                                    // onClick={() => console.log(question,item)}
                                    onChange={handleChange}
                                    value={correct}/>
                                    </label>
                                )
                            })}
                            </div>
                            <hr/>
                        </section>
                    ) 
                })} */}
                {/* <button onClick={validate}>Submit</button> */}
            </form>    
        </div>
        )

      
    
       
    

}