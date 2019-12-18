from itertools import permutations
from queue import Queue

class Amp:
    def __init__(self, intcode:list):
        self.ic = intcode[:]
        self.pos = 0
        self.running = True
        self.q = Queue()

    def eq(self, mode):
        '''Equal'''
        p1 = self.ic[self.ic[self.pos+1]] if mode[-1] == '0' else self.ic[self.pos+1]
        p2 = self.ic[self.ic[self.pos+2]] if mode[-2] == '0' else self.ic[self.pos+2]
        loc = self.ic[self.pos+3] if mode[-3] == '0' else self.pos+3
        self.ic[loc] = 1 if p1 == p2 else 0
        self.pos += 4

    def lt(self, mode):
        '''Less Than'''
        p1 = self.ic[self.ic[self.pos+1]] if mode[-1] == '0' else self.ic[self.pos+1]
        p2 = self.ic[self.ic[self.pos+2]] if mode[-2] == '0' else self.ic[self.pos+2]
        loc = self.ic[self.pos+3] if mode[-3] == '0' else self.pos+3
        self.ic[loc] = 1 if p1 < p2 else 0
        self.pos += 4

    def jif(self, mode):
        '''Jump If False'''
        p1 = self.ic[self.ic[self.pos+1]] if mode[-1] == '0' else self.ic[self.pos+1]
        p2 = self.ic[self.ic[self.pos+2]] if mode[-2] == '0' else self.ic[self.pos+2]
        self.pos = p2 if p1 == 0 else self.pos + 3

    def jit(self, mode):
        '''Jump If True'''
        p1 = self.ic[self.ic[self.pos+1]] if mode[-1] == '0' else self.ic[self.pos+1]
        p2 = self.ic[self.ic[self.pos+2]] if mode[-2] == '0' else self.ic[self.pos+2]
        self.pos = p2 if p1 != 0 else self.pos + 3

    def print_val(self, mode):
        '''Print the value'''
        val = self.ic[self.ic[self.pos+1]] if mode[-1] == '0' else self.ic[self.pos+1]
        self.pos += 2
        return val

    def put(self, i):
        '''Take input'''
        for item in i:
            self.q.put(item)

    def process_input(self, mode):
        '''Store Input in the location'''
        loc = self.ic[self.pos+1] if mode[-1] == '0' else self.pos+1
        i = self.q.get()
        self.ic[loc] = i
        self.pos += 2

    def mult(self, mode):
        '''Multiply'''
        p1 = self.ic[self.ic[self.pos+1]] if mode[-1] == '0' else self.ic[self.pos+1]
        p2 = self.ic[self.ic[self.pos+2]] if mode[-2] == '0' else self.ic[self.pos+2]
        loc = self.ic[self.pos+3] if mode[-3] == '0' else self.pos+3
        self.ic[loc] = p1 * p2
        self.pos += 4
    
    def add(self, mode):
        '''Add'''
        p1 = self.ic[self.ic[self.pos+1]] if mode[-1] == '0' else self.ic[self.pos+1]
        p2 = self.ic[self.ic[self.pos+2]] if mode[-2] == '0' else self.ic[self.pos+2]
        loc = self.ic[self.pos+3] if mode[-3] == '0' else self.pos+3
        self.ic[loc] = p1 + p2
        self.pos += 4

    def run_program(self, i:object):
        if i: self.put(i)
        while self.pos < len(self.ic):
            s = str(self.ic[self.pos])
            op = int(s[-2:]) if len(s) > 1 else int(s)
            mode = '0' * (3 - len(s[:-2])) + s[:-2] if len(s) > 2 else '000'
            if op == 99:
                # Halt
                self.running = False
                break
            elif op == 8: self.eq(mode)                
            elif op == 7: self.lt(mode)                
            elif op == 6: self.jif(mode)
            elif op == 5: self.jit(mode)
            elif op == 4: return self.print_val(mode)                
            elif op == 3: self.process_input(mode)
            elif op == 2: self.mult(mode)                
            elif op == 1: self.add(mode)


def run_circuit(program:list, phases:list):
    amps = []
    for phase in phases:
        a = Amp(program)
        a.put([phase])
        amps.append(a)
    
    i = 0
    last_result = 0

    while amps[i%len(amps)].running:
        lr = amps[i%len(amps)].run_program([last_result])
        if lr:
            last_result = lr
        i += 1
    
    return last_result

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        program = f.readline()    
    program = [int(p) for p in program.replace('\n', '').split(',')]
    maximum = 0
    for order in list(permutations(range(5,10))):
        m = run_circuit(program, order)
        if m > maximum:
            maximum = m
    print(maximum)

    # Tests from day 5
    # Position Mode:
    # Returns 1 if input is 8 or 0 otherwise
    a = Amp([3,9,8,9,10,9,4,9,99,-1,8])
    assert a.run_program([8]) == 1
    a = Amp([3,9,8,9,10,9,4,9,99,-1,8])
    assert a.run_program(iter([7])) == 0
    # Returns 1 if input is less than 8 otherwise, 0
    a = Amp([3,9,7,9,10,9,4,9,99,-1,8])
    assert a.run_program(iter([7])) == 1
    a = Amp([3,9,7,9,10,9,4,9,99,-1,8])
    assert a.run_program(iter([8])) == 0

    # Immediate Mode:
    # Returns 1 if input is 8 or 0 otherwise
    a = Amp([3,3,1108,-1,8,3,4,3,99])
    assert a.run_program(iter([8])) == 1
    a = Amp([3,3,1108,-1,8,3,4,3,99])
    assert a.run_program(iter([7])) == 0
    # Returns 1 if input is less than 8 otherwise, 0
    a = Amp([3,3,1107,-1,8,3,4,3,99])
    assert a.run_program(iter([7])) == 1
    a = Amp([3,3,1107,-1,8,3,4,3,99])
    assert a.run_program(iter([8])) == 0

    # Jump Tests Output 0 if input is 0, otherwise 1:
    # Position Mode:
    a = Amp([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9])
    assert a.run_program(iter([5])) == 1
    a = Amp([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9])
    assert a.run_program(iter([0])) == 0
    # Immediate Mode:
    a = Amp([3,3,1105,-1,9,1101,0,0,12,4,12,99,1])
    assert a.run_program(iter([5])) == 1
    a = Amp([3,3,1105,-1,9,1101,0,0,12,4,12,99,1])
    assert a.run_program(iter([0])) == 0

    # Part 1 Tests
    program = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]
    last_result = 0
    for amp in (4,3,2,1,0):
        a = Amp(program)
        last_result = a.run_program(iter([amp, last_result]))
    assert last_result == 43210

    program = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]
    last_result = 0
    for amp in (0,1,2,3,4):
        a = Amp(program)
        last_result = a.run_program(iter([amp, last_result]))
    assert last_result == 54321

    program = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]
    last_result = 0
    for amp in (1,0,4,3,2):
        a = Amp(program)
        last_result = a.run_program(iter([amp, last_result]))
    assert last_result == 65210

    # Part 2 Tests
    program = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]
    order = (9,8,7,6,5)
    assert run_circuit(program, order) == 139629729

    program = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]
    order = (9,7,8,5,6)
    assert run_circuit(program, order) == 18216
   