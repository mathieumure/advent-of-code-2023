import fs from "fs/promises";

type Position = {
    x: number
    y: number
}

const NOT_SPECIAL_CHAR = /[\d.]/
const NUMBER = /\d/

export function getNumberFromPosition(position: Position, line: string): number {
    const start = line.split("").findLastIndex((char, index) => {
        return (index <= position.x && !NUMBER.test(char));
    });
    let end = line.split("").findIndex((char, index) => {
        return (index >= position.x && !NUMBER.test(char))
    });
    if (end === -1) {
        end = line.length
    }
    return parseInt(line.slice(start+1, end))
}

export function getAroundPosition(position: Position, maxPosition: Position): Array<Position> {
    const positions: Array<Position> = []
    const addIfValid = (position: Position) => {
        if (position.x >= 0 && position.x <=maxPosition.x && position.y >= 0 && position.y <= maxPosition.y) {
            positions.push(position)
        }
    }
    addIfValid({ x: position.x -1, y: position.y -1 })
    addIfValid({ x: position.x -1, y: position.y })
    addIfValid({ x: position.x -1, y: position.y + 1})
    addIfValid({ x: position.x, y: position.y - 1})
    addIfValid({ x: position.x, y: position.y + 1})
    addIfValid({ x: position.x +1, y: position.y -1 })
    addIfValid({ x: position.x +1, y: position.y })
    addIfValid({ x: position.x +1, y: position.y + 1})

    return positions;
}

export const part1 = async (filePath: string): Promise<number> => {
    const file = await fs.readFile(filePath);
    const lines = file.toString().split("\n").filter(Boolean);

    const specialCharsPosition: Array<Position> = [];

    lines.forEach((line, y) => {
        const chars = line.split("")
        chars.forEach((char, x) => {
            if (!NOT_SPECIAL_CHAR.test(char)) {
                specialCharsPosition.push({ x, y })
            }
        })
    })

    const maxPosition = {y: lines.length, x: lines[0].length}

    const validPosition: Array<number> = []
    specialCharsPosition.map(position => {
        const otherPositions = getAroundPosition(position, maxPosition);
        const localPositions: Array<number> = []
        otherPositions.forEach(other => {
            const number = getNumberFromPosition(other, lines[other.y]);
            if (!isNaN(number) && !localPositions.includes(number)) {
                localPositions.push(number)
            }
        })
        validPosition.push(...localPositions)
    })

    return validPosition.reduce((acc, value) => acc + value, 0)
}


export const part2 = async (filePath: string): Promise<number> => {
    const file = await fs.readFile(filePath);
    const lines = file.toString().split("\n").filter(Boolean);

    const specialCharsPosition: Array<Position> = [];

    lines.forEach((line, y) => {
        const chars = line.split("")
        chars.forEach((char, x) => {
            if (char === "*") {
                specialCharsPosition.push({ x, y })
            }
        })
    })

    const maxPosition = {y: lines.length, x: lines[0].length}

    const validPosition: Array<number> = []
    specialCharsPosition.map(position => {
        const otherPositions = getAroundPosition(position, maxPosition);
        const localPositions: Array<number> = []
        otherPositions.forEach(other => {
            const number = getNumberFromPosition(other, lines[other.y]);
            if (!isNaN(number) && !localPositions.includes(number)) {
                localPositions.push(number)
            }
        })
        if (localPositions.length === 2) {
            validPosition.push(localPositions[0]*localPositions[1])
        }
    })

    return validPosition.reduce((acc, value) => acc + value, 0)
}
