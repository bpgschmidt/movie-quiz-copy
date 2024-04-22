import React, { useEffect } from 'react';
import ScoreboardView from "../views/scoreboardView";
import { observer } from "mobx-react";

const ScoreboardPresenter = ({ store }) => {
    useEffect(() => {
        // Set up the real-time listener
        const unsubscribe = store.fetchAllUsersDataRealtime();

        // Clean up the listener when the component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [store]); // Dependency array ensures this only runs once

    // Use the data from the store to display in the view
    return (
        <ScoreboardView 
            users={store.allUsersData.map(user => ({
                name: user.username,
                points: user.savedPoints,
                completedQuizes: user.completedQuizes
            }))}
        />
    );
};

export default observer(ScoreboardPresenter);
