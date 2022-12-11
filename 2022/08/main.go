package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/Hall-Erik/AdventOfCode/2022/file"
)

var pl = fmt.Println

func makeForrest(lines []string) [][]int {
	forrest := [][]int{}
	for _, line := range lines {
		row := []int{}
		lineList := strings.Split(line, "")
		for _, char := range lineList {
			intChar, _ := strconv.Atoi(string(char))
			row = append(row, intChar)
		}
		forrest = append(forrest, row)
	}
	return forrest
}

func checkRow(row []int, index int, val int) bool {
	visibleLeft := true
	visibleRight := true
	leftSide := row[:index]
	rightSide := row[index+1:]

	for _, item := range leftSide {
		if item >= val {
			visibleLeft = false
		}
	}

	for _, item := range rightSide {
		if item >= val {
			visibleRight = false
		}
	}

	visible := visibleLeft || visibleRight

	return visible
}

func checkCol(forrest [][]int, rowIndex int, colIndex int, val int) bool {
	visibleTop := true
	visibleBottom := true

	for i := 0; i < rowIndex; i++ {
		if forrest[i][colIndex] >= val {
			visibleTop = false
		}
	}

	for i := rowIndex + 1; i < len(forrest); i++ {
		if forrest[i][colIndex] >= val {
			visibleBottom = false
		}
	}

	visible := visibleTop || visibleBottom

	return visible
}

func printVisibilityMap(dispMap [][]string) {
	for _, row := range dispMap {
		strRow := strings.Join(row, "")
		pl(strRow)
	}
}

func findVisible(forrest [][]int) int {
	visible := 0
	maxRow := len(forrest) - 1
	maxCol := len(forrest[0]) - 1

	visibilityMap := [][]string{}

	for i, row := range forrest {
		vRow := []string{}
		for j, val := range row {
			char := "."
			if (i == 0 || i == maxRow) || (j == 0 || j == maxCol) {
				char = "#"
			} else {
				if checkRow(row, j, val) || checkCol(forrest, i, j, val) {
					char = "#"
				}
			}
			vRow = append(vRow, char)
		}
		visibilityMap = append(visibilityMap, vRow)
	}

	printVisibilityMap(visibilityMap)

	for _, row := range visibilityMap {
		for _, val := range row {
			if val == "#" {
				visible++
			}
		}
	}

	return visible
}

func getRowScenicScore(row []int, index int, val int) int {
	leftScore := 0
	rightScore := 0

	for i := index - 1; i >= 0; i-- {
		leftScore++
		if row[i] >= val {
			break
		}
	}

	for i := index + 1; i < len(row); i++ {
		rightScore++
		if row[i] >= val {
			break
		}
	}
	return leftScore * rightScore
}

func getColScore(forrest [][]int, rowIndex int, colIndex int, val int) int {
	topScore := 0
	bottomScore := 0

	for i := rowIndex - 1; i >= 0; i-- {
		topScore++
		if forrest[i][colIndex] >= val {
			break
		}
	}

	for i := rowIndex + 1; i < len(forrest); i++ {
		bottomScore++
		if (forrest[i][colIndex]) >= val {
			break
		}
	}

	return topScore * bottomScore
}

func findScenicScore(forrest [][]int) int {
	bestScore := 0

	for i, row := range forrest {
		for j, val := range row {
			if i > 0 && j > 0 && i < len(forrest)-1 && j < len(row)-1 {
				rowScore := getRowScenicScore(row, j, val)
				colScore := getColScore(forrest, i, j, val)
				score := rowScore * colScore
				if bestScore < score {
					bestScore = score
				}
			}
		}
	}

	return bestScore
}

func main() {
	testLines := []string{
		"30373",
		"25512",
		"65332",
		"33549",
		"35390",
	}

	lines := file.ReadLines("input.txt")

	testForrest := makeForrest(testLines)
	pl("Test forrest:", findVisible(testForrest))

	forrest := makeForrest(lines)
	pl("Visible trees:", findVisible(forrest))

	pl("Test scenic score:", findScenicScore(testForrest))
	pl("Scenic score:", findScenicScore(forrest))
}
