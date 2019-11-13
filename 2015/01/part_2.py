def get_basement(instructions: str) -> int:
    up = 0
    down = 0
    for i, s in enumerate(instructions):
        if s == '(':
            up += 1
        elif s == ')':
            down += 1
        if down > up:
            return i+1

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        instructions = f.read()

    print(get_basement(instructions))

    assert get_basement(')') == 1
    assert get_basement('()())') == 5
