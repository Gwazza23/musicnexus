export function msToMinutesAndSeconds(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} minutes ${seconds} seconds`;
}

export function getSeeds(array) {
  let seeds = [];
  if (array) {
    for (const obj of array) {
      seeds.push(obj.id);
    }
  }
  return seeds.join(",");
}

export function convertKey(key) {
  const notation = [
    "C",
    "C♯/ D♭",
    "D",
    "D♯/ E♭",
    "E",
    "F",
    "F♯/ G♭",
    "G",
    "G♯/ A♭",
    "A",
    "A♯/ B♭",
    "B",
  ];
  const keyHTML = key % 11;
  return notation[keyHTML];
}
