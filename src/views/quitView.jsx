

function QuitView(props){
    //Handler for saving and quiting
    function handleExit(){
        props.onQuit();
        window.location.hash="#/";
    }

    function handleBack(){
        window.location.hash="#/quiz"
    }

    return(
        <div className="bg-gradient-to-b bg-gradient-to-b from-blue-950 to-indigo-800 to-80% glass">
            <div className="flex items-center justify-center h-screen">
                <div className="card w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                    <h2 className="card-title">Exit</h2>
                    <p>Are you sure you want to exit the quiz?</p>
                    <div className="card-actions justify-center">
                        <button 
                        className="btn btn-primary"
                        onClick={handleExit}>Exit to front page</button>
                        <button 
                        className="btn btn-ghost"
                        onClick={handleBack}>Back to quiz</button>
                    </div>
                    </div>
                </div>
            </div>  
        </div>
        );
} 

export default QuitView;