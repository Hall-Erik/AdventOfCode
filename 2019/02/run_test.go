package main

import (
	"testing"
)

func TestRun(t *testing.T) {
	a := runProgram([]int{1, 0, 0, 0, 99})
	if a[0] != 2 {
		t.Errorf("Result was wrong, got: %d, expected: %d", a[0], 2)
	}
	a = runProgram([]int{2, 3, 0, 3, 99})
	if a[3] != 6 {
		t.Errorf("Result was wrong, got: %d, expected: %d", a[3], 6)
	}
	a = runProgram([]int{2, 4, 4, 5, 99, 0})
	if a[5] != 9801 {
		t.Errorf("Result was wrong, got: %d, expected: %d", a[5], 9801)
	}
	a = runProgram([]int{1, 1, 1, 4, 99, 5, 6, 0, 99})
	if a[0] != 30 && a[4] != 2 {
		t.Errorf("Result was wrong, got: %d, expected: %d", a[0], 30)
	}
}
