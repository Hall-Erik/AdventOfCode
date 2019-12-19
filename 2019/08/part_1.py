def get_layers(img:str, w:int, h:int) -> list:
    layers = []
    for i in range(0, len(img), w*h):
        layers.append(img[i:i+w*h])
    return layers

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        img = f.readline()
    img = img.replace('\n', '')
    layers = get_layers(img, 25, 6)
    fewest_zero = min(layers, key=lambda l: l.count('0'))
    print(fewest_zero.count('1') * fewest_zero.count('2'))

    test_img = '123456789012'
    assert get_layers(test_img, 3, 2) == ['123456', '789012']