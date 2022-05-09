class Component{
    constructor(context, posx, posy){
        this.context = context
        this.top = posy
        this.bottom = posy+30
        this.left = posx
        this.right = posx+30
    }

}



// boxes to make obstacles
class Box extends Component{
    draw(){
        let ctx = this.context
        ctx.beginPath()
        ctx.strokeStyle = "blue"
        ctx.fillStyle = "darkblue"
        ctx.rect(this.left, this.top, 30, 30)
        ctx.closePath()
        ctx.fill()
    }
}

// class for yellow points
class Point extends Component{
    draw(){
        let ctx = this.context
        ctx.beginPath()
        ctx.fillStyle = "yellow"
        ctx.arc(this.left+15, this.top+15, 5, 0, 2*Math.PI)
        ctx.fill()
        ctx.closePath()
    }
}

// Abstract class for moving components
class MovingComponent extends Component{

    constructor(context, posx, posy, player){
        super(context, posx, posy)
        this.movement = [0,0]
        this.nextMove = [0,0]
        this.gameOver = false
    }

    // detects if collision will happen if continuing on same movement
    collide(otherComp){
        if((this.left + this.movement[0] == otherComp.right - 1 && this.top == otherComp.top)||
        (this.right + this.movement[0] == otherComp.left + 1 && this.top == otherComp.top)||
        (this.left == otherComp.left && this.bottom + this.movement[1] == otherComp.top + 1)||
        (this.left == otherComp.left && this.top + this.movement[1] == otherComp.bottom - 1)){
            return true
        }
        return false
    }

    collideDeath(otherComp){
        if((Math.abs(this.left-otherComp.left) <= 30 && this.top == otherComp.top)||
        (this.left == otherComp.left && Math.abs(this.top-otherComp.top) <= 30)){
            return true
        }
        return false
    }
 

    stop(){
        this.movement = [0,0]
    }

    setGameOver(val){
        this.gameOver = val
    }

    getGameOver(){
        return this.gameOver
    }
    
}

class Ghost extends MovingComponent{

    constructor(context, posx, posy, color, boxesArr){
        super(context, posx, posy)
        this.color = color
        this.randMoveInt = null
        this.draw()
        this.randMove(boxesArr)
    }
    draw(){
        let ctx = this.context
        ctx.fillStyle = "black"
        if(this.movement[0] == 1){
            ctx.clearRect(this.right,this.top,-32*this.movement[0],30)
        }
        else if(this.movement[0] == -1){
            ctx.clearRect(this.left,this.top,-32*this.movement[0],30)
        }
        else if(this.movement[1] == -1){
            ctx.clearRect(this.left,this.top,30,-32*this.movement[1])
        }
        else if(this.movement[1] == 1){
            ctx.clearRect(this.left,this.bottom,30,-32*this.movement[1])
        }


        ctx.fillStyle = this.color
        ctx.fillRect(this.left, this.top, 30, 30)
    }

    move(movex, movey, boxesArr){

        if(this.gameOver){
            return
        }
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
                if(this.waitNextMove(boxesArr)){
                    clearInterval(moveInterval)
                    return
                }
            }

            if(this.movement == [0,0]){
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
            
            this.top += 2*movey
            this.bottom += 2*movey
            this.right += 2*movex
            this.left += 2*movex
            
            this.draw()
            
        }, 10) //updated every 5ms
        
    }

    waitNextMove(boxesArr){
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
                this.move(1,0,boxesArr)
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
                this.move(-1,0,boxesArr)
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
                this.move(0,-1,boxesArr)
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
                this.move(0,1,boxesArr)
                return true
            }
        }
    
        return false
        
    }

    randMove(boxesArr){
        let randInterval = setInterval(()=>{
            if (this.gameOver){
                clearInterval(randInterval)
            }
            let rand = Math.floor(Math.random()*4)
            switch(rand){
                case(0):
                this.move(1,0,boxesArr)
                break

                case(1):
                this.move(-1,0,boxesArr)
                break

                case(2):
                this.move(0,1,boxesArr)
                break

                case(3):
                this.move(0,-1,boxesArr)
                break
            }
        }, 100)
    }

}