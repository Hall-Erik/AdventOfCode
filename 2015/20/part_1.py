from collections import Counter
from tqdm import tqdm
target_presents = 36000000

houses = Counter()

if __name__ == '__main__':
    for e in tqdm(range(1, target_presents // 10 + 1)):
        for h in range(e, target_presents // 10 + 1, e):
            houses[h] += e * 10
    
    for h in range(1, target_presents // 10 + 1):
        if houses[h] >= target_presents:
            print(f'House {h} got {houses[h]} presents.')
            break

    assert houses[1] == 10
    assert houses[2] == 30
    assert houses[3] == 40
    assert houses[4] == 70
    assert houses[5] == 60
    assert houses[6] == 120
    assert houses[7] == 80
    assert houses[8] == 150
    assert houses[9] == 130
