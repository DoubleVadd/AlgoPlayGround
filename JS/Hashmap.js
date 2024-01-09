let bucket = 20

const getIndex = (index, bucket) => {
    if (index < 0 || index >= bucket.length) {
        throw new Error("Trying to access index out of bound");
      }
}

class Hashmap{

    constructor(capacity, loadFactor = 0.75){
        this.capacity = capacity
        this.buckets = new Array(capacity)
        for(let i = 0; i< capacity; i++ ){
            this.buckets[i] = new Array(capacity)
        }
        this.loadFactor = Math.floor(loadFactor*capacity)
    }

    hash(value){
        let code = 0;

        const primeNumber = 7;
        for (let i = 0; i < value.length; i++) {
            code = primeNumber * code + value.charCodeAt(i);
        }

        return code % this.buckets.length;
    }

    set(key, val=null){
        let code = this.hash(key)
        let currentBucket = this.buckets[code]
        for(let i = 0; i < this.buckets[code].length; i++ ){
            if(currentBucket[i]===undefined){
                currentBucket[i] = {[key] :val}
                return
            }else if (currentBucket[i]?.[key]){
                currentBucket[i] = {[key] :val}
                return
            }
        }
        this.buckets.push({[key] :val})
        return
    }



    get(key){
        let code = this.hash(key)
        let currentBucket = this.buckets[code]
        for(let i = 0; i < this.buckets[code].length; i++ ){
            if(currentBucket[i]?.[key]){
                return currentBucket[i] 
            }
        }
        return null
    }

    has(key){
        let code = this.hash(key)
        let currentBucket = this.buckets[code]
        for(let i = 0; i < this.buckets[code].length; i++ ){
            if(currentBucket[i]?.[key]){
                return true
            }
        }
        return false
    }

    remove(key){
        let code = this.hash(key)
        let currentBucket = this.buckets[code]
        for(let i = 0; i< this.buckets[code].length; i++ ){
            if(currentBucket[i]?.[key]){
                currentBucket[i] = undefined
                return true
            }
        }
        return false
    }

    length(){
        let length = 0
        this.buckets.forEach(e => {
            length += e.filter(Boolean).length
        })
        return length
    }

    clear(){
        this.buckets = new Array(this.capacity)
        for(let i = 0; i< this.capacity; i++ ){
            this.buckets[i] = new Array(this.capacity)
        }
    }

    keys(){
        let allKeys = []
        this.buckets.forEach(e => {
            e.forEach(k => 
                {if(k){
                    allKeys.push(Object.keys(k)[0])
                }
            })
        })
        return allKeys
    }

    values(){
        let allKeys = []
        this.buckets.forEach(e => {
            e.forEach(k => 
                {if(k){
                    allKeys.push(Object.values(k)[0])
                }
            })
        })
        return allKeys
    }

    entries(){
        let allKeys = []
        this.buckets.forEach(e => {
            e.forEach(k => 
                {if(k){
                    allKeys.push([Object.keys(k)[0],Object.values(k)[0]])
                }
            })
        })
        return allKeys
    }


}


let hashing = new Hashmap(16)

hashing.set('adam', 155)
hashing.set('samie', 157)
hashing.set('adam', 153)
hashing.set('Sam', 1145)


console.log(hashing.buckets)

console.log(hashing.get('samie'))

console.log(hashing.has('samie'))


console.log(hashing.length())
console.log(hashing.entries())
// hashing.clear()
// console.log(hashing.length())