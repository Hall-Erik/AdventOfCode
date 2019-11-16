def has_three_vowels(s: str) -> bool:
    vowels = 0
    vowels += s.count('a')
    vowels += s.count('e')
    vowels += s.count('i')
    vowels += s.count('o')
    vowels += s.count('u')
    return vowels >= 3

def contains_double_letter(s: str) -> bool:
    if len(s) <= 1:
        return False
    for i in range(len(s) -1):
        if s[i] == s[i+1]: return True
    return False

def no_forbidden_strings(s: str) -> bool:
    forbidden_strings = ['ab', 'cd', 'pq', 'xy']
    for f in forbidden_strings:
        if f in s: return False
    return True

def is_string_nice(s: str) -> bool:
    if not has_three_vowels(s): return False
    if not contains_double_letter(s): return False
    if not no_forbidden_strings(s): return False
    return True


if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        strings = f.readlines()
    
    naughty = 0
    nice = 0

    for string in strings:
        if is_string_nice(string): nice += 1
        else: naughty += 1
    
    print(f'Nice strings: {nice}\nNayghty strings: {naughty}')

    # Vowel count tests
    assert has_three_vowels('ugknbfddgicrmopn') == True
    assert has_three_vowels('aaa') == True
    assert has_three_vowels('jchzalrnumimnmhp') == True
    assert has_three_vowels('haegwjzuvuyypxyu') == True
    assert has_three_vowels('dvszwmarrgswjxmb') == False

    # Double letter tests
    assert contains_double_letter('ugknbfddgicrmopn') == True
    assert contains_double_letter('aaa') == True
    assert contains_double_letter('jchzalrnumimnmhp') == False
    assert contains_double_letter('haegwjzuvuyypxyu') == True
    assert contains_double_letter('dvszwmarrgswjxmb') == True

    # Forbidden strings tests
    assert no_forbidden_strings('ugknbfddgicrmopn') == True
    assert no_forbidden_strings('aaa') == True
    assert no_forbidden_strings('jchzalrnumimnmhp') == True
    assert no_forbidden_strings('haegwjzuvuyypxyu') == False
    assert no_forbidden_strings('dvszwmarrgswjxmb') == True

    # All checks tests
    assert is_string_nice('ugknbfddgicrmopn') == True
    assert is_string_nice('aaa') == True
    assert is_string_nice('jchzalrnumimnmhp') == False
    assert is_string_nice('haegwjzuvuyypxyu') == False
    assert is_string_nice('dvszwmarrgswjxmb') == False