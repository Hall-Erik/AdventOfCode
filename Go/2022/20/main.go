package main

import (
	"container/ring"
	"fmt"
	"strconv"

	"github.com/Hall-Erik/AdventOfCode/2022/file"
)

var pl = fmt.Println

type Key struct {
	key int
	val int
}

type RingMap map[Key]*ring.Ring

func buildList(lines []string, multiplier int) []int {
	ret := []int{}
	for _, i := range lines {
		v, _ := strconv.Atoi(i)
		v *= multiplier
		ret = append(ret, v)
	}
	return ret
}

func buildRing(list []int) RingMap {
	r := ring.New(len(list))
	m := RingMap{}
	for i, v := range list {
		r.Value = v
		key := Key{i, v}
		m[key] = r
		r = r.Next()
	}
	return m
}

func moveNum(m RingMap, key Key, length int) {
	if key.val != 0 {
		dist := key.val % (length - 1)
		r := m[key].Prev()
		removed := r.Unlink(1)
		r.Move(dist).Link(removed)
	}
}

func mixRing(r RingMap, list []int) {
	for i, v := range list {
		key := Key{i, v}
		moveNum(r, key, len(list))
	}
}

func findGrove(m RingMap) int {
	var zero *ring.Ring
	for k, v := range m {
		if k.val == 0 {
			zero = v
		}
	}
	total := 0
	for i := 0; i < 3; i++ {
		zero = zero.Move(1000)
		val := zero.Value.(int)
		total += val
	}
	return total
}

func part1(lines []string) {
	list := buildList(lines, 1)
	r := buildRing(list)
	mixRing(r, list)
	pl(findGrove(r))
}

func part2(lines []string) {
	multiplier := 811589153
	list := buildList(lines, multiplier)
	r := buildRing(list)
	for i := 0; i < 10; i++ {
		pl("mixing...", i)
		mixRing(r, list)
	}
	pl(findGrove(r))
}

func main() {
	testLines := file.ReadLines("testInput.txt")
	lines := file.ReadLines("input.txt")
	pl("Part 1:")
	part1(testLines)
	part1(lines)
	pl("Part 2:")
	part2(testLines)
	part2(lines)
}
