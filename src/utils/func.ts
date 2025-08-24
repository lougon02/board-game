export function numbersToClipPath(numbers: number[]): string {
  if (numbers.length % 2 !== 0) {
    throw new Error("Number array must have an even length (x, y pairs)");
  }
  const pairs = [];
  for (let i = 0; i < numbers.length; i += 2) {
    pairs.push(`${numbers[i] * 100}% ${numbers[i + 1] * 100}%`);
  }
  return `polygon(${pairs.join(", ")})`;
}