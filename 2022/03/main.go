package main

import (
	"fmt"
	"io/ioutil"
	"strings"
	"unicode/utf8"
)

var pl = fmt.Println

func readLines(file string) []string {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(data), "\n")

	return lines
}

func getCompartments(bag string) (string, string) {
	length := utf8.RuneCountInString(bag)
	return bag[:length/2], bag[length/2:]
}

func getPriority(char string) int {
	priori := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	return strings.Index(priori, char) + 1
}

func part1(bags []string) int {
	dups := []string{}

	for _, bag := range bags {
		if len(bag) > 1 {
			first, second := getCompartments(bag)
			pl(first, second)
			for _, item := range first {
				if strings.Contains(second, string(item)) {
					pl(string(item), " in both compartments!")
					dups = append(dups, string(item))
					break
				}
			}
		}
	}

	pl(dups)

	score := 0

	for _, dup := range dups {
		score += getPriority(dup)
	}

	return score
}

func part2(bags []string) int {
	score := 0

	stinkingBadges := []string{}

	for i := 0; i < len(bags); i += 3 {
		for _, char := range bags[i] {
			sChar := string(char)
			if strings.Contains(bags[i+1], sChar) && strings.Contains(bags[i+2], sChar) {
				pl(sChar, " in all three bags!")
				stinkingBadges = append(stinkingBadges, sChar)
				break
			}
		}
	}

	for _, char := range stinkingBadges {
		score += getPriority(char)
	}

	return score
}

func main() {
	testBags := []string{
		"vJrwpWtwJgWrhcsFMMfFFhFp",
		"jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
		"PmmdzqPrVvPwwTWBwg",
		"wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
		"ttgJtRGJQctTZtZT",
		"CrZsJsPPZsGzwwsLwLmpwMDw",
	}

	pl("Part 1 test: ", part1(testBags))

	pl()

	bags := readLines("input.txt")
	pl("Part 1: ", part1(bags))

	pl()
	pl()

	pl("Part 2 test: ", part2(testBags))

	pl()
	pl("Part 2: ", part2(bags))
}
