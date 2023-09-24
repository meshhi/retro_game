import GameState from "./GameState";
import Character from "./Character";
import PositionedCharacter from "./PositionedCharacter";
import { Bowman } from "./characters/Bowman.js";
import { Swordsman } from "./characters/Swordsman.js";
import { Magician } from "./characters/Magician.js";
import { Undead } from "./characters/Undead.js";
import { Vampire } from "./characters/Vampire.js";
import { Daemon } from "./characters/Daemon.js";
import GamePlay from "./GamePlay";

export default class GameStateService {
  constructor(storage) {
    this.storage = storage;
    this.state = new GameState().state;
  }

  save(state) {
    this.storage.setItem("state", JSON.stringify(state));
  }

  load() {
    try {
      let loadedState = JSON.parse(this.storage.getItem("state"));
      for (let team in loadedState.teams) {
        for (let positionedCharacter of loadedState.teams[team]) {
          if (!(positionedCharacter.character instanceof Character)) {
            let character = positionedCharacter.character;
            if (character.type === "vampire") {
              character = new Vampire(character.level, character.attack, character.defence, character.health, character.type, true);
            }
            if (character.type === "daemon") {
              character = new Daemon(character.level, character.attack, character.defence, character.health, character.type, true);
            }
            if (character.type === "undead") {
              character = new Undead(character.level, character.attack, character.defence, character.health, character.type, true);
            }
            if (character.type === "bowman") {
              character = new Bowman(character.level, character.attack, character.defence, character.health, character.type, true);
            }
            if (character.type === "swordsman") {
              character = new Swordsman(character.level, character.attack, character.defence, character.health, character.type, true);
            }
            if (character.type === "magician") {
              character = new Magician(character.level, character.attack, character.defence, character.health, character.type, true);
            }
            positionedCharacter.character = character;
          }

          if (!(positionedCharacter instanceof PositionedCharacter)) {
            positionedCharacter = new PositionedCharacter(positionedCharacter.character, positionedCharacter.position);
          }
        }
      }
      return loadedState;
    } catch (e) {
      GamePlay.showMessage('State could not be loaded')
      throw new Error("Invalid state");
    }
  }
}
