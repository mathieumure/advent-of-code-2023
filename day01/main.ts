import fs from 'fs/promises';

type NumbersInLetters =
    "one" |
    "two" |
    "three" |
    "four" |
    "five" |
    "six" |
    "seven" |
    "eight" |
    "nine"
;

const IS_NUMBER = /^[0-9]$/

const numbersInLetters: Array<NumbersInLetters> = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];

const mapLetterToNumber: Record<NumbersInLetters, number> = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

export function getDigit (input: string): number {
    const chars  = input.split("");
    const start = chars.find(it => IS_NUMBER.test(it)) || "0";
    const end = chars.findLast(it => IS_NUMBER.test(it)) || "0";
    return parseInt(start+end);
}

export function getFirstNumber (input: string): number {
    const chars = input.split("");
    for (let i = 0; i < chars.length; i++) {
        const currentChar = chars[i];
        if (IS_NUMBER.test(currentChar)) {
            return parseInt(currentChar);
        }
        for (const number of numbersInLetters) {
            if (number.charAt(0) === currentChar) {
                const expectedNumberInLetter = input.slice(i, i + number.length);
                if (expectedNumberInLetter === number) {
                    return mapLetterToNumber[number];
                }
            }
        }
    }
    return -1;
}

export function getLastNumber (input: string): number {
    const chars = input.split("");
    for (let i = chars.length - 1; i >= 0; i--) {
        const currentChar = chars[i];
        if (IS_NUMBER.test(currentChar)) {
            return parseInt(currentChar);
        }
        for (const number of numbersInLetters) {
            if (number.charAt(0) === currentChar) {
                const expectedNumberInLetter = input.slice(i, i + number.length);
                if (expectedNumberInLetter === number) {
                    return mapLetterToNumber[number];
                }
            }
        }
    }
    return -1;
}

export function getDigitWithLetters (input: string): number {
    const start = getFirstNumber(input);
    const end = getLastNumber(input);
    return start * 10 + end;
}

export const part1 = async (filePath: string): Promise<number> => {
    const file = await fs.readFile(filePath);
    const lines = file.toString().split("\n");
    return lines.reduce((acc, it) => acc + getDigit(it), 0);
}

export const part2 = async (filePath: string): Promise<number> => {
    const file = await fs.readFile(filePath);
    const lines = file.toString().split("\n").filter(Boolean);
    return lines.reduce((acc, it) => acc + getDigitWithLetters(it), 0);
}
