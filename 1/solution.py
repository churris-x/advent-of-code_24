eg = open('eg.txt').read()[:-1]
input = open('input.txt').read()[:-1]


# Part 1 ----------------------------------------------------------------------

def sorted_distance(input):
    left, right = [], []

    for line in input.split('\n'):
        x, y = line.split('   ')
        left.append(int(x))
        right.append(int(y))

    left.sort()
    right.sort()

    distance = 0

    for index, number in enumerate(left):
        distance += abs(number - right[index])

    return distance

print('1) eg: ',    sorted_distance(eg))
print('1) input: ', sorted_distance(input))

# Part 2 ----------------------------------------------------------------------

def similarity(input):
    left, right = [], []

    for line in input.split('\n'):
        x, y = line.split('   ')
        left.append(int(x))
        right.append(int(y))

    similarity = 0

    for number in left:
        similarity += number * right.count(number)

    return similarity

print('2) eg: ',    similarity(eg))
print('2) input: ', similarity(input))

'''
Wrong guesses:

Correct:
    1) 765748
    2) 27732508
'''
