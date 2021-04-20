def add_list(a_list):
  for i in a_list:
    yield i + 1

a_list = [1, 2, 3, 4]
for x in add_list(a_list):
  print(x)
