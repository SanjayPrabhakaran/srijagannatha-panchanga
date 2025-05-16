# Python
import swisseph as swe
from datetime import datetime, timedelta
import retro
import sys

RED = '\033[31m'
GREEN = '\033[32m'
YELLOW = '\033[33m'
BLUE = '\033[34m'
MAGENTA = '\033[35m'
CYAN = '\033[36m'
WHITE = '\033[37m'
RESET = '\033[0m'

def compare_date_with_today(dt):
    """
    Compare a given date with today's date and return the difference in days.

    Parameters:
        dt (datetime): The date to compare with today's date.

    Returns:
        str: A message indicating whether the date is before, after, or the same as today.
    """
    now = datetime.now()  # Get the current date and time
    difference_in_seconds = (dt - now).total_seconds()  # Calculate the difference in seconds
    difference_in_days = difference_in_seconds / (24 * 60 * 60)  # Convert seconds to days (including decimals)

    if difference_in_days == 0:
        return "The given date is today."
    elif difference_in_days > 0:
        return f" {difference_in_days:.2f} days after."
    else:
        return f" {difference_in_days:.2f} days before"

def get_rashi_and_nakshatra(longitude,all=9):
    # Define rashi names
    rashi_names = [
        "Meshaमे (Aries)", "Vrishabhaवृष (Taurus)", "Mithunaमि (Gemini)", "Karkaक (Cancer)",
        "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrischika (Scorpio)",
        "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"
    ]
   # ॊ 1 2 3 4 5 6 7 8 9 0 - ृ 
   # ऒ ऍ ॅ ्र र् ज्ञ त्र क्ष श्र ( ) ः ऋ 
   
   #ौ ै ा ी ू बहगदजड ़ ॉ
   #औ ऐ आ ई ऊ भङघधझढञऑ
   
   #2 ो े ् ि ु परकतचट
   #ओएअइउफऱखथछठ
   
   #3 ॆ ं म न व ल स , . य
   #ऎ ँ ण ऩ ऴ ळ श ष । य़
   #

    rashi = [ "मे","वृ" ,"मि क सिं क"
    ]

    # Define nakshatra names
    nakshatra_names = [
        "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
        "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
        "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
        "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
        "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
    ]

    # Convert longitude to degrees, minutes, and seconds
    degrees = int(longitude)
    minutes = int((longitude - degrees) * 60)
    seconds = int(((longitude - degrees) * 60 - minutes) * 60)

    # Determine the rashi (zodiac sign)
    rashi_index = int(longitude // 30)  # Each rashi is 30 degrees long
    rashi_name = rashi_names[rashi_index]

    # Determine the nakshatra (lunar mansion)
    nakshatra_index = int(longitude // (360 / 27))  # There are 27 nakshatras in 360 degrees
    nakshatra_name = nakshatra_names[nakshatra_index]

    # Determine nakshatra pada (quarter)
    nakshatra_pada = int((longitude % (360 / 27)) // (360 / 108)) + 1  # 108 padas in 360 degrees

    r=f"{degrees}° {minutes}'" #+ {seconds}'' "
    if(all==9):
        r+= f"\t {rashi_name} "+f"\t {nakshatra_name} (Pada {nakshatra_pada}) "

    # Print the results
    return r


# Function to calculate ecliptic longitude with Chitra Paksha Ayanamsha
def ecliptic_longitude(body, julian_day):
    position, _ = swe.calc_ut(julian_day, body, swe.FLG_SIDEREAL)
    longitude = position[0]  # Sidereal longitude
    return longitude % 360  # Normalize to 0-360 degrees

def graha_longitude(body,dt):
    year, month, day, hour = dt.year, dt.month, dt.day, dt.hour + dt.minute / 60
    hour -= timezone  # Adjust for timezone offset
    jd = swe.julday(year, month, day, hour)
    return ecliptic_longitude(body,jd)
    
# Function to determine the sign of a given longitude
def get_sign(longitude):
    signs = [
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ]
    return signs[int(longitude // 30)]

# Function to calculate Lagna (Ascendant)
def calculate_lagna():
    cusps, ascmc = swe.houses(jd, glatitude, glongitude, b'N')  # 'N' for Northern Hemisphere
    #print("calc lagna",jd,glatitude,glongitude)
    lagna = ascmc[0]  # Ascendant is the first value in ascmc
    return lagna % 360  # Normalize to 0-360 degrees

# Function to calculate when a planet enters and exits a sign
def planet_sign_transitions(body):
    current_jd = jd
    current_longitude = ecliptic_longitude(body, current_jd)
    current_sign = get_sign(current_longitude)
    
    # Find the entry date into the current sign
    while True:
        current_jd -= 0.1  # Step backward in time
        longitude = ecliptic_longitude(body, current_jd)
        sign = get_sign(longitude)
        if sign != current_sign:
            entry_date = swe.revjul(current_jd + 0.1)
            entry_longitude = longitude
            break
    
    # Reset to original Julian Day
    current_jd = jd
    
    # Find the exit date from the current sign
    while True:
        current_jd += 0.1  # Step forward in time
        longitude = ecliptic_longitude(body, current_jd)
        sign = get_sign(longitude)
        if sign != current_sign:
            exit_date = swe.revjul(current_jd - 0.1)
            exit_longitude = longitude
            break
    
    entry_datetime = datetime(*entry_date[:3]) + timedelta(hours=(entry_date[3] or 0))
    exit_datetime = datetime(*exit_date[:3]) + timedelta(hours=(exit_date[3] or 0))
    
    return entry_datetime, exit_datetime,entry_longitude,exit_longitude


# Define the planets, their identifiers, and names
planets = [
    ("Lagna", "Lagna  "),  # Lagna is treated separately
    (swe.SUN, "Surya   "),
    (swe.MOON, "Soma  "),
    (swe.MARS, "Mangal  "),
    (swe.MERCURY, "Budha   "),
    (swe.JUPITER, "Guru    "),
    (swe.VENUS, "Shukra"),
    (swe.SATURN, "Shani   "),
    (swe.MEAN_NODE, "Rahu  ")
]

# Example usage
#longitude = 125.5  # Example longitude in degrees
#get_rashi_and_nakshatra(longitude)

graha=["Surya","Chandra","Mangal","Budha","Guru","Shukra","Shani","Rahu","Ketu"]
# Define location and timezone

glatitude = 13.084300 if len(sys.argv)<=1 else sys.argv[1]
glongitude = 80.270500 if len(sys.argv)<=2  else sys.argv[2]
timezone = 5.5 if len(sys.argv)<=3 else sys.argv[3]  # UTC+5:30

# Get the current date and time
now = datetime.now()
year, month, day, hour = now.year, now.month, now.day, now.hour + now.minute / 60
hour -= timezone  # Adjust for timezone offset

# Get the Julian Day
jd = swe.julday(year, month, day, hour)

# Set Chitra Paksha Ayanamsha
#swe.set_sid_mode(swe.SIDM_LAHIRI)#"SIDM_LAHIRI)  # Chitra Paksha Ayanamsha (Lahiri)
#print("swe.SIDM_LAHIRI",swe.get_ayanamsa_ut(jd))
swe.set_sid_mode(swe.SIDM_TRUE_CITRA)#"SIDM_LAHIRI)  # Chitra Paksha Ayanamsha (Lahiri)
print (f"usage: {sys.argv[0]} lat, longitude, timezone \n Defaults: >>",glatitude,glongitude,timezone,sys.argv)
print("Ayanamsha used swe.SIDM_TRUE_CITRA",swe.get_ayanamsa_ut(jd))

# Calculate and store the longitudes in an array
longitudes = []
for planet, name in planets:
    if planet == "Lagna":  # Special case for Lagna
        longitude = (calculate_lagna()-swe.get_ayanamsa_ut(jd))# calculate_lagna() - swe.get_ayanamsa_ut(jd)
    else:
        longitude = ecliptic_longitude(planet, jd)
    longitudes.append((name, longitude))

# Print the adjusted longitudes
print(f"\nPosition at {now}")
for name, longitude in longitudes:
    print("",name,":",get_rashi_and_nakshatra(longitude))


print("\nRashi Transition")
i=0
for body in (swe.SUN,swe.MOON,swe.MARS,swe.MERCURY,swe.JUPITER,swe.VENUS,swe.SATURN,swe.MEAN_NODE):
    p=planet_sign_transitions(body)
    #print(type(p))
    #dt.strftime('%Y-%m-%d %H:%M:%S'),#
    print(graha[i], tuple((compare_date_with_today(dt), get_rashi_and_nakshatra(lon,1)) for dt,lon in zip(p[:2],p[2:4])))
    #print(graha[i], tuple(get_rashi_and_nakshatra(dt,1) for dt in )
    i+=1


start_date = now#datetime.date.today()
days_to_check = 365
planets = {
    "Mars": swe.MARS,
    "Venus": swe.VENUS,
    "Mercury": swe.MERCURY,
    "Jupiter": swe.JUPITER,
    "Saturn": swe.SATURN,
}
# Get retrogression and forward periods
retrogression_forward_periods = retro.find_retrogression_and_forward_periods(start_date, days_to_check)

# Print results
for planet, data in retrogression_forward_periods.items():
    print(f"\n{planet}:")
    print("Retrogression Periods:")
    printed=0
    for period in data["Retrogression Periods"]:
        start = period[0].strftime("%Y-%m-%d")
        end = period[1].strftime("%Y-%m-%d") if period[1] else "Ongoing"
        print(f"  Start: {start}, End: {end} {graha_longitude(planets[planet],period[0]):.2f} {graha_longitude(planets[planet],period[1]):.2f}")
        printed=1
    if(not printed):
        print("  None for a year")
    printed=0
    print("Forward Periods:")
    for period in data["Forward Periods"]:
        start = period[0].strftime("%Y-%m-%d")
        end = period[1].strftime("%Y-%m-%d") if period[1] else "Ongoing"
        print(f"  Start: {start}, End: {end} {graha_longitude(planets[planet],period[0]):.2f} {graha_longitude(planets[planet],period[1]):.2f}")
        printed=1
    if(not printed):
        print("  None for a year")
