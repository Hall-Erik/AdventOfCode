def get_floor(instructions: str) -> int:
    up = instructions.count('(')
    down = instructions.count(')')
    return up - down

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        instructions = f.read()

    print(get_floor(instructions))

    assert get_floor("(())") == 0
    assert get_floor("()()") == 0
    assert get_floor("(((") == 3
    assert get_floor("(()(()(") == 3
    assert get_floor("))(((((") == 3
    assert get_floor("())") == -1
    assert get_floor("))(") == -1
    assert get_floor(")))") == -3
    assert get_floor(")())())") == -3