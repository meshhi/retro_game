import { calcHealthLevel, calcTileType, generateTooltip } from "./utils";
import { generateTeam } from "./generators";

export default class GamePlay {
  constructor() {
    this.boardSize = 8;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.cellEnterListeners = [];
    this.cellLeaveListeners = [];
    this.newGameListeners = [];
    this.saveGameListeners = [];
    this.loadGameListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;
  }

  /**
   * Draws boardEl with specific theme
   *
   * @param theme
   */
  drawUi(theme) {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="controls">
        <button data-id="action-restart" class="btn">New Game</button>
        <button data-id="action-save" class="btn">Save Game</button>
        <button data-id="action-load" class="btn">Load Game</button>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.newGameEl = this.container.querySelector("[data-id=action-restart]");
    this.saveGameEl = this.container.querySelector("[data-id=action-save]");
    this.loadGameEl = this.container.querySelector("[data-id=action-load]");

    this.newGameEl.addEventListener("click", event => this.onNewGameClick(event));
    this.saveGameEl.addEventListener("click", event => this.onSaveGameClick(event));
    this.loadGameEl.addEventListener("click", event => this.onLoadGameClick(event));

    this.boardEl = this.container.querySelector("[data-id=board]");

    this.boardEl.classList.add(theme);
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell", "map-tile", `map-tile-${calcTileType(i, this.boardSize)}`);
      cellEl.addEventListener("mouseenter", event => this.onCellEnter(event));
      cellEl.addEventListener("mouseleave", event => this.onCellLeave(event));
      cellEl.addEventListener("click", event => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);

    if (!this.tooltip) {
      this.tooltip = generateTooltip();
      document.querySelector("body").appendChild(this.tooltip);
    }
    try {
      document.querySelector("body").removeEventListener("mousemove", this.mouseMover);
    } catch(e) {
      console.log(e);
    }
    document.querySelector("body").addEventListener("mousemove", this.mouseMover);
  }

  /**
   * Draws positions (with chars) on boardEl
   *
   * @param positions array of PositionedCharacter objects
   */
  redrawPositions(positions) {
    for (const cell of this.cells) {
      cell.innerHTML = "";
    }

    for (const position of positions) {
      if (position === -1) {
        continue;
      }
      const cellEl = this.boardEl.children[position.position];
      const charEl = document.createElement("div");
      charEl.classList.add("character", position.character.type);

      const healthEl = document.createElement("div");
      healthEl.classList.add("health-level");

      const healthIndicatorEl = document.createElement("div");
      healthIndicatorEl.classList.add("health-level-indicator", `health-level-indicator-${calcHealthLevel(position.character.health)}`);
      healthIndicatorEl.style.width = `${position.character.health}%`;
      healthEl.appendChild(healthIndicatorEl);

      charEl.appendChild(healthEl);
      cellEl.appendChild(charEl);
    }
  }

  /**
   * Add listener to mouse enter for cell
   *
   * @param callback
   */
  addCellEnterListener(callback) {
    this.cellEnterListeners.push(callback);
  }

  /**
   * Add listener to mouse leave for cell
   *
   * @param callback
   */
  addCellLeaveListener(callback) {
    this.cellLeaveListeners.push(callback);
  }

  /**
   * Add listener to mouse click for cell
   *
   * @param callback
   */
  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  /**
   * Add listener to "New Game" button click
   *
   * @param callback
   */
  addNewGameListener(callback) {
    this.newGameListeners.push(callback);
  }

  /**
   * Add listener to "Save Game" button click
   *
   * @param callback
   */
  addSaveGameListener(callback) {
    this.saveGameListeners.push(callback);
  }

  /**
   * Add listener to "Load Game" button click
   *
   * @param callback
   */
  addLoadGameListener(callback) {
    this.loadGameListeners.push(callback);
  }

  onCellEnter(event) {
    event.preventDefault();

    const index = this.cells.indexOf(event.currentTarget);
    const indexFrom = this.cells.indexOf(event.relatedTarget);

    this.cellEnterListeners.forEach(o => o.call(null, index, indexFrom));
  }

  onCellLeave(event) {
    event.preventDefault();
    // CUSTOM
    if (event.relatedTarget == this.tooltip) {
      return;
    }
    const index = this.cells.indexOf(event.currentTarget);
    this.cellLeaveListeners.forEach(o => o.call(null, index));
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach(o => o.call(null, index));
  }

  onNewGameClick(event) {
    event.preventDefault();
    this.newGameListeners.forEach(o => o.call(null));
  }

  onSaveGameClick(event) {
    event.preventDefault();
    this.saveGameListeners.forEach(o => o.call(null));
  }

  onLoadGameClick(event) {
    event.preventDefault();
    this.loadGameListeners.forEach(o => o.call(null));
  }

  static showError(message) {
    // alert(message);
    console.warn(message);
  }

  static showMessage(message) {
    alert(message);
  }

  selectCell(index, color = "yellow") {
    this.deselectCell(index);
    this.cells[index].classList.add("selected", `selected-${color}`);
  }

  deselectCell(index) {
    const cell = this.cells[index];
    cell.classList.remove(...Array.from(cell.classList)
      .filter(o => o.startsWith("selected")));
  }

  mouseMover = (event) => {
    const localX = event.pageX;
    const localY = event.pageY;
    this.tooltip.style.left = `${localX + 10}px`;
    this.tooltip.style.top = `${localY + 10}px`;
  };

  showCellTooltip(message, index) {
    if (this.cells[index].querySelector(".character")) {
      this.tooltip.style.display = "block";
      
      const localX = this.cells[index].offsetLeft;
      const localY = this.cells[index].offsetTop;
      this.tooltip.style.left = `${localX}px`;
      this.tooltip.style.top = `${localY}px`;
    }

    this.cells[index].title = message;
    this.tooltip.children[0].innerHTML = message;
  }

  hideCellTooltip(index) {
    this.tooltip.style.display = "none";
    this.cells[index].title = "";
    this.tooltip.children[0].innerHTML = "";
  }
  
  showDamage(index, damage) {
    return new Promise((resolve) => {
      const cell = this.cells[index];
      const damageEl = document.createElement("span");
      damageEl.textContent = damage;
      damageEl.classList.add("damage");
      cell.appendChild(damageEl);
      damageEl.addEventListener("animationend", () => {
        cell.removeChild(damageEl);
        resolve();
      });
    });
  }

  setCursor(cursor) {
    this.boardEl.style.cursor = cursor;
  }

  setCurrentCellStyle = (index, styleType) => {
    if (styleType === "go") {
      this.cells[index].classList.add("selected");
      this.cells[index].classList.add("selected-green");
      const styleClearGreen = (e) => {
        this.cells[index].classList.remove("selected");
        this.cells[index].classList.remove("selected-green");
        this.cells[index].removeEventListener("mouseleave", styleClearGreen);
      };
      this.cells[index].addEventListener("mouseleave", styleClearGreen);
    }
    if (styleType === "attack") {
      this.cells[index].classList.add("selected");
      this.cells[index].classList.add("selected-red");
      const styleClearRed = (e) => {
        this.cells[index].classList.remove("selected");
        this.cells[index].classList.remove("selected-red");
        this.cells[index].removeEventListener("mouseleave", styleClearRed);
      };
      this.cells[index].addEventListener("mouseleave", styleClearRed);
    }
    if (styleType === "friendly") {
      this.cells[index].classList.add("friendly");
      const styleClearFriendly = (e) => {
        this.cells[index].classList.remove("friendly");
        this.cells[index].removeEventListener("mouseleave", styleClearFriendly);
      };
      this.cells[index].addEventListener("mouseleave", styleClearFriendly);
    }
  };

  removeCurrentCellStyle = (index) => {
    console.log("removeCurrentCellStyle", index);
    try {
      this.cells[index].classList.remove("selected");
    } catch(e) {
      console.log("no_selected");
    }
    try {
      this.cells[index].classList.remove("selected-green");
    } catch(e) {
      console.log("no_selected_green");
    }
    try {
      this.cells[index].classList.remove("selected-yellow");
    } catch(e) {
      console.log("no_selected_yellow");
    }
    try {
      this.cells[index].classList.remove("selected-red");
    } catch(e) {
      console.log("no_selected_red");
    }

    try {
      this.cells[index].classList.remove("friendly");
    } catch(e) {
      
    }
  };

  checkBinding() {
    if (this.container === null) {
      throw new Error("GamePlay not bind to DOM");
    }
  }
}
