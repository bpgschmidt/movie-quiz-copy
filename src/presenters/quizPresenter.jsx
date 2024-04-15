import React from 'react';
import { observer } from 'mobx-react';
import store from '../MovieQuizStore';
import QuizView from '../views/quizView';

const QuizPresenter = observer(() => {
    if (store.loading) {
        return <div>Loading quiz...</div>;
    }

    const onAddPoint = () => {
        //! remove 1 when the guys solve the model
        store.incrementPoints(1);
    };

    const onUpdate = () => {
        store.updateCurrentQuiz();
    };

    const onSetCurrentIndex = (num) => {
        console.log('Onsetcurrentindex', num)
        store.setCurrentIndex(num);
    };

    
    console.log("points: ", store.numberOfPoints);
    console.log("Index:", store.quizIndex);
    return (
        <QuizView
            quiz={store.currentQuiz}
            currentIndex={store.quizIndex}
            onUpdate={onUpdate}
            onAddPoint={onAddPoint}
            onSetCurrentIndex={onSetCurrentIndex}
        />
    );
});

export default QuizPresenter;