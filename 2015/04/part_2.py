import hashlib


def get_md5(input: str) -> str:
    i = 1
    while True:
        s = input + str(i)
        r = hashlib.md5(s.encode()).hexdigest()
        if r[0:6] == '000000': return str(i)
        i +=1
    


if __name__ == '__main__':
    puzzle_input = 'yzbqklnj'

    print(f'Hash is: {get_md5(puzzle_input)}')