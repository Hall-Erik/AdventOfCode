from typing import List, NamedTuple
from functools import reduce

class Node(NamedTuple):
    '''
    Data class that represents the size of a node
    (number of data point) including its children
    and the sum of its and its childrens' metadata.
    '''
    size: int
    meta_sum: int

data = []

with open('input.txt', 'r') as f:
    data = list(map(int, f.readline().replace('\n', '').split(' ')))

def read(data: List[int]) -> Node:
    child_count = data[0]
    meta_count = data[1]
    children = []
    meta_sum = 0 # sum of metadata for this node and its children
    size = 2 # size of this node
    for i in range(child_count):
        n = read(data[size:])
        children.append(n)
        size += n.size    
    if child_count > 0:
        for m in data[size:size+meta_count]:
            if m <= len(children):
                meta_sum += children[m-1].meta_sum
    else:
        meta_sum += sum(data[size:size+meta_count])
    size += meta_count    
    return Node(size, meta_sum)

test_data1 = [0, 3, 1, 1, 2]
test_data2 = [1, 3, 0, 1, 2, 1, 1, 1]
test_data3 = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]
assert read(test_data1) == (5, 4)
assert read(test_data2) == (8 ,6)
assert read(test_data3) == (len(test_data3), 66)

n = read(data)
print(n)