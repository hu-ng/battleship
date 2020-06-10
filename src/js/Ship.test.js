import Ship from "./Ship";

describe("isHit()", () => {
  let ship;
  beforeEach(() => {
    ship = Ship(4);
    return ship;
  });

  test("should return true if one position is hit", () => {
    ship.hit(2);
    expect(ship.isHit()).toBe(true);
  });

  test("should return false if no positions are hit", () => {
    expect(ship.isHit()).toBe(false);
  });
});

describe("isSunk()", () => {
  const shipLength = 4;
  let ship;

  beforeEach(() => {
    ship = Ship(shipLength);
    return ship;
  });

  test("should return true if all positions are hit", () => {
    for (let i = 0; i < 4; i++) {
      ship.hit(i);
    }
    expect(ship.isSunk()).toBe(true);
  });

  test("should return false if not all positions are hit", () => {
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
  });
});

describe("hit()", () => {
  let ship;

  beforeEach(() => {
    ship = Ship(4);
    return ship;
  });

  test("should mark position as hit if input is valid", () => {
    let hitPosition = 1;
    ship.hit(hitPosition);
    expect(ship.getShip()[hitPosition]).toBe(true);
  });
});
