from typing import List

points = []

with open('input.txt', 'r') as f:
   for line in f:
       l = line.strip()
       x, y = l.split(', ')
       p = [int(x), int(y)]
       points.append(p)

def get_distance(a: List[int], b: List[int]) -> int:
    '''
    Returns Manhattan distance of two points
    '''
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def get_distances(a: List[int], points: List[list]) -> int:
    '''
    Returns Sum of Manhattan distances between point a and
    all points in the list points
    '''
    total = 0
    for point in points:
        total += get_distance(a, point)
    return total

def get_area(points: List[list], limit: int=10000) -> int:
    '''
    Returns the number of points that have a total distance
    from all input points less than 10000.
    '''
    total = 0    
    # find the edges
    min_x = min(points, key=lambda x: x[0])[0]
    max_x = max(points, key=lambda x: x[0])[0]
    min_y = min(points, key=lambda x: x[1])[1]
    max_y = max(points, key=lambda x: x[1])[1]

    all_points = [
        [x, y] 
        for y in range(min_y, max_y+1)
        for x in range(min_x, max_x+1)
    ]
    for p in all_points:
        if get_distances(p, points) < limit:
            total += 1
    return total

test_points = [
    [1, 1],
    [1, 6],
    [8, 3],
    [3, 4],
    [5, 5],
    [8, 9]]

assert get_distance([4, 3], test_points[0]) == 5
assert get_distance([4, 3], test_points[1]) == 6
assert get_distance([4, 3], test_points[2]) == 4
assert get_distance([4, 3], test_points[3]) == 2
assert get_distance([4, 3], test_points[4]) == 3
assert get_distance([4, 3], test_points[5]) == 10
assert get_distances([4, 3], test_points) == 30
assert get_area(test_points, 32) == 16

print(get_area(points, 10000))