import Gameboard from "./Gameboard";
import Player from "./Player";
import Client from "./client";
import _ from "lodash";

const Game = (function (client) {
  const _player = Player();
  const _bot = Player();
  const _playerBoard = Gameboard(10);
  const _botBoard = Gameboard(10);

  // botBoard has fixed ships for now

  _botBoard.placeShip(5, 1, 0, true);
  _botBoard.placeShip(4, 3, 1, false);
  _botBoard.placeShip(3, 5, 5, true);
  _botBoard.placeShip(3, 7, 5, false);
  _botBoard.placeShip(2, 6, 7, false);

  const playerBoardElem = document.getElementById("player-board")
    .firstElementChild;
  const botBoardElem = document.getElementById("bot-board").firstElementChild;

  client.bindPlaceShipHandler(
    _playerBoard.placeShip,
    _playerBoard.resetBoard,
    () => client.renderBoard(_playerBoard, playerBoardElem)
  );

  client.bindStartHandler(start);

  let _playerTurn = true;

  const checkGameStatus = () => {
    const playerWon = _botBoard.allShipsSunk();
    const botWon = _playerBoard.allShipsSunk();

    if (playerWon) {
      return "Player Won!";
    }

    if (botWon) {
      return "Bot Won!";
    }

    return false;
  };

  const nextTurn = () => {
    updateBoard();
    let gameStatus = checkGameStatus();
    if (gameStatus) {
      client.showWinner(gameStatus);
    }
    _playerTurn = !_playerTurn;

    // Bot moving
    if (!_playerTurn) {
      botMove();
      updateBoard();
      _playerTurn = !_playerTurn;
    }
  };

  const updateBoard = () => {
    if (_playerTurn) {
      console.log("player turn");
      client.renderBoard(_botBoard, botBoardElem, true);
      client.bindAttackHandler(botBoardElem, nextTurn, (x, y) =>
        _player.makeMove(_botBoard, x, y)
      );
    } else {
      console.log("bot turn");
      // client.renderBoard(_playerBoard, playerBoardElem);
      // client.bindAttackHandler(playerBoardElem, nextTurn, (x, y) =>
      //   _bot.makeMove(_playerBoard, x, y)
      // );
      client.renderBoard(_playerBoard, playerBoardElem);
    }
  };

  function start() {
    // client.bindAttackHandler(playerBoardElem, nextTurn, (x, y) =>
    //   _bot.makeMove(_playerBoard, x, y)
    // );

    client.bindAttackHandler(botBoardElem, nextTurn, (x, y) =>
      _player.makeMove(_botBoard, x, y)
    );
  }

  function showBoard() {
    client.renderBoard(_playerBoard, playerBoardElem);
    client.renderBoard(_botBoard, botBoardElem, true);
  }

  function botMove() {
    let x = _.random(0, 9);
    let y = _.random(0, 9);
    let err = _bot.makeMove(_playerBoard, x, y);
    while (err) {
      let x = _.random(0, 9);
      let y = _.random(0, 9);
      err = _bot.makeMove(_playerBoard, x, y);
    }
  }

  return { showBoard };
})(Client);

Game.showBoard();
