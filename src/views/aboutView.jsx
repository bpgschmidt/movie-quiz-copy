import React from 'react';

function AboutView(){

    //To return to frontpage
    function onReturnToFrontPage(){
        window.location.hash="#/";
    }

    return (
        <div className="overflow-hidden bg-gradient-to-b from-blue-950 to-indigo-800 flex flex-col items-center justify-center relative w-screen h-screen">
            <div className="text-center text-white p-6 md:p-12 lg:p-16 w-full max-w-md glass rounded-lg">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">About Action! App</h2>
                <p className="text-sm md:text-base lg:text-lg mb-3">
                    Action! is an exciting quiz app that tests your knowledge of movie release years.
                </p>
                <p className="text-sm md:text-base lg:text-lg mb-3">
                    Created by Filip Maras, Jarl Stephansson, Benjamin Schmidt, and Emil Lidbom, our app is designed to provide an enjoyable and challenging experience for movie enthusiasts.
                </p>
                <p className="text-sm md:text-base lg:text-lg mb-3">
                    Dive into the world of cinema, challenge yourself with questions about when your favorite movies were released, and see how well you know the timeline of film history.
                </p>
                <p className="text-sm md:text-base lg:text-lg mb-5">
                    Are you ready to prove your movie knowledge? Start the quiz now!
                </p>
            <button
                className="btn btn-primary text-base md:text-lg lg:text-xl px-4 py-2 rounded-md cursor-pointer text-white"
                onClick={onReturnToFrontPage}
                >
                Return to Front Page
            </button>
        </div>
    </div>
    );
};

export default AboutView;
