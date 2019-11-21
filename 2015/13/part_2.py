from itertools import permutations

def prepare_input_line(line:str) -> list:
    return line.replace('lose ', 'lose -').replace('.', '').replace('\n', '').split(' ')

def get_seating_happiness(seating:list, happiness:dict) -> int:
    '''return total happiness for a seating arrangment'''
    total = 0
    for i, guest in enumerate(seating):
        total += happiness.get((guest, seating[(i-1)%len(seating)]))
        total += happiness.get((guest, seating[(i+1)%len(seating)]))
    return total

def find_optimal_happiness(guests:list) -> int:
    '''return max total happiness for all possible seating arrangments'''
    happiness = {
        (guest[0], guest[10]): int(guest[3])
        for guest in map(prepare_input_line , guests)}
    guests = set(guest[0] for guest in map(lambda g: g.split(' '), guests))
    for guest in guests:
        happiness[('Erik', guest)] = 0
        happiness[(guest, 'Erik')] = 0
    guests = set([*guests, 'Erik'])
    seatings = list(permutations(guests))
    return max([get_seating_happiness(s, happiness) for s in seatings])

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        puzzle_input = f.readlines()
    
    print(f'Optimal happiness is: {find_optimal_happiness(puzzle_input)}')
