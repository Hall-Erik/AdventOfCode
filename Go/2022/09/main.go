package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"

	"github.com/Hall-Erik/AdventOfCode/2022/file"
)

var pl = fmt.Println

type Pos struct {
	x int
	y int
}

func moveHead(d string, m int, pos Pos) Pos {
	switch d {
	case "R":
		pos.x = pos.x + m
	case "L":
		pos.x = pos.x - m
	case "U":
		pos.y = pos.y + m
	case "D":
		pos.y = pos.y - m
	}
	return pos
}

func moveTail(head Pos, tail Pos) Pos {
	xDiff := int(math.Abs(float64(head.x - tail.x)))
	yDiff := int(math.Abs(float64(head.y - tail.y)))
	pl("xDiff", xDiff, "yDiff", yDiff)
	if xDiff > 1 || yDiff > 1 {
		if head.x > tail.x {
			tail.x = tail.x + 1
		} else if head.x < tail.x {
			tail.x = tail.x - 1
		}
		if head.y > tail.y {
			tail.y = tail.y + 1
		} else if head.y < tail.y {
			tail.y = tail.y - 1
		}
	}
	return tail
}

func makeKey(pos Pos) string {
	sX := strconv.Itoa(pos.x)
	sY := strconv.Itoa(pos.y)
	return sX + ", " + sY
}

func part1(lines []string) int {
	head := Pos{0, 0}
	tail := Pos{0, 0}
	visited := map[string]string{}
	for _, line := range lines {
		lineList := strings.Split(line, " ")
		d := lineList[0]
		m, _ := strconv.Atoi(lineList[1])
		absM := int(math.Abs(float64(m)))
		signedUnit := m / absM
		for i := 0; i < absM; i++ {
			pl("Moving", d, lineList[1])
			head = moveHead(d, signedUnit, head)
			tail = moveTail(head, tail)
			pl(head, tail)
			key := makeKey(tail)
			visited[key] = "#"
		}
	}
	return len(visited)
}

func part2(lines []string) int {
	head := Pos{0, 0}
	tails := []Pos{}
	for i := 0; i < 9; i++ {
		tails = append(tails, Pos{0, 0})
	}
	visited := map[string]string{}

	for _, line := range lines {
		lineList := strings.Split(line, " ")
		d := lineList[0]
		m, _ := strconv.Atoi(lineList[1])
		absM := int(math.Abs(float64(m)))
		signedUnit := m / absM
		for i := 0; i < absM; i++ {
			pl("Moving", d, lineList[1])
			head = moveHead(d, signedUnit, head)
			h := head
			for i, tail := range tails {
				tail = moveTail(h, tail)
				tails[i] = tail
				pl(h, tail)
				h = tail
			}
			key := makeKey(tails[8])
			visited[key] = "#"
		}
	}

	return len(visited)
}

func main() {
	testLines := []string{
		"R 4",
		"U 4",
		"L 3",
		"D 1",
		"R 4",
		"D 1",
		"L 5",
		"R 2",
	}

	longerTestsLines := []string{
		"R 5",
		"U 8",
		"L 8",
		"D 3",
		"R 17",
		"D 10",
		"L 25",
		"U 20",
	}

	lines := file.ReadLines("input.txt")

	pl("Running tests:", part1(testLines))

	pl("Results:", part1(lines))

	pl("Running pt2 tests:", part2(testLines))
	pl("Running pt2 tests part 2:", part2(longerTestsLines))

	pl("Pt2 results:", part2(lines))
}
