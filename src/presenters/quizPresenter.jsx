import React from 'react';
import { observer } from 'mobx-react';
import QuizView from '../views/quizView';

const QuizPresenter  = ({ store }) => {
    if (store.loading) {
        return  <div className='overflow-hidden bg-gradient-to-b bg-gradient-to-b bg-gradient-to-b from-blue-950 to-indigo-700 to-80% h-screen flex flex-col items-center justify-center relative w-screen h-screen'>
                    <div className="loading loading-spinner loading-lg w-48 h-48">Loading front page...</div>
                </div>;
    }

    const onAddPoint = () => {
        //! remove 1 when the guys solve the model
        store.incrementPoints();
    };
    const onNextIndex = () => {
        store.incrementCurrentIndex();
    }

    const onSetCurrentIndex = (num) => {
        store.setCurrentIndex(num);
    };

    const onCompletedQuiz = () => {
        store.completeQuiz();
    }

    const onQuit = () => {
        store.quitQuiz();
    }

    

    return (
        <QuizView
            quiz={store.currentQuiz}
            currentIndex={store.currentIndex}
            points={store.currentPoints}
            onAddPoint={onAddPoint}
            onSetCurrentIndex={onSetCurrentIndex}
            onNextIndex={onNextIndex}
            onCompletedQuiz={onCompletedQuiz}
            onQuit={onQuit} 
        />
    );
};

export default observer(QuizPresenter);
