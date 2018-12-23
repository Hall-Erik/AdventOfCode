from collections import Counter

line = ''

with open('input.txt', 'r') as f:
    line = f.readline().strip('\n')

def its_go_time(players, last_marble):
    l = [0]
    cm = 0
    index = 0
    scores = Counter()
    for cm in range(1, last_marble+1):
        player = (cm-1)%players+1
        index = (index + 1)%len(l)+1
        if cm%23 == 0:
            index = (index - 10)%len(l)+1
            popped = l.pop(index)
            scores[player] += cm + popped
        else:
            l[index:index] = [cm]
    return scores

assert its_go_time(9, 25).most_common()[0][1] == 32
assert its_go_time(10, 1618).most_common()[0][1] == 8317
assert its_go_time(13, 7999).most_common()[0][1] == 146373
assert its_go_time(17, 1104).most_common()[0][1] == 2764
assert its_go_time(21, 6111).most_common()[0][1] == 54718
assert its_go_time(30, 5807).most_common()[0][1] == 37305

line = line.split(' ')

scores = its_go_time(int(line[0]), int(line[-2]))
print(scores.most_common(3))
# 396136