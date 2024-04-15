import React from 'react';

function AboutView(){

    //To return to frontpage
    function onReturnToFrontPage(){
        window.location.hash="#/";
    }

    return (
        <div className="text-center p-4">
            <h2 className="text-2xl font-bold mb-4">About Action! App</h2>
            <p className="text-base mb-3">
                Action! is an exciting quiz app that tests your knowledge of movie release years.
            </p>
            <p className="text-base mb-3">
            Created by Filip Maras, Jarl Stephansson, Benjamin Schmidt, and Emil Lidbom, our app is designed to provide an enjoyable and challenging experience for movie enthusiasts.
            </p>
            <p className="text-base mb-3">
                Dive into the world of cinema, challenge yourself with questions about when your favorite movies were released, and see how well you know the timeline of film history.
            </p>
            <p className="text-base mb-3">
                Are you ready to prove your movie knowledge? Start the quiz now!
            </p>
            <button 
                className= "text-lg px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
                onClick={onReturnToFrontPage}
                >
                Return to Front Page
            </button>
        </div>
    );
};

export default AboutView;
