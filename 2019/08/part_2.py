from part_1 import get_layers

def merge_layers(layers:list) -> str:
    layer = [c for c in layers[0]]
    for l in layers[1:]:
        for i in range(0, len(l)):
            if layer[i] == '2' and l[i] != '2':
                layer[i] = l[i]
    
    return ''.join(layer)

def print_img(img:str, w:int, h:int):
    if len(img) >= w*h:
        img = img.replace('0', ' ')
        for i in range(0, w*h, w):
            print(img[i:i+w])

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        img = f.readline()
    img = img.replace('\n', '')
    layers = get_layers(img, 25, 6)
    final_layer = merge_layers(layers)
    print_img(final_layer, 25, 6)

    # Testing
    # print('\n\n')
    # test_img = '0222112222120000'
    # layers = get_layers(test_img, 2, 2)
    # final_layer = merge_layers(layers)
    # print_img(final_layer, 2, 2)