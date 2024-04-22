import React from 'react';
import ReactCurvedText from 'react-curved-text';
import { observer } from 'mobx-react';
import store from '../MovieQuizStore'; // Import the store directly


function FrontPageView(props){

    function onLogIn(){
        props.onLogIn(); // Use signInWithGoogle from the store
    }
    function onLogOut(){
        props.onLogOut();
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

    return(
        <body className='overflow-hidden'>
            <div className="bg-gradient-to-b bg-gradient-to-b bg-gradient-to-b from-blue-950 to-indigo-700 to-80% h-screen">
                <div className='backdrop-blur h-screen'>
                    <div className='relative'>    
                        <div className='hidden lg:block text-center absolute top-0 mt-10 right-0 left-0 ml-auto mr-auto z-0;'>
                            <h2 
                            style={{
                                fontSize: 30,
                                fill: 'white',
                                fontFamily: 'Pacifico',
                            }}
                            className='text-white leading-none tracking-tight'>
                                Prove your knowledge of film history!
                            </h2>
                        </div>
                        <div className={'absolute top-0 right-0 mt-8 mr-5 glass rounded-lg pl-6 text-white font-bold'}>
                            <span className={'hidden md:inline-block'}>{props.currentUser? `Welcome ${props.currentUser.displayName}!` : null}</span>
                            <button className='btn ml-5 dark:text-white font-bold text-black' onClick={props.currentUser? onLogOut : onLogIn}>
                                {props.currentUser? "Sign out" : "Sign in"}
                            </button>
                        </div>
                        <div className="dropdown mt-5 ml-5">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle w-14 h-14">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-14 h-14 stroke-current text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black dark:text-white">
                                <li><a href="#/about">About</a></li>
                                <li><a href="#/scoreboard">Scoreboard</a></li>
                                <li><a href="https://www.imdb.com/" >IMDb</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <img className="hidden lg:block drop-shadow-xl animate-wiggle absolute mt-48 ml-48 " src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-flat/96/Popcorn-Flat-icon.png" width="96" height="96" alt="popcorn"></img>
                    <img className="hidden lg:block drop-shadow-xl animate-wiggle absolute right-48 mt-48" src="https://icons.iconarchive.com/icons/ergosign/cinema/128/3D-Glasses-icon.png" width="128" height="128" alt="3D-glasses"></img>
                    <img className="hidden lg:block drop-shadow-xl absolute ml-96 mt-20" src="https://icons.iconarchive.com/icons/psdblast/flat-christmas/48/star-icon.png" width="48" height="48" alt="star"></img>
                    <img className="hidden lg:block drop-shadow-xl absolute bottom-48 right-96" src="https://icons.iconarchive.com/icons/psdblast/flat-christmas/48/star-icon.png" width="40" height="40" alt="star"></img>
                    <img className="hidden lg:block drop-shadow-xl animate-wiggle absolute bottom-48 left-80 invert" src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-mono/128/Clapper-Board-icon.png" width="128" height="128" alt="clapper board"></img>
                    <img className="hidden lg:block drop-shadow-xl animate-wiggle absolute right-96 mt-10 invert" src="https://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Firing-Gun-icon.png" width="128" height="128" alt="firing"></img>
                    
                    <div className="drop-shadow-xl mt-20 flex flex-col items-center justify-center min-h relative min-w-screen">
                    <ReactCurvedText
                    width={600}
                    height={450}
                    cx={300}
                    cy={300}
                    rx={200}
                    ry={200}
                    startOffset={200}
                    reversed={true}
                    text="Action!"
                    textProps={{ style: { 
                        fontSize: 80, fill: 'white', fontFamily: 'Lobster'
                    } }}
                    textPathProps={null}
                    tspanProps={null}
                    ellipseProps={null}
                    svgProps={null}
                    />
                    
                        {store.loading && <span className='loading loading-spinner loading-lg'/>}

                        <button className="drop-shadow-2xl btn btn-circle w-48 h-48 mb-32 absolute bottom-0 transform border-8 border-white hover:border-red-700"
                                onClick={props.currentUser? playQuiz : ()=>document.getElementById('my_modal_3').showModal()}>
                                    <img 
                                        className="drop-shadow-xl"
                                        src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/red-play-button-icon.png"
                                        alt="Play"
                                    />
                            {/*<p className="text-7xl font-mono text-black hover:text-yellow-400">&gt;</p>*/}
                        </button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box text-wrap">
                                <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold lg:text-lg flex items-center justify-center">User not signed in!</h3>
                                <p className="py-4 flex items-center justify-center">Please sign in with Google to play the quiz.</p>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default observer(FrontPageView);
