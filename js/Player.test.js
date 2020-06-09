import Player from "./Player";
import Gameboard from "./Gameboard";

let gameboard;
let player;
let tokens;

describe("makeMove()", () => {
  beforeEach(() => {
    gameboard = Gameboard(10);
    tokens = gameboard.getTokens();
    gameboard.placeShip(3, 0, 0, true);
    player = Player();
  });

  // Replace with mock
  test("successfuly attacks if coordinates is not taken", () => {
    player.makeMove(gameboard, 0, 0);
    expect(gameboard.getBoard()[0][0]).toBe(tokens.Hit);
  });

  test("throw error if coordinate has already been hit", () => {
    player.makeMove(gameboard, 0, 0);
    expect(() => {
      player.makeMove(gameboard, 0, 0);
    }).toThrow("An attack already exists here. Choose another spot");
  });
});
