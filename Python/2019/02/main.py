ops = {
    1: lambda x, y: x + y,
    2: lambda x, y: x * y
}

def run_program(intcode:list) -> list:
    ic = intcode[:]
    for i in range(0, len(ic), 4):
        if ic[i] == 99: break
        ic[ic[i+3]] = ops[ic[i]](ic[ic[i+1]], ic[ic[i+2]])
    return ic

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        program = f.read()
    program = [int(code) for code in program.replace('\n', '').split(',')]
    
    # Part 1
    p = program[:]
    p[1] = 12
    p[2] = 2
    p = run_program(p)
    print(f'Position zero: {p[0]}')
    
    # Part 2
    for noun in range(0, 100):
        for verb in range(0, 100):
            p = program[:]
            p[1] = noun
            p[2] = verb
            if run_program(p)[0] == 19690720:
                print(f'Correct noun/verb is {noun * 100 + verb}')

    # Tests
    test_programs = [
        [1,0,0,0,99],
        [2,3,0,3,99],
        [2,4,4,5,99,0],
        [1,1,1,4,99,5,6,0,99]
    ]
    assert run_program([1,0,0,0,99]) == [2,0,0,0,99]
    assert run_program([2,3,0,3,99]) == [2,3,0,6,99]
    assert run_program([2,4,4,5,99,0]) == [2,4,4,5,99,9801]
    assert run_program([1,1,1,4,99,5,6,0,99]) == [30,1,1,4,2,5,6,0,99]