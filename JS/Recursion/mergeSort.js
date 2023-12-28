// [3, 2, 1, 13, 8, 5, 0, 1] should return [0, 1, 1, 2, 3, 5, 8, 13], 
// and an input of [105, 79, 100, 110] should return [79, 100, 105, 110].

// Pseudo Code
// - sort the left half of the array assuming n>1
// - sort the right half of the array assuming n>1
// - merge the two halves together

// let counter = 0

const mergeSort = (arr, leftTemp =[], rightTemp =[]) => {
    if (arr.length>2){
        let left =  Math.floor(arr.length/2)
        leftTemp = mergeSort(arr.slice(0, left), leftTemp, [])
        rightTemp = mergeSort(arr.slice(left), [], rightTemp)
        let temp_arr = []
        let i = 0
        let j = 0
        while (i<leftTemp.length && j<rightTemp.length){
            // counter +=1
            if (leftTemp[i] <  rightTemp[j]){
                temp_arr.push(leftTemp[i])
                ++i
            }else{
                temp_arr.push(rightTemp[j])
                ++j
            }
        } if(i<leftTemp.length){temp_arr = temp_arr.concat(leftTemp.slice(i))}
        if((j<rightTemp.length)){temp_arr = temp_arr.concat(rightTemp.slice(j))}
        arr = temp_arr

    } else if (arr.length == 2){
        if(arr[0]>arr[1]){
            temp = arr[0]
            arr[0] = arr[1]
            arr[1] = temp
        }
        return arr
    } 
    return arr

}


var iterations = 1000000;
console.time('Function #1');
for(var i = 0; i < iterations; i++ ){
    mergeSort([39, 28, 44, 4, 10, 83, 11]);
};
console.timeEnd('Function #1')
