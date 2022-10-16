import React from "react";
import he from 'he'

export default function Questions(props){


    
    
    // const validation = {
        //     backgroundColor: ' green'
        // }
        const [checkAnswer, setCheckAnswer] =React.useState({})
        const [submitted, setSubmitted] = React.useState(false)
        const [points, setPoints] = React.useState(0)
        const questions = props.questions
        const answers = props.answers
        React.useEffect(() => {
        },[checkAnswer])
        
        React.useEffect(() => {
        },[submitted])
        
        function validate(e){
            const validateQuestion = Object.entries(checkAnswer)
            setPoints(0)
            if (!submitted) {
                e.preventDefault()

            }
            
            // check to see if they havent all be answered
            if (questions.length > validateQuestion.length) {
                alert('you havent answer them all')
                setSubmitted(false)
                return
            }
            
            // checking the obj and returning the key value pairs of it in an array
            // looping through he objects
                for (const entry of validateQuestion) {
                    const [userQuestion, userAnswer] = entry
                    // find the obj.question that is equal to the userQuestion
                    const matchedQuestion = questions.find(obj => obj.question === userQuestion)
                   if (userAnswer === matchedQuestion.correct_answer){
                        setPoints(prevPoints => prevPoints + 1)
                    }
                    
                }

                setSubmitted(prevState => !prevState)
            }

// https://bobbyhadz.com/blog/react-change-style-on-click

            function handleClick(e) {
            }
            
            const renderQuestions = questions.map((item,questionIndex) => {
                const question = item.question
                const answers = item.answers
                return (
                    <section key={`question${questionIndex+1}`}>
                        <h2>{he.decode(question)}</h2>
                        <div className="flex"  >
                            {answers.map((item,answerIndex) => {
                                const answer = item.answer
                                const correct = item.correct
                                const myStyle = {
                                    padding: '1em',
                                    borderRadius: '10px',
                                    backgroundColor: correct ? 'green' : 'red'
                                }
                                return (
                                    <label key={`answer${answerIndex+1}`}>
                                    {/* {correct.toString()}   */}
                                    {submitted ? <p className="question-answer" style={myStyle} >{he.decode(answer)} </p>
                                     : <p className="question-answer" style={{padding: '1em'}} onClick={handleClick}>{he.decode(answer)} </p>}
                                    <input 
                                    className="hidden question-answer"
                                    type='radio'
                                    // name has to be the same name for the hook for the button to change
                                    name={`question${questionIndex+1}`}
                                    // set the value of the radio to a state
                                    // spread the current state, and store the question with the asnwer selected
                                    onClick={() =>  setCheckAnswer(currentState => ({
                                        ...currentState, [question] : answer
                                    }))}
                                    // onChange={handleChange}
                                    value={correct}/>
                                </label>
                                )
                            })}
                        </div>
                    </section>
                )
            })

    return (
        <div>
            {renderQuestions}
            {/* validate needs to check the answers and apply a background color to them */}
            {submitted && <p>you got {points} out of the {questions.length} questions</p>}
            <button onClick={validate}>{!submitted ? 'Submit' : 'Restart'}</button>
        </div>
    )

}


  