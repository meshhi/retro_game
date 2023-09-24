import { calcTileType } from "../utils.js";

// jest.mock('../http');

// beforeEach(() => {
//   jest.resetAllMocks();
// });

test("top-left", () => {
    expect(calcTileType(0, 8)).toBe("top-left");
});

test("top-left", () => {
    expect(calcTileType(7, 8)).toBe("top-right");
});

test("bottom-left", () => {
    expect(calcTileType(2, 2)).toBe("bottom-left");
});


test("bottom-right", () => {
    expect(calcTileType(63, 8)).toBe("bottom-right");
});

test("right", () => {
    expect(calcTileType(15, 8)).toBe("right");
});

test("bottom", () => {
    expect(calcTileType(61, 8)).toBe("bottom");
});

test("left", () => {
    expect(calcTileType(8, 8)).toBe("left");
});

test("top", () => {
    expect(calcTileType(3, 8)).toBe("top");
});

