import re

assign_re = re.compile(r'^(\d*|[a-z]*) -> ([a-z]*)$')
and_re = re.compile(r'^(\d*|[a-z]*) AND (\d*|[a-z]*) -> ([a-z]*)$')
or_re = re.compile(r'^(\d*|[a-z]*) OR (\d*|[a-z]*) -> ([a-z]*)$')
lshift_re = re.compile(r'^(\d*|[a-z]*) LSHIFT (\d*) -> ([a-z]*)$')
rshift_re = re.compile(r'^(\d*|[a-z]*) RSHIFT (\d*) -> ([a-z]*)$')
negate_re = re.compile(r'^NOT (\d*|[a-z]*) -> ([a-z]*)$')

breadboard = {}

def get_val(x):
    if type(x) == int: return x
    else: return breadboard[x].get_value()

def is_int(x):
    try: return int(x)
    except ValueError: return x


class Var:
    def __init__(self, x):
        self.x = is_int(x)

    def get_value(self):
        if type(self.x) != int: self.x = get_val(self.x)
        return self.x
    
    def __repr__(self): 
        return str(self.x)


class And:
    def __init__(self, x, y):
        self.x = is_int(x)
        self.y = is_int(y)

    def get_value(self):
        if type(self.x) != int: self.x = get_val(self.x)
        if type(self.y) != int: self.y = get_val(self.y)
        return self.x & self.y
    
    def __repr__(self):
        return f'{self.x} AND {self.y}'


class Or:
    def __init__(self, x, y):
        self.x = is_int(x)
        self.y = is_int(y)

    def get_value(self):
        if type(self.x) != int: self.x = get_val(self.x)
        if type(self.y) != int: self.y = get_val(self.y)
        return self.x | self.y

    def __repr__(self):
        return f'{self.x} OR {self.y}'


class LShift:
    def __init__(self, x, n):
        self.x = is_int(x)
        self.n = int(n)

    def get_value(self):
        if type(self.x) != int: self.x = get_val(self.x)
        return self.x << self.n

    def __repr__(self):
        return f'{self.x} LSHIFT {self.n}'


class RShift:
    def __init__(self, x, n):
        self.x = is_int(x)
        self.n = int(n)

    def get_value(self):
        if type(self.x) != int: self.x = get_val(self.x)
        return self.x >> self.n

    def __repr__(self):
        return f'{self.x} RSHIFT {self.n}'


class Not:
    def __init__(self, x):
        self.x = is_int(x)

    def get_value(self):
        if type(self.x) != int: self.x = get_val(self.x)
        mask = 1111111111111111
        return int(str(mask - int(f'{self.x:b}')), base=2)

    def __repr__(self):
        return f'NOT {self.x}'


def process_instruction(i: str) -> None:
    assign = assign_re.match(i)
    and_m = and_re.match(i)
    or_m = or_re.match(i)
    lshift = lshift_re.match(i)
    rshift = rshift_re.match(i)
    negate = negate_re.match(i)
    if assign:
        breadboard[assign.group(2)] = Var(assign.group(1))
    elif and_m:
        breadboard[and_m.group(3)] = And(and_m.group(1), and_m.group(2))
    elif or_m:
        breadboard[or_m.group(3)] = Or(or_m.group(1), or_m.group(2))
    elif lshift:
        breadboard[lshift.group(3)] = LShift(lshift.group(1), lshift.group(2))
    elif rshift:
        breadboard[rshift.group(3)] = RShift(rshift.group(1), rshift.group(2))
    elif negate:
        breadboard[negate.group(2)] = Not(negate.group(1))

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        instructions = f.readlines()
    
    # First part
    for i in instructions: process_instruction(i)    
    a = breadboard['a'].get_value()
    print(f'a, before override: {a}')

    # Second part
    breadboard = {}
    for i in instructions: process_instruction(i)
    breadboard['b'] = Var(a)
    new_a = breadboard['a'].get_value()
    print(f'a, after override: {new_a}')

  
    #  Tests
    breadboard = {}
    for i in [
        '123 -> x',
        '456 -> y',
        'x AND y -> d',
        'x OR y -> e',
        'x LSHIFT 2 -> f',
        'y RSHIFT 2 -> g',
        'NOT x -> h',
        'NOT y -> i',
    ]:
        process_instruction(i)
    assert breadboard['x'].get_value() == 123
    assert breadboard['y'].get_value() == 456
    assert breadboard['d'].get_value() == 72
    assert breadboard['e'].get_value() == 507
    assert breadboard['f'].get_value() == 492
    assert breadboard['g'].get_value() == 114
    assert breadboard['h'].get_value() == 65412
    assert breadboard['i'].get_value() == 65079
