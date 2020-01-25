var Node = function(key, value) {
    this.previous = null;
    this.next = null;
    this.key = key;
    this.value = value;
};

var LRUCache = function(capacity) {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.previous = this.head;
    this.LRUTable = {};
    this.capacity = capacity;
    this.nodeCount = 0;
};

LRUCache.prototype.get = function(key) {
    if (this.LRUTable[key] === undefined) return -1;
    const toReturn = this.LRUTable[key];
    this.remove(toReturn);
    this.add(toReturn);
};

LRUCache.prototype.put = function(key, value) {
    const node = this.LRUTable[key];
    if(node) {
        this.remove(node);
        node.value = value;
        this.add(node);
        return -1;
    } else {
        if (this.nodeCount === this.capacity) {
            const oldKey = this.tail.previous.key;
            this.remove(this.tail.previous);
            delete this.LRUTable[oldKey];
            return oldKey;
            
        }
        const newNode = new Node(key, value);
        this.add(newNode);
        this.LRUTable[key] = newNode;
        return -1;
    }
};

LRUCache.prototype.add = function(node) {
    const current_first = this.head.next;
    current_first.previous = node;
    node.next = current_first;
    node.previous = this.head;
    this.head.next = node;
    this.nodeCount ++;
}

LRUCache.prototype.remove = function(node) {
    const next_node = node.next;
    const prev_node = node.previous;
    next_node.previous = prev_node;
    prev_node.next = next_node;
    this.nodeCount --;
}

 class FIFO {
    constructor(capacity) {
        this.queue = new Array(capacity);
        this.firstIn = 0;
    }

    put(index) {
        const currentFirstIn = this.firstIn;
        this.queue[currentFirstIn] = index;
        if(this.firstIn === this.queue.length-1) {
            this.firstIn = -1;
        }
        this.firstIn++;
        return currentFirstIn;
    }
 }

 const random = capacity => {
    return Math.floor(Math.random() * capacity);
 };

 class Replacement {
    constructor(associativity, policy) {
        this.associativity = associativity;
        this.policy = policy;
        switch(policy) {
            case "LRU":
                this.LRU = new LRUCache(associativity);
                break;
            case "FIFO":
                this.FIFO = new FIFO(associativity);
                break;
            case "random":
                // No initialisation required
                break;
            default:
                throw new Error(`Unknown replacement policy "${this.replacementPolicy}"`);
        }
    }

    dataWillBeRead(setIndex) {
        if(this.policy === "LRU") {
            this.LRU.get(setIndex);
        }
    }

    dataWillBeWritten(setIndex) {
        if (this.associativity === 1) return 0;
        switch(this.policy) {
            case "LRU":
                return this.LRU.put(setIndex);
            case "FIFO":
                return this.FIFO.put(setIndex)
            case "random":
                return random(this.associativity);
        }
    }
 }

 module.exports = Replacement;