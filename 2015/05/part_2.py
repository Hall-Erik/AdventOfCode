def contains_double_pair(s: str) -> bool:
    if len(s) <= 3:
        return False
    for i in range(len(s) -1):
        if s.count(s[i:i+2]) > 1: return True
    return False

def contains_repeat_with_one_between(s: str) -> bool:
    if len(s) <= 1:
        return False
    for i in range(len(s) -2):
        if s[i] == s[i+2]: return True
    return False

def is_string_nice(s: str) -> bool:
    if not contains_double_pair(s): return False
    if not contains_repeat_with_one_between(s): return False
    return True

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        strings = f.readlines()

    nice = 0

    for string in strings:
        if is_string_nice(string): nice += 1
    
    print(f'Nice strings: {nice}')

    # All conditions tests
    assert is_string_nice('qjhvhtzxzqqjkmpb') == True
    assert is_string_nice('xxyxx') == True
    assert is_string_nice('uurcxstgmygtbstg') == False
    assert is_string_nice('ieodomkazucvgmuy') == False

    # Double pair tests
    assert contains_double_pair('xyxy') == True
    assert contains_double_pair('aabcdefgaa') == True
    assert contains_double_pair('qjhvhtzxzqqjkmpb') == True
    assert contains_double_pair('xxyxx') == True
    assert contains_double_pair('uurcxstgmygtbstg') == True
    assert contains_double_pair('ieodomkazucvgmuy') == False

    # Repeats with letter between tests
    assert contains_repeat_with_one_between('xyx') == True
    assert contains_repeat_with_one_between('abcdefeghi') == True
    assert contains_repeat_with_one_between('qjhvhtzxzqqjkmpb') == True
    assert contains_repeat_with_one_between('xxyxx') == True
    assert contains_repeat_with_one_between('uurcxstgmygtbstg') == False
    assert contains_repeat_with_one_between('ieodomkazucvgmuy') == True