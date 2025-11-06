package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	codes := readCodes()
	c := make([]int, len(codes))
	copy(c, codes)
	c[1] = 12
	c[2] = 2
	c = runProgram(c)
	fmt.Println("Opcode zero", c[0])

	// Part 2
	for noun := 0; noun <= 99; noun++ {
		for verb := 0; verb <= 99; verb++ {
			copy(c, codes)
			c[1] = noun
			c[2] = verb
			if runProgram(c[:])[0] == 19690720 {
				fmt.Println("Correct noun/verb is", noun*100+verb)
				break
			}
		}
	}
}

func runProgram(intcode []int) []int {
	for i := 0; i < len(intcode); i = i + 4 {
		if intcode[i] == 99 {
			break
		} else if intcode[i] == 1 {
			intcode[intcode[i+3]] = intcode[intcode[i+1]] + intcode[intcode[i+2]]
		} else if intcode[i] == 2 {
			intcode[intcode[i+3]] = intcode[intcode[i+1]] * intcode[intcode[i+2]]
		}
	}
	return intcode[:]
}

func readCodes() []int {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	dataStrs := strings.Split(string(data), ",")
	codes := make([]int, len(dataStrs))
	for i, m := range dataStrs {
		codes[i], _ = strconv.Atoi(m)
	}
	return codes
}
