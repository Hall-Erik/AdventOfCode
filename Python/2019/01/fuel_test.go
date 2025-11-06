package main

import (
	"testing"
)

func TestFuel(t *testing.T) {
	f := fuel(12)
	if f != 2 {
		t.Errorf("Fuel amount was wrong, got: %d, expected: %d", f, 2)
	}
	f = fuel(14)
	if f != 2 {
		t.Errorf("Fuel amount was wrong, got: %d, expected: %d", f, 2)
	}
	f = fuel(1969)
	if f != 654 {
		t.Errorf("Fuel amount was wrong, got: %d, expected: %d", f, 654)
	}
	f = fuel(100756)
	if f != 33583 {
		t.Errorf("Fuel amount was wrong, got: %d, expected: %d", f, 33583)
	}
}
