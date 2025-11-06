puzzle_input = '825401'

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

def find_recipe_sequence(sequence:str) -> str:
    num_digits = len(sequence)
    seq_digits = [int(x) for x in str(sequence)]
    recipes = [3, 7]
    one = 0
    two = 1
    n = 1
    while True:
        one, two = combine_recipes(recipes, one, two)
        if recipes[-num_digits:] == seq_digits:
            return len(recipes) - num_digits
        elif recipes[-(1+num_digits):-1] == seq_digits:
            return len(recipes) - (1+num_digits)
        n += 1
    return len(recipes) - num_digits

assert find_recipe_sequence('51589') == 9
assert find_recipe_sequence('01245') == 5
assert find_recipe_sequence('92510') == 18
assert find_recipe_sequence('59414') == 2018
print(find_recipe_sequence(puzzle_input))
# 20207075