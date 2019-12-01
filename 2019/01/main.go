package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	var totalFuel int
	data := readModules()
	for _, module := range data {
		totalFuel += fuel(int(module))
	}
	fmt.Println("Fuel needed for modules: ", totalFuel)

	var totalFuelPlusPlus int
	for _, module := range data {
		var f int = module
		for {
			f = fuel(f)
			if f <= 0 {
				break
			}
			totalFuelPlusPlus += f
		}
	}
	fmt.Println("Fuel needed for modules and fuel:", totalFuelPlusPlus)
}

func fuel(m int) int {
	return m/3 - 2
}

func readModules() []int {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	dataStrs := strings.Split(string(data), "\n")
	modules := make([]int, len(dataStrs)-1)
	for i, m := range dataStrs {
		if m != "" {
			modules[i], _ = strconv.Atoi(m)
		}
	}
	return modules
}
