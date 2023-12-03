import {expect, test} from "vitest";
import {getNumberFromPosition, part1, part2} from "./main.ts";

test('part 1 - sample', async () => {
    expect(await part1('./day3/sample.txt')).toEqual(4361);
})
test('part 1 - input', async () => {
    expect(await part1('./day3/input.txt')).toEqual(557705);
})
test('part 2 - sample', async () => {
    expect(await part2('./day3/sample-2.txt')).toEqual(467835);
})
test('part 2 - input', async () => {
    expect(await part2('./day3/input.txt')).toEqual(0);
})


test('numberFromPosition', () => {
    expect(getNumberFromPosition({y: 0, x: 2}, "467..114..")).toEqual(467)
    expect(getNumberFromPosition({y: 0, x: 5}, "467..114..")).toEqual(114)
    expect(getNumberFromPosition({y: 0, x: 7}, "467..114..")).toEqual(114)
    expect(getNumberFromPosition({y: 0, x: 8}, "..35..6.33")).toEqual(33)
})
