function saveScore(totalScore){
    if(sessionStorage["loggedIn"]!=null){
        let userScores = JSON.parse(localStorage.userScore)
        let obj = {}
        obj.username = sessionStorage["loggedIn"]
        obj.score = totalScore
        userScores.push(obj)
        localStorage.setItem("userScore", JSON.stringify(userScores))
    }
}

function checkGameOver(ghostArr, player){
    for (let ghost of ghostArr){
        if(ghost.collideDeath(player) || player.collideDeath(ghost)){
            console.log("Game Over")
            player.setGameOver(true)
            for (let ghostOver of ghostArr){
                ghostOver.setGameOver(true)
            }
            return true
        }
    }
    return false
}

// Creates game
function mainGame(scoreP, timeP, gameOverimg, totalScoreP){
    // array to draw board. 1 rep a wall, whitespace rep an empty space
    boardArr = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1, , , , , , , , ,1, , , , , , , , ,1],
        [1, ,1,1, ,1,1,1, ,1, ,1,1,1, ,1,1, ,1],
        [1, , , , , , , , , , , , , , , , , ,1],
        [1, ,1,1, ,1, ,1,1,1,1,1, ,1, ,1,1, ,1],
        [1, , , , ,1, , , ,1, , , ,1, , , , ,1],
        [1,1, ,1, ,1,1,1, ,1, ,1,1,1, ,1,1, ,1],
        [1, , ,1, ,1, , , , , , , ,1, ,1, , ,1],
        [1, ,1,1, ,1, ,1,1,1,1,1, ,1, ,1, ,1,1],
        [1, , , , , , , , , , , , , , , , , ,1],
        [1, ,1,1, ,1, ,1,1,1,1,1, ,1, ,1,1, ,1],
        [1, , ,1, ,1, , , , , , , ,1, ,1, , ,1],
        [1,1, ,1, ,1, ,1,1,1,1,1, ,1, ,1, ,1,1],
        [1, , , , , , , , ,1, , , , , , , , ,1],
        [1, ,1,1, ,1,1,1, ,1, ,1,1,1, ,1,1, ,1],
        [1, , ,1, , , , , , , , , , , ,1, , ,1],
        [1,1, ,1, ,1, ,1,1,1,1,1, ,1, ,1, ,1,1],
        [1, , , , ,1, , , ,1, , , ,1, , , , ,1],
        [1, ,1,1,1,1,1,1, ,1, ,1,1,1,1,1,1, ,1],
        [1, , , , , , , , , , , , , , , , , ,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]

    let canvas = document.getElementById("canvasGame")
    let context = canvas.getContext("2d")
    let bgCanvas = document.getElementById("canvasBG")
    let bgContext = bgCanvas.getContext("2d")
    let ghostCanvas = document.getElementById("canvasGhost")
    let ghostContext = ghostCanvas.getContext("2d")
    let boardGame = new Board(bgCanvas, bgContext, canvas, context,ghostCanvas, ghostContext, boardArr)
    let timer =0
    let ghostsArr = [new Ghost(boardGame.ghostContext, 30, 30, "green", boardGame.boxesArr),
    new Ghost(boardGame.ghostContext, 30, 570, "pink", boardGame.boxesArr),
    new Ghost(boardGame.ghostContext, 510, 570, "red", boardGame.boxesArr),
    new Ghost(boardGame.ghostContext, 510, 30, "purple", boardGame.boxesArr)]
    let player = new Pacman(boardGame.context, 270,270, boardGame, ghostsArr)
    
    window.addEventListener("keydown", function(event){
        if (event.key == "a" && !player.gameOver){
            player.move(-1, 0, boardGame.boxesArr, boardGame.pointsArr)
        }
        if (event.key == "d" && !player.gameOver){
            player.move(1, 0, boardGame.boxesArr, boardGame.pointsArr)
        }
        if (event.key == "w" && !player.gameOver){
            player.move(0, -1, boardGame.boxesArr, boardGame.pointsArr)
        }
        if (event.key == "s" && !player.gameOver){
            player.move(0, 1, boardGame.boxesArr, boardGame.pointsArr)
        }
    })

    let winningInterval = setInterval(()=>{
        scoreP.innerHTML = "Score collected: " + player.getCurrentScore()
        if(player.getCurrentScore() >= boardGame.getMaxScore()){
            console.log("You Won")
            clearInterval(winningInterval)
            let totalScore = player.getCurrentScore + 1000*(1/(timer))
            totalScoreP.innerHTML = "Total Score: " + totalScore
            saveScore(totalScore)
        }
        if(checkGameOver(ghostsArr, player)){
            clearInterval(winningInterval)
            gameOverimg.style = "position: absolute; padding-top: 220px;margin-left: -35px; display:block;"
            let totalScore = player.getCurrentScore()
            totalScoreP.innerHTML = "Total Score: " + totalScore
            saveScore(totalScore)
        }
    })

    let timerInterval = setInterval(()=>{
        if(player.getGameOver()){
            clearInterval(timerInterval)
        }
        timer += 1
        timeP.innerHTML = "Time: " + timer
    }, 1000)

}

document.addEventListener("DOMContentLoaded", function(event) { 
    let footer = document.getElementById("footer")
    footer.style = "display: none"
});


mainGame(document.getElementById("score"), 
    document.getElementById("time"),
    document.getElementById("gameOverimg"),
    document.getElementById("totalScore"))