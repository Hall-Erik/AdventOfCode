password_range = range(387638, 919123 + 1)

def is_six_digits(pwd:int) -> bool:
    return pwd > 99999 and pwd < 1000000

def does_not_decrease(pwd:int) -> bool:
    pwd = str(pwd)
    for i in range(len(pwd)-1):
        if int(pwd[i]) > int(pwd[i+1]): return False
    return True

def has_double(pwd:int, check_for_groups:bool=False) -> bool:
    '''Should have two adjacent digits that match'''
    pwd = str(pwd)
    for i in range(len(pwd) - 1):
        if pwd[i] == pwd[i+1]:
            if check_for_groups:
                before = pwd[i-1] if i > 0 else -1
                after = pwd[i+2] if i < len(pwd) - 2 else -1
                if pwd[i] != before and pwd[i] != after:
                    return True
            else:
                return True
    return False

def check_password(pwd:int, check_for_groups:bool=False) -> bool:
    if not is_six_digits(pwd): return False
    if not has_double(pwd, check_for_groups): return False
    if not does_not_decrease(pwd): return False
    return True

if __name__ == '__main__':
    good_pwds = len(list(filter(check_password, password_range)))
    print(f'Matching passwords: {good_pwds}')

    good_pwds = len(list(filter(lambda x: check_password(x, True), password_range)))
    print(f'Matching passwords without large groups: {good_pwds}')
    
    # Tests
    assert check_password(111111) == True
    assert check_password(223450) == False
    assert check_password(123789) == False

    assert does_not_decrease(111111) == True
    assert does_not_decrease(223450) == False
    assert does_not_decrease(123789) == True
    
    assert is_six_digits(5) == False
    assert is_six_digits(111111) == True
    assert is_six_digits(223450) == True
    assert is_six_digits(123789) == True
    
    assert has_double(111111) == True
    assert has_double(223450) == True
    assert has_double(123789) == False

    assert has_double(112233, True) == True
    assert has_double(123444, True) == False
    assert has_double(111122, True) == True