test_track = []
track = []

class Cart:
    def __init__(self, x, y, direction, track_piece):
        self.x = x
        self.y = y
        self.direction = direction
        self.track_piece = track_piece
        self.last_turn = 2
    
    def turn_decision(self) -> str:
        '''
        return the new direction based on the intersection rules:
        1) turn left
        2) go straight
        3) turn right
        4) goto 1
        '''
        self.last_turn = (self.last_turn+1)%3
        if self.last_turn == 0: # turn left
            if self.direction == '>': return '^'
            elif self.direction == '^': return '<'
            elif self.direction == '<': return 'v'
            else: return '>'
        elif self.last_turn == 1:
            return self.direction
        else: # turn right
            if self.direction == '>': return 'v'
            elif self.direction == 'v': return '<'
            elif self.direction == '<': return '^'
            else: return '>'

    def turn_if_needed(self) -> None:
        '''
        Turn the cart if at a curve or intersection.
        '''
        if self.track_piece == '+':
            self.direction = self.turn_decision()
        elif self.track_piece == '/':
            if self.direction == '>': self.direction = '^'
            elif self.direction == '^': self.direction = '>'
            elif self.direction == 'v': self.direction = '<'
            else: self.direction = 'v'
        elif self.track_piece == '\\':
            if self.direction == '>': self.direction = 'v'
            elif self.direction == '^': self.direction = '<'
            elif self.direction == 'v': self.direction = '>'
            else: self.direction = '^'

    def move(self, track:list) -> int:
        '''
        Move the cart to next position
        returns (x, y) if crash otherwise 0
        '''
        track[self.y][self.x] = self.track_piece

        if self.direction == '>': self.x += 1
        if self.direction == '<': self.x -= 1
        if self.direction == '^': self.y -= 1
        if self.direction == 'v': self.y += 1
            
        self.track_piece = track[self.y][self.x]
        if self.track_piece in ['v', '>', '<', '^', 'X']:
            track[self.y][self.x] = 'X'
            return (self.x, self.y)
        else:
            self.turn_if_needed()
            track[self.y][self.x] = self.direction
            return 0

    def __lt__(self, other):
        if self.y == other.y:
            return self.x < other.x
        else:
            return self.y < other.y

    def __repr__(self):
        return f'<Cart: ({self.x}, {self.y}), {self.direction} on {self.track_piece} >'

    def __str__(self):
        return f'({self.x}, {self.y})'

def read_file(file:str) -> list:
    '''
    Reads the input track file, returns
    2D array where each cell is a track
    piece, a cart, or an empty space.
    '''
    track = []
    with open(file, 'r') as f:
        for line in f:
            track.append(list(line.strip('\n')))
    return track

def print_track(track:list) -> None:
    for line in track:
        print(''.join(line))

def get_occupied_track(track:list, x:int, y:int) -> str:
    '''
    Returns the type of track section occupied by the cart at
    x,y. e.g. '-', '/', '\\', '+', '|'
    '''
    # case: +
    if x > 0 and x < len(track[0])-1 \
        and y > 0 and y < len(track)-1 \
        and track[y][x-1] not in [' ', '|'] \
        and track[y][x+1] not in [' ', '|'] \
        and track[y-1][x] not in [' ', '-'] \
        and track[y+1][x] not in [' ', '-']:
        return '+'
    # case: -
    if x > 0 and x < len(track[0])-1 \
        and track[y][x-1] in ['/', '\\', '+', '-'] \
        and track[y][x+1] in ['/', '\\', '+', '-']:
        return '-'
    # case: |
    if y > 0 and y < len(track)-1 \
        and track[y-1][x] in ['/', '\\', '+', '|'] \
        and track[y+1][x] in ['/', '\\', '+', '|']:
        return '|'
    #        |
    # case: -/
    if x > 0 and y > 0 \
        and track[y-1][x] not in [' ', '-'] \
        and track[y][x-1] not in [' ', '|']:
        return '/'
    # case: /-
    #       |
    if x < len(track[0])-1 and y < len(track)-1 \
        and track[y+1][x] not in [' ', '-'] \
        and track[y][x+1] not in [' ', '|']:
        return '/'
    # case: |
    #       \-
    if y > 0 and x < len(track[0])-1 \
        and track[y-1][x] not in [' ', '-'] \
        and track[y][x+1] not in [' ', '|']:
        return '\\'
    # case -\
    #       |
    if y < len(track)-1 and x > 0 \
        and track[y][x-1] not in [' ', '|'] \
        and track[y+1][x] not in [' ', '-']:
        return '\\'
    
def find_carts(track:list) -> list:
    cart_shapes = ['<', '>', '^', 'v']
    carts = []

    for y, line in enumerate(track):
        for x, cell in enumerate(line):
            if cell in cart_shapes:
                piece = get_occupied_track(track, x, y)
                carts.append(Cart(x, y, cell, piece))

    return carts

def run_carts(track:list) -> tuple:
    result = 0
    carts = find_carts(track)
    while True:
        dead_carts = []
        carts.sort()
        for cart in carts:
            if cart not in dead_carts:
                result = cart.move(track)
                if result != 0:
                    collision = [cart for cart in carts if cart.x == result[0] and cart.y == result[1]]
                    for cart in collision:
                        dead_carts.append(cart)
        for cart in dead_carts:
            track[cart.y][cart.x] = get_occupied_track(track, cart.x, cart.y)
            carts.remove(cart)
        if len(carts) == 1:
            return carts[0].x, carts[0].y

test_track = read_file('test_track3.txt')
track = read_file('input.txt')

assert run_carts(test_track) == (6, 4)
print(run_carts(track))
# 54, 66