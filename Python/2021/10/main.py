from math import ceil

class Line:
    braces = {
        '(': ')',
        '[': ']',
        '{': '}',
        '<': '>',
    }

    syntax_scores = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    }

    autocomplete_scores = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4,
    }

    def __init__(self, line) -> None:
        self.syntax_score = 0
        self.autocomplete_score = 0
        self.line = line.replace('\n', '')
        stack = self._check_syntax()
        self._check_completion(stack)

    def is_valid(self):
        return self.syntax_score == 0

    def _check_syntax(self) -> None:
        stack = []
        for c in self.line:
            if c in self.braces.keys():
                stack.append(c)
            elif c in self.syntax_scores.keys():
                if len(stack) == 0:
                    self.syntax_score = self.syntax_scores[c]
                    break
                else:
                    p = stack.pop()
                    if self.braces[p] != c:
                        self.syntax_score = self.syntax_scores[c]
                        stack.append(p)
                        break
        return stack
    
    def _check_completion(self, stack):
        total = 0
        # for i in stack:
        while len(stack) > 0:
            i = stack.pop()
            total = total * 5 + self.autocomplete_scores[i]
        self.autocomplete_score = total


def syntax_error_score(lines):
    return sum([line.syntax_score for line in lines])

def autocomplete_score(lines):
    temp = [line for line in lines if line.is_valid()]
    temp = sorted(temp, key=lambda t: t.autocomplete_score)
    return temp[ceil(len(temp)/2) - 1].autocomplete_score

def test():
    lines = [
        '[({(<(())[]>[[{[]{<()<>>',
        '[(()[<>])]({[<{<<[]>>(',
        '{([(<{}[<>[]}>{[]{[(<()>',
        '(((({<>}<{<{<>}{[]{[]{}',
        '[[<[([]))<([[{}[[()]]]',
        '[{[{({}]{}}([{[{{{}}([]',
        '{<[[]]>}<{[{[{[]{()[[[]',
        '[<(<(<(<{}))><([]([]()',
        '<{([([[(<>()){}]>(<<{{',
        '<{([{{}}[<[[[<>{}]]]>[]]',
    ]
    lines = [Line(line) for line in lines]
    assert syntax_error_score(lines) == 26397
    assert autocomplete_score(lines) == 288957

def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    lines = [Line(line) for line in lines]
    print(f'Total syntax error score: {syntax_error_score(lines)}') # part 1: 166191
    print(f'Autocomplete score: {autocomplete_score(lines)}') # part 2: 1152088313

if __name__ == '__main__':
    test()
    main()
