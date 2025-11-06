package main

import (
	"container/list"
	"fmt"
	"sort"
	"strconv"
	"strings"

	"github.com/Hall-Erik/AdventOfCode/2022/file"
)

var pl = fmt.Println

type Monkey struct {
	items          *list.List
	itemsInspected int
	divideByThree  bool
	operator       string
	facterm        string
	denominator    int
	passMonkey     int
	failMonkey     int
}

func (m *Monkey) Print() {
	pl(m.items.Front().Value, m.items.Len())
	pl(m.operator, m.facterm)
	pl(m.denominator)
	pl(m.passMonkey, m.failMonkey)
	pl()
}

func (m *Monkey) InspectItem(item int, M int) int {
	switch m.operator {
	case "*":
		if m.facterm == "old" {
			return item * item
		} else {
			facterm, _ := strconv.Atoi(m.facterm)
			return (item * facterm) % M
		}
	case "+":
		if m.facterm == "old" {
			return item + item
		} else {
			facterm, _ := strconv.Atoi(m.facterm)
			return (item + facterm) % M
		}
	}
	return 1
}

func (m *Monkey) FindNext(item int) int {
	if item%m.denominator == 0 {
		return m.passMonkey
	} else {
		return m.failMonkey
	}
}

func (m *Monkey) InspectItems(monkies []*Monkey, M int) {
	for m.items.Len() > 0 {
		m.itemsInspected += int(1)
		item := m.items.Front()
		m.items.Remove(item)
		itemValue := item.Value.(int)
		itemValue = m.InspectItem(itemValue, M)
		if m.divideByThree {
			itemValue = itemValue / 3
		}
		nextMonkey := m.FindNext(itemValue)
		monkies[nextMonkey].items.PushBack(itemValue)
	}
}

func printMonkies(monkies []*Monkey) {
	for _, m := range monkies {
		m.Print()
	}
}

func buildMonkey(lines []string, index int, divideByThree bool) *Monkey {
	itemsLine := strings.ReplaceAll(lines[index+1], "  Starting items: ", "")
	items := strings.Split(itemsLine, ", ")
	intItems := list.New()
	for _, item := range items {
		i, _ := strconv.Atoi(item)
		intItems.PushBack(int(i))
	}
	opLine := strings.ReplaceAll(lines[index+2], "  Operation: new = old ", "")
	opList := strings.Split(opLine, " ")
	denominatorLine := strings.ReplaceAll(lines[index+3], "  Test: divisible by ", "")
	denominator, _ := strconv.Atoi(denominatorLine)
	passMonkeyLine := strings.ReplaceAll(lines[index+4], "    If true: throw to monkey ", "")
	passKonkey, _ := strconv.Atoi(passMonkeyLine)
	failMonkeyLine := strings.ReplaceAll(lines[index+5], "    If false: throw to monkey ", "")
	failMonkey, _ := strconv.Atoi(failMonkeyLine)

	return &Monkey{
		items:          intItems,
		itemsInspected: 0,
		divideByThree:  divideByThree,
		operator:       opList[0],
		facterm:        opList[1],
		denominator:    int(denominator),
		passMonkey:     passKonkey,
		failMonkey:     failMonkey,
	}
}

func buildMonkies(items []string, divideByThree bool) []*Monkey {
	monkies := []*Monkey{}
	for i := 0; i < len(items); i += 7 {
		m := buildMonkey(items, i, divideByThree)
		monkies = append(monkies, m)
	}
	return monkies
}

func runRound(monkies []*Monkey, M int) {
	for i := 0; i < len(monkies); i++ {
		monkies[i].InspectItems(monkies, M)
	}
}

func checkItemsInspected(monkies []*Monkey) {
	for i, m := range monkies {
		pl(i, m.itemsInspected)
	}
}

func runRounds(lines []string, numRounds int, divideByThree bool, debug bool) int {
	monkies := buildMonkies(lines, divideByThree)
	M := 1
	for _, monkey := range monkies {
		M *= monkey.denominator
	}
	for i := 0; i < numRounds; i++ {
		runRound(monkies, M)
	}
	if debug {
		checkItemsInspected(monkies)
	}
	sort.Slice(monkies, func(i, j int) bool {
		return monkies[i].itemsInspected > monkies[j].itemsInspected
	})
	return monkies[0].itemsInspected * monkies[1].itemsInspected
}

func part1(lines []string) int {
	return runRounds(lines, 20, true, false)
}

func part2(lines []string) int {
	return runRounds(lines, 10000, false, false)
}

func main() {
	testLines := file.ReadLines("testInput.txt")
	lines := file.ReadLines("input.txt")
	pl("Part 1:")
	pl("test:", part1(testLines))
	pl("result:", part1(lines))
	pl("Part 2:")
	pl("test:", part2(testLines))
	pl("result:", part2(lines))
}
