
import subprocess
import os
import math

# Configuration
SE_PATH = "/home/sanjay/github/others/swisseph"
EPHE_PATH = "/home/sanjay/.wine/drive_c/Program Files (x86)/Jagannatha Hora/jhcore/ephe"
START_DATE = "01.01.1971"
DAYS = 21900
PLANET = "6" # Saturn
SID_MODE = "1" # Lahiri

env = os.environ.copy()
env["SE_EPHE_PATH"] = EPHE_PATH

cmd = [
    f"{SE_PATH}/swetest",
    f"-p{PLANET}",
    f"-sid{SID_MODE}",
    "-b" + START_DATE,
    f"-n{DAYS}",
    "-s1",
    "-fTlz", # Date, Longitude, Zodiac Sign Name (optional, useful for debug)
    "-eswe",
    "-head" # suppress header? No, -head means WITH header. -nohead? default has header.
    # swetest -head means NO header? No. swetest documentation says:
    # -head  don't print header.
]

# swetest arguments check
# -head matches "don't print header" in some versions, or is it -nohead?
# Let's check help output again. 
# " -head      entries ... without header" (implied from typical usage or checking help text)
# In step 69 output: 
# "    swetest -p2 ... -head
#        same, but ... without header (-head)."
# So -head suppresses header.

cmd.append("-head")

print(f"Running command: {' '.join(cmd)}")

try:
    result = subprocess.run(cmd, env=env, capture_output=True, text=True, cwd=SE_PATH)
    if result.returncode != 0:
        print("Error running swetest:")
        print(result.stderr)
        exit(1)
    
    lines = result.stdout.splitlines()
    prev_sign = -1
    prev_time = ""
    
    signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
             "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

    print(f"{'Date':<12} {'New Sign':<15}")
    print("-" * 30)

    for line in lines:
        parts = line.split()
        if len(parts) < 2:
            continue
        
        try:
            date_str = parts[0]
            lon = float(parts[1])
            
            # sign index 0-11
            sign = int(lon / 30) % 12
            
            if prev_sign != -1 and sign != prev_sign:
                # Check for retrograde re-entry vs direct entry
                # simple check: if sign increases (mod 12), it's direct. If decreases, it's retro.
                # But simplify for now: just report change.
                
                # We can also detect if it's retro or direct based on prev_sign
                # (prev_sign + 1) % 12 == sign  => Direct
                # (sign + 1) % 12 == prev_sign  => Retrograde
                
                direction = "Direct"
                if (sign + 1) % 12 == prev_sign:
                    direction = "Retrograde"
                
                print(f"{date_str:<12} {signs[sign]:<12} ({direction})")
                
            prev_sign = sign
            prev_time = date_str
            
        except ValueError:
            continue
            
except Exception as e:
    print(f"Execution failed: {e}")
