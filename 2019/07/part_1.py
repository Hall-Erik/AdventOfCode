from itertools import permutations


def run_program(intcode:list, i:object):
    ic = intcode[:]
    pos = 0
    while pos < len(ic):
        s = str(ic[pos])
        op = int(s[-2:]) if len(s) > 1 else int(s)
        mode = '0' * (3 - len(s[:-2])) + s[:-2] if len(s) > 2 else '000'
        if op == 99: break
        elif op == 8:
            # eq
            p1 = ic[ic[pos+1]] if mode[-1] == '0' else ic[pos+1]
            p2 = ic[ic[pos+2]] if mode[-2] == '0' else ic[pos+2]
            loc = ic[pos+3] if mode[-3] == '0' else pos+3
            ic[loc] = 1 if p1 == p2 else 0
            pos += 4
        elif op == 7:
            # lt
            p1 = ic[ic[pos+1]] if mode[-1] == '0' else ic[pos+1]
            p2 = ic[ic[pos+2]] if mode[-2] == '0' else ic[pos+2]
            loc = ic[pos+3] if mode[-3] == '0' else pos+3
            ic[loc] = 1 if p1 < p2 else 0
            pos += 4
        elif op == 6:
            # jif
            p1 = ic[ic[pos+1]] if mode[-1] == '0' else ic[pos+1]
            p2 = ic[ic[pos+2]] if mode[-2] == '0' else ic[pos+2]
            pos = p2 if p1 == 0 else pos + 3
        elif op == 5:
            # jit
            p1 = ic[ic[pos+1]] if mode[-1] == '0' else ic[pos+1]
            p2 = ic[ic[pos+2]] if mode[-2] == '0' else ic[pos+2]
            pos = p2 if p1 != 0 else pos + 3
        elif op == 4:
            # just print the val
            val = ic[ic[pos+1]] if mode[-1] == '0' else ic[pos+1]
            return val
            pos += 2
        elif op == 3:
            # store it in the position
            loc = ic[pos+1] if mode[-1] == '0' else pos+1
            ic[loc] = next(i)
            pos += 2
        elif op == 2:
            # mult
            p1 = ic[ic[pos+1]] if mode[-1] == '0' else ic[pos+1]
            p2 = ic[ic[pos+2]] if mode[-2] == '0' else ic[pos+2]
            loc = ic[pos+3] if mode[-3] == '0' else pos+3
            ic[loc] = p1 * p2
            pos += 4
        elif op == 1:
            # add
            p1 = ic[ic[pos+1]] if mode[-1] == '0' else ic[pos+1]
            p2 = ic[ic[pos+2]] if mode[-2] == '0' else ic[pos+2]
            loc = ic[pos+3] if mode[-3] == '0' else pos+3
            ic[loc] = p1 + p2
            pos += 4

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        program = f.readline()    
    program = [int(p) for p in program.replace('\n', '').split(',')]
    last_result = 0
    maximum = 0
    for order in list(permutations(range(0,5))):
        for amp in order:
            last_result = run_program(program, iter([amp, last_result]))
        if last_result > maximum:
            maximum = last_result
        last_result = 0
    print(maximum)

    # Tests
    program = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]
    last_result = 0
    for amp in (4,3,2,1,0):
        last_result = run_program(program, iter([amp, last_result]))
    assert last_result == 43210

    program = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]
    last_result = 0
    for amp in (0,1,2,3,4):
        last_result = run_program(program, iter([amp, last_result]))
    assert last_result == 54321

    program = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]
    last_result = 0
    for amp in (1,0,4,3,2):
        last_result = run_program(program, iter([amp, last_result]))
    assert last_result == 65210
   