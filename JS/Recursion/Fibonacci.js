

const fibItr= (n)=>{
    const arr = [0]
    let prev = 0
    let newVal = 1
    for(let i = 0; i<=n-2; i++){
        total = prev + newVal
        arr.push(total)
        prev = newVal
        newVal = total
    }
    return arr
}

const fibRec = (n, prev = 0, total = 1, arr=[0]) =>{
    if(n>=2){
        // console.log('a')
        let newVal = prev+total
        prev = total
        arr.push(total)
        return fibRec(--n, prev, newVal, arr)
    }else{
        return arr
    }
}


// input of 8, this function should return the array [0, 1, 1, 2, 3, 5, 8, 13].
console.log('iterate',fibItr(8))
console.log('Recursive',fibRec(8))