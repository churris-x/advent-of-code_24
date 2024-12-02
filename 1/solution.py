eg = open('eg.txt').read().strip()
user_input = open('input.txt').read().strip()


# Part 1 ----------------------------------------------------------------------

def sorted_distance(user_input):
    left, right = [], []

    for line in user_input.splitlines():
        x, y = line.split()
        left.append(int(x))
        right.append(int(y))

    left.sort()
    right.sort()

    distance = 0

    for l, r in zip(left, right):
        distance += abs(l - r)

    return distance

print('1) eg: ',    sorted_distance(eg))
print('1) input: ', sorted_distance(user_input))

# Part 2 ----------------------------------------------------------------------

def similarity(user_input):
    left, right = [], []

    for line in user_input.splitlines():
        x, y = line.split()
        left.append(int(x))
        right.append(int(y))

    similarity = 0

    count = {}
    for number in left:
        if number not in count:
            count[number] = right.count(number)
        similarity += number * count[number]

    return similarity

print('2) eg: ',    similarity(eg))
print('2) input: ', similarity(user_input))

'''
Wrong guesses:

Correct:
    1) 765748
    2) 27732508
'''
