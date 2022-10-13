import React from "react";
import he from 'he'

export default function Questions(props){
    
    
    const [submitted, setSubmitted] = React.useState(false)
    const questions = props.questions
    const answers = props.answers
    console.log(props)

       function validate(e){
        e.preventDefault()
        document.querySelectorAll('.question-answer').forEach(answer => {
            
            // console.log(answer.getAttribute('data-answer'))
            // if (answer.data-answer === 'true'){
            //     answer.setAttribute('class', 'green')
            // }
        })
        setSubmitted(prevState => !prevState)
        // if (answers.question1 === 'true'){
            
        // }
   
    }

    const renderQuestions = questions.map((item,questionIndex) => {
                const question = item.question
                const answers = item.answers
                return (
                    <section key={`question${questionIndex+1}`}>
                        <h2>{he.decode(question)}</h2>
                        <div className="flex" >
                            {answers.map((item,answerIndex) => {
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
                                    // set the value of the radio to a state
                                    onClick={() => console.log(question,item)}
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
            <button onClick={validate}>{!submitted ? 'Submit' : 'Restart'}</button>
        </div>
    )

}


  