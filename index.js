// ADD DELETE METHOD


function BST(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BST.prototype.insert = function(value) {
  if (value <= this.value) {
    if(!this.left) this.left = new BST(value);
    else this.left.insert(value)
  } else {
    if(!this.right) this.right = new BST(value);
    else this.right.insert(value)
  }
}

BST.prototype.contains = function(value) {
  if (value === this.value) return true
  else if (value < this.value) {
    if (!this.left) {
      return false
    } else {
      return this.left.contains(value)
    }  
  } 
  else if (value > this.value) {
    if (!this.right) {
      return false
    } else {
      return this.right.contains(value)
    }
  }  
}


// i dont really get this too well notes lower
BST.prototype.depthFirstTraversal = function(iteratorFunc, order) {
  if (order === 'pre-order') iteratorFunc(this.value)
  //this searches the left nodes 
  if (this.left) this.left.depthFirstTraversal(iteratorFunc,order);
  //then searches the parent node
  if (order === 'in-order') iteratorFunc(this.value);
  // then searches the right nodes
  if(this.right) this.right.depthFirstTraversal(iteratorFunc,order);
  if (order === 'post-order') iteratorFunc(this.value);

}




function logDepth(value) {
  console.log(value)
}

function logBreadth(node) {
  console.log(node.value)
}

//BreadthFirst.  an example of why you would use this is if you have all the employees in a company you could tell who is higher in command then others.  because it searches from top down
BST.prototype.breadthFirstTraversal = function(iteratorFunc) {
  //this is refereing to the root node
  const queue = [this];
  while (queue.length) {
    let treeNode = queue.shift();
    iteratorFunc(treeNode)
    if (treeNode.left) queue.push(treeNode.left);
    if (treeNode.right) queue.push(treeNode.right)     
  }
}

BST.prototype.getMinVal = function(){
  if (this.left) return this.left.getMinVal();
  else return this.value
}

BST.prototype.getMaxVal = function(){
  if (this.right) return this.right.getMaxVal();
  else return this.value
}






const bst = new BST(50);

bst.insert(30)
bst.insert(70)
bst.insert(100)
bst.insert(60)
bst.insert(59)
bst.insert(45)
bst.insert(85)
bst.insert(105)
bst.insert(20)
bst.insert(35)
bst.insert(10)




console.log(`MIN: ${bst.getMinVal()}`)
console.log(`MAX: ${bst.getMaxVal()}`)




//_____DEPTH FIRST TRAVERSAL EXPLANATION___
// First, keep in mind recursion bubbling. 

// Then look at where iteratorFunc(this.value)  is placed in the recursion based on which 'order' param is being passed in. 

// Pre-order:

// iteratorFunc()  is just a console log here, so when it's put at the top, like in pre-order, it logs the values as it goes down the left of 50, then the left of 30, and so on. Since it's still actively running the 'parent' recursive functions (the 'paused' functions running outside of each other), once all of the 'lefts' are done running, it starts at the last recursively running function, that has a right node (30 has 45, 50 has 70) because it has yet to run it's this.right.depthFirstTraversal ... So, once it hits a child-less node, since it's running recursively (inside itself, inside itself, inside itself, or w/e) the recursive functions stop running consecutively up the tree for the nodes that don't have a right-child-node until it runs within the last object that had a right-child-node, and starts from there. 

// In-order:

// The reason 'in-order' prints them out from smallest-to-largest value is because of how the nodes are positioned (very important for in-order). Each node is it's own sorting order in a way. Less than 50? Left. Less than 30? Left. Less than 20? Left. The smallest node is always the farthest left down the tree. So, it goes down to 10. When it runs out of left nodes, it logs 10 and checks for a right node. No right node? Log 20 and check for a right node. No right node. Log 30 and check for a right node (once all of it's right-node sub-recursions end, it's total function recursion ends). Bingo, 45 has a right node so start all over again and run this.left.depthFirstTraversal  all the way down until there aren't any left nodes left. Print 35. No left or right nodes, ends the current recursive function for the 35 node. So the 45 node's recursive function then prints "45", and checks if there's a right node, which there isn't.

// So, so far it has printed 10, 20, 30, 35, 45. 

// Then since 30 has already finished it's left and right node checks, it ends and 50 (since it already printed all of it's children to the left (30's children) prints before starting it's right-side recursive function. 70 checks if it has a left node, and it does, 60, so that checks if it has a left node and it does, but 59 doesn't have any lesser-children so it prints 59, doesn't have any right children so node with the value of 59 ends, 60 checks if it has any right nodes but it doesn't so it ends, and 70 prints before it goes down it's right tree. 100 -> 85. 85 prints, bubbles up to 100, that prints before checking it's right node, 105. SO FINALLY 105 PRINTS.   


//______Breadth First Explanations_______
// Why do we have to use:
// var queue = [this]
// and not:
// var queue = [this.value]
// ?

// Because you want the whole node to be in the queue, not just its value, if you only put the value into the queue, you wont be able to traverse the whole way down the tree in your recursion, because it would have no clue any children exist