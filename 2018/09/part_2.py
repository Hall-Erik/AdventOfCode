from collections import Counter, deque

line = ''

with open('input.txt', 'r') as f:
    line = f.readline().strip('\n')

def move_left(d: deque, times: int=2):
    for i in range(times):
        d.append(d.popleft())

def move_right(d: deque, times: int=7):
    for i in range(times):
        d.appendleft(d.pop())

def play_game(players, last_marble):
    output = deque([0])
    scores = Counter()
    for cm in range(1, last_marble):
        if cm%23 == 0:
            move_right(output)
            player = (cm-1)%players+1
            popped = output.popleft()
            scores[player] += popped + cm
            # print(player, popped, cm)
        else:
            move_left(output)
            output.appendleft(cm)
    return scores

assert play_game(9, 25).most_common()[0][1] == 32
assert play_game(10, 1618).most_common()[0][1] == 8317
assert play_game(13, 7999).most_common()[0][1] == 146373
assert play_game(21, 6111).most_common()[0][1] == 54718
assert play_game(30, 5807).most_common()[0][1] == 37305

line = line.split(' ')

scores = play_game(int(line[0]), int(line[-2])*100)
print(scores.most_common(1)[0][1])
# 3183301184