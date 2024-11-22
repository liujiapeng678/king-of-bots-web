import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";
import { Snake } from "./Snake";

export class GameMap extends AcGameObject {
    constructor(ctx, parent, store){
        super()

        this.store = store
        this.ctx = ctx
        this.parent = parent
        this.L = 0
        this.rows = 13
        this.cols = 14

        this.walls = []
        this.snakes = [
            new Snake({id: 0, color: "#4876EC", r: this.rows - 2, c: 1}, this),
            new Snake({id: 1, color: "#F94848", r: 1, c: this.cols - 2}, this),
        ]
    }

    check_valid(cell){   // 检测目标点是否合法
        for(const wall of this.walls){
            if(cell.r === wall.r && cell.c === wall.c){
                return false
            }
        }
        for(const snake of this.snakes){
            let len = snake.cells.length
            if(!snake.check_tail_increasing()){  // 长度不增加蛇尾不用管
                len--
            }
            for(let i = 0; i < len; i++){
                if(snake.cells[i].r === cell.r && snake.cells[i].c === cell.c){
                    return false
                }
            }
        }
        return true
    }

    add_listening_events(){
        this.ctx.canvas.focus()
        this.ctx.canvas.addEventListener("keydown", e => {
            let d = -1
            if(e.key === 'w'){
                d = 0
            } else if(e.key === 'd'){
                d = 1
            } else if(e.key === 's'){
                d = 2
            } else if(e.key === 'a') {
                d = 3
            }
            if(d >= 0){
                this.store.state.pk.socket.send(JSON.stringify({
                    event: "move",
                    d: d,
                }))
            }
        })
    }

    check_ready(){      //  两条蛇是否都准备好下一步，必须满足当前静止，且有下一步的方向
        for(const snake of this.snakes){
            if(snake.status !== "idle")return false
            if(snake.direction === -1)return false
        }
        return true
    }

    create_walls(){
        const is_wall = this.store.state.pk.map

        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                if(is_wall[r][c]){
                    this.walls.push(new Wall(r, c, this))
                }
            }
        }
    }

    start(){
        this.create_walls()

        this.add_listening_events()
    }

    update_size(){
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows))
        this.ctx.canvas.width = this.L * this.cols
        this.ctx.canvas.height = this.L * this.rows
    }

    next_step(){   //让两条蛇进入下一回合
        for(const snake of this.snakes){
            snake.next_step()
        }
    }

    update(){
        this.update_size()
        if(this.check_ready()){
            this.next_step()
        }
        this.render()
    }
    
    render(){
        const color_even = "#AAD751", color_odd = "#A2D149"
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                if((r + c) % 2 == 0){
                    this.ctx.fillStyle = color_even
                } else {
                    this.ctx.fillStyle = color_odd
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L)
            }
        }
    }
}