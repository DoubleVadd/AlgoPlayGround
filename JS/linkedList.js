class LinkedList {
    
    #count = 0

    constructor(start){
        this.start = start
        this.end = start.next
        this.#count = 1
    }

    head(){return this.start}
    tail(){return this.end}

    size(){ return this.#count}
    
    append(node){
        if(this.end){
            let temp = this.end
            this.end.next = node
            this.end = this.end.next
            this.end.prev = temp
            this.end.prev.next = this.end
        }else if (this.start){
            this.end = node
            this.end.prev = this.start
            this.start.next = this.end
        } else{
            this.start = node
        }
        this.#count += 1
        
    }

    prepend(node){
        let temp = this.start
        this.start = node
        this.start.next = temp
        if(this.start.next){
            this.start.next.prev = this.start
        }
        // this.start = this.start.next = node 
        this.#count +=1
    }

    pop(){
        if(this.start !== this.end){
            this.#count -=1
            let temp = this.end
            this.end = this.end.prev
            this.end.next = null
            return temp
        } else{
            let temp = this.start 
            this.start = null
            this.end = null
            this.#count -=1
            return temp
        } 
    }

    at(index){
        let currentNode = this.start
        if(index<this.#count && currentNode!==null){
            for (let i =0 ; i<index; i++){
                currentNode = currentNode.next
            }
            return currentNode
        }
        return null
    }

    insertAt(newNode, index){
        let currentNode = this.start
        if (index === 0){
            this.prepend(newNode)
        }else if(index<this.#count && currentNode.next!==null){
            for (let i =0 ; i<index; i++){
                currentNode = currentNode.next
            }
            let temp = currentNode
            currentNode = newNode
            currentNode.prev = temp.prev
            temp.prev = currentNode
            currentNode.next = temp
            currentNode.prev.next = currentNode
            this.#count+=1
        }
    }
    removeAt(index){
        let currentNode = this.start
        if(index<this.#count && currentNode!==null){
            for (let i =0 ; i<index; i++){
                currentNode = currentNode.next
            }
            if(currentNode.next == null || (currentNode.prev == null && currentNode.next == null)){
                this.pop()
            }else if(currentNode.prev == null){
                currentNode.next.prev = null
                this.start = currentNode.next
                this.#count -= 1
            }
            else{
                currentNode.prev.next = currentNode.next
                currentNode.next.prev = currentNode.prev 
                currentNode = null
                this.#count -= 1
            }
        }
    }

    contains(val){
        let currentNode = this.start
        if(currentNode){
            while(currentNode !== this.end){
                if(currentNode.value === val){
                    return true
                }
                currentNode = currentNode.next
            }
            if(currentNode){
                if(currentNode.value === val){
                    return true
                }
            }
        }
        return false
    }

    find(val){
        let currentNode = this.start
        if(currentNode){
            if(currentNode.next!==null){
                let index = 0
                while(currentNode !== this.end){
                    if(currentNode.value === val){
                        return index
                    }
                    index+=1
                    currentNode = currentNode.next
                }
                if(currentNode.value === val){
                    return index
                }
            }else if(currentNode.value === val){
                return 0
            }
        }
        return null
    }

    toString(){
        let currentNode = this.head()
        if(currentNode){
            let path = 'start'
            while(currentNode.next){
                path += `->|${currentNode.value}|`
                currentNode =  currentNode.next
            }
            path += `->|${currentNode.value}|->|null|`
            console.log(path)
        }else{
            console.log('no list available')
        }
        
    }




}


class Node {
    constructor(value=null, next=null, prev=null){
        this.value = value
        this.next = next
        this.prev = prev
    }
}

const linked = new LinkedList(new Node(1))
linked.append(new Node(2))
linked.append(new Node(3))
linked.append(new Node(4))
linked.append(new Node(5))
linked.append(new Node(6))
linked.append(new Node(7))
linked.append(new Node(8))
linked.prepend(new Node(0))
linked.toString()
console.log(linked.size())
// console.log(linked.head())
// console.log(linked.tail())
// console.log(linked.at(0))
console.log(linked.contains(8))
console.log(linked.find(8))
linked.pop()
linked.toString()
console.log(linked.contains(8))
console.log(linked.find(8))
console.log(linked.size())

linked.insertAt(new Node(777), linked.find(linked.tail().value))
linked.insertAt(new Node(444), linked.find(linked.head().value))
linked.toString()
// console.log(linked.find(linked.head().value))
linked.removeAt(linked.find(linked.tail().value))
linked.removeAt(linked.find(linked.head().value))

linked.toString()


// console.log(linked.find(7))

// console.log(linked.tail())

// linked.insertAt(new Node(88), 2)
// linked.toString()

// linked.removeAt(0)
// linked.removeAt(0)
// linked.removeAt(0)
// linked.removeAt(0)

// linked.toString()
// console.log(linked.tail())
// linked.pop()
// console.log(linked.head())



// linked.append(new Node(2))
// console.log(linked.head())
// console.log(linked.find(2))
// linked.insertAt(new Node(777), 0)
// console.log(linked.contains(8))
// console.log(linked.at(0))
// console.log(linked.size())
// console.log(linked.tail())
// console.log(linked.head())
