debug=True
if debug : print("Loaded Module:",__name__) 


# Define a class for the chart

from dataclasses import dataclass, field 


@dataclass
class Chart:
    lagna: float = 0.0  # Ascendant or rising sign
    surya: float = 0.0  # Position of the Sun
    chandra: float = 0.0  # Position of the Moon
    mangal: float = 0.0  # Position of Mars
    budha: float = 0.0  # Position of Mercury
    guru: float = 0.0  # Position of Jupiter
    shukra: float = 0.0  # Position of Venus
    shani: float = 0.0  # Position of Saturn
    rahu: float = 0.0  # Position of the North Lunar Node
    ketu: float = 0.0  # Position of the South Lunar Node
    
    # Add more fields as needed

@dataclass
class Jataka:
    chart: Chart = field(default_factory=Chart)
    ishta: float = 0.0
    akshamsha: float =0
    deshamsha: float =0
    # Add more fields as needed

bha_sphuta = lambda x : (x+720)%360 #normalize to 0-360
thithi_sphuta = lambda sun, moon : bha_sphuta(moon-sun) #thithi calculation
rashi = lambda x : int(bha_sphuta(x)/30)+1 #rashi calculation returns an integer 1-12
rashi_sesha = lambda x : int((int(x+0.999999)-1)%12+1) # normalize rashi to 1-12
dXrashi = lambda s,X : rashi(s*X)
d20rashi = lambda s : dXrashi(s,20)
PranaPada = lambda ishta,surya : rashi_sesha((ishta*60/15)+d20rashi(surya))
yoga_rashi = lambda r1,r2 : int(int(r1+0.99999)+int(r2+0.999999)-1)

#my chart
jataka=Jataka()
jataka.chart.lagna = 137.05747588523033
jataka.ishta = 7.9583
jataka.chart.surya = 92.378
jataka.chart.chandra = 53.01
jataka.chart.mangal = 298.093
jataka.chart.budha = 117.106
jataka.chart.guru = 213.181
jataka.chart.shukra = 81.513
jataka.chart.shani = 39.864
jataka.chart.rahu = 291.947
jataka.chart.ketu = bha_sphuta(jataka.chart.rahu+180)



if __name__ == "__main__" :
    #Madam's chart
    jataka2=Jataka()
    jataka2.chart.lagna = 30+23+59/60+54/3600
    jataka2.ishta = 3.4631
    jataka2.chart.surya = 30+4+1/60+26.49/3600

    #example ankur chart
    jataka3=Jataka()
    jataka3.chart.lagna = 60+1+30/60+16.58/3600
    jataka3.ishta = 30.7119
    jataka3.chart.surya = 6*30+25+31/60+36.44/3600


    jataka=jataka3
    print(jataka)
    print("D20 Lagna=",d20rashi(jataka.chart.lagna),"\nPP",PranaPada(jataka.ishta,jataka.chart.surya))
    print("D20 Surya=",d20rashi(jataka.chart.surya),jataka.chart.surya/1.5%12)
    print(jataka.ishta*60/15%12)
    print(jataka.chart.surya/1.5%12+jataka.ishta*60/15%12)
    print(yoga_rashi(jataka.chart.surya/1.5%12,jataka.ishta*60/15%12))
    