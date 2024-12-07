import sys
import time

def fizz_bazz(start, end):
    for i in range(start, end + 1):
        if i % 3 == 0 and i % 5 == 0:
            print('FizzBazz')
        elif i % 3 == 0:
            print('Fizz')
        elif i % 5 == 0:
            print('Bazz')
        else:
            print(i)
        time.sleep(0.1)

# コマンドライン引数を取得
args = sys.argv
if len(args) != 3:
    print('Usage: python fizzbazz.py start end')
    sys.exit(1)
start = int(args[1])
end = int(args[2])

# 実行
fizz_bazz(start, end)
