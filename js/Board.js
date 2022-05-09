class Board{
    constructor(bgCanvas, bgContext, canvas, context, ghostCanvas, ghostContext, boardArr){
        this.bgCanvas = bgCanvas
        this.bgContext = bgContext
        this.boardArr = boardArr
        this.canvas = canvas
        this.context = context
        this.ghostCanvas = ghostCanvas
        this.ghostContext = ghostContext
        this.boxesArr = []
        this.pointsArr= []
        this.maxScore = 0
        this.draw()
    }

    draw(){
        let ctx = this.context
        let bgCtx = this.bgContext

        this.canvas.height = 0
        this.canvas.width = 0
        this.bgCanvas.height = 0
        this.bgCanvas.width = 0
        this.ghostCanvas.height = 0
        this.ghostCanvas.width = 0
        for (let line in this.boardArr){
            this.canvas.height += 30
            this.bgCanvas.height += 30
            this.ghostCanvas.height += 30
        }

        for (let box in this.boardArr[0]){
            this.canvas.width += 30
            this.bgCanvas.width += 30
            this.ghostCanvas.width += 30
        }

        bgCtx.fillStyle = "black"
        bgCtx.fillRect(0, 0, this.bgCanvas.width, this.bgCanvas.height)
        ctx.beginPath()
        ctx.rect(0, 0, this.canvas.width, this.canvas.height)
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.closePath()

        let lineNum = 0
        for (let line of this.boardArr){
            let colNum = 0
            for (let squ of line){
                if (squ == 1){
                    let currentBox = new Box(this.context, colNum, lineNum)
                    this.boxesArr.push(currentBox)
                    currentBox.draw()
                }
                else if(squ == undefined){
                    let currentPoint = new Point(this.context, colNum, lineNum)
                    this.pointsArr.push(currentPoint)
                    currentPoint.draw()
                    this.maxScore += 1
                }
                colNum += 30
            }
            lineNum += 30
        }
    }

    getMaxScore(){
        return this.maxScore
    }
}