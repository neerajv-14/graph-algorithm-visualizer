

export function BinaryHeap(priorityFunction) {
  this.heap = [];
  this.priorityFunction = priorityFunction;
}

BinaryHeap.prototype = {
  push: function (node) {
    
    this.heap.push(node);

    
    this.heapify(this.heap.length - 1);
  },

  pop: function () {
    
    var result = this.heap[0];

    var end = this.heap.pop();

    
    if (this.heap.length > 0) {
      this.heap[0] = end;
      
      this.balanceHeapDownwards(0);
    }
    return result;
  },

  

  size: function () {
    return this.heap.length;
  },
  find: function (node) {
    var i = this.heap.indexOf(node);
    if (i === -1) return 0;
    else return 1;
  },
  updateElement: function (node) {
    this.heapify(this.heap.indexOf(node));
  },
  heapify: function (ind) {
    var element = this.heap[ind];

    while (ind > 0) {
      var parentInd = ((ind + 1) >> 1) - 1;
      var parent = this.heap[parentInd];

      
      if (this.priorityFunction(element) < this.priorityFunction(parent)) {
        this.heap[parentInd] = element;
        this.heap[ind] = parent;
        
        ind = parentInd;
      } else {
        break;
      }
    }
  },
  balanceHeapDownwards: function (n) {
    var length = this.heap.length;
    var element = this.heap[n];
    var elemScore = this.priorityFunction(element);

    while (true) {
      
      var child2N = (n + 1) << 1;
      var child1N = child2N - 1;

      var swap = null; 
      var child1Score;

      if (child1N < length) {
        
        var child1 = this.heap[child1N];
        child1Score = this.priorityFunction(child1);

        
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      if (child2N < length) {
        
        var child2 = this.heap[child2N];
        var child2Score = this.priorityFunction(child2);

        if (child2Score < (swap == null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }
      
      if (swap != null) {
        this.heap[n] = this.heap[swap];
        this.heap[swap] = element;
        n = swap;
      } else {
        break;
      }
    }
  },
};
