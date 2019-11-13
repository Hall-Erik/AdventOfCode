from part_1 import build_rules, count_generations
import numpy as np
from sklearn.linear_model import LinearRegression

rules = []
state = ''

with open('input.txt', 'r') as f:
    for line in f:
        rules.append(line.strip('\n'))

state = rules[0][15:].strip('\n')
rules = build_rules(rules[2:])

X = np.array([[x] for x in range(100, 1000, 100)])
y = np.array([count_generations(state, rules, x[0]) for x in X])
reg = LinearRegression().fit(X, y)
print(int(reg.predict([[50000000000]])[0]))
# 1250000000991