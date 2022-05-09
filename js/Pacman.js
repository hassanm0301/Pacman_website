class Pacman extends MovingComponent {
    constructor(context, posx, posy, board, ghostsArr){
        super(context, posx, posy)
        this.MAXANGLE = 0.25*Math.PI
        this.movement = [0,0]
        this.nextMove = [0,0]
        this.currentAngle = this.MAXANGLE
        this.closing = false
        this.score = 0
        this.board = board
        this.ghostsArr = ghostsArr
        this.move(-1, 0, board.boxesArr, board.pointsArr)
    }


    draw(){

        let ctx = this.context
        let direction = 0

        ctx.fillStyle = "black"
        if(this.movement[0] == 1){
            direction = 0
            ctx.fillRect(this.right,this.top,-31*this.movement[0],30)
        }
        else if(this.movement[0] == -1){
            direction = Math.PI
            ctx.fillRect(this.left,this.top,-31*this.movement[0],30)
        }
        else if(this.movement[1] == -1){
            direction = 1.5*Math.PI
            ctx.fillRect(this.left,this.top,30,-31*this.movement[1])
        }
        else if(this.movement[1] == 1){
            direction = 0.5*Math.PI
            ctx.fillRect(this.left,this.bottom,30,-31*this.movement[1])
        }


        if(this.currentAngle == this.MAXANGLE/20){
            this.closing = false
        }
        if(this.currentAngle == this.MAXANGLE){
            this.closing = true
        }
        if(this.closing){
            this.currentAngle -= this.MAXANGLE/20
        }
        else{
            this.currentAngle += this.MAXANGLE/20
        }
        ctx.beginPath()
        ctx.arc(this.left+15, this.top+15, 15, direction + this.currentAngle, direction-this.currentAngle)
        ctx.lineTo(this.left+15,this.top+15)
        ctx.fillStyle = "yellow"
        ctx.fill()
        
    }

    move(movex, movey, boxesArr, pointsArr){
        
        // prevents acceleration by movement on same dir twice
        if ((this.movement[1] == movey || this.movement[0] == movex) && (this.movement[0] != this.movement[1])){
            return
        }

        // assigns direction as next move if trying to change direction when object is moving
        if(this.movement[0] != 0 || this.movement[1] != 0){
            this.nextMove = [movex, movey]
            return
        }
        
        this.movement = [movex, movey]

        // main function for movement
        let moveInterval = setInterval(()=>{
            
            // checks if next movement can be made
            if((this.nextMove[0] != 0 || this.nextMove[1] != 0) && (this.top%30 == 0 && this.left%30 == 0)){
                if(this.waitNextMove(boxesArr, pointsArr)){
                    clearInterval(moveInterval)
                    return
                }
            }

            if(this.movement == [0,0]){
                clearInterval(moveInterval)
                return
            }
            
            // iterates through all boxes to find if Pacman will collide with any
            for (let box of boxesArr){
                if (this.collide(box)){
                    this.stop()
                    clearInterval(moveInterval)
                    return
                }
            }

            // renders movement of pacman
            
            this.top += movey
            this.bottom += movey
            this.right += movex
            this.left += movex
            
            this.draw()
            this.calcScore(pointsArr)
            
        }, 5) //updated every 5ms
        
    }

    calcScore(pointsArr){
        let i=0
        for (let point of pointsArr){
            if(this.collidePoint(point)){
                this.score += 1
                pointsArr.splice(i, 1)
                console.log(this.score)
            }
            i++
        }
    }

    collidePoint(otherComp){
        if(this.top==otherComp.top && this.left ==otherComp.left){
            return true
        }
        return false
    }

    waitNextMove(boxesArr, pointsArr){
        // next move right
        if(this.nextMove[0] == 1){
            let opening = true
            for(let box of boxesArr){
                if(this.top == box.top && this.right == box.left){
                    opening = false
                }
            }
            if (opening){
                this.nextMove = [0,0]
                this.stop()
                this.move(1,0,boxesArr, pointsArr)
                return true
            }
        }

        // next move left
        if(this.nextMove[0] == -1){
            let opening = true
            for(let box of boxesArr){
                if(this.top == box.top && this.left == box.right){
                    opening = false
                }
            }
            if (opening){
                this.nextMove = [0,0]
                this.stop()
                this.move(-1,0,boxesArr, pointsArr)
                return true
            }
        }

        // next move top
        if(this.nextMove[1] == -1){
            let opening = true
            for(let box of boxesArr){
                if(this.top == box.bottom && this.left == box.left){
                    opening = false
                }
            }
            if (opening){
                this.nextMove = [0,0]
                this.stop()
                this.move(0,-1,boxesArr, pointsArr)
                return true
            }
        }

        // next move bottom
        if(this.nextMove[1] == 1){
            let opening = true
            for(let box of boxesArr){
                if(this.bottom == box.top && this.left == box.left){
                    opening = false
                }
            }
            if (opening){
                this.nextMove = [0,0]
                this.stop()
                this.move(0,1,boxesArr, pointsArr)
                return true
            }
        }
    
        return false
        
    }

    getCurrentScore(){
        return this.score
    }

}