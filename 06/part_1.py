import string
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from collections import Counter

points = []

with open('input.txt', 'r') as f:
   for line in f:
       l = line.strip()
       x, y = l.split(', ')
       p = [int(x), int(y)]
       points.append(p)

def get_area(points):
    disqualified = []
    areas = Counter()
    # convenient labes for our initial points and their territory
    labeled_points = list(zip(points, string.ascii_letters))
    labels = [l[1] for l in labeled_points]

    X = np.array(points)

    # find the edges
    min_x = min(points, key=lambda x: x[0])[0]
    max_x = max(points, key=lambda x: x[0])[0]
    min_y = min(points, key=lambda x: x[1])[1]
    max_y = max(points, key=lambda x: x[1])[1]

    # p=1 is for Manhattan distance
    knn = KNeighborsClassifier(n_neighbors=1, p=1)
    knn.fit(X, labels)

    for y in range(min_y, max_y+1):
        row = [[x, y] for x in range(min_x, max_x+1)]
        row_labels = knn.predict(row)
        for i, label in enumerate(row_labels):
            if (row[i][0] in [min_x, max_x] or row[i][1] in [min_y, max_y]) \
                and label not in disqualified:
                # points on the edge would have an "infinite" area and are
                # disqualified
                disqualified.append(label)
            else:
                areas[label] += 1

    for label in disqualified:
        del areas[label]
    
    return areas.most_common()[0][1]

test_points = [
    [1, 1],
    [1, 6],
    [8, 3],
    [3, 4],
    [5, 5],
    [8, 9],
]

assert get_area(test_points) == 17

print(get_area(points))
# 3840