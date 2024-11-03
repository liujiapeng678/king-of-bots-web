import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent){
        super()

        this.ctx = ctx
        this.parent = parent
        this.L = 0
        this.rows = 13
        this.cols = 13

        this.walls = []
        this.inner_walls_count = 26
    }
    check_connect(is_wall, sx, sy, tx, ty){
        if(sx == tx && sy == ty)return true
        is_wall[sx][sy] = true
        const dx = [-1, 0, 1, 0], dy = [0, -1, 0, 1]
        for(let i = 0; i < 4; i++){
            let x = dx[i] + sx, y = dy[i] + sy
            if(!is_wall[x][y] && this.check_connect(is_wall, x, y, tx, ty)){
                return true
            }
        }
        return false
    }
    create_walls(){
        const is_wall = []
        for(let r = 0; r < this.rows; r++){
            is_wall[r] = []
            for(let c = 0; c < this.cols; c++){
                is_wall[r][c] = false
            }
        }
        //四周加障碍物
        for(let r = 0; r < this.rows; r++){
            is_wall[r][0] = is_wall[r][this.cols - 1] = true
        }
        for(let c = 0; c < this.cols; c++){
            is_wall[0][c] = is_wall[this.rows - 1][c] = true
        }
        //内部随机
        for(let i = 0; i < this.inner_walls_count / 2; i++){
            for(let j = 0; j < 1000; j++){
                let r = parseInt(Math.random() * this.rows)
                let c = parseInt(Math.random() * this.cols)
                if(is_wall[r][c] || is_wall[c][r])continue
                if(r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2)continue
                is_wall[r][c] = is_wall[c][r] = true
                break;
            }
        }
        const is_wall_copy = JSON.parse(JSON.stringify(is_wall))
        if(!this.check_connect(is_wall_copy, this.rows - 2, 1, 1, this.cols - 2))return false
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                if(is_wall[r][c]){
                    this.walls.push(new Wall(r, c, this))
                }
            }
        }
        return true
    }






    start(){
        for(let i = 0; i < 1000; i++){
            if(this.create_walls()){
                break;
            }
        }
    }

    update_size(){
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows))
        this.ctx.canvas.width = this.L * this.cols
        this.ctx.canvas.height = this.L * this.rows
    }

    update(){
        this.update_size()
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