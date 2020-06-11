import Gameboard from "./Gameboard";
import Player from "./Player";
import Client from "./client";

const Game = (function (client) {
  const _player = Player();
  const _bot = Player();
  const _playerBoard = Gameboard(10);
  const _botBoard = Gameboard(10);

  // Set up a fixed board for both players
  _playerBoard.placeShip(5, 1, 0, true);
  _playerBoard.placeShip(4, 3, 1, false);
  _playerBoard.placeShip(3, 4, 5, true);
  _playerBoard.placeShip(3, 7, 5, false);
  _playerBoard.placeShip(2, 6, 8, false);

  _botBoard.placeShip(5, 1, 0, true);
  _botBoard.placeShip(4, 3, 1, false);
  _botBoard.placeShip(3, 5, 5, true);
  _botBoard.placeShip(3, 7, 5, false);
  _botBoard.placeShip(2, 6, 7, false);

  const playerBoardElem = document.getElementById("player-board")
    .firstElementChild;
  const botBoardElem = document.getElementById("bot-board").firstElementChild;

  let _playerTurn = true;

  const checkGameStatus = () => {
    playerWon = _botBoard.allShipsSunk();
    botWon = _playerBoard.allShipsSunk();

    if (playerWon) {
      return true, "Player Won!";
    }

    if (botWon) {
      return true, "Bot Won!";
    }

    return false;
  };

  const updateBoard = () => {
    if (_playerTurn) {
      console.log("player turn");
      client.renderBoard(_botBoard, botBoardElem);
      client.bindAttackHandler(botBoardElem, switchTurn, (x, y) =>
        _player.makeMove(_botBoard, x, y)
      );
    } else {
      console.log("bot turn");
      client.renderBoard(_playerBoard, playerBoardElem);
      client.bindAttackHandler(playerBoardElem, switchTurn, (x, y) =>
        _bot.makeMove(_playerBoard, x, y)
      );
    }
  };

  const nextTurn = () => {
    updateBoard();
    let gameStatus = checkGameStatus();
    if (gameStatus) {
      client.showWinner(gameStatus[1]);
    }
    _playerTurn = !_playerTurn;
  };

  const start = () => {
    client.renderBoard(_playerBoard, playerBoardElem);
    client.renderBoard(_botBoard, botBoardElem);

    client.bindAttackHandler(playerBoardElem, nextTurn, (x, y) =>
      _bot.makeMove(_playerBoard, x, y)
    );

    client.bindAttackHandler(botBoardElem, nextTurn, (x, y) =>
      _player.makeMove(_botBoard, x, y)
    );
  };

  return { start };
})(Client);

Game.start();
