def get_area(l: int, w: int, h: int) -> int:
    lw = l * w
    lh = l * h
    wh = w * h
    smallest_side = min((lw, lh, wh))
    return 2 * (lw + lh + wh) + smallest_side

def get_ribbon(l: int, w: int, h: int) -> int:
    lengths = [l, w, h]
    lengths.sort()
    return 2 * (lengths[0] + lengths[1]) + l * w * h


if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        dimensions = f.readlines()

    total_paper = 0
    total_ribbon = 0

    for gift in dimensions:
        l, w, h = (int(x) for x in gift.split('x'))
        total_paper += get_area(l, w, h)
        total_ribbon += get_ribbon(l, w, h)
    
    print(f'Wrapping paper: {total_paper}')
    print(f'Ribbon: {total_ribbon}')

    # Area tests
    assert get_area(2, 3, 4) == 58
    assert get_area(1, 1, 10) == 43

    # Ribbon tests
    assert get_ribbon(2, 3, 4) == 34
    assert get_ribbon(1, 1, 10) == 14
