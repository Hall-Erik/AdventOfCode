from itertools import groupby

def has_increasing_straight(pwd:str) -> bool:
    for i in range(0, len(pwd)-2):
        if ord(pwd[i]) == ord(pwd[i+1]) -1 \
          and ord(pwd[i]) == ord(pwd[i+2]) -2:
            return True
    return False

def has_no_bad_letters(pwd:str) -> bool:
    bad_letters = ['i', 'o', 'l']
    for b in bad_letters:
        if b in pwd:
            return False
    return True

def has_two_pairs(pwd:str) -> bool:
    groups =  [k for k, g in groupby(pwd) if len(list(g)) > 1]
    return len(groups) > 1

def passes_tests(pwd:str) -> bool:
    if not has_increasing_straight(pwd): return False
    if not has_no_bad_letters(pwd): return False
    if not has_two_pairs(pwd): return False
    return True

def increment_char(s:str) -> str:
    s = chr(((ord(s[0]) - 96) % 26) + 97)
    while not has_no_bad_letters(s):
        s = chr(((ord(s[0]) - 96) % 26) + 97)
    return s

def increment_pwd(pwd:str) -> str:
    pos = len(pwd) - 1
    c = increment_char(pwd[pos])
    pwd = pwd[:pos] + c + pwd[pos+1:]
    while c == 'a':
        pos -= 1
        c = increment_char(pwd[pos])
        pwd = pwd[:pos] + c + pwd[pos+1:]
    return pwd

def generate_pwd(old_pwd:str) -> str:
    pwd = increment_pwd(old_pwd)
    while not passes_tests(pwd):
        pwd = increment_pwd(pwd)
    return pwd

if __name__ == '__main__':
    # part 1
    part_1 = generate_pwd("hxbxwxba")
    print(f'New password: {part_1}')

    # part 2
    print(f'New, new password: {generate_pwd(part_1)}')

    # Tests
    assert has_increasing_straight('hijklmmn') == True
    assert has_increasing_straight('abbceffg') == False
    assert has_increasing_straight('abbcegjk') == False
    
    assert has_no_bad_letters('hijklmmn') == False
    assert has_no_bad_letters('abbceffg') == True
    assert has_no_bad_letters('abbcegjk') == True

    assert has_two_pairs('hijklmmn') == False
    assert has_two_pairs('abbceffg') == True
    assert has_two_pairs('abbcegjk') == False

    assert generate_pwd('abcdefgh') == 'abcdffaa'
    assert generate_pwd('ghijklmn') == 'ghjaabcc'