import React from 'react';
import ReactCurvedText from 'react-curved-text';
import { observer } from 'mobx-react';
import store from '../MovieQuizStore'; // Import the store directly
import { AuthContext } from '../contexts/AuthContext';
import { logout } from './authView';
import { useState, useContext } from 'react';

function FrontPageView(props){
    //const [loading, setLoading] = useState(false)
    
    //?const { currentUser } = store;
    const { currentUser } = useContext(AuthContext);

    function onLogIn(){
        props.onLogIn(); // Use signInWithGoogle from the store
    }
    function onLogOut(){
        props.onLogOut();
    }

    async function playQuiz(){
        props.setLoading(true); // Use setLoading from the store
        try {
            props.update();
            window.location.hash = "#/quiz";
        } finally {
            props.setLoading(false);
        }
    }

    return(
        <div className="bg-gradient-to-b from-purple-700 from-20% to-blue-400 to-80% h-screen">
            <div className='relative'>    
                <div className="dropdown mt-5 ml-5">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-10 h-10 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href="#/about">About</a></li>
                        <li><a href="#/scoreboard">Scoreboard</a></li>
                        <li><a href="https://www.imdb.com/" >IMDb</a></li>
                    </ul>
                </div>
                <div className='absolute top-0 right-0 mt-5 mr-5'>
                    <span>{currentUser? `Welcome ${currentUser.displayName}!` : null}</span>
                    <button className='btn ml-5' onClick={currentUser? onLogOut/*Doesn't work*/ : onLogIn}>
                        {currentUser? "Sign out" : "Sign in"}
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center min-h relative w-screen">
            <ReactCurvedText
            width={300}
            height={300}
            cx={150}
            cy={150}
            rx={100}
            ry={100}
            startOffset={80}
            reversed={true}
            text="Action!"
            textProps={{ style: { fontSize: 50 } }}
            textPathProps={null}
            tspanProps={null}
            ellipseProps={null}
            svgProps={null}
            />
                {store.loading && <span className='loading loading-spinner loading-lg'/>}

                <button className="btn btn-outline w-48 h-48 rounded-full focus:outline-none absolute bottom-0 transform -translate-y-1/3" 
                        onClick={currentUser? playQuiz : onLogIn}>
                    <p className="text-7xl font-mono">&gt;</p>
                </button>
                <p className="text-lg text-white-700 mt-30 mb-30">The best movie quiz on the internet according to Ludaquiz, Quiz Rock, and Quiztopher Nolan!</p>
            </div>
        </div>
    );
}

export default observer(FrontPageView);
