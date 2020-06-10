import { v4 as uuidv4 } from "uuid";

const Player = () => {
  const id = uuidv4();

  const getId = () => id;

  const makeMove = (gb, x, y) => {
    const board = gb.getBoard();
    const boardTokens = gb.getTokens();
    if (board[x][y] !== boardTokens.Hit) {
      gb.receiveAttack(x, y);
    } else {
      throw new Error("An attack already exists here. Choose another spot");
    }
  };

  return { getId, makeMove };
};

export default Player;
