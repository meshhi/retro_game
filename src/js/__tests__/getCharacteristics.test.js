import { getCharacteristics } from "../utils.js";
import { Bowman } from "../characters/Bowman.js";
import PositionedCharacter from "../PositionedCharacter.js";

test("Get charactersitcs of Positioned Character: correct template string result", () => {
    const character = new Bowman(1);
    const currentCellCharacter = new PositionedCharacter(character, 2);
    expect(getCharacteristics(currentCellCharacter)).toBe(`🏅 ${currentCellCharacter.character.level} ⚔️ ${currentCellCharacter.character.attack} 🛡 ${currentCellCharacter.character.defence} ❤️ ${currentCellCharacter.character.health}`);
});

