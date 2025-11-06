package main

import (
	"container/list"
	"fmt"
	"unicode/utf8"

	"github.com/Hall-Erik/AdventOfCode/2022/file"
)

var pl = fmt.Println
var print = fmt.Print

type Point struct {
	x int
	y int
}

type Node struct {
	char    string
	val     int
	dist    int
	visited bool
}

type PointMap map[Point]*Node

type TopoMap struct {
	field PointMap
	h     int
	w     int
}

var DepthMap = map[string]int{
	"S": 0,
	"a": 1,
	"b": 2,
	"c": 3,
	"d": 4,
	"e": 5,
	"f": 6,
	"g": 7,
	"h": 8,
	"i": 9,
	"j": 10,
	"k": 11,
	"l": 12,
	"m": 13,
	"n": 14,
	"o": 15,
	"p": 16,
	"q": 17,
	"r": 18,
	"s": 19,
	"t": 20,
	"u": 21,
	"v": 22,
	"w": 23,
	"x": 24,
	"y": 25,
	"z": 26,
	"E": 27,
}

func buildMap(lines []string) TopoMap {
	m := PointMap{}
	h := len(lines)
	w := utf8.RuneCountInString(lines[0])
	for y, row := range lines {
		for x, col := range row {
			char := string(col)
			m[Point{x: x, y: y}] = &Node{
				char:    char,
				val:     DepthMap[char],
				dist:    999999,
				visited: false,
			}
		}
	}
	return TopoMap{
		field: m,
		h:     h,
		w:     w,
	}
}

func findByVal(t TopoMap, val string) Point {
	p := Point{}
	for k, v := range t.field {
		if v.char == val {
			p = k
		}
	}
	return p
}

func canMoveToNeighbor(a Point, b Point, m TopoMap) bool {
	neighbor, exists := m.field[b]
	curr := m.field[a]
	if exists && !neighbor.visited {
		aVal := curr.val
		bVal := neighbor.val
		diff := bVal - aVal
		if diff == 1 || aVal >= bVal {
			return true
		}
	}
	return false
}

func findNeighbors(p Point, m TopoMap) []Point {
	neighbors := []Point{}
	toCheck := []Point{
		{p.x, p.y - 1},
		{p.x, p.y + 1},
		{p.x - 1, p.y},
		{p.x + 1, p.y},
	}
	for _, check := range toCheck {
		if canMoveToNeighbor(p, check, m) {
			a := m.field[p]
			b := m.field[check]
			if b.dist > a.dist+1 {
				b.dist = a.dist + 1
			}
			neighbors = append(neighbors, check)
		}
	}
	return neighbors
}

func findPath(p Point, m TopoMap) {
	queue := list.New()
	queue.PushBack(p)

	for queue.Len() > 0 {
		currItem := queue.Front()
		queue.Remove(currItem)
		curr := currItem.Value.(Point)
		currNode := m.field[curr]
		if currNode.visited {
			continue
		}
		currNode.visited = true
		neighbors := findNeighbors(curr, m)
		for _, n := range neighbors {
			queue.PushBack(n)
		}
		if currNode.char == string("E") {
			break
		}
	}
}

func part1(lines []string) int {
	m := buildMap(lines)
	s := findByVal(m, string("S"))
	e := findByVal(m, string("E"))
	m.field[s].dist = 0
	findPath(s, m)
	return m.field[e].dist
}

func findStartingPoints(m TopoMap) []Point {
	points := []Point{}
	for k, v := range m.field {
		if v.char == string("a") {
			points = append(points, k)
		}
	}
	return points
}

func part2(lines []string) int {
	min := 99999
	m := buildMap(lines)
	e := findByVal(m, string("E"))
	startPoints := findStartingPoints(m)
	for _, s := range startPoints {
		m := buildMap(lines)
		m.field[s].dist = 0
		findPath(s, m)
		dist := m.field[e].dist
		if dist < min {
			min = dist
		}
	}
	return min
}

func main() {
	testLines := file.ReadLines("testInput.txt")
	lines := file.ReadLines("input.txt")
	pl("Part 1:")
	pl(part1(testLines))
	pl(part1(lines))
	pl("Part 2:")
	pl(part2(testLines))
	pl(part2(lines))
}
