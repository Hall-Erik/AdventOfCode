from part_1 import dictify, get_best_station

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        map_list = f.readlines()
    map_list = [m.replace('\n', '') for m in map_list]
    map_dict = dictify(map_list)
    best_station = get_best_station(map_dict)[0]
    print(best_station)