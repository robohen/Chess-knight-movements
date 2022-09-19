const makeBoard = () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      for (let j = 0; j < 8; j++) {
        board[i][j] = `[${i}, ${j}]`;
      }
    }
    return board;
  };
  
  const q = [];
  const visited = [];
  
  const getLegalMoves = ([x, y], board = makeBoard()) => {
    for (let i = 0; i < board.length; ++i) {
      board[i] = board[i].filter(
        (move) =>
          move === `[${x - 2}, ${y - 1}]` ||
          move === `[${x - 1}, ${y - 2}]` ||
          move === `[${x + 1}, ${y - 2}]` ||
          move === `[${x + 2}, ${y - 1}]` ||
          move === `[${x + 2}, ${y + 1}]` ||
          move === `[${x + 1}, ${y + 2}]` ||
          move === `[${x - 1}, ${y + 2}]` ||
          move === `[${x - 2}, ${y + 1}]`
      );
    }
    board = board.flat();
    return board;
  };
  
  const Node = ([x, y]) => {
    let node = { value: `[${x}, ${y}]`, prev: null };
    return node;
  };
  
  const bfs = (node, end) => {
    visited.push(q.shift());
    let children = getLegalMoves(JSON.parse(node.value));
    children.forEach((child) => {
      child = { value: child, prev: node };
      if (!visited.some((el) => el.value === child.value)) {
        q.push(child);
      }
    });
    if (node.value === Node(end).value) {
      return node;
    } else {
      return bfs(q[0], end);
    }
  };
  
  const knightMoves = (start, end) => {
    if (end[0] > 7 || end[0] < 0 || end[1] > 7 || end[1] < 0) {
      return "Out of range, please enter start and end points between [0, 0] and [7, 7]";
    }
    q.push(Node(start));
    let path = bfs(q[0], end);
    const output = [];
    output.push(path.value);
    while (path.prev !== null) {
      output.unshift(path.prev.value);
      path = path.prev;
    }
    console.log("Here is your path from " + start + " to " + end);
    output.forEach((move) => console.log(move));
  };
// example of moves
  console.log(knightMoves([1,3][7,0]));