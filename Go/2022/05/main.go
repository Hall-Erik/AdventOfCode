package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/Hall-Erik/AdventOfCode/2022/file"
)

type stack []string

func (s stack) Push(v string) stack {
	return append(s, v)
}

func (s stack) Pop() (stack, string) {
	l := len(s)
	return s[:l-1], s[l-1]
}

func (s stack) PushMulti(v []string) stack {
	for _, item := range v {
		s = append(s, item)
	}
	return s
}

func (s stack) PopMulti(i int) (stack, []string) {
	l := len(s)
	return s[:l-i], s[l-i:]
}

var pl = fmt.Println

func buildTestStacks() map[string]stack {
	/*
			[D]
		[N] [C]
		[Z] [M] [P]
		1   2   3

		test stack
	*/
	return map[string]stack{
		"1": stack{"Z", "N"},
		"2": stack{"M", "C", "D"},
		"3": stack{"P"},
	}
}

func buildStacks() map[string]stack {
	/*
		[N]         [C]     [Z]
		[Q] [G]     [V]     [S]         [V]
		[L] [C]     [M]     [T]     [W] [L]
		[S] [H]     [L]     [C] [D] [H] [S]
		[C] [V] [F] [D]     [D] [B] [Q] [F]
		[Z] [T] [Z] [T] [C] [J] [G] [S] [Q]
		[P] [P] [C] [W] [W] [F] [W] [J] [C]
		[T] [L] [D] [G] [P] [P] [V] [N] [R]
		1   2   3   4   5   6   7   8   9

		input stack
	*/
	return map[string]stack{
		"1": stack{"T", "P", "Z", "C", "S", "L", "Q", "N"},
		"2": stack{"L", "P", "T", "V", "H", "C", "G"},
		"3": stack{"D", "C", "Z", "F"},
		"4": stack{"G", "W", "T", "D", "L", "M", "V", "C"},
		"5": stack{"P", "W", "C"},
		"6": stack{"P", "F", "J", "D", "C", "T", "S", "Z"},
		"7": stack{"V", "W", "G", "B", "D"},
		"8": stack{"N", "J", "S", "Q", "H", "W"},
		"9": stack{"R", "C", "Q", "F", "S", "L", "V"},
	}
}

func makeMove(s map[string]stack, move []string, multi bool) {
	amount, _ := strconv.Atoi(move[1])
	source := move[3]
	dest := move[5]
	if multi {
		temp, items := s[source].PopMulti(amount)
		s[source] = temp
		s[dest] = s[dest].PushMulti(items)
	} else {
		for i := 0; i < amount; i++ {
			temp, item := s[source].Pop()
			s[source] = temp
			s[dest] = s[dest].Push(item)
		}
	}
}

func makeMoves(s map[string]stack, moves []string, multi bool) map[string]stack {
	for _, move := range moves {
		moveList := strings.Split(move, " ")
		makeMove(s, moveList, multi)
	}
	return s
}

func part1(s map[string]stack, moves []string) string {
	result := []string{}

	makeMoves(s, moves, false)

	for i := 1; i <= len(s); i++ {
		_, val := s[strconv.Itoa(i)].Pop()
		result = append(result, val)
	}

	return strings.Join(result, "")
}

func part2(s map[string]stack, moves []string) string {
	result := []string{}

	makeMoves(s, moves, true)

	for i := 1; i <= len(s); i++ {
		_, val := s[strconv.Itoa(i)].Pop()
		result = append(result, val)
	}

	return strings.Join(result, "")
}

func main() {
	testStacks := buildTestStacks()
	testMoves := []string{
		"move 1 from 2 to 1",
		"move 3 from 1 to 3",
		"move 2 from 2 to 1",
		"move 1 from 1 to 2",
	}
	result := part1(testStacks, testMoves)
	pl("Part 1", "\nTests\n", result)

	stacks := buildStacks()
	moves := file.ReadLines("input.txt")
	result = part1(stacks, moves)
	pl("\nResults:\n", result)

	testStacks = buildTestStacks()
	result = part2(testStacks, testMoves)
	pl("\n\nPart2", "\nTests\n", result)

	stacks = buildStacks()
	result = part2(stacks, moves)
	pl("\nResults:\n", result)
}
