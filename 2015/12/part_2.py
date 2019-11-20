import json
from collections.abc import Iterable

def add_nums(d) -> int:
    if isinstance(d, int): return d
    if isinstance(d, dict):
        for _, v in d.items():
            if v == 'red':
                return 0
    count = 0
    for i in d:
        if isinstance(i, int):
            count += i
        if isinstance(i, list) or isinstance(i, dict):
            count += add_nums(i)
        if isinstance(d, dict):
            count += add_nums(d[i])
    return count

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        document = f.read()
    
    print(f'Total: {add_nums(json.loads(document))}')
    
    assert add_nums(json.loads('[1,{"c":"red","b":2},3]')) == 4
    assert add_nums(json.loads('{"d":"red","e":[1,2,3,4],"f":5}')) == 0
    assert add_nums(json.loads('[1,"red",5]')) == 6

    assert add_nums(json.loads('[1,2,3]')) == 6
    assert add_nums(json.loads('{"a":2,"b":4}')) == 6
    assert add_nums(json.loads('[[[3]]]')) == 3
    assert add_nums(json.loads('{"a":{"b":4},"c":-1}')) == 3
    assert add_nums(json.loads('{"a":[-1,1]}')) == 0
    assert add_nums(json.loads('[-1,{"a":1}]')) == 0
    assert add_nums(json.loads('[]')) == 0
    assert add_nums(json.loads('{}')) == 0