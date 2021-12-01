def clean(lines):
    lines = [line.replace('\n', '') for line in lines]
    return [line for line in lines if len(line) > 0]

def convert(lines):
    return [int(line) for line in lines]

def greater(a, b):
    if b > a:
        return 1
    return 0

def count_deeper(lines):
    return sum([
        greater(lines[i-1], lines[i])
        for i in range(1, len(lines))
    ])

def get_sliding_sums(lines):
    return [
        lines[i-2] + lines[i-1] + lines[i]
        for i in range(2, len(lines))
    ]

def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    
    lines = clean(lines)
    lines = convert(lines)
    
    # part 1
    deeper = count_deeper(lines)
    print(deeper)
    # 1696

    print()

    # part 2
    sums = get_sliding_sums(lines)
    deeper = count_deeper(sums)
    print(deeper)


if __name__ == '__main__':
    main()
