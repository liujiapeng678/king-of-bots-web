//游戏的基类，所有对象继承自基类
const AC_GAME_OBJECTS = []

export class AcGameObject{
    constructor(){
        AC_GAME_OBJECTS.push(this)
        this.has_called_start = false
        this.timedelta = 0   // 上次执行和这次执行间隔的时间
    }

    start(){   // 只执行一次

    }
    update(){    //出第一帧每次执行
         
    }timedelta
    on_destroy(){   // 删除前执行

    }
    destroy(){   //删除对象
        this.on_destroy()

        for(let i in AC_GAME_OBJECTS){
            const obj = AC_GAME_OBJECTS[i]
            if(obj === this){
                AC_GAME_OBJECTS.splice(i)
                break
            }
        }
    }
}
let last_timestamp //上次执行的时间
const step = timestamp => {          // 参数是当前时间
    for(let obj of AC_GAME_OBJECTS){
        if(!obj.has_called_start){
            obj.has_called_start = true
            obj.start()
        } else {
            obj.update()
            obj.timedelta = timestamp - last_timestamp
        }
    }
    last_timestamp = timestamp
    requestAnimationFrame(step)
}

requestAnimationFrame(step)