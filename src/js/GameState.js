export default class GameState {
  static gameStats = {
    wins: 0,
  };

  constructor() {
    this.state = {
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
    }
  }
  static from(object) {
    // TODO: create object
    return null;
  }
}
