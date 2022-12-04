package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

var pl = fmt.Println

type Assignment struct {
	min int
	max int
}

func readLines(file string) []string {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(data), "\n")

	return lines
}

func getAssignment(section string) Assignment {
	sectionList := strings.Split(section, "-")
	min, _ := strconv.Atoi(sectionList[0])
	max, _ := strconv.Atoi(sectionList[1])
	return Assignment{min, max}
}

func getAssignments(pair string) []Assignment {
	pairList := strings.Split(pair, ",")
	assignments := []Assignment{
		getAssignment(pairList[0]),
		getAssignment(pairList[1]),
	}
	return assignments
}

func isSelfContainedPair(pair []Assignment) bool {
	var a Assignment
	var b Assignment

	if pair[0].max == pair[1].max {
		return true
	} else if pair[0].max > pair[1].max {
		a = pair[0]
		b = pair[1]
	} else {
		a = pair[1]
		b = pair[0]
	}

	if a.min <= b.min {
		return true
	}
	return false
}

func part1(pairs []string) int {
	selfContainedPairs := 0
	for _, pair := range pairs {
		assignments := getAssignments(pair)
		if isSelfContainedPair(assignments) {
			selfContainedPairs += 1
			pl("Self contained pair!", assignments)
		}
	}
	return selfContainedPairs
}

func isOverlappingPair(pair []Assignment) bool {
	var a Assignment
	var b Assignment

	if pair[0].max == pair[1].max || pair[0].min == pair[1].min {
		return true
	} else if pair[0].max > pair[1].max {
		a = pair[0]
		b = pair[1]
	} else {
		a = pair[1]
		b = pair[0]
	}

	if b.max >= a.min {
		return true
	}

	return false
}

func part2(pairs []string) int {
	overlappingPairs := 0

	for _, pair := range pairs {
		assignments := getAssignments(pair)
		if isOverlappingPair(assignments) {
			overlappingPairs += 1
			pl("Overlapping pair!", assignments)
		}
	}

	return overlappingPairs
}

func main() {
	testPairs := []string{
		"2-4,6-8",
		"2-3,4-5",
		"5-7,7-9",
		"2-8,3-7",
		"6-6,4-6",
		"2-6,4-8",
	}

	pl("Running test input...")
	selfContainedPairs := part1(testPairs)
	pl(selfContainedPairs)

	pl()
	pairs := readLines("input.txt")
	selfContainedPairs = part1(pairs)
	pl(selfContainedPairs)

	pl("\nPart 2\n")

	pl("Running test input...")
	overlappingPairs := part2(testPairs)
	pl(overlappingPairs)

	pl()
	overlappingPairs = part2(pairs)
	pl(overlappingPairs)
}
