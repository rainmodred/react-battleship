function createCoords(x, y, length, orientation) {
  let [row, col] = [x, y];
  const coords = [];

  coords.push({ row, col });
  for (let i = 0; i < length - 1; i++) {
    if (orientation) {
      col++;
    }

    if (!orientation) {
      row++;
    }
    coords.push({ row, col });
  }

  return coords;
}

export default function Ship(row, col, length = 1, orientation = true) {
  // orientation true = horizontal, false = vertical
  // const id = `PS${row}${col}`;
  let hits = 0;
  const coords = createCoords(row, col, length, orientation);
  const hit = () => hits++;
  const isSunk = () => hits === length;
  const getCoords = () => coords;
  const getStartCoords = () => coords[0];

  return {
    get length() {
      return length;
    },
    get orientation() {
      return orientation;
    },
    getCoords,
    getStartCoords,
    hit,
    isSunk,
  };
}
