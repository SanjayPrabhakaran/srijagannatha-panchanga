"""
Navnayaka Ingress Calculator - 2026 (UTC)
Computes solar sign ingresses, solar nakshatra ingresses,
and Chaitra Shukla Pratipada using Swiss Ephemeris (Lahiri ayanamsa).
"""

import swisseph as swe
import csv
from datetime import datetime, timezone
import os

YEAR = 2026
OUTPUT_CSV = f"outputs/navnayaka_{YEAR}_utc.csv"

LAT = 28.6139  # Delhi latitude
LON = 77.2090  # Delhi longitude



weekday_lords = {
    "Monday": "Moon",
    "Tuesday": "Mars",
    "Wednesday": "Mercury",
    "Thursday": "Jupiter",
    "Friday": "Venus",
    "Saturday": "Saturn",
    "Sunday": "Sun"
}

def get_graha_lord(jd, weekday_str):
    # Get the date from JD
    utc_tuple = swe.jdut1_to_utc(jd)
    year, month, day = utc_tuple[0], utc_tuple[1], utc_tuple[2]
    # JD at 00:00 UTC of that day
    jd_midnight = swe.julday(year, month, day, 0.0)
    rise_info = swe.rise_trans(jd_midnight, swe.SUN, swe.CALC_RISE | swe.BIT_DISC_CENTER, (LON, LAT, 0))
    if rise_info[0] == 0:
        sunrise_jd = rise_info[1][0]
        if jd > sunrise_jd:
            return weekday_lords[weekday_str]
        else:
            # Previous day
            prev_year, prev_month, prev_day = year, month, day - 1
            if prev_day == 0:
                prev_month -= 1
                if prev_month == 0:
                    prev_year -= 1
                    prev_month = 12
                prev_day = [31, 29 if (prev_year % 4 == 0 and (prev_year % 100 != 0 or prev_year % 400 == 0)) else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][prev_month - 1]
            prev_dt = datetime(prev_year, prev_month, prev_day)
            prev_weekday = DAYS[prev_dt.weekday()]
            return weekday_lords[prev_weekday]
    else:
        # If no sunrise, assume after
        return weekday_lords[weekday_str]

# --- Swiss Ephemeris setup ---
swe.set_sid_mode(swe.SIDM_LAHIRI)

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def sidereal_sun(jd):
    res, _ = swe.calc_ut(jd, swe.SUN, swe.FLG_SIDEREAL | swe.FLG_SPEED)
    return res[0]

def sidereal_moon(jd):
    res, _ = swe.calc_ut(jd, swe.MOON, swe.FLG_SIDEREAL | swe.FLG_SPEED)
    return res[0]

def signed_dist(lon, target):
    """Signed angular distance: lon - target, wrapped to (-180, 180]."""
    d = (lon - target) % 360
    if d > 180:
        d -= 360
    return d

def find_solar_ingress(target_lon, start_jd, end_jd):
    """Binary-search for exact JD when Sun crosses target sidereal longitude."""
    step = 5.0
    jd = start_jd
    prev_d = signed_dist(sidereal_sun(jd), target_lon)
    while jd < end_jd:
        jd += step
        curr_d = signed_dist(sidereal_sun(jd), target_lon)
        if prev_d < 0 <= curr_d:
            lo, hi = jd - step, jd
            for _ in range(64):
                mid = (lo + hi) / 2
                if signed_dist(sidereal_sun(mid), target_lon) < 0:
                    lo = mid
                else:
                    hi = mid
            return (lo + hi) / 2
        prev_d = curr_d
    return None

def find_new_moon_after(start_jd):
    """Find first new moon (Moon-Sun elongation crosses 0° → 360°) after start_jd."""
    def elongation(jd):
        return (sidereal_moon(jd) - sidereal_sun(jd)) % 360

    step = 0.5
    jd = start_jd
    prev_e = elongation(jd)
    while jd < start_jd + 32:
        jd += step
        curr_e = elongation(jd)
        # crossing: went from near 360 back through 0
        if prev_e > 300 and curr_e < 60:
            lo, hi = jd - step, jd
            for _ in range(64):
                mid = (lo + hi) / 2
                e = elongation(mid)
                if e > 180:
                    lo = mid
                else:
                    hi = mid
            return (lo + hi) / 2
        prev_e = curr_e
    return None

def jd_to_utc(jd):
    unix = (jd - 2440587.5) * 86400.0
    return datetime.fromtimestamp(unix, tz=timezone.utc)

DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

def weekday(dt):
    return DAYS[dt.weekday()]

# ---------------------------------------------------------------------------
# Nakshatra boundaries (sidereal, Lahiri)
# Each nakshatra = 13°20' = 13.3333...°
# Nakshatra N starts at (N-1) * 13.3333°
# ---------------------------------------------------------------------------
NAK_SIZE = 360 / 27  # 13.333...

NAK_START = {name: i * NAK_SIZE for i, name in enumerate([
    "Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra",
    "Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni",
    "Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha",
    "Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha",
    "Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"
])}

# ---------------------------------------------------------------------------
# Navnayaka event definitions (from table)
# (position, title, type, target, sector, sign_num)
# ---------------------------------------------------------------------------

JD_START = swe.julday(YEAR, 1, 1, 0.0)
JD_END   = swe.julday(YEAR + 1, 1, 1, 0.0)

SOLAR_SIGN_EVENTS = [
    ("Prime Minister",  "Pradhana Mantri",    "Aries",       0.0,   "Legislative agenda and executive power.",           1),
    ("Secretary",       "Sachiva-adhipathi",  "Taurus",     30.0,   "Bureaucracy and administrative implementation.",    2),
    ("Price Lord",      "Arghadhipathi",      "Gemini",     60.0,   "Inflation, stock markets, and commerce.",           3),
    ("Crop Lord",       "Sasyadhipathi",      "Cancer",     90.0,   "Kharif crops (Paddy, sugarcane, etc.).",            4),
    ("Commander",       "Senadhipathi",       "Leo",       120.0,   "Defense, policing, and military strength.",         5),
    ("Liquid Lord",     "Rasadhipathi",       "Libra",     180.0,   "Oils, milk, medicines, and liquid chemicals.",      7),
    ("Grain Lord",      "Dhanyadhipathi",     "Sagittarius",240.0,  "Rabi crops (Wheat, pulses, and storage).",          9),
    ("Mineral Lord",    "Nirasadhipathi",     "Capricorn", 270.0,   "Metals, gems, gold, and mining.",                  10),
]

SOLAR_NAK_EVENTS = [
    ("Cloud Lord",    "Meghadhipathi",     "Ardra",    NAK_START["Ardra"],    "Rainfall, floods, and meteorological events.",      3),
    ("Forest Lord",   "Vanaspati-adhipathi","Ashlesha", NAK_START["Ashlesha"],"Medicinal plants, forests, and fruit trees.",        4),
    ("Livestock Lord","Pasupala-adhipathi", "Rohini",   NAK_START["Rohini"],  "Health of cattle, pets, and animal welfare.",        2),
]

# ---------------------------------------------------------------------------
# Compute all events
# ---------------------------------------------------------------------------

results = []

print("Computing solar sign ingresses...")
for position, title, sign, lon, sector, sign_num in SOLAR_SIGN_EVENTS:
    jd = find_solar_ingress(lon, JD_START, JD_END)
    if jd:
        dt = jd_to_utc(jd)
        results.append({
            "Position":        f"{position} ({title})",
            "Reckoning Event": f"Sun enters {sign}",
            "Type":            "Solar Sign Ingress",
            "Date_UTC":        dt.strftime("%Y-%m-%d"),
            "Time_UTC":        dt.strftime("%H:%M:%S"),
            "Weekday_UTC":     weekday(dt),
            "Sector":          sector,
            "Sign_Num":        sign_num,
            "JD":              round(jd, 6),
            "Graha Lord":      get_graha_lord(jd, weekday(dt)),
        })
        print(f"  ✓ Sun → {sign:12s} | {dt.strftime('%Y-%m-%d %H:%M')} UTC | {weekday(dt)}")

print("\nComputing solar nakshatra ingresses...")
for position, title, nak, lon, sector, sign_num in SOLAR_NAK_EVENTS:
    jd = find_solar_ingress(lon, JD_START, JD_END)
    if jd:
        dt = jd_to_utc(jd)
        results.append({
            "Position":        f"{position} ({title})",
            "Reckoning Event": f"Sun enters {nak} Nakshatra",
            "Type":            "Solar Nakshatra Ingress",
            "Date_UTC":        dt.strftime("%Y-%m-%d"),
            "Time_UTC":        dt.strftime("%H:%M:%S"),
            "Weekday_UTC":     weekday(dt),
            "Sector":          sector,
            "Sign_Num":        sign_num,
            "JD":              round(jd, 6),
            "Graha Lord":      get_graha_lord(jd, weekday(dt)),
        })
        print(f"  ✓ Sun → {nak:12s} Nak | {dt.strftime('%Y-%m-%d %H:%M')} UTC | {weekday(dt)}")

print("\nComputing Chaitra Shukla Pratipada (new moon in Pisces)...")
# Chaitra begins with the new moon while Sun is in sidereal Pisces (330°–360°)
# Find Sun enters Pisces first
jd_pisces = find_solar_ingress(330.0, JD_START, JD_END)
dt_pisces = jd_to_utc(jd_pisces)
print(f"  Sun enters Pisces: {dt_pisces.strftime('%Y-%m-%d %H:%M')} UTC")

jd_pratipada = find_new_moon_after(jd_pisces)
dt_pratipada = jd_to_utc(jd_pratipada)

# Verify Sun is in Pisces at that new moon
sun_lon_at_nm = sidereal_sun(jd_pratipada)
print(f"  New moon after Pisces ingress: {dt_pratipada.strftime('%Y-%m-%d %H:%M')} UTC")
print(f"  Sun sidereal lon at new moon: {sun_lon_at_nm:.2f}° "
      f"({'Pisces' if 330 <= sun_lon_at_nm < 360 else 'Aries' if sun_lon_at_nm < 30 else 'other'})")

results.append({
    "Position":        "King (Raja)",
    "Reckoning Event": "Chaitra Shukla Pratipada",
    "Type":            "Lunar New Year",
    "Date_UTC":        dt_pratipada.strftime("%Y-%m-%d"),
    "Time_UTC":        dt_pratipada.strftime("%H:%M:%S"),
    "Weekday_UTC":     weekday(dt_pratipada),
    "Sector":          "Overall stability and world leadership.",
    "Sign_Num":        0,
    "JD":              round(jd_pratipada, 6),
    "Graha Lord":      get_graha_lord(jd_pratipada, weekday(dt_pratipada)),
})

# ---------------------------------------------------------------------------
# Sort chronologically and print summary table
# ---------------------------------------------------------------------------

results.sort(key=lambda r: r["JD"])

print(f"\n{'='*100}")
print(f"  NAVNAYAKA TABLE FOR {YEAR} — ALL TIMES UTC")
print(f"{'='*100}")
print(f"{'Weekday':<12} {'Date':<12} {'Time':<10} {'Reckoning Event':<42} {'Position':<35} {'Sign#'}")
print(f"{'-'*120}")
print(f"{'Weekday':<12} {'Date':<12} {'Time':<10} {'Reckoning Event':<42} {'Position':<35} {'Sign#':<6} {'Graha Lord'}")
print(f"{'-'*120}")
for r in results:
    print(f"{r['Weekday_UTC']:<12} {r['Date_UTC']:<12} {r['Time_UTC']:<10} "
          f"{r['Reckoning Event']:<42} {r['Position']:<35} {r['Sign_Num']:<6} {r['Graha Lord']}")

# ---------------------------------------------------------------------------
# CSV export
# ---------------------------------------------------------------------------

fieldnames = ["Sign_Num","Position","Reckoning Event","Type","Date_UTC","Time_UTC","Weekday_UTC","Sector","JD","Graha Lord"]
os.makedirs(os.path.dirname(OUTPUT_CSV), exist_ok=True)
with open(OUTPUT_CSV, "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
    writer.writeheader()
    writer.writerows(results)

print(f"\n✅ CSV exported → {OUTPUT_CSV}")
swe.close()
