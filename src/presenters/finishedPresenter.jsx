import React from 'react';
import FinishedView from '../views/finishedView';
import {clearDatabase} from  '../utilities/persistance'
import { observer } from 'mobx-react';


const FinishedPresenter = ({ store }) => {
    if (store.loading) {
        return <div className='overflow-hidden bg-gradient-to-b bg-gradient-to-b bg-gradient-to-b 
        from-blue-950 to-indigo-700 to-80% h-screen flex flex-col items-center justify-center relative w-screen min-h'>
                    <div className="loading loading-spinner loading-lg w-48 h-48 mt-48">Loading...</div>
                </div>;
    }
    
    function handleCompleteQuiz(){
        store.completeQuiz();
    }

    function handleClearDatabase(){
        clearDatabase();
    }

    const setLoading = (bool) => {
        store.setLoading(bool);
    }

    const update = async () =>{
        await store.updateCurrentQuiz("topRated");
    }

    return(
        <FinishedView
            save = {handleCompleteQuiz}
            points = {store.currentPoints}
            index ={store.currentIndex}
            quiz = {store.currentQuiz}
            clear = {handleClearDatabase} /* here to clear the temporary db*/
            setLoading={setLoading}
            update={update}
        />
    );
};

export default observer(FinishedPresenter);
