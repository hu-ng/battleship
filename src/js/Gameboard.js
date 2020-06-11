import Ship from "./Ship";
import _ from "lodash";

const Gameboard = (size) => {
  const Token = {
    Sea: null,
    Ship: 0,
    Hit: 1,
    Miss: 2,
  };

  let _board = Array(size)
    .fill()
    .map(() => Array(size).fill(Token.Sea));

  const _misses = [];
  const _ships = [];

  // Queries
  const getBoard = () => _board;
  const getMisses = () => _misses;
  const getShips = () => _ships;
  const getTokens = () => Token;
  const allShipsSunk = () => _ships.every((shipRec) => shipRec.ship.isSunk());

  // Commands
  const placeShip = (shipLength, x, y, isHorizontal) => {
    let boardCopy = _.cloneDeep(_board);
    let x_end = x;
    let y_end = y;

    for (let i = 0; i < shipLength; i++) {
      if (x_end > size - 1 || y_end > size - 1) {
        throw new Error("Placement is out of bounds");
      }

      if (boardCopy[x_end][y_end] === Token.Ship) {
        throw new Error("Overlapping Ship");
      }

      boardCopy[x_end][y_end] = Token.Ship;
      if (isHorizontal) {
        y_end += 1;
      } else {
        x_end += 1;
      }
    }

    // Update ending positions
    if (isHorizontal) {
      y_end--;
    } else {
      x_end--;
    }

    // Update state if there are no errors
    _board = boardCopy;
    _ships.push({
      ship: Ship(shipLength),
      start: [x, y],
      end: [x_end, y_end],
    });
  };

  const _isShipHit = (shipRec, x, y) => {
    const isHit =
      shipRec.start[0] <= x &&
      x <= shipRec.end[0] &&
      shipRec.start[1] <= y &&
      y <= shipRec.end[1];
    let hitPosition;
    if (isHit) {
      hitPosition =
        x - shipRec.start[0] === 0
          ? y - shipRec.start[1]
          : x - shipRec.start[0];
    }

    return { isHit, hitPosition };
  };

  const _checkAttack = (x, y) => {
    for (const shipRec of _ships) {
      let { isHit, hitPosition } = _isShipHit(shipRec, x, y);
      if (isHit) {
        return {
          ship: shipRec.ship,
          hitPosition,
        };
      }
    }
    return null;
  };

  const receiveAttack = (x, y) => {
    let attackStatus = _checkAttack(x, y);
    if (attackStatus) {
      let { ship, hitPosition } = attackStatus;
      ship.hit(hitPosition); // update ship
      _board[x][y] = Token.Hit; // update board
    } else {
      _misses.push([x, y]);
      _board[x][y] = Token.Miss;
    }
    return attackStatus !== null;
  };

  return {
    getMisses,
    getBoard,
    getShips,
    getTokens,
    allShipsSunk,
    placeShip,
    receiveAttack,
  };
};

export default Gameboard;
