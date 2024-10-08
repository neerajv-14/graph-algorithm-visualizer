
let allowedDirections = 4;

export function bfs(grid, startNode, finishNode, allowedDir) {
    allowedDirections = allowedDir;
    const visitedNodesForAnimation = [];
  
    const nodesQueue = [];
    nodesQueue.push(startNode);
    
    const xdir = [1, 0, -1, 0, 1, -1, -1, 1];
    const ydir = [0, 1, 0, -1, 1, -1, 1, -1];
    startNode.distance = 0;
    startNode.isVisited = true;
  
    while (nodesQueue.length) {
      const currentNode = nodesQueue.shift();
  
      
      if (currentNode === finishNode) return visitedNodesForAnimation;
  
      if (!currentNode.isWall) {
        visitedNodesForAnimation.push(currentNode);
  
        const { col, row } = currentNode;
        let nextNode;
        let nextrow, nextcol;
  
        for (let i = 0; i < allowedDirections; ++i) {
          nextrow = row + xdir[i];
          nextcol = col + ydir[i];
  
          if (
            nextrow >= 0 &&
            nextrow < grid.length &&
            nextcol >= 0 &&
            nextcol < grid[0].length &&
            !grid[nextrow][nextcol].isVisited &&
            !grid[nextrow][nextcol].isWall
          ) {
            nextNode = grid[nextrow][nextcol];
            nextNode.isVisited = true;
            nextNode.distance = currentNode.distance + 1;
            nextNode.previousNode = currentNode;
            nodesQueue.push(nextNode);
          }
        }
      }
    }
    return visitedNodesForAnimation;
  }
  