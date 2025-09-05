debug=True
if debug : print("Loaded Module:",__name__) 

bha_sphuta = lambda x : (x+720)%360
thithi_sphuta = lambda sun, moon : bha_sphuta(moon-sun)

# Define a class for the chart

from dataclasses import dataclass, field 


@dataclass
class Chart:
    lagna: float = 0.0  # Ascendant or rising sign
    chandra: float = 0.0  # Position of the Moon
    surya: float = 0.0  # Position of the Sun
    budha: float = 0.0  # Position of Mercury
    shukra: float = 0.0  # Position of Venus
    mangal: float = 0.0  # Position of Mars
    guru: float = 0.0  # Position of Jupiter
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

dX = lambda s,X : bha_sphuta(s*X)
d20 = lambda s : dX(s,20)
 
#my chart
jataka=Jataka()
jataka.chart.lagna = 137.05747588523033
jataka.ishta = 7.9583
print(jataka,d20(jataka.chart.lagna))

if __name__ == "__main__" :
    print("Direct Run")
