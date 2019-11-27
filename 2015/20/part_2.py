from collections import Counter
from tqdm import tqdm
target_presents = 36000000

houses = Counter()

if __name__ == '__main__':
    for e in tqdm(range(1, target_presents // 10 + 1)):
        for h in range(e, 50 * e + 1, e):
            houses[h] += e * 11
    
    for h in range(1, target_presents // 10 + 1):
        if houses[h] >= target_presents:
            print(f'House {h} got {houses[h]} presents.')
            break

    assert houses[1] == 11
    assert houses[2] == 33
    assert houses[3] == 44
    assert houses[4] == 77
    assert houses[5] == 66
    assert houses[6] == 132
    assert houses[7] == 88
    assert houses[8] == 165
    assert houses[9] == 143
