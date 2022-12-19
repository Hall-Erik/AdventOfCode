package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/Hall-Erik/AdventOfCode/2022/file"
)

var pl = fmt.Println

const ARRAY_SIZE = 20

type Point struct {
	x int
	y int
	z int
}

type SeenPoints map[Point]bool

type Field [ARRAY_SIZE][ARRAY_SIZE][ARRAY_SIZE]int

func findMaxNum(lines []string) int {
	max := 0

	for _, line := range lines {
		lineArr := strings.Split(line, ",")
		for _, i := range lineArr {
			n, _ := strconv.Atoi(i)
			if n > max {
				max = n
			}
		}
	}

	return max
}

func buildPoints(lines []string) []Point {
	points := []Point{}

	for _, line := range lines {
		lineArr := strings.Split(line, ",")
		x, _ := strconv.Atoi(lineArr[0])
		y, _ := strconv.Atoi(lineArr[1])
		z, _ := strconv.Atoi(lineArr[2])
		points = append(points, Point{x: x, y: y, z: z})
	}

	return points
}

func buildMap(points []Point) Field {
	field := Field{}

	for _, point := range points {
		field[point.x][point.y][point.z] = 1
	}

	return field
}

func countNeighbors(point Point, field Field) int {
	neighbors := 0
	x := point.x
	y := point.y
	z := point.z

	if x > 0 && field[x-1][y][z] == 1 {
		neighbors++
	}
	if x < ARRAY_SIZE-1 && field[x+1][y][z] == 1 {
		neighbors++
	}

	if y > 0 && field[x][y-1][z] == 1 {
		neighbors++
	}
	if y < ARRAY_SIZE-1 && field[x][y+1][z] == 1 {
		neighbors++
	}

	if z > 0 && field[x][y][z-1] == 1 {
		neighbors++
	}
	if z < ARRAY_SIZE-1 && field[x][y][z+1] == 1 {
		neighbors++
	}

	return neighbors
}

func countSides(points []Point, field Field) int {
	sides := 0

	for _, point := range points {
		s := 6 - countNeighbors(point, field)
		sides += s
	}

	return sides
}

func part1(lines []string) int {
	points := buildPoints(lines)
	field := buildMap(points)
	sides := countSides(points, field)
	return sides
}

func findTrapped(field Field, points []Point) []Point {
	trapped := []Point{}

	for i := 0; i < ARRAY_SIZE; i++ {
		for j := 0; j < ARRAY_SIZE; j++ {
			for k := 0; k < ARRAY_SIZE; k++ {
				p := Point{i, j, k}
				if field[i][j][k] == 0 {
					trapped = append(trapped, p)
				}
			}
		}
	}

	return trapped
}

func haveSeen(point Point, seen SeenPoints) bool {
	_, exists := seen[point]
	if exists {
		return true
	} else {
		seen[point] = true
		return false
	}
}

func isAccessibleNeighbor(point Point, field Field, seen SeenPoints) bool {
	x := point.x
	y := point.y
	z := point.z
	if haveSeen(point, seen) {
		return false
	} else if field[x][y][z] == 0 {
		return true
	}
	return false
}

func findAccessibleNeighbors(point Point, field Field, seen SeenPoints) []Point {
	// pl(point)
	x := point.x
	y := point.y
	z := point.z
	neighbors := []Point{}

	// left n
	if x > 0 {
		p := Point{x - 1, y, z}
		if isAccessibleNeighbor(p, field, seen) {
			neighbors = append(neighbors, p)
		}
	}
	// righ n
	if x < ARRAY_SIZE-1 {
		p := Point{x + 1, y, z}
		if isAccessibleNeighbor(p, field, seen) {
			neighbors = append(neighbors, p)
		}
	}
	// top n
	if y > 0 {
		p := Point{x, y - 1, z}
		if isAccessibleNeighbor(p, field, seen) {
			neighbors = append(neighbors, p)
		}
	}
	// bottom n
	if y < ARRAY_SIZE-1 {
		p := Point{x, y + 1, z}
		if isAccessibleNeighbor(p, field, seen) {
			neighbors = append(neighbors, p)
		}
	}
	// front n
	if z > 0 {
		p := Point{x, y, z - 1}
		if isAccessibleNeighbor(p, field, seen) {
			neighbors = append(neighbors, p)
		}
	}
	// back n
	if z < ARRAY_SIZE-1 {
		p := Point{x, y, z + 1}
		if isAccessibleNeighbor(p, field, seen) {
			neighbors = append(neighbors, p)
		}
	}

	return neighbors
}

func fillOutside(point Point, field Field, seen SeenPoints) Field {
	field[point.x][point.y][point.z] = 2
	neighbors := findAccessibleNeighbors(point, field, seen)
	for _, n := range neighbors {
		field = fillOutside(n, field, seen)
	}
	return field
}

func part2(lines []string) int {
	points := buildPoints(lines)
	field := buildMap(points)
	sides := countSides(points, field)

	startPoint := Point{0, 0, 0}
	seen := SeenPoints{startPoint: true}
	field = fillOutside(startPoint, field, seen)
	trapped := findTrapped(field, points)
	trappedField := buildMap(trapped)
	trappedSides := countSides(trapped, trappedField)

	return sides - trappedSides
}

func main() {
	testLines := []string{
		"2,2,2",
		"1,2,2",
		"3,2,2",
		"2,1,2",
		"2,3,2",
		"2,2,1",
		"2,2,3",
		"2,2,4",
		"2,2,6",
		"1,2,5",
		"3,2,5",
		"2,1,5",
		"2,3,5",
	}
	lines := file.ReadLines("input.txt")
	pl("Max number:", findMaxNum(lines))

	pl("Part 1:")
	pl("Test:", part1(testLines))
	pl("Results:", part1(lines))

	pl("Part 2:")
	pl("Test:", part2(testLines))
	pl("Result:", part2(lines))
}
