

def run_program(intcode:list):
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
            print(val)
            pos += 2
        elif op == 3:
            # store it in the position
            loc = ic[pos+1] if mode[-1] == '0' else pos+1
            ic[loc] = int(input('Give me some input: '))
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
        program = f.read()
    program = [int(code) for code in program.replace('\n', '').split(',')]

    run_program(program)

    # Test runs
    # run_program([1002,4,3,4,33])
    # run_program([1101,100,-1,4,0])

    # run_program([3,9,8,9,10,9,4,9,99,-1,8])
    # run_program([3,9,7,9,10,9,4,9,99,-1,8])
    # run_program([3,3,1108,-1,8,3,4,3,99])
    # run_program([3,3,1107,-1,8,3,4,3,99])
    # run_program([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9])
    # run_program([3,3,1105,-1,9,1101,0,0,12,4,12,99,1])
    # run_program([
    #     3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
    #     1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
    #     999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99])
