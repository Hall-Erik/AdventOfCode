from collections import defaultdict

# Dist with distances to other towns
# e.g. {'London': [('Dublin', 464), ('Belfast', 518)]}
towns = defaultdict(list)

def splice(l:list) -> list:
    return [
        [word[0], word[2], word[4]] for word in [
            row.split(' ') for row in l]]

def check_route(town:str, visited:list) -> int:
    return min([
        t[1] + check_route(t[0], [*visited, t[0]])
        for t in [
            n for n in towns[town] if n[0] not in visited]],
        default=0)

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        dists = f.readlines()
    
    for path in splice(dists):
        towns[path[0]].append((path[1], int(path[2])))
        towns[path[1]].append((path[0], int(path[2])))

    print(min([check_route(town, [town]) for town in towns]))

    # Test
    towns = defaultdict(list)
    test_dists = [
        'London to Dublin = 464',
        'London to Belfast = 518',
        'Dublin to Belfast = 141'
    ]

    for path in splice(test_dists):
        towns[path[0]].append((path[1], int(path[2])))
        towns[path[1]].append((path[0], int(path[2])))

    assert min([check_route(town, [town]) for town in towns]) == 605 
