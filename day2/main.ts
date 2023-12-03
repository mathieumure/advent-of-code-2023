import fs from "fs/promises";

type Game = {
	id: number | any;
	blue: number;
	red: number;
	green: number;
}

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

const INPUT_REGEX = /^Game (?<gameId>\d+): (?<content>.*)/

function parseGame (line: string): Game {
    const results = INPUT_REGEX.exec(line)!;
    const sets = results.groups!.content.split("; ");
    let blue = 0, red = 0, green = 0;
    sets.forEach(set => {
        const cubes = set.split(", ");
        cubes.forEach(cube => {
            const [amount, type] = cube.split(" ");
            const amountInt = parseInt(amount);
            if (type === 'blue' && amountInt > blue)
                blue = amountInt
            if (type === 'red' && amountInt > red)
                red = amountInt
            if (type === 'green' && amountInt > green)
                green = amountInt
        })
    })

    return {
        id: parseInt(results?.groups!.gameId),
        blue,
        red,
        green,
    }
}

export const part1 = async (filePath: string): Promise<number> => {
	const VALUE_RED = 12;
	const VALUE_GREEN = 13;
	const VALUE_BLUE = 14;


    const file = await fs.readFile(filePath);
    const lines = file.toString().split("\n").filter(Boolean);
	const games: Array<Game> = lines.map(parseGame);

	const possibleGame = games.filter(game => game.blue <= VALUE_BLUE && game.red <= VALUE_RED && game.green <= VALUE_GREEN);

	return possibleGame.reduce((acc, game) => acc + game.id, 0)
}


export const part2 = async (filePath: string): Promise<number> => {
    const file = await fs.readFile(filePath);
    const lines = file.toString().split("\n").filter(Boolean);
    const games: Array<Game> = lines.map(parseGame);
	const powers = games.map(game => game.blue*game.green*game.red);
	return powers.reduce((acc, power) => acc + power, 0)
}
