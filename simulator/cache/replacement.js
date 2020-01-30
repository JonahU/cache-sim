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
    if (this.LRUTable[key] === undefined) throw new Error(`LRU key "${key}" not found in\n${this.LRUTable}`);
    const willBeRead = this.LRUTable[key];
    this.remove(willBeRead);
    this.add(willBeRead);
};

LRUCache.prototype.put = function(key, overrideValue) {
    const node = this.LRUTable[key];
    if(node) {
        const removed = this.remove(node);
        this.add(node);
        return removed.value;
    } else {
        if (this.nodeCount === this.capacity) {
            // remove LRU node
            const removed = this.remove(this.tail.previous);
            delete this.LRUTable[removed.key];

            // replace with new node
            const replacementNode = new Node(key, removed.value);
            this.add(replacementNode);
            this.LRUTable[key] = replacementNode;
            return removed.value;
            
        }
        const newNode = new Node(key, overrideValue);
        this.add(newNode);
        this.LRUTable[key] = newNode;
        return this.nodeCount;
    }
};

LRUCache.prototype.getContents = function() {
    let tempHead = this.head;
    const recentlyUsedOrder = [];
    while (tempHead.next && tempHead.next.next) {
        tempHead = tempHead.next;
        recentlyUsedOrder.push(tempHead.value);
    }
    console.log(`MOST RECENTLY -> ${recentlyUsedOrder.join(" -> ")} -> LEAST RECENTLY`);
}

LRUCache.prototype.add = function(node) {
    const current_first = this.head.next;
    current_first.previous = node;
    node.next = current_first;
    node.previous = this.head;
    this.head.next = node;
    this.nodeCount ++;
}

LRUCache.prototype.remove = function(node) {
    const removed = node;
    const next_node = node.next;
    const prev_node = node.previous;
    next_node.previous = prev_node;
    prev_node.next = next_node;
    this.nodeCount --;
    return removed;
}

 class FIFO {
    constructor(capacity) {
        this.capacity = capacity;
        this.firstIn = 0;
    }

    getFirstIn() {
        if(this.firstIn === this.capacity) {
            this.firstIn = 0;
        }
        return this.firstIn++;
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
                return this.LRU.put(tag, replaceIndex);
            case "FIFO":
                return this.FIFO.getFirstIn();
            case "random":
                if(replaceIndex) return replaceIndex;
                return random(this.associativity);
        }
    }
 }

 module.exports = Replacement;