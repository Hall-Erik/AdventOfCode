import re

def get_int(s:str) -> int:
    try: return int(s)
    except ValueError: return 0

def add_nums(s:str) -> int:
    nums = re.findall(r'[-\d]*', s)
    return sum([get_int(num) for num in nums])

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        document = f.read()
    
    print(f'Total sum: {add_nums(document)}')

    # Tests
    assert add_nums('[1,2,3]') == 6
    assert add_nums('{"a":2,"b":4}') == 6
    assert add_nums('[[[3]]]') == 3
    assert add_nums('{"a":{"b":4},"c":-1}') == 3
    assert add_nums('{"a":[-1,1]}') == 0
    assert add_nums('[-1,{"a":1}]') == 0
    assert add_nums('[]') == 0
    assert add_nums('{}') == 0