const Client = (() => {
  const renderBoard = (boardObj, boardElem) => {
    // Remove existing cells
    while (boardElem.firstElementChild) {
      boardElem.removeChild(boardElem.firstElementChild);
    }

    // Create new cells
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const cell = document.createElement("div");
        const classList = ["cell", "sea"];
        if (boardObj.getBoard()[x][y] === 0) classList.push("ship");
        if (boardObj.getBoard()[x][y] === 1) classList.push("hit");
        if (boardObj.getBoard()[x][y] === 2) classList.push("miss");
        cell.dataset.row = x;
        cell.dataset.col = y;

        for (const _class of classList) {
          cell.classList.add(_class);
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
        attackCellHandler(event.target.dataset.row, event.target.dataset.col);
        switchTurn();
      });
    }
  };

  const showWinner = () => {};

  return { renderBoard, bindAttackHandler };
})();

export default Client;
