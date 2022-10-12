import React from "react";

export default function Quiz(){
    const [questions, setQuestions] = React.useState([])
    const [load, setLoad] = React.useState(false)
    
    React.useEffect(() => {
    },[questions])
    
    React.useEffect(() => {
        apiCall()
    },[])
    
    async function apiCall(){
        setLoad(false)
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        const data = await response.json()
        const questions = data.results

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

 
    
    return (
        // make this into its own component with props
        <form>
            {/* if load is true map out the question array and render each question with a random order of answer choices */}
            {load && questions.map((item, questionIndex) => {
                const question = item.question
                const answers = item.answers
                return (
                    <section key={`question${questionIndex+1}`}>
                        <h2>{question}</h2>
                        <div className="flex">
                        {answers.map((item, answerIndex) => {
                            const answer = item.answer
                            return (
                                <label key={`answer${answerIndex+1}`}>
                                <p>{answer}</p>
                                <input className="hidden" type='radio' onClick={() => console.log(question.question,item)} value={answer ? 1 : 0}/>
                                </label>
                            )
                        })}
                        </div>
                        <hr/>
                    </section>
                ) 
            })}
            <button>Submit</button>
        </form>
    )
       
    

}