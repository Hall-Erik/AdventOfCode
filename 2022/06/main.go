package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

var pl = fmt.Println

func ReadLines(file string) []string {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(data), "\n")

	return lines
}

func findStart(s string, distinct int) int {
	index := 0
	for i := 0; i < len(s)-distinct; i++ {
		substr := s[i : i+distinct]
		highest := 1
		for _, letter := range substr {
			cnt := strings.Count(substr, string(letter))
			if cnt > highest {
				highest = cnt
			}
		}
		if highest == 1 {
			index = i + distinct
			break
		}
	}
	return index
}

func main() {
	pl("Tests:")
	tests := []string{
		"mjqjpqmgbljsphdztnvjfqwrcgsmlb",    // 7, 19
		"bvwbjplbgvbhsrlpgdmjqwftvncz",      // 5, 23
		"nppdvjthqldpwncqszvftbrmjlhg",      // 6, 23
		"nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", // 10, 29
		"zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",  // 11, 26
	}
	for _, test := range tests {
		loc := findStart(test, 4)
		messageLoc := findStart(test, 14)
		pl(test, loc, messageLoc)
	}

	signal := ReadLines("input.txt")[0]
	loc := findStart(signal, 4)
	messageLoc := findStart(signal, 14)

	pl("Results:")
	pl("Start of packet:", loc, "Start of message:", messageLoc)
}
