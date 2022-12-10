package main

import (
	"fmt"
	"io/ioutil"
	"math"
	"strconv"
	"strings"
)

var pl = fmt.Println
var p = fmt.Print

func ReadLines(file string) []string {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(data), "\n")

	return lines
}

func processLoop(instructions []string) (int, int) {
	pl()
	addx := false
	X := 1
	i := 0
	cycle := 1
	sum := 0
	for i < len(instructions) {
		insts := strings.Split(instructions[i], " ")

		if !addx {
			if insts[0] == "noop" {
				i++
			} else if insts[0] == "addx" {
				addx = true
			}
		} else {
			val, _ := strconv.Atoi(insts[1])
			X += val
			addx = false
			i++
		}

		screenPos := cycle % 40
		if cycle > 1 && screenPos == 0 {
			pl()
		} else {
			if int(math.Abs(float64(screenPos-X))) < 2 {
				p("#")
			} else {
				p(".")
			}
		}

		cycle++

		if cycle > 0 && (cycle+20)%40 == 0 {
			sum += cycle * X
		}

	}
	return sum, X
}

func main() {
	shortTest := []string{
		"noop",
		"addx 3",
		"addx -5",
	}
	longTest := ReadLines("longTest.txt")
	instructions := ReadLines("input.txt")

	_, X := processLoop(shortTest)
	pl("\nShort test results:", X)

	var sum int
	sum, X = processLoop(longTest)
	pl("Long test results:", sum, X)

	sum, X = processLoop(instructions)
	pl("Results:", sum, X)
}
