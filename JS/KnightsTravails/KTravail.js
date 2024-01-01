class Knight{
    constructor(origin = [3,3]){
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

    goal(location,origin=this.origin, visited = new Set(), explored=[], path={}, step=0){
        // generate an exploration arr
        if( 0>location[0] || location[0]>7 || 0>location[1] || location[1]>7){
            console.log('cannot reach the location')
            return
        }

        if(location[0] === origin[0] && location[1] === origin[1]){
            if(step ===1){
                console.log(`path taken: ${this.origin} -> ${location}`)
            }
            console.log('it is possible')
            let pathTaken = [location]
            let currentLoc = location
            while (path[currentLoc] !== this.origin){
                currentLoc = path[currentLoc]
                pathTaken.push(currentLoc)
            }
            pathTaken.push(this.origin)
            pathTaken.reverse()
            console.log(`knightMoves(${this.origin} -> ${location})`)
            console.log(`You made it in ${pathTaken.length} moves!  Here's your path:`)
            pathTaken.forEach(e => console.log(e))
            return true
        }else{
            let temp = this.movementOptions(origin)
            temp.forEach(e=>{
                if(!(e in path)){
                    path[e] = origin
                }
            })
            explored = explored.concat(temp)
            let currentExploration = explored[0]
            explored.shift()
            while(visited.has(currentExploration) && explored.length>0){
                currentExploration = explored[0]
                explored.shift()
            }
            
            if(!visited.has(currentExploration)){
                step+=1
                visited.add(currentExploration)
                this.goal(location, currentExploration, visited, explored, path, step)
                return 
            }
        }

        console.log('getting to that position is impossible')
        return 

        

    }


}


a = new Knight()



a.goal([6,6])