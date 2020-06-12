const Client = (() => {
  const _colLetters = "abcdefghij";
  const _startBtn = document.getElementById("start-game");
  const _placeShipBtn = document.getElementById("place-ship");

  const renderBoard = (boardObj, boardElem, isBot) => {
    // Remove existing cells
    while (boardElem.firstElementChild) {
      boardElem.removeChild(boardElem.firstElementChild);
    }
    // White cell first
    boardElem.appendChild(_createCell());

    // Add letter column
    [..._colLetters].forEach((char) => {
      const colCell = _createCell();
      colCell.innerText = char;
      boardElem.appendChild(colCell);
    });

    // Create new cells
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 11; y++) {
        const cell = _createCell();

        if (y === 0) {
          cell.innerText = x;
        } else {
          const classList = ["sea", "cell-border"];
          if (boardObj.getBoard()[x][y - 1] === 0 && !isBot)
            classList.push("ship");
          if (boardObj.getBoard()[x][y - 1] === 1) classList.push("hit");
          if (boardObj.getBoard()[x][y - 1] === 2) classList.push("miss");
          cell.dataset.row = x;
          cell.dataset.col = y - 1;

          for (const _class of classList) {
            cell.classList.add(_class);
          }
        }
        boardElem.appendChild(cell);
      }
    }
  };

  const bindAttackHandler = (boardElem, switchTurn, attackCellHandler) => {
    const cells = boardElem.childNodes;
    for (const cell of cells) {
      cell.addEventListener("click", (event) => {
        console.log("clicked");
        let err = attackCellHandler(
          event.target.dataset.row,
          event.target.dataset.col
        );
        if (!err) {
          switchTurn();
        }
      });
    }
  };

  const bindPlaceShipHandler = (
    placeShipHandler,
    resetBoardHandler,
    renderCallback
  ) => {
    const ships = {
      battleship: 4,
      cruiser: 3,
      carrier: 5,
      submarine: 3,
      destroyer: 2,
    };

    const fields = ["x", "y", "horizontal"];

    _placeShipBtn.addEventListener("click", (event) => {
      event.preventDefault();
      resetBoardHandler();
      let argsList = [];
      Object.keys(ships).forEach((ship) => {
        let args = {};
        args["length"] = ships[ship];
        fields.forEach((field) => {
          let input = document.getElementById([ship, field].join("-"));
          if (field == "y")
            args[field] = _colLetters.indexOf(input.value.toLowerCase());
          if (field == "x") args[field] = Number(input.value);
          if (field == "horizontal") args[field] = input.checked;
        });

        argsList.push(args);
      });

      for (const args of argsList) {
        placeShipHandler(args.length, args.x, args.y, args.horizontal);
      }
      renderCallback();
    });
  };

  const bindStartHandler = (startHandler) => {
    _startBtn.addEventListener("click", (event) => {
      event.preventDefault();
      startHandler();
      _startBtn.disabled = true;
      _placeShipBtn.disabled = true;
    });
  };

  const showWinner = (status) => {
    alert(status);
  };

  function _createCell() {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    return cell;
  }

  return {
    renderBoard,
    bindAttackHandler,
    showWinner,
    bindPlaceShipHandler,
    bindStartHandler,
  };
})();

export default Client;
