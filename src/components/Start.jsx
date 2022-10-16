import React from "react";
import Quiz from "./Quiz";



export default function Start(props){

  const [gameStart, setGameStart] = React.useState(false)

  const [category, setCategory] = React.useState(0)
  
    function startGame(){
        if (category < 9) {
            alert('you must choose a category')
            return
        }
        setGameStart(prevState => !prevState)
    }

    const questionCatergory = {
        categories: {

            'general knowledge': 9,
            'books': 10,
            'film': 11,
            'music': 12,
            'musical':13,
            'tv': 14,
            'video games': 15,
            'board games': 16,
            'science and nature': 17,
            'computers': 18,
            'math': 19,
            'mythology': 20,
            'sports': 21,
            'geography': 22,
            'history': 23,
            'politics': 24,
            'art': 25,
            'celebs': 26,
            'animals': 27,
            'vehicles': 28,
            'comics': 29,
            'gadgets': 30,
            'anime and manga': 31,
            'cartoons and animations': 32,
        },
        difficulty : ['easy', 'medium', 'hard']
    
    }
    
    // turns question category into an array
    const categoryKeys = Object.entries(questionCatergory.categories)
    
    const optionHtml = categoryKeys.map((category, index) => {
        return <option key={index} value={category[1]} >{category[0]}</option>
    
    })

    
    function handleChange(e){
        // + turns a string into a
        setCategory(+e.target.value)


    }
    
    



    return (
        <div>
            <h1>Quizzical</h1>
                {!gameStart && <label htmlFor='category'>
                    <select  defaultValue={'default'} className="categories" name="category" id="category" onChange={handleChange}>
                    <option disabled value="default">Select a category</option>
                     {optionHtml}
                    </select>
                </label>}
                <br/>
            {!gameStart && <button onClick={startGame}>Start Quiz</button>}
            {gameStart && category >= 9 && <Quiz category={category} />}

        </div>
    )
}