import Gameboard from "./Gameboard";

function setUpSunkShip(gb) {
  gb.placeShip(3, 0, 0, true);
  for (let i = 0; i < 3; i++) {
    gb.receiveAttack(0, i);
  }
}

function setUpPartialSunkShip(gb) {
  gb.placeShip(3, 0, 0, true);
  for (let i = 0; i < 3; i++) {
    gb.receiveAttack(0, i);
  }

  gb.placeShip(3, 1, 0, true);
}

describe("allShipsSunk()", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = Gameboard(10);
    return gameboard;
  });

  test("return false when not all ships are sunk", () => {
    setUpPartialSunkShip(gameboard);
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test("return false when not all ships are sunk", () => {
    setUpSunkShip(gameboard);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});

describe("receiveAttack()", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = Gameboard(10);
    gameboard.placeShip(3, 0, 0, true);
    return gameboard;
  });

  test("registers a missed attack", () => {
    expect(gameboard.receiveAttack(1, 1)).toBe(false);
    expect(gameboard.getShips()[0].ship.isHit()).toBe(false);
    const missCoord = gameboard.getMisses()[0];
    expect(missCoord[0] === 1 && missCoord[1] === 1).toBe(true);
  });

  test("registers a on-target attack", () => {
    expect(gameboard.receiveAttack(0, 0)).toBe(true);
  });

  test("marks board with attack", () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.getBoard()[0][0]).toBe(1);
  });

  // Replace with a mock
  test("should call hit() function on ship object", () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.getShips()[0].ship.isHit()).toBe(true);
  });
});

describe("placeship()", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = Gameboard(10);
    return gameboard;
  });

  test("should reflect ship location on the board", () => {
    gameboard.placeShip(3, 0, 0, true);
    expect(gameboard.getBoard()).toEqual([
      [0, 0, 0, ...new Array(7).fill(null)],
      ...new Array(9).fill().map(() => Array(10).fill(null)),
    ]);
  });

  test("should not place a ship when it overlaps with another ship", () => {
    gameboard.placeShip(3, 0, 0, true);
    expect(gameboard.placeShip(2, 0, 0, false)).toEqual(
      new Error("Overlapping Ship")
    );
  });

  test("should not place a ship when ship is out of bounds", () => {
    expect(gameboard.placeShip(3, 0, 9, true)).toEqual(
      new Error("Placement is out of bounds")
    );
  });
});
