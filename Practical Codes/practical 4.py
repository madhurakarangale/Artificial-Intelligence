board = [" ", " ", " ",
         " ", " ", " ",
         " ", " ", " "]

current_player = "X"

game_running = True
winner = False

while game_running:
    print()
    print(board[0] + " | " + board[1] + " | " + board[2])
    print("--+---+--")
    print(board[3] + " | " + board[4] + " | " + board[5])
    print("--+---+--")
    print(board[6] + " | " + board[7] + " | " + board[8])
    print()
    move = input("Player " + current_player + ", choose a position (1-9): ")
    if move not in ["1","2","3","4","5","6","7","8","9"]:
        print("Invalid input. Choose a number from 1 to 9.")
        continue
    position = int(move) - 1
    if board[position] != " ":
        print("That spot is already taken.")
        continue

    board[position] = current_player

    if ((board[0] == board[1] == board[2] != " ") or
        (board[3] == board[4] == board[5] != " ") or
        (board[6] == board[7] == board[8] != " ") or
        (board[0] == board[3] == board[6] != " ") or
        (board[1] == board[4] == board[7] != " ") or
        (board[2] == board[5] == board[8] != " ") or
        (board[0] == board[4] == board[8] != " ") or
        (board[2] == board[4] == board[6] != " ")    ):
        winner = current_player
        game_running = False

    elif " " not in board:
        game_running = False

    else:
        if current_player == "X":
            current_player = "O"
        else:
            current_player = "X"

print()
print(board[0] + " | " + board[1] + " | " + board[2])
print("--+---+--")
print(board[3] + " | " + board[4] + " | " + board[5])
print("--+---+--")
print(board[6] + " | " + board[7] + " | " + board[8])
print()

if winner:
    print("Player " + winner + " wins!")
else:
    print("It's a tie!")
