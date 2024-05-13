class Queue{
    constructor(queue){
        this.queue = queue
        this.minpos = 0;
        this.maxpos = queue.length - 1
    }

    pushIntoQueue(value){
        this.queue[this.maxpos] = value;
        this.maxpos--;

    }

    popFromQueue(){
        if (this.minpos >= this.maxpos) {
            return -1; // When no elements remain to return, return -1
        } else {
            const i = this.queue[this.minpos];
            delete this.queue[this.minpos];
            this.minpos++;
            return i;
             // Return elements based on FIFO logic
        }
    }
}

// DO not touch the functions below this line

function implementStack(arr){
    
    const queue1 = new Queue(arr)
    queue1.pushIntoQueue(1)
     console.log(queue1.popFromQueue())
     console.log(queue1.popFromQueue())
     console.log(queue1.popFromQueue())
     queue1.pushIntoQueue(1)
     console.log(queue1.popFromQueue())
     console.log(queue1.popFromQueue())
}




async function readInput() {
    let inputString = '';
    var output=[];
    process.stdin.on('data', inputStdin => {
        inputString += inputStdin;
        const inputArr = inputString.split(/(?:\r\n|\r|\n)/g)
        output = implementStack(inputArr[0].split(','));
        console.log(output.trim());
        process.exit();
        
    })
    

}
readInput();