def update_position(d: str, position: tuple) -> tuple:
    if d == '>': return position[0]+1, position[1]
    elif d == '<': return position[0]-1, position[1]
    elif d == '^': return position[0], position[1]+1
    elif d == 'v': return position[0], position[1]-1

def deliver_presents(directions: str) -> int:
    visited = {(0, 0): None}
    position = (0, 0)
    for d in directions:
        position = update_position(d, position)
        visited[position] = None
    return len(visited)

def deliver_presents_with_robo(directions: str) -> int:
    visited = {(0, 0): None}
    santa_position = (0, 0)
    robo_position = (0, 0)
    for i, d in enumerate(directions):
        if i % 2 == 0: 
            santa_position = update_position(d, santa_position)
            visited[santa_position] = None
        else:
            robo_position = update_position(d, robo_position)
            visited[robo_position] = None
    return len(visited)


if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        directions = f.read()

    print(f'Santa delivered to {deliver_presents(directions)} houses.')
    print(f'Santa and robot delivered to {deliver_presents_with_robo(directions)} houses.')

    # Just Santa tests
    assert deliver_presents('>') == 2
    assert deliver_presents('^>v<') == 4
    assert deliver_presents('^v^v^v^v^v') == 2

    # Santa and Robot tests
    assert deliver_presents_with_robo('^v') == 3
    assert deliver_presents_with_robo('^>v<') == 3
    assert deliver_presents_with_robo('^v^v^v^v^v') == 11