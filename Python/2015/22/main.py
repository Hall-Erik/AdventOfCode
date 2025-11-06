from itertools import product
from collections import Counter
from tqdm import tqdm

boss = Counter({
    'hp': 58,
    'dmg': 9,
    'poison': 0
})

player = Counter({
    'hp': 50,
    'mana': 500,
    'shield': 0,
    'recharge': 0
})

def magic_missile(p:Counter, b:Counter) -> None:
    p['mana'] -= 53
    b['hp'] -= 4

def drain(p:Counter, b:Counter) -> None:
    p['mana'] -= 73
    p['hp'] += 2
    b['hp'] -= 2

def shield(p:Counter, b:Counter) -> None:
    p['mana'] -= 113
    p['shield'] += 6 # armor +7

def poison(p:Counter, b:Counter) -> None:
    p['mana'] -= 173
    b['poison'] += 6 # dmg 3

def recharge(p:Counter, b:Counter) -> None:
    p['mana'] -= 229
    p['recharge'] += 5 # mana + 101

def run_effects(p:Counter, b:Counter) -> None:
    if b['poison'] > 0:
        b['hp'] -= 3
        b['poison'] -= 1
    if p['shield'] > 0:
        p['shield'] -= 1
    if p['recharge'] > 0:
        p['mana'] += 101
        p['recharge'] -= 1

def validate_spell(p:Counter, b:Counter, spell:str) -> bool:
    if spells[spell]['cost'] > p['mana']: return False
    if spell == 'Shield' and p['shield'] > 0: return False
    if spell == 'Recharge' and p['recharge'] > 0: return False
    if spell == 'Poison' and b['poison'] > 0: return False
    return True

spells = {
    'Magic Missile': {'cost': 53, 'func': magic_missile},
    'Drain': {'cost': 73, 'func': drain},
    'Shield': {'cost': 113, 'func': shield},
    'Poison': {'cost': 173, 'func': poison},
    'Recharge': {'cost': 229, 'func': recharge}
}

# itertools product x 20
def play_turns(player:Counter, boss:Counter, hard_mode:bool=False) -> int:
    turns = 9
    paths = product(spells, repeat=turns)
    costs_to_win = []
    for path in tqdm(paths, total=5**turns):
    # for path in paths:
        cost = 0
        p = player.copy()
        b = boss.copy()
        for spell in path:
            # player turn
            if hard_mode:
                p['hp'] -= 1
                if p['hp'] <= 0:
                    cost = -1
                    break
            run_effects(p, b)
            if not validate_spell(p, b, spell):
                cost = -1
                break
            cost += spells[spell]['cost']
            spells[spell]['func'](p, b)
            # boss turn
            if b['hp'] <= 0:
                break
            run_effects(p, b)
            if b['hp'] <= 0:
                break
            dmg = b['dmg'] if p['shield'] == 0 else b['dmg'] - 7
            p['hp'] -= dmg
            if p['hp'] <= 0:
                cost = -1
                break
        if cost != -1 and b['hp'] <= 0:
            costs_to_win.append(cost)
    return min(costs_to_win)


if __name__ == '__main__':
    print(f'Minimum mana cost: {play_turns(player, boss)}')
    print()
    print(f'Minimum mana cost on hard mode: {play_turns(player, boss, True)}')
    