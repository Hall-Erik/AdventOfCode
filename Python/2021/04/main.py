class Board:
    def __init__(self, lines):
        self.board = [[col.replace('\n', '') for col in line.split(' ') if len(col) > 0] for line in lines]
    
    def mark(self, val):
        self.board = [['x' if col == val else col for col in line] for line in self.board]
    
    def won(self):
        won = False
        for i in range(5):
            if all([True if col == 'x' else False for col in self.board[i]]):
                won = True
                break
            if all([True if row[i] == 'x' else False for row in self.board]):
                won = True
                break
        return won
    
    def unmarked_sum(self):
        val = 0
        for line in self.board:
            for row in line:
                if row != 'x':
                    val += int(row)
        return val
    
    def __repr__(self):
        s = '\n'.join([' '.join(line) for line in self.board])
        return f'{s}\n'


class BingoSubsystem:
    def __init__(self, lines):
        self.last_call = None
        self.draw = lines[0].split(',')
        self.boards = []
        board_lines = lines[2:]
        for i, line in enumerate(board_lines[::6]):
            board = Board(board_lines[i*6:i*6+5])
            self.boards.append(board)
    
    def turn(self):
        self.last_call = self.draw.pop(0)
        for board in self.boards:
            board.mark(self.last_call)
    
    def won(self):
        return any([board.won() for board in self.boards])

    def score(self):
        for board in self.boards:
            # print(board)
            if board.won():
                return board.unmarked_sum() * int(self.last_call)
        return 0
    
    def play_to_win(self):
        while not self.won():
            self.turn()
        return self.score()
    
    def play_to_lose(self):
        while len(self.boards) > 1:
            self.boards = [board for board in self.boards if not board.won()]
            self.play_to_win()
        return self.score()


def clean(lines):
    lines = [line.replace('\n', '') for line in lines]
    return [line for line in lines if len(line) > 0]

def test():
    test_input = [
        '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',
        '',
        '22 13 17 11  0',
        '8  2 23  4 24',
        '21  9 14 16  7',
        '6 10  3 18  5',
        '1 12 20 15 19',
        '',
        '3 15  0  2 22',
        '9 18 13 17  5',
        '19  8  7 25 23',
        '20 11 10 24  4',
        '14 21 16 12  6',
        '',
        '14 21 17 24  4',
        '10 16 15  9 19',
        '18  8 23 26 20',
        '22 11 13  6  5',
        '2  0 12  3  7',
    ]
    bingo = BingoSubsystem(test_input)
    assert bingo.play_to_win() == 4512
    bingo = BingoSubsystem(test_input)
    assert bingo.play_to_lose() == 1924

def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    bingo = BingoSubsystem(lines)
    print(f'Score is: {bingo.play_to_win()}') # part 1: 4662
    bingo = BingoSubsystem(lines)
    print(f'Losing board score is: {bingo.play_to_lose()}') # part 2: 12080

if __name__ == "__main__":
    test()
    main()
