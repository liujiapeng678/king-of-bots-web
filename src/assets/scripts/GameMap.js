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
        this.inner_walls_count = 26
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

        const [snake0, snake1] = this.snakes
        this.ctx.canvas.addEventListener("keydown", e => {
            if(e.key === 'w'){
                snake0.set_direction(0)
            } else if(e.key === 'd'){
                snake0.set_direction(1)
            } else if(e.key === 's'){
                snake0.set_direction(2)
            } else if(e.key === 'a'){
                snake0.set_direction(3)
            } else if(e.key === 'ArrowUp'){
                snake1.set_direction(0)
            } else if(e.key === 'ArrowRight'){
                snake1.set_direction(1)
            } else if(e.key === 'ArrowDown'){
                snake1.set_direction(2)
            } else if(e.key === 'ArrowLeft'){
                snake1.set_direction(3)
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
        const is_wall = this.store.state.pk.game_map

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