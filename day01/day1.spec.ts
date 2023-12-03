import {test, expect} from "vitest";
import {getDigit, getDigitWithLetters, getFirstNumber, getLastNumber, part1, part2} from "./main.ts";

test.each`
input               | expected
${'1abc2'}          | ${12}
${'pqr3stu8vwx'}    | ${38}
${'a1b2c3d4e5f'}    | ${15}
${'treb7uchet'}    | ${77}
`('find $expected from $input', ({ input, expected }) => {
    expect(getDigit(input)).toBe(expected)
})

test('part 1 - sample', async () => {
    expect(await part1('./day1/sample.txt')).toEqual(142);
})
test('part 1 - input', async () => {
    expect(await part1('./day1/input.txt')).toEqual(56049);
})
test('part 2 - sample', async () => {
    expect(await part2('./day1/sample-2.txt')).toEqual(281);
})
test('part 2 - input', async () => {
    expect(await part2('./day1/input.txt')).toEqual(54530);
})

test.each`
input                | expected
${'two1nine'}        | ${2}
${'eightwothree'}        | ${8}
${'abcone2threexyz'}        | ${1}
${'xtwone3four'}        | ${2}
${'4nineeightseven2'}        | ${4}
${'zoneight234'}        | ${1}
${'7pqrstsixteen'}        | ${7}
`('find $expected from $input', ({ input, expected }) => {
    expect(getFirstNumber(input)).toBe(expected)
})

test.each`
input                | expected
${'two1nine'}        | ${9}
${'eightwothree'}        | ${3}
${'abcone2threexyz'}        | ${3}
${'xtwone3four'}        | ${4}
${'4nineeightseven2'}        | ${2}
${'zoneight234'}        | ${4}
${'7pqrstsixteen'}        | ${6}
`('find $expected from $input', ({ input, expected }) => {
    expect(getLastNumber(input)).toBe(expected)
})

test.each`
input                | expected
${'two1nine'}        | ${29}
${'eightwothree'}        | ${83}
${'abcone2threexyz'}        | ${13}
${'xtwone3four'}        | ${24}
${'4nineeightseven2'}        | ${42}
${'zoneight234'}        | ${14}
${'7pqrstsixteen'}        | ${76}
`('find $expected from $input', ({ input, expected }) => {
    expect(getDigitWithLetters(input)).toBe(expected)
})
