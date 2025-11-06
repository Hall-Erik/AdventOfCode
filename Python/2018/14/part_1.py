puzzle_input = 825401

def print_recipes(recipes, one, two):
    s = ''
    for i, recipe in enumerate(recipes):
        if i == one:
            s = s + '(' + str(recipe) + ') '
        elif i == two:
            s = s + '[' + str(recipe) + '] '
        else:
            s = s + str(recipe) + ' '
    print(s)

def combine_recipes(recipes:list, one, two):
    score_one = recipes[one]
    score_two = recipes[two]
    score = score_one + score_two

    if score >= 10:
        recipes.append(1)
        score = score % 10
    recipes.append(score)

    one = (one + score_one + 1) % len(recipes)
    two = (two + score_two + 1) % len(recipes)
    return one, two

def find_ten_good_recipes(tries:int=9) -> str:
    recipes = [3, 7]
    one = 0
    two = 1
    # print_recipes(recipes, one, two)
    while len(recipes) < tries + 10:
        one, two = combine_recipes(recipes, one, two)
        # print_recipes(recipes, one, two)
    return ''.join([str(r) for r in recipes[tries:tries+10]])

assert find_ten_good_recipes(9) == '5158916779'
assert find_ten_good_recipes(5) == '0124515891'
assert find_ten_good_recipes(18) == '9251071085'
assert find_ten_good_recipes(2018) == '5941429882'
print(find_ten_good_recipes(puzzle_input))
# 6289129761