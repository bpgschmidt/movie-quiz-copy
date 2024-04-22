function ScoreboardView(props) {

    function scoreTableRow(user) {
        if (!user.name) return null;
        // Calculate average points
        const averagePoint = user.completedQuizes > 0
            ? (user.points / user.completedQuizes).toFixed(2)
            : 0;
        console.log(user.points, user.completedQuizes, user.name);
    
        return (
            <tr key={user.name.toString()} className="border-t border-white text-white font-semibold">
                <td>{user?.name}</td>
                <td className="text-right">{user.points} points</td>
                <td className="text-right">{averagePoint} points</td>
            </tr>
        );
    }

  
    // Sort users by total points in descending order
    const sortedUsers = props.users.sort((a, b) => b.points - a.points);
  
    return (
        <div className="overflow-hidden bg-gradient-to-b bg-gradient-to-b from-blue-950 to-indigo-700 to-80% h-screen">
  <div className="mt-5 mx-2 md:mx-10 lg:mx-20 mb-5 glass p-6 md:p-12">
    <h1 className="mb-4 text-2xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-white text-center">
      Scoreboard
    </h1>
    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-white text-xl md:text-2xl">
            <th className="text-left font-bold">User</th>
            <th className="text-right font-bold">Total Points</th>
            <th className="text-right font-bold">Average Score</th>
          </tr>
        </thead>
        <tbody>{sortedUsers.map(scoreTableRow)}</tbody>
      </table>
    </div>
  </div>

  <div className="text-center fixed bottom-0 left-0 w-full p-8">
    <button
      className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-red-700 hover:text-white mt-2"
      onClick={() => window.location.hash = "#/"}>
      Back to front page
    </button>
  </div>
</div>
    );
}

export default ScoreboardView;
