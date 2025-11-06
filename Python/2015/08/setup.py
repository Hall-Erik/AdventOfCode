with open('test.txt', 'r') as f:
    test_lines = f.readlines()

with open('input.txt', 'r') as f:
    list_lines = f.readlines()

test_lines = ['    ' + line.replace('\n', ',\n') for line in test_lines]
list_lines = ['    ' + line.replace('\n', ',\n') for line in list_lines]

with open('test.py', 'w') as f:
    f.write('test_lines = [\n')
    f.writelines(test_lines)
    f.write(']\n')

with open('list_input.py', 'w') as f:
    f.write('list_lines = [\n')
    f.writelines(list_lines)
    f.write(']\n')