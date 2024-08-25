
import { BinaryHeap } from "./binaryHeap";

let allowedDirections = 4;

function getHeap() {
  return new BinaryHeap(function (node) {
    return node.distance;
  });
}

export function dijkstra(grid, startNode, finishNode, allowedDir) {
  allowedDirections = allowedDir;
  const visitedNodesForAnimation = [];
  var heap = getHeap();

  startNode.distance = 0;
  heap.push(startNode);

  while (heap.size() > 0) {
    var closestNode = heap.pop();
    
    if (closestNode.isWall) continue;

    
    if (closestNode.distance === Infinity) return visitedNodesForAnimation;

    
    closestNode.isVisited = true;
    visitedNodesForAnimation.push(closestNode);

    
    if (closestNode === finishNode) return visitedNodesForAnimation;

    const unvisitedNeighbors = getAllUnvisitedNeighbors(closestNode, grid);

    for (const neighbor of unvisitedNeighbors) {
      if (neighbor.distance > closestNode.distance + neighbor.weight) {
        neighbor.distance = closestNode.distance + neighbor.weight;
        neighbor.previousNode = closestNode;
        if (heap.find(neighbor)) {
          heap.updateElement(neighbor);
        } else {
          heap.push(neighbor);
        }
      }
    }
  }

  return visitedNodesForAnimation;
}

function getAllUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const xdir = [1, -1, 0, 0, -1, -1, 1, 1];
  const ydir = [0, 0, 1, -1, 1, -1, 1, -1];

  const { col, row } = node;

  for (let i = 0; i < allowedDirections; ++i) {
    let nextrow = row + xdir[i];
    let nextcol = col + ydir[i];
    if (
      nextrow >= 0 &&
      nextrow < grid.length &&
      nextcol >= 0 &&
      nextcol < grid[0].length &&
      !grid[nextrow][nextcol].isVisited &&
      !grid[nextrow][nextcol].isWall
    )
      neighbors.push(grid[nextrow][nextcol]);
  }

  return neighbors;
}


export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
