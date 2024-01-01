class Knight{
    constructor(origin = [0,3]){
        this.origin = origin
    }

    movementOptions(initial = this.origin){
        let options = []
        let x = initial[0]
        let y = initial[1]
        if(x+2<8){
            if(y+1<8){
                options.push([x+2,y+1])
            }
            if(y-1>=0){
                options.push([x+2,y-1])
            }
        }
        if(x-2>=0){
            if(y+1<8){
                options.push([x-2,y+1])
            }
            if(y-1>=0){
                options.push([x-2,y-1])
            }
        }
        if(y+2<8){
            if(x+1<8){
                options.push([x+1,y+2])
            }
            if(x-1>=0){
                options.push([x-1,y+2])
            }
        }
        if(y-2>=0){
            if(x+1<8){
                options.push([x+1,y-2])
            }
            if(x-1>=0){
                options.push([x-1,y-2])
            }
        }
        // console.log(options)
        return options
        
    }

    move(location){
        this.origin = location
    }

    goal(location,origin=this.origin, visited = new Set(), explored=[], path=[], step=0){
        // generate an exploration arr

        if(location[0] === origin[0] && location[1] === origin[1]){
            if(step ===1){
                console.log(`path taken: ${this.origin} -> ${location}`)
            }
            
            console.log('it is possible')
            console.log(path)
            console.log(step)
            return true
        }else{
            explored = explored.concat(this.movementOptions(origin))
            let currentExploration = explored[0]
            explored.shift()
            while(visited.has(currentExploration) && explored.length>0){
                currentExploration = explored[0]
                explored.shift()
            }
            
            if(!visited.has(currentExploration)){
                step+=1
                visited.add(currentExploration)
                path.push(currentExploration)
                path = this.goal(location, currentExploration, visited, explored, path, step)
                return path
            }
        }

        console.log('getting to that position is impossible')
        return path

        

    }


}


a = new Knight()



a.goal([2,4])