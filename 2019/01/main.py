if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        mods = f.readlines()
    
    mods = [int(m.replace('\n', '')) for m in mods]
    
    fuel = []
    for m in mods:
        f = m
        while f // 3 - 2 > 0:
            f = f // 3 - 2
            fuel.append(f)

    mods = sum([m // 3 - 2 for m in mods])
    print(f'Fuel needed for modules: {mods}')
    print(f'Fuel needed for modules and fuel: {sum(fuel)}')