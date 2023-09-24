import GameStateService from "../GameStateService";
import GameState from "../GameState";
import GamePlay from "../GamePlay";


afterAll(() => {
    jest.restoreAllMocks();
});

test("Load state correct", () => {
    const state = new GameState();
    const service = new GameStateService(null);
    let spy = jest.spyOn(service, 'load').mockImplementation(() => state.state);
    expect(service.load()).toEqual({
        "currentTurn": {
            "player": 0,
            "status": "select"
        },
        "themes": {
            "list": [
                "prairie",
                "desert",
                "arctic",
                "mountain"
            ],
            "current": 0
        },
        "teams": {
            "1": [],
            "2": []
        },
        "selectedIndex": null
    });
});

test("Load state incorrect", () => {
    const service = new GameStateService(null);
    expect(() => service.load()).toThrow();
});
