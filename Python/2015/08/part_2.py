import re

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        strings = f.readlines()
    
    strings = [line.replace('\n', '') for line in strings]

    encoded = 0
    original = 0

    for s in strings:
        original += len(s)
        encoded += len('"' + re.escape(s).replace('"', '\\"') + '"')

    print(f'original: {original}\nencoded: {encoded}\ntotal: {encoded - original}')

    with open('test.txt', 'r') as f:
        test_strings = f.readlines()
    
    test_strings = [line.replace('\n', '') for line in test_strings]

    encoded = 0
    original = 0

    for s in test_strings:
        original += len(s)
        encoded += len('"' + re.escape(s).replace('"', '\\"') + '"')
    
    assert encoded - original == 19
