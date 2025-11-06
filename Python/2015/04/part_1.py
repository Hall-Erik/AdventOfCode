import hashlib


def get_md5(input: str) -> str:
    i = 1
    while True:
        s = input + str(i)
        r = hashlib.md5(s.encode()).hexdigest()
        if r[0:5] == '00000': return str(i)
        i +=1
    


if __name__ == '__main__':
    puzzle_input = 'yzbqklnj'

    print(f'Hash is: {get_md5(puzzle_input)}')

    assert get_md5('abcdef') == '609043'
    assert get_md5('pqrstuv') == '1048970'