import { current } from '@reduxjs/toolkit';
import { useState } from 'react';

function QuizView(props){
  
  //Hook for user's selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  //Hook to show results when answer is made
  const [showResult, setShowResult] = useState(false);
  //Hook to tell which question we are on
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);
  //state for determining if the message box should render
  const [isVisible, setIsVisible] = useState(false);

  const [points, setPoints] = useState(0);

  let currentQuestion = props.quiz[currentIndex]

  
  function handleNextQuestion(){
    setShowResult(false);
    setSelectedAnswer(0);
    props.onSetCurrentIndex(currentIndex +1);
    setCurrentIndex(currentIndex + 1);
    // send new index to model
  }
  
  function handleQuit(){
    //Handler for saving and quiting
    function handleSaveAndExit(){
      props.onUpdate();
      window.location.hash="#/";
    }
    
    //Render until we click one of the buttons
    return isVisible? (
      <div>
          <h2>Are you sure you want to exit the quiz?</h2>
          <button className="btn" onClick={handleSaveAndExit}>
            Save & Exit
          </button>     
          <button className="btn btn-circle" onClick={() => {setIsVisible(false)}}>
            X
          </button>
        </div>
      ) 
      : null;
    }
    
    //Callback for each question's option
    function renderOptionsCB(alternatives, index){
      
      //Handler for when answer is clicked
      function handleAnswerClick(){
        if (!showResult){
            setSelectedAnswer(index);
            setShowResult(true);
            
            if(alternatives.isCorrect){
              setPoints(points+1);
              props.onAddPoint();
            } else{
              setPoints(points);
            } 
          }
        };

        return alternatives? (
          <button className='btn mt-5 ml-1 mr-1 p-10'
            key={index}
            onClick={handleAnswerClick}
            disabled={showResult}
            style={{
              backgroundColor:
                (showResult && selectedAnswer === index)
                  ? (alternatives.isCorrect
                    ? 'green' //Change the button to green if it's correct
                    : 'red' )//Otherwise red
                  : '',
            }}>
            {alternatives.year}
          </button>
        ) : null
      };

    return (
        <div className='flex flex-col items-center '>
          points : {points}
          {handleQuit()}
          {!isVisible? (

            <div className='flex flex-col items-center justify-center min-h relative'>
            <h1 className='text-xl'>What year was {currentQuestion.title} released?</h1>
            <img className='object-cointain transition ease-in-out delay-150 hover:scale-110 w-60 h-60' src={currentQuestion.poster} alt={currentQuestion.title} />

            <div className='grid grid-cols-2 mb-5'>{currentQuestion.alt[0].map(renderOptionsCB)}</div>
            
            {showResult
            ? (  
              <div>
                {currentQuestion.alt[0][selectedAnswer].isCorrect 
                ? (
                  <p style={{ color: 'green' }}>Correct!</p>
                  ) 
                  : (
                    <p style={{ color: 'red' }}>Wrong!</p>
                )}
            </div>
            ) : null
            }
          </div>  
          ): null}
          <div className='flex flex-row'>
            <button className="btn" onClick={() => setIsVisible(true)}>Quit</button>
            <button className='btn ml-14'
                    onClick={handleNextQuestion} 
                    disabled={currentIndex === props.quiz.length - 1 || !showResult}>
                    Next Question
            </button>
          </div>
        </div>
    )
    
}
export default QuizView