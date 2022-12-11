package file

import (
	"io/ioutil"
	"strings"
)

func ReadLines(file string) []string {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(data), "\n")

	return lines
}
