import React, { useState, useEffect } from 'react';
import { fetchData, getMovieDetails, getTopHundred } from '../apiSource';
import resolvePromise from '../resolvePromise';

const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr';

function ApiDisplay(props) {
    console.log("ApiDisplay")

    useEffect(() => {
        async function fetchData() {
            await props.model.updateCurrentQuiz();
        }
        fetchData();
    }, []);

    return (
        <div>
            {/*console.log(result)*/}
        </div>
    );
}

export default ApiDisplay;
