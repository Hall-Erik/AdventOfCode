from itertools import product
from math import ceil

# Equipment: (name, cost, damage, armor)
equipment = [
    [   # weapons
        ('Dagger', 8, 4, 0),
        ('Shortsword', 10, 5, 0),
        ('Warhammer', 25, 6, 0),
        ('Longsword', 40, 7, 0),
        ('Greataxe', 74, 8, 0)
    ],    
    [   # armor
        ('Armor', 0, 0, 0),
        ('Leather', 13, 0, 1),
        ('Chainmail', 31, 0, 2),
        ('Splintmail', 53, 0, 3),
        ('Bandedmail', 75, 0, 4),
        ('Platemail', 102, 0, 5)
    ],    
    [   # rings
        ('Ring', 0, 0, 0),
        ('Damage +1', 25, 1, 0),
        ('Damage +2', 50, 2, 0),
        ('Damage +3', 100, 3, 0),
        ('Defense +1', 20, 0, 1),
        ('Defense +2', 40, 0, 2),
        ('Defense +3', 80, 0, 3)
    ],
    [   # rings 2
        ('Ring', 0, 0, 0),
        ('Damage +1', 25, 1, 0),
        ('Damage +2', 50, 2, 0),
        ('Damage +3', 100, 3, 0),
        ('Defense +1', 20, 0, 1),
        ('Defense +2', 40, 0, 2),
        ('Defense +3', 80, 0, 3)
    ]
]

def play_game(loadout:list, lose:bool=False) -> tuple:
    '''
    Play the game with given loadout
    if lose is True: returns total cost if player loses or 0
    if lose is False: returns total cost if player wins or 9999
    '''
    boss_hp = 104
    player_hp = 100
    cost = 0
    damage = 0
    armor = 0
    for l in loadout:
        cost += l[1]
        damage += l[2]
        armor += l[3]
    player_dmg = max(damage - 1, 1)
    boss_dmg = max(8 - armor, 1)
    if ceil(player_hp/boss_dmg) < ceil(boss_hp/player_dmg):
        if lose:
            return cost
        else:
            return 9999
    if lose:
        return 0
    return cost

if __name__ == '__main__':
    loadouts = list(product(*equipment))
    print(f'Min cost to win: {min([play_game(l) for l in loadouts])}')
    print(f'Max cost to lose: {max([play_game(l, True) for l in loadouts])}')
    