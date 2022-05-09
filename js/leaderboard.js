function buildTable(tableId){
    let userScores = JSON.parse(localStorage.userScore)
    userScores.sort(function(a, b){return a.score-b.score})
    userScores.reverse()
    for(let i=0; i<10; i++){
        let row = document.createElement("tr")
        let col1 = document.createElement("td")
        let col2 = document.createElement("td")
        if(i<userScores.length){
            col1.innerHTML = userScores[i].username
            col2.innerHTML = userScores[i].score
        }
        row.appendChild(col1)
        row.appendChild(col2)
        tableId.appendChild(row)
    }
}

buildTable(document.getElementById("leaderboardtable"))