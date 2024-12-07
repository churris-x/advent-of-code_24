import os
eg = open(f'{os.path.dirname(__file__)}/eg.txt').read().strip()
input = open(f'{os.path.dirname(__file__)}/input.txt').read().strip()

# Part 1 ----------------------------------------------------------------------

def sum_multiply(input):
    equations = input.splitlines()

    valid = 0

    for equation in equations:

        colon = equation.index(': ')

        total = int(equation[:colon])
        numbers = equation[colon + 2:].split(' ')
        numbers = [int(item) for item in numbers]

        def recursive_sum(array, total=None, results=[]):
            if (not len(array)): return results.append(total)

            recursive_sum(array[1:], (0, total)[bool(total)] + array[0], results)
            recursive_sum(array[1:], (1, total)[bool(total)] * array[0], results)

            return results

        results = recursive_sum(numbers)

        if total in results: valid += total

    return valid


print('1) eg: ', sum_multiply(eg))
print('1) input: ', sum_multiply(input))

# Part 2 ----------------------------------------------------------------------

def concatenate(input):
    equations = input.splitlines()

    valid = 0

    for equation in equations:

        colon = equation.index(': ')

        total = int(equation[:colon])
        numbers = equation[colon + 2:].split(' ')
        numbers = [int(item) for item in numbers]

        def recursive_sum(array, total=None, results=[]):
            if (not len(array)): return results.append(total)

            recursive_sum(array[1:], int(f'{('', total)[bool(total)]}{array[0]}'), results)
            recursive_sum(array[1:], (0, total)[bool(total)] + array[0], results)
            recursive_sum(array[1:], (1, total)[bool(total)] * array[0], results)

            return results

        results = recursive_sum(numbers)

        if total in results: valid += total

    return valid

print('2) eg:    ', concatenate(eg))
print('2) input: ', concatenate(input))

'''
Wrong guesses:

Correct:
    1) 945512582195
    2) 271691107779347
'''
