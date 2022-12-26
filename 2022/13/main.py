import json
from enum import Enum
import logging
import functools


class Comparison(Enum):
    PASS = 1
    FAIL = 2
    CONTINUE = 3


def read_lines(filename:str) -> list[str]:
    with open(filename) as f:
        lines = f.readlines()
    return [line.replace("\n", "") for line in lines]

def parse(line:str) -> dict:
    return json.loads(line)

def collect_pairs(lines:list[str]) -> list:
    return [
        (parse(lines[i]), parse(lines[i+1]))
        for i in range(0, len(lines), 3)
    ]

def compare_ints(a, b) -> Comparison:
    logger.debug(f"Comparing ints: {a} {b}")
    if a < b:
        logger.debug("Pass")
        return Comparison.PASS
    elif a == b:
        logger.debug("Continue")
        return Comparison.CONTINUE
        logger.debug("Fail")
    return Comparison.FAIL

def compare_lists(a, b) -> Comparison:
    logger.debug(f"Comparing lists: {a} {b}")
    for n, (i, j) in enumerate(zip(a, b)):
        result = compare_vals(i, j)
        if not result == Comparison.CONTINUE:
            return result
    if len(b) < len(a):
        logger.debug("Second list too short - Fail")
        return Comparison.FAIL
    logger.debug("First list ran out of items - Pass")
    return Comparison.PASS

def compare_mixed(a, b) -> Comparison:
    logger.debug(f"Comparing mixed: {a} {b}")
    if isinstance(a, int):
        return compare_lists([a], b)
    return compare_lists(a, [b])

def compare_vals(a, b) -> Comparison:
    if isinstance(a, int) and isinstance(b, int):
        return compare_ints(a, b)
    elif isinstance(a, list) and isinstance(b, list):
        return compare_lists(a, b)
    return compare_mixed(a, b)

def find_passig_indices(pairs: list) -> int:
    indices_sum = 0
    for i, pair in enumerate(pairs):
        if compare_vals(*pair) == Comparison.PASS:
            indices_sum += 1 + i    
    return indices_sum

def pairs_to_list(pairs) -> list:
    ret = []
    for (a, b) in pairs:
        ret.append(a)
        ret.append(b)
    ret.append([[2]])
    ret.append([[6]])
    return ret

def items_sorted(a, b):
    res = compare_vals(a, b)
    if res == Comparison.PASS:
        return -1
    return 1

def sort_items(pairs: list) -> int:
    items = pairs_to_list(pairs)
    items = sorted(items, key=functools.cmp_to_key(items_sorted))
    product = 1
    for i, item in enumerate(items):
        if item == [[2]] or item == [[6]]:
            product *= (i + 1)
    return product

def run_tests():
    test_lines = read_lines("testInput.txt")
    test_pairs = collect_pairs(test_lines)
    assert compare_vals(*test_pairs[0]) == Comparison.PASS
    assert compare_vals(*test_pairs[1]) == Comparison.PASS
    assert compare_vals(*test_pairs[2]) == Comparison.FAIL
    assert compare_vals(*test_pairs[3]) == Comparison.PASS
    assert compare_vals(*test_pairs[4]) == Comparison.FAIL
    assert compare_vals(*test_pairs[5]) == Comparison.PASS
    assert compare_vals(*test_pairs[6]) == Comparison.FAIL
    assert compare_vals(*test_pairs[7]) == Comparison.FAIL
    assert find_passig_indices(test_pairs) == 13
    assert sort_items(test_pairs) == 140

def main():
    run_tests()
    lines = read_lines("input.txt")
    pairs = collect_pairs(lines)
    indices_sum = find_passig_indices(pairs)
    logger.info(f"Sum of passing indices: {indices_sum}")
    decoder_key = sort_items(pairs)
    logger.info(f"Decoder key: {decoder_key}")

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("")
    main()
