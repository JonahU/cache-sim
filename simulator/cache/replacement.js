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

LRUCache.prototype.put = function(key) {
    const value = key;
    const node = this.LRUTable[key];
    if(node) {
        const removed = this.remove(node);
        this.add(node);
        return removed;
    } else {
        if (this.nodeCount === this.capacity) {
            const removed = this.remove(this.tail.previous);
            delete this.LRUTable[removed];
            return removed;
            
        }
        const newNode = new Node(key, value);
        const currentCount = this.nodeCount;
        this.add(newNode);
        this.LRUTable[key] = newNode;
        return currentCount;
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
    const removed = node.value;
    const next_node = node.next;
    const prev_node = node.previous;
    next_node.previous = prev_node;
    prev_node.next = next_node;
    this.nodeCount --;
    return removed;
}

 class FIFO {
    constructor(capacity) {
        this.queue = new Array(capacity);
        this.firstIn = 0;
    }

    put(tag, replaceIndex) {
        if(replaceIndex) {
            this.queue[replaceIndex] = tag;
            this.firstIn++;
            return replaceIndex;
        }
        const currentFirstIn = this.firstIn;
        this.queue[currentFirstIn] = tag;
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
                throw new Error(`Unknown replacement policy "${policy}"`);
        }
    }

    dataWillBeRead(tag) {
        if(this.policy === "LRU") {
            this.LRU.get(tag);
        }
    }

    dataWillBeWritten(tag, replaceIndex) {
        if (this.associativity === 1) return 0;
        switch(this.policy) {
            case "LRU":
                // TODO: fix LRU
                return this.LRU.put(tag);
            case "FIFO":
                return this.FIFO.put(tag, replaceIndex)
            case "random":
                if(replaceIndex) return replaceIndex;
                return random(this.associativity);
        }
    }
 }

 module.exports = Replacement;