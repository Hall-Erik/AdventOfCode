from itertools import groupby


def look_and_say(state:str, iterations:int) -> str:
    for _ in range(iterations):
        temp = ''
        for k, g in groupby(state):
            temp += str(len(list(g))) + k
        state = temp
    return state


if __name__ == '__main__':
    # Part 1
    print(f'Part 1 result is {len(look_and_say("1113122113", 40))}')
    print()

    # Part 2
    print(f'Part 2 result is {len(look_and_say("1113122113", 50))}')
    print()

    # Test
    assert look_and_say('1', 5) == '312211'
    