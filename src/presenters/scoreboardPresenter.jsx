import ScoreboardView from "../views/scoreboardView";


export default
function ScoreboardPresenter(props){

    const dummyUsers = [
        {name : "Mange Schmidt", points: [10, 7, 4, 6,]}, 
        {name: "Marilicous", points: [8, 6, 4, 10, 6]}, 
        {name: "Jalle Dalle", points: [1, 2, 3, 4]},
        {name: "Goop man", points: [2, 3, 4, 5, 6]}
    ]
    
    return (
    <ScoreboardView 
        users = {dummyUsers}
        
    />
    )
}