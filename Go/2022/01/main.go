package main

import (
	"fmt"
	"io/ioutil"
	"sort"
	"strconv"
	"strings"
	"unicode/utf8"
)

var pl = fmt.Println

func main() {
	calories := []string{
		"1000",
		"2000",
		"3000",
		"",
		"4000",
		"",
		"5000",
		"6000",
		"",
		"7000",
		"8000",
		"9000",
		"",
		"10000",
	}

	pl("Test")
	run(calories)

	calories = readCals()
	pl()
	pl("Results: ")
	run(calories)
}

func run(calories []string) {
	elfCalories := []int{}

	count := 0

	for _, cal := range calories {
		length := utf8.RuneCountInString(cal)

		if length > 0 {
			calInt, _ := strconv.Atoi(cal)
			count += calInt
		} else {
			elfCalories = append(elfCalories, count)
			count = 0
		}
	}

	sort.Ints(elfCalories)

	pl("part 1: ", elfCalories[len(elfCalories)-1])

	total := elfCalories[len(elfCalories)-1] + elfCalories[len(elfCalories)-2] + elfCalories[len(elfCalories)-3]

	pl("part 2: ", total)
}

func readCals() []string {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	cals := strings.Split(string(data), "\n")

	return cals
}
