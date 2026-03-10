alphabets = ['S', 'E', 'N', 'D', 'M', 'O', 'R', 'Y']
found=False
for S in range(10):
    for E in range(10):
        for N in range(10):
            for D in range(10):
                for M in range(1,10):
                    for O in range(10):
                        for R in range(10):
                            for Y in range(10):
                                numbers = [S, E, N, D, M, O, R, Y]
                                if len(set(numbers)) != 8:
                                    continue


                                if (S*1000 + E*100 + N*10 + D +M*1000 + O*100 + R*10 + E ==M*10000 +   O*1000 + N*100 + E*10 + Y):
                                    print(f"S = {S}")
                                    print(f"E = {E}")
                                    print(f"N = {N}")
                                    print(f"D = {D}")
                                    print(f"M = {M}")
                                    print(f"O = {O}")
                                    print(f"R = {R}")
                                    print(f"Y = {Y}")                            
                                    print(f"SEND={S}{E}{N}{D}, MORE={M}{O}{R}{E}, MONEY={M}{O}{N}{E}{Y}")
                                    print(f"{S}{E}{N}{D} + {M}{O}{R}{E} = {M}{O}{N}{E}{Y}")
                                    found = True
                                    break
                            if found: 
                                break
                        if found: 
                            break
                    if found: 
                        break
                if found: 
                    break
            if found: 
                break
        if found: 
            break
    if found: 
        break
if not found:
    print("No solution found")
