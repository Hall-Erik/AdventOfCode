package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/Hall-Erik/AdventOfCode/2022/file"
)

var pl = fmt.Println

type Tree struct {
	name   string
	size   int
	dirs   []*Tree
	files  []File
	parent *Tree
}

type File struct {
	name string
	size int
}

func buildTree(lines []string) *Tree {
	root := Tree{
		name:  "/",
		size:  0,
		dirs:  []*Tree{},
		files: []File{},
	}
	curr := &root

	for _, line := range lines {
		args := strings.Split(line, " ")
		if args[0] == "$" {
			if args[1] == "cd" && args[2] != "/" {
				dir := args[2]
				if dir == ".." {
					curr = curr.parent
				} else {
					for _, d := range curr.dirs {
						if d.name == args[2] {
							curr = d
						}
					}
				}
			}
		} else if args[0] != "dir" {
			size, _ := strconv.Atoi(args[0])
			file := File{
				name: args[1],
				size: size,
			}
			curr.files = append(curr.files, file)
		} else if args[0] == "dir" {
			next := Tree{
				parent: curr,
				name:   args[1],
				size:   0,
				dirs:   []*Tree{},
				files:  []File{},
			}
			curr.dirs = append(curr.dirs, &next)
		}
	}
	return &root
}

func calculateDirSize(dir *Tree) int {
	size := 0

	for _, file := range dir.files {
		size += file.size
	}

	for _, d := range dir.dirs {
		size += calculateDirSize(d)
	}

	dir.size = size
	return size
}

func findDirsByLESize(dir *Tree, size int) []*Tree {
	dirs := []*Tree{}

	for _, d := range dir.dirs {
		if d.size <= size {
			dirs = append(dirs, d)
		}
		dirs = append(dirs, findDirsByLESize(d, size)...)
	}
	return dirs
}

func part1(lines []string) int {
	tree := buildTree(lines)
	calculateDirSize(tree)
	dirs := findDirsByLESize(tree, 100000)
	total := 0
	for _, d := range dirs {
		total += d.size
	}
	return total
}

func findDirsByGESize(dir *Tree, size int) []*Tree {
	dirs := []*Tree{}

	for _, d := range dir.dirs {
		if d.size >= size {
			dirs = append(dirs, d)
		}
		dirs = append(dirs, findDirsByGESize(d, size)...)
	}
	return dirs
}

func part2(lines []string) int {
	TOTAL_SIZE := 70000000
	SPACE_NEEDED := 30000000

	tree := buildTree(lines)
	used := calculateDirSize(tree)
	unused := TOTAL_SIZE - used
	needToFreeUp := SPACE_NEEDED - unused
	possibleDirs := findDirsByGESize(tree, needToFreeUp)

	freedUp := TOTAL_SIZE

	for _, dir := range possibleDirs {
		if dir.size < freedUp {
			freedUp = dir.size
		}
	}

	return freedUp
}

func main() {
	testLines := []string{
		"$ cd /",
		"$ ls",
		"dir a",
		"14848514 b.txt",
		"8504156 c.dat",
		"dir d",
		"$ cd a",
		"$ ls",
		"dir e",
		"29116 f",
		"2557 g",
		"62596 h.lst",
		"$ cd e",
		"$ ls",
		"584 i",
		"$ cd ..",
		"$ cd ..",
		"$ cd d",
		"$ ls",
		"4060174 j",
		"8033020 d.log",
		"5626152 d.ext",
		"7214296 k",
	}
	lines := file.ReadLines("input.txt")
	pl("Part 1:")
	pl("Test:", part1(testLines))
	pl("Result:", part1(lines))

	pl("Part 2:")
	pl("Test:", part2(testLines))
	pl("Result:", part2(lines))
}
