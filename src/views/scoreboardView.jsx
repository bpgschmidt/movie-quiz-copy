// props.users = [{name : Mange Schmidt, points: [10, 7, 4, 6,]}, {...}]

function ScoreboardView(props) {
    function scoreTableRowCB(user) {
        // Calculate highest and average points
        const highestPoint = Math.max(...user.points);
        const averagePoint = user.points.reduce((acc, point) => acc + point, 0) / user.points.length;
  
        return (
        <tr key={user.name} className="border-t border-black">
            <th>{user.name}</th>
            <td>{highestPoint}/10 points</td>
            <td>{averagePoint.toFixed(2)}/10 points</td>
        </tr>
        );
    }
  
    // Sort users by highest points in descending order
    const sortedUsers = [...props.users].sort((a, b) => Math.max(...b.points) - Math.max(...a.points));
  
    return (
        <div className="w-screen bg-yellow-200 h-screen">
            <div className="mt-5 ml-20 mr-20 mb-5">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
                Scoreboard
            </h1>
            <table className="table">                
                <thead>
                <tr className="border-b border-black">
                    <th>User</th>
                    <th>Highscore</th>
                    <th>Average</th>
                </tr>
                </thead>
                <tbody>{sortedUsers.map(scoreTableRowCB)}</tbody>
            </table>
            </div>

            <div className="text-center">
                <button 
                className="btn"
                onClick={() => window.location.hash="#/"}>
                    Back to front page
                </button>
            </div>
        </div>

        );
  }
  
  export default ScoreboardView;
  