

function FinishedView(props){

    function onQuit(){
        props.save();
        props.clear();
        window.location.hash="#/";
    }

    async function playQuiz(){
        props.setLoading(true); // Use setLoading from the store
        try {
            await props.update();
            window.location.hash = "#/quiz";
        } finally {
            props.setLoading(false);
        }
    }

    return props.index === props.quiz.length-1
    ? (
    <div className="overflow-hidden bg-gradient-to-b bg-gradient-to-b from-blue-950 to-indigo-800 to-80% backdrop-blur h-screen glass flex flex-col items-center justify-center">
        
        <div className="mb-2 text-left">
            <p className="text-slate-400">Total correct answers</p>
            <p className="text-purple-400">{props.points} out of {props.quiz.length} Questions</p>
        </div>
        <div className="card w-96 text-neutral-content bg-gradient-to-b bg-gradient-to-b from-violet-600 to-violet-800 to-60% shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">Quiz Finished!</h2>
                <p>Your final score is</p> 
                
                <div class="flex items-center justify-center mt-4 z-10  
                h-24 w-24 rounded-full bg-yellow-500 shadow-md"> 
                <span class="text-white font-bold text-2xl"> 
                {props.points}
                </span> </div>
                <img
                    className=" mt-16 animate-wiggle absolute w-36 h-36 z-0"
                    src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1230.gif"
                    alt="Fireworks GIF"/>
                

                <div className=" mt-4 card-actions justify-end">
                </div>
            </div>
        </div>
        <div className="flex flex-row mt-4">
            <button 
                className="btn btn-primary w-40 mr-4"
                onClick={playQuiz}
                >
                Play Again!
            </button>
            <button 
                className="btn btn-secondary w-40 ml-4" 
                onClick={onQuit}>
                Back to Front Page
            </button>
        </div>
    </div>
    )
    : (
    <div className="overflow-hidden bg-gradient-to-b bg-gradient-to-b from-blue-950 to-indigo-800 to-80% h-screen glass flex items-center justify-center">
        <h2 className="text-black">You're not supposed to be here now... </h2>
        <p className="text-black">Finish the quiz before viewing this page</p>
    </div>
    )
}

export default FinishedView;