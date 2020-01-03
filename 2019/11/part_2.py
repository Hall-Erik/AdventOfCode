from intcode import Comp

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        program = f.readline()
    program = [int(i) for i in program.replace('\n', '').split(',')]
    comp = Comp(program)

    # Dict of panels and what color they are painted - 0: black 1: white
    # {(x, y): 0 or 1}
    panels = {(0, 0): 1}

    robot_position = (0, 0)
    # 0: up 1: right 2: down 3: left
    robot_direction = 0
    
    while comp.running:
        # get panel color
        curr_panel_color = panels.get(robot_position, 0)
        # get new color, paint
        new_panel_color = comp.run_program([curr_panel_color])
        if new_panel_color is None: break
        if new_panel_color != curr_panel_color:
            panels[robot_position] = new_panel_color
        # turn robot
        # if 1 turn right, if 0 turn left
        if comp.run_program(): robot_direction = (robot_direction + 1) % 4
        else: robot_direction = (robot_direction - 1) % 4
        # move forward
        if robot_direction == 0:
            robot_position = (robot_position[0], robot_position[1] - 1)
        elif robot_direction == 1:
            robot_position = (robot_position[0] + 1, robot_position[1])
        elif robot_direction == 2:
            robot_position = (robot_position[0], robot_position[1] + 1)
        elif robot_direction == 3:
            robot_position = (robot_position[0] - 1, robot_position[1])
    
    # Print the registration identifier
    min_x = min(panels, key=lambda p: p[0])[0]
    max_x = max(panels, key=lambda p: p[0])[0]
    min_y = min(panels, key=lambda p: p[1])[1]
    max_y = max(panels, key=lambda p: p[1])[1]

    for y in range(min_y, max_y + 1):
        row = []
        for x in range(min_x, max_x + 1):
            if panels.get((x, y), 0) == 1: row.append('#')
            else: row.append('.')
        print(''.join(row))
