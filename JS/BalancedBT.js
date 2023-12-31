class Node {
    constructor(value,left=null,right=null){
        this.root = value
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(root=null){
        this.root = root
    }

    BuildTree(arr=[], initial = true, start=0, end=0 ){
        if(initial===true){
            arr = arr.sort((a,b) => a-b).filter((val, index, arr) => {
                if(val !== arr[index-1]){return val}})
                start = 0
                end = arr.length -1
        }
        if(start>end){return null}
        let mid = Math.floor((start+end)/2)

        let node = new Node(arr[mid])

        if(this.root==null){
            this.root = node
        }

        node.left = this.BuildTree(arr,false, start, mid-1)
        node.right = this.BuildTree(arr, false , mid+1, end)

        return node
    }

    insert(val, start=null){
        if (!start){
            start = this.root
        }
        if(start.root === val){
            console.log('value already exists')
            return
        }else if(val>start.root){
            if(start.right){
                start = this.insert(val, start.right)
            }else{
                start.right = new Node(val)
                return
            }
        }else if(val<start.root){
            if(start.left){
                start = this.insert(val, start.left)
            }else{
                start.left = new Node(val)
                return
            }
        }else{
            console.log('value already exists')
            return
        }

    }
    delete(val, start=null, currentRight=null, currentLeft=null){
        if (!start){
            start = this.root
            currentRight = start.right
            currentLeft = start.left
            if(currentRight && currentLeft === null && val === start.root){
                this.root = currentRight
                this.root.right = currentRight.right
                this.root.left = currentRight.left
                return
            }else if(currentLeft && currentRight === null && val === start.root){
                this.root = currentLeft
                this.root.right = currentLeft.right
                this.root.left = currentLeft.left
                return
            }else if(currentLeft === null && currentRight === null && val === start.root){
                console.log('cannot remove the only node')
                return
            }
        }

        if(start.root === val){

            let tempHead = start
            start = start.right
            if(start){
                if(start.left){
                    while(start.left.left){
                        start = start.left
                    }
                    this.root = start.left
                    this.root.right = currentRight
                    this.root.left = currentLeft
                    start.left = null
                }else if(!start.left){
                    tempHead.root = start.root
                    tempHead.right = start.right
                }else{
                    console.log(tempHead.root)
                    start = null
                }
            }
            
            return
        }else if(val>start.root){
            if(start.right){
                if(start.right.right === null && start.right.left === null && start.right.root == val){
                    start.right = null
                    return
                }
                this.delete(val, start.right, currentRight, currentLeft)
                return
            }else{
                console.log('no value exists')
                return
            }
        }else{
            if(start.left){
                if(start.left.right === null && start.left.left === null && start.left.root == val){
                    start.left = null
                    return
                }
                this.delete(val, start.left, currentRight, currentLeft)
                return
            }else{
                console.log('no value exists')
                return
            }
        }

    }

    find(val, start = this.root){
        if(val === start.root){
            return start
        }else if(val>start.root){
            if(start.right){
                start = this.find(val, start.right)
                return start
            }else{
                return null
            }
        }else if(val<start.root){
            if(start.left){
                start = this.find(val, start.left)
                return start
            }else{
                return null
            }
        }else{
            console.log('value does not exist')
            return null
        }
    }

    levelOrder(cb=null, arr = [], start = this.root){
        arr.push(start)
        let valArray = []
        while (arr.length !==0){
            // console.log(arr)
            let current = arr.shift()
            if(cb){
                cb(current)
            }else if(current){
                valArray.push(current.root)
            }
            if(current){
                if(current.left){
                    arr.push(current.left)
                }
                if(current.right){
                    arr.push(current.right)
                }
            }   
        }
        if(!cb){
            return valArray
        }return null
    }

    inOrder(start = this.root, cb=null, arr=[]){
        // Get root note
        if(start){
            if(start.left){
                this.inOrder(start.left, cb, arr)
            }
            if(cb){
                cb(start.root)
            }else{
                arr.push(start.root)
            }
            if(start.right){
                this.inOrder(start.right, cb, arr)
            }
        }
        if(!cb){
            return arr
        }
    }

    height(){
        let max1 = 0
        let start = this.root
        while(start.left !==null){
            start = start.left
            max1 += 1
            
        }
        let max2 = 0
        start = this.root
        while(start.right !==null){
            start = start.right
            max2 += 1
            
        }
        return max1>max2 ? max1 : max2
    }
    isBalanced(){
        let max1 = 0
        let start = this.root
        while(start.left !==null){
            start = start.left
            max1 += 1
            
        }
        let max2 = 0
        start = this.root
        while(start.right !==null){
            start = start.right
            max2 += 1
            
        }
        if(max1 === max2 || max1 - 1 === max2 || max1+1 ===max2){
            return true
        }else{
            return false
        }
    }

    reBalance(){
        let arr = this.inOrder()
        this.root = this.BuildTree(arr)
    }

    depth(val){
        let depth = 0
        let start = this.root
        while(start){
            if(start.root ===val){
                return depth
            }
            else if(val>start.root){
                depth+=1
                start = start.right
            }else if(val<start.root){
                depth+=1
                start = start.left
            }else{
                return null
            }
        }
    }

    postOrder(start = this.root, cb=null, arr=[]){
        // Get root note
        if(start){
            if(start.left){
                this.postOrder(start.left, cb, arr)
            }
            
            if(start.right){
                this.postOrder(start.right, cb, arr)
            }
            if(cb){
                cb(start.root)
            }else{
                arr.push(start.root)
            }
        }
        if(!cb){
            return arr
        }
    }

    preOrder(start = this.root, cb=null, arr=[]){
        // Get root note
        if(start){
            if(cb){
                cb(start.root)
            }else{
                arr.push(start.root)
            }
            if(start.left){
                this.preOrder(start.left, cb, arr)
            }
            
            if(start.right){
                this.preOrder(start.right, cb, arr)
            }
            
        }
        if(!cb){
            return arr
        }
    }

    


    static prettyPrint(node , prefix = "", isLeft = true){
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          Tree.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
        if (node.left !== null) {
            Tree.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
    

}

const TreeTester = () =>{
    let arr = Array.from({length: 100}, () => Math.floor(Math.random()*100));
    console.log(arr)
    balanceTree = new Tree()
    balanceTree.BuildTree(arr)
    
    console.log('balance status', balanceTree.isBalanced())
    console.log('Preorder', balanceTree.preOrder())
    console.log('PostOrder', balanceTree.postOrder())
    console.log('inOrder', balanceTree.inOrder())
    console.log('levelOrder', balanceTree.inOrder())

    let newArr = Array.from({length: 100}, () => Math.floor(Math.random()*1000))
    newArr.forEach(a => balanceTree.insert(a))
    console.log('balance status', balanceTree.isBalanced())
    balanceTree.reBalance()
    console.log('balance status after Rebalancing', balanceTree.isBalanced())
    console.log('Preorder', balanceTree.preOrder())
    console.log('PostOrder', balanceTree.postOrder())
    console.log('inOrder', balanceTree.inOrder())
    console.log('levelOrder', balanceTree.inOrder())

    Tree.prettyPrint(balanceTree.root)
}
TreeTester()



