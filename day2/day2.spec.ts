import {expect, test} from "vitest";
import {part1, part2} from "./main.ts";

test('part 1 - sample', async () => {
    expect(await part1('./day2/sample.txt')).toEqual(8);
})
test('part 1 - input', async () => {
    expect(await part1('./day2/input.txt')).toEqual(2156);
})
test('part 2 - sample', async () => {
    expect(await part2('./day2/sample.txt')).toEqual(2286);
})
test('part 2 - input', async () => {
    expect(await part2('./day2/input.txt')).toEqual(66909);
})
