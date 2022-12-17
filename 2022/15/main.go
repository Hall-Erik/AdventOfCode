package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/Hall-Erik/AdventOfCode/2022/file"
	"github.com/Hall-Erik/AdventOfCode/2022/ints"
)

var pl = fmt.Println

type Sensor struct {
	x     int
	y     int
	bX    int
	bY    int
	mDist int
}

type Edges struct {
	minX int
	maxX int
	minY int
	maxY int
}

func parseSensor(line string) Sensor {
	line = strings.ReplaceAll(line, ",", "")
	line = strings.ReplaceAll(line, ":", "")
	line = strings.ReplaceAll(line, "x=", "")
	line = strings.ReplaceAll(line, "y=", "")

	lineList := strings.Split(line, " ")
	x, _ := strconv.Atoi(lineList[2])
	y, _ := strconv.Atoi(lineList[3])
	bX, _ := strconv.Atoi(lineList[8])
	bY, _ := strconv.Atoi(lineList[9])
	xD := ints.Abs(x - bX)
	yD := ints.Abs(y - bY)
	mD := xD + yD
	s := Sensor{x, y, bX, bY, mD}
	return s
}

func parseSensors(lines []string) []Sensor {
	sList := []Sensor{}
	for _, line := range lines {
		s := parseSensor(line)
		sList = append(sList, s)
	}
	return sList
}

func findEdges(sList []Sensor) Edges {
	minX := 0
	maxX := 0
	minY := 0
	maxY := 0

	for _, s := range sList {
		xMinus := s.x - s.mDist
		yMinus := s.y - s.mDist
		xPlus := s.x + s.mDist
		yPlus := s.y + s.mDist
		if xMinus < minX {
			minX = xMinus
		}
		if xPlus > maxX {
			maxX = xPlus
		}
		if yMinus < minY {
			minY = yMinus
		}
		if yPlus > maxY {
			maxY = yPlus
		}
	}
	return Edges{minX, maxX, minY, maxY}
}

func getMarker(sList []Sensor, x int, y int, faster bool) string {
	s := "."

	for _, sensor := range sList {
		if x == sensor.x && y == sensor.y {
			s = "S"
			break
		} else if x == sensor.bX && y == sensor.bY {
			s = "B"
			break
		} else {
			dist := ints.Abs(x-sensor.x) + ints.Abs(y-sensor.y)
			if dist <= sensor.mDist {
				s = "#"
				if faster {
					break
				}
			}
		}
	}

	return s
}

func mapRow(sList []Sensor, edges Edges, y int, faster bool) []string {
	row := []string{}

	for x := edges.minX; x <= edges.maxX; x++ {
		char := getMarker(sList, x, y, faster)
		row = append(row, char)
	}

	return row
}

func mapField(sList []Sensor, edges Edges) [][]string {
	field := [][]string{}

	for y := edges.minY; y <= edges.maxY; y++ {
		row := mapRow(sList, edges, y, false)
		field = append(field, row)
	}

	return field
}

func printField(field [][]string) {
	for _, row := range field {
		rowStr := strings.Join(row, "")
		pl(rowStr)
	}
}

func countNoBeacon(row []string) int {
	rowStr := strings.Join(row, "")
	empty := strings.Count(rowStr, "#")
	sensors := strings.Count(rowStr, "S")
	return empty + sensors
}

func part1(input []string, displayField bool, rowToCount int) int {
	sList := parseSensors(input)
	edges := findEdges(sList)
	if displayField {
		field := mapField(sList, edges)
		printField(field)
	}
	row := mapRow(sList, edges, rowToCount, false)
	return countNoBeacon(row)
}

type Point struct {
	x int
	y int
}

func findPoints(sensor Sensor) []Point {
	points := []Point{}

	d := sensor.mDist + 1
	x := sensor.x
	y := sensor.y

	for n := 0; n <= d; n++ {
		points = append(points, Point{x + n, y + d - n})
		points = append(points, Point{x + n, y - d + n})
		points = append(points, Point{x - d + n, y - n})
		points = append(points, Point{x - d + n, y + n})
	}

	return points
}

func filterPoints(points []Point, max int) []Point {
	temp := []Point{}

	for _, point := range points {
		x := point.x
		y := point.y
		if x >= 0 && x <= max && y >= 0 && y <= max {
			temp = append(temp, point)
		}
	}

	return temp
}

func part2(input []string, searchArea int) int {
	multiplier := 4000000
	x, y := 0, 0
	points := []Point{}
	sList := parseSensors(input)
	for _, sensor := range sList {
		points = append(points, findPoints(sensor)...)
	}
	points = filterPoints(points, searchArea)
	for _, point := range points {
		marker := getMarker(sList, point.x, point.y, true)
		if marker == "." {
			x = point.x
			y = point.y
			break
		}
	}
	return (x * multiplier) + y
}

func main() {
	testInput := []string{
		"Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
		"Sensor at x=9, y=16: closest beacon is at x=10, y=16",
		"Sensor at x=13, y=2: closest beacon is at x=15, y=3",
		"Sensor at x=12, y=14: closest beacon is at x=10, y=16",
		"Sensor at x=10, y=20: closest beacon is at x=10, y=16",
		"Sensor at x=14, y=17: closest beacon is at x=10, y=16",
		"Sensor at x=8, y=7: closest beacon is at x=2, y=10",
		"Sensor at x=2, y=0: closest beacon is at x=2, y=10",
		"Sensor at x=0, y=11: closest beacon is at x=2, y=10",
		"Sensor at x=20, y=14: closest beacon is at x=25, y=17",
		"Sensor at x=17, y=20: closest beacon is at x=21, y=22",
		"Sensor at x=16, y=7: closest beacon is at x=15, y=3",
		"Sensor at x=14, y=3: closest beacon is at x=15, y=3",
		"Sensor at x=20, y=1: closest beacon is at x=15, y=3",
	}
	input := file.ReadLines("input.txt")

	pl("Part 1:")
	pl("Test:", part1(testInput, true, 10))
	pl("Result:", part1(input, false, 2000000))
	pl()
	pl("Part 2:")
	pl("Test:", part2(testInput, 20))
	pl("Result:", part2(input, 4000000))
}
