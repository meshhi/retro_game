/**
 * Entry point of app: don't change this
 */
import GamePlay from "./GamePlay";
import GameController from "./GameController";
import GameStateService from "./GameStateService";
import Bot from "./Bot";

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector("#game-container"));
const stateService = new GameStateService(localStorage);
const bot = new Bot();
const gameCtrl = new GameController(gamePlay, stateService, bot);
gameCtrl.init();

// don't write your code here
