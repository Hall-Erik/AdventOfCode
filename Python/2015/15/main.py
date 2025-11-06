from itertools import combinations_with_replacement
from functools import reduce

def objectify(ingredients:list) -> dict:
    '''Turns ingredients list into dict'''
    return {
        i[0]: {
            'capacity': int(i[2]),
            'durability': int(i[4]),
            'flavor': int(i[6]),
            'texture': int(i[8]),
            'calories': int(i[10])
        }
        for i in map(
            lambda ingredient: ingredient.replace(':', '').replace(',', '').split(' '),
            ingredients)
    }

def quantify_cookie(cookie:tuple, ingredients:dict, cal_500:bool=False) -> int:
    '''
    Returns a score based on the ingredients used
    cookie: a tuple of len 100 of all ingredients used
    ingredients: a dict that describes the properties per tsp 
    of all ingredients
    '''
    if cal_500:
        if sum([
                i['calories'] * cookie.count(k)
                for k, i in ingredients.items()]) != 500:
            return 0
    return reduce(
        lambda x, y: x * y if x > 0 else 0,
        [
            sum([i[p] * cookie.count(k) for k, i in ingredients.items()])
            for p in ['capacity', 'durability', 'flavor', 'texture']
        ],
        1
    )
    

def find_best_cookie(ingredients:dict, cal_500:bool=False) -> int:
    '''Returns the best possible score with the given ingredients'''
    all_cookies = combinations_with_replacement(ingredients.keys(), r=100)
    return max([quantify_cookie(c, ingredients, cal_500) for c in list(all_cookies)])

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        ingredients = f.readlines()
    ingredients = objectify(ingredients)
    print(f'Best cookie score: {find_best_cookie(ingredients)}')
    print(f'Best 500 cal cookie score: {find_best_cookie(ingredients, cal_500=True)}')

    # Tests
    test_ingredients = [
        'Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8',
        'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3'
    ]
    test_ingredients = objectify(test_ingredients)
    assert find_best_cookie(test_ingredients) == 62842880
    assert find_best_cookie(test_ingredients, cal_500=True) == 57600000