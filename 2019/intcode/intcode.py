from queue import Queue
from defaultlist import defaultlist

class Comp:
    def __init__(self, intcode:list):
        self.ic = defaultlist(lambda: 0)
        self.ic.extend(intcode)
        self.pos = 0
        self.rb = 0
        self.running = True
        self.q = Queue()

    def get_index(self, mode:str, param_no:int) -> int:
        '''Return the index of the param depending of mode'''
        m = mode[-1*param_no]
        if m == '0':
            '''Position Mode'''
            return self.ic[self.pos+param_no]
        elif m == '1':
            '''Immediate Mode'''
            return self.pos+param_no
        elif m == '2':
            '''Relative Mode'''
            return self.ic[self.pos+param_no] + self.rb

    def get_param(self, mode:str, param_no:int) -> int:
        '''Return the value of the param depending of mode'''
        return self.ic[self.get_index(mode, param_no)]

    def adj(self, mode):
        '''Adjust the Relative Base'''
        p1 = self.get_param(mode, 1)
        self.rb += p1
        self.pos += 2

    def eq(self, mode):
        '''Equal'''
        p1 = self.get_param(mode, 1)
        p2 = self.get_param(mode, 2)
        loc = self.get_index(mode, 3)
        self.ic[loc] = 1 if p1 == p2 else 0
        self.pos += 4

    def lt(self, mode):
        '''Less Than'''
        p1 = self.get_param(mode, 1)
        p2 = self.get_param(mode, 2)
        loc = self.get_index(mode, 3)
        self.ic[loc] = 1 if p1 < p2 else 0
        self.pos += 4

    def jif(self, mode):
        '''Jump If False'''
        p1 = self.get_param(mode, 1)
        p2 = self.get_param(mode, 2)
        self.pos = p2 if p1 == 0 else self.pos + 3

    def jit(self, mode):
        '''Jump If True'''
        p1 = self.get_param(mode, 1)
        p2 = self.get_param(mode, 2)
        self.pos = p2 if p1 != 0 else self.pos + 3

    def print_val(self, mode):
        '''Print the value'''
        val = self.get_param(mode, 1)
        self.pos += 2
        return val

    def put(self, i):
        '''Take input'''
        for item in i:
            self.q.put(item)

    def process_input(self, mode):
        '''Store Input in the location'''
        loc = self.get_index(mode, 1)
        i = self.q.get()
        self.ic[loc] = i
        self.pos += 2

    def mult(self, mode):
        '''Multiply'''
        p1 = self.get_param(mode, 1)
        p2 = self.get_param(mode, 2)
        loc = self.get_index(mode, 3)
        self.ic[loc] = p1 * p2
        self.pos += 4
    
    def add(self, mode):
        '''Add'''
        p1 = self.get_param(mode, 1)
        p2 = self.get_param(mode, 2)
        loc = self.get_index(mode, 3)
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
            elif op == 9: self.adj(mode)
            elif op == 8: self.eq(mode)                
            elif op == 7: self.lt(mode)                
            elif op == 6: self.jif(mode)
            elif op == 5: self.jit(mode)
            elif op == 4: return self.print_val(mode)                
            elif op == 3: self.process_input(mode)
            elif op == 2: self.mult(mode)                
            elif op == 1: self.add(mode)
