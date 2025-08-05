debug=True
if debug : print("Loaded Module:",__name__) 

bha_sphuta = lambda x : (x+720)%360
thithi_sphuta = lambda sun, moon : bha_sphuta(moon-sun)

if __name__ == "__main__" :
    print("Direct Run")
