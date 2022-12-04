package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

var pl = fmt.Println

type gameDef func(string) int

func readGames(file string) []string {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	games := strings.Split(string(data), "\n")

	return games
}

/*

Rock: A, X, 1
Paper: B, Y, 2
Scissers: C, Z, 3

w
3 - 2 = 1
2 - 1 = 1
1 - 3 = -2

t
3 - 3 = 0
2 - 2 = 0
1 - 1 = 0

l
3 - 1 = 2
2 - 3 = -1
1 - 2 = -1

*/

func getMoveValue(move string) int {
	value := 0

	switch move {
	case "A":
		fallthrough
	case "X":
		value = 1
	case "B":
		fallthrough
	case "Y":
		value = 2
	case "C":
		fallthrough
	case "Z":
		value = 3
	}

	return value
}

func scoreMove(a int, b int) int {
	diff := b - a

	value := 0

	switch diff {
	case 2:
		fallthrough
	case -1:
		value = 0
	case 0:
		value = 3
	case -2:
		fallthrough
	case 1:
		value = 6
	}

	return value
}

func playGame(game string) int {
	moves := strings.Split(game, " ")
	a := getMoveValue(moves[0])
	b := getMoveValue(moves[1])

	score := scoreMove(a, b)
	outcome := score + b

	return outcome
}

func getMoveFromResult(a int, b string) int {
	/*
		X -> lose
		Y -> tie
		Z -> win
	*/
	desiredOutcome := 0
	switch b {
	case "X":
		desiredOutcome = 0
	case "Y":
		desiredOutcome = 3
	case "Z":
		desiredOutcome = 6
	}

	possibleOutcomes := []int{
		scoreMove(a, 1),
		scoreMove(a, 2),
		scoreMove(a, 3),
	}

	value := 0

	for i, outcome := range possibleOutcomes {
		if desiredOutcome == outcome {
			value = i + 1
		}
	}

	return value
}

func playGameV2(game string) int {
	moves := strings.Split(game, " ")
	a := getMoveValue(moves[0])
	b := getMoveFromResult(a, moves[1])

	score := scoreMove(a, b)
	outcome := score + b

	return outcome
}

func rungGames(games []string, gameMode gameDef) int {
	totalScore := 0

	for _, game := range games {
		if len(game) > 1 {
			totalScore += gameMode(game)
		}
	}

	return totalScore
}

func main() {
	testGames := []string{
		"A Y",
		"B X",
		"C Z",
	}

	pl("Running games...")
	totalScore := rungGames(testGames, playGame)
	pl("Final score: ", totalScore)

	pl()

	pl("Running games...")
	games := readGames("input.txt")
	totalScore = rungGames(games, playGame)
	pl("Final score: ", totalScore)

	pl()
	pl("Part 2")
	pl()

	pl("Running games...")
	totalScore = rungGames(testGames, playGameV2)
	pl("Final score: ", totalScore)

	pl()

	pl("Running games...")
	totalScore = rungGames(games, playGameV2)
	pl("Final score: ", totalScore)

}
