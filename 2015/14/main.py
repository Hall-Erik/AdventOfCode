from collections import Counter

def decode_strings(l:list) -> list:
    return [
        {
            'speed': int(reindeer[3]),
            'run_time': int(reindeer[6]),
            'rest_time': int(reindeer[13])}
        for reindeer in map(lambda r: r.split(' '), l)]

def get_distance(speed:int, run_time:int, rest_time:int, duration:int=2503) -> int:
    ''' Return the distance flown after a given duration'''
    full_iters = duration // (run_time + rest_time)
    distance = speed * run_time * full_iters
    partial_iter = duration % (run_time + rest_time)
    if partial_iter > run_time:
        distance += speed * run_time
    else:
        distance += speed * partial_iter
    return distance

def get_points(reindeer:list, duration:int=2503) -> int:
    ''' Returns the maximum total points for a race after a given duration '''
    total_points = Counter()
    for i in range(1, duration+1):
        curr_best_dist = 0
        curr_leader = []
        for n, r in enumerate(reindeer):
            dist = get_distance(**r, duration=i)
            if dist == curr_best_dist:
                curr_leader.append(n)
            if dist > curr_best_dist:
                curr_best_dist = dist
                curr_leader = [n]
        for leader in curr_leader:
            total_points[leader] += 1
    return max(total_points.values())

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        race = f.readlines()

    reindeer = decode_strings(race)

    print(f'Furthest distance: {max([get_distance(**r) for r in reindeer])}')
    print()
    print(f'Most points earned: {get_points(reindeer)}')

    test_race = [
        'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.',
        'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.'
    ]
    reindeer = decode_strings(test_race)
    assert max([get_distance(**r, duration=1000) for r in reindeer]) == 1120
    assert get_points(reindeer, duration=1000) == 689
        