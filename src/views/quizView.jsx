import { useState } from 'react';

function QuizView(props){
  //Hook for user's selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  //Hook to show results when answer is made
  const [showResult, setShowResult] = useState(false);

  let currentQuestion = props.quiz[props.currentIndex];
  
  function handleNextQuestion(){
    setShowResult(false);
    setSelectedAnswer(0);
    props.onNextIndex();
    console.log("props index", props.currentIndex);
    // send new index to model
  }
    
  //Callback for each question's option
  function renderOptionsCB(alternatives, index){
    
    //Handler for when answer is clicked
    function handleAnswerClick(){
      if (!showResult){
          setSelectedAnswer(index);
          setShowResult(true);
          
          if(alternatives.isCorrect){
            props.onAddPoint();
          }
        }
      };

      return alternatives? (
        <button className='btn outline-none mt-2 ml-1 mr-1 p-10 text-black transition ease-in-out delay-50 hover:scale-110'
          key={index}
          onClick={handleAnswerClick}
          disabled={showResult}
          style={{
            backgroundColor:
              !showResult? 
                index===0? '#E63462':
                index===1? '#F3A712':
                index===2? '#A8C686':
                index===3? '#669BBC': ''
                :
              selectedAnswer === index
                ? (alternatives.isCorrect
                  ? '#16a34a' //Change the button to green if it's correct
                  : '#b91c1c' ) //Otherwise red
                : alternatives.isCorrect
                ? '#16a34a'
                : '',
              color: 'white',
                  
          }}>
          {alternatives.year}
        </button>
      ) : null
    };

    return (
        <div className="overflow-hidden bg-gradient-to-b bg-gradient-to-b from-blue-950 to-indigo-800 to-80% text-white min-h-screen">
          <div className='flex flex-col items-center'>
            <div className='mt-4'>
            </div>
              
             <h1 className=' text-4xl font-extrabold leading-none tracking-tight mb-4' style={{fontFamily: 'Lobster'}}>Action!</h1>
              <div className='flex flex-col items-center justify-center relative glass pt-6 pl-24 pr-24 rounded-xl'>
              <h1 className='text-xl md:text-2xl lg:text-3xl text-center mb-4 font-bold leading-none tracking-tight md:underline decoration-auto underline-offset-8'>
              What year was {currentQuestion.title} released?
              </h1>
              <img className='object-cointain transition ease-in-out delay-150 hover:scale-110 w-60 h-60' src={currentQuestion.poster} alt={currentQuestion.title} />

              <div className='grid grid-cols-2 mb-5'>{currentQuestion.alt[0].map(renderOptionsCB)}</div>
              
              {showResult
              ? (  
                <div>
                  {currentQuestion.alt[0][selectedAnswer].isCorrect 
                  ? (
                    <p 
                      className='text-center mb-3 font-bold' 
                      style={{ color: 'green' }}
                      >Correct!</p>
                    ) 
                    : (
                      <p 
                        className='text-center mb-3 font-bold' 
                        style={{ color: 'red' }}
                        >Wrong!</p>
                      )}
              </div>
              ) : null
            }
            <div className='flex flex-row mb-14 rounded-lg'>
              <button className="btn btn-neutral" onClick={() => window.location.hash="#/quit"}>Quit</button>
              <p className='p-3 ml-8 mr-6 text-white font-bold'>points : {props.points}</p>
              <button className={showResult? 'btn btn-primary animate-pulse' : 'btn btn-neutral'}
                      onClick={props.currentIndex !== props.quiz.length - 1? handleNextQuestion : () => window.location.hash="#/finished"} 
                      disabled={!showResult}>
                      {props.currentIndex !== props.quiz.length - 1? "Next Question" : "Finish Quiz"}
              </button>
            </div>
            </div>  
          </div>
        </div>
    )
    
}
export default QuizView