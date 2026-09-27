import subprocess
import os
import sys
import datetime
import math

# Configuration
SE_PATH = "/home/sanjay/github/others/swisseph"
EPHE_PATH = "/home/sanjay/.wine/drive_c/Program Files (x86)/Jagannatha Hora/jhcore/ephe"
DEFAULT_START_DATE = datetime.date.today()
DEFAULT_DURATION = 365
SID_MODE = "1" # 1=Lahiri
#Get below time zone from system function
TIMEZONE_OFFSET = datetime.datetime.now().astimezone().utcoffset().total_seconds() / 3600.0


# Planet mapping
PLANETS = {
    "1": "Moon",
     "0": "Sun",
     "2": "Mercury",
     "3": "Venus",
     "4": "Mars",
    "5": "Jupiter",
    "6": "Saturn"
    ,"m": "Rahu"  # Mean Node
}
# Ketu is handled as opposite of Rahu

SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
         "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

def get_jd(date_str):
    """Get Julian Day for a given date string using swetest or math."""
    # We can use swetest to convert, or just rely on the input date string for initial call
    # python datetimes are easier to manage for User I/O.
    # swetest takes -bDD.MM.YYYY
    return date_str

def jd_to_gregorian(jd):
    """
    Convert Julian Day to Gregorian Date/Time string.
    Includes adjustment for Local Timezone.
    """
    # Adjust JD for Timezone
    jd = float(jd) + (TIMEZONE_OFFSET / 24.0) + 0.5 
    Z = int(jd)
    F = jd - Z
    if Z < 2299161:
        A = Z
    else:
        alpha = int((Z - 1867216.25) / 36524.25)
        A = Z + 1 + alpha - int(alpha / 4)
    B = A + 1524
    C = int((B - 122.1) / 365.25)
    D = int(365.25 * C)
    E = int((B - D) / 30.6001)
    day = B - D - int(30.6001 * E) + F
    if E < 14:
        month = E - 1
    else:
        month = E - 13
    if month > 2:
        year = C - 4716
    else:
        year = C - 4715
    
    # Extract time from day fraction
    d_int = int(day)
    d_frac = day - d_int
    
    total_seconds = d_frac * 86400
    hour = int(total_seconds // 3600)
    minute = int((total_seconds % 3600) // 60)
    second = int(total_seconds % 60)
    
    return f"{d_int:02d}.{month:02d}.{year} {hour:02d}:{minute:02d}:{second:02d}"

def run_swetest(args):
    """Run swetest with given arguments and return output lines."""
    env = os.environ.copy()
    env["SE_EPHE_PATH"] = EPHE_PATH
    
    cmd = [f"{SE_PATH}/swetest"] + args + [f"-sid{SID_MODE}", "-head"] # -head supresses header
    
    try:
        result = subprocess.run(cmd, env=env, capture_output=True, text=True, cwd=SE_PATH)
        if result.returncode != 0:
            # print(f"Error running swetest: {result.stderr}", file=sys.stderr)
            return []
        return result.stdout.splitlines()
    except Exception as e:
        print(f"Execution failed: {e}", file=sys.stderr)
        return []

def parse_line(line):
    """Parse a swetest output line with format -fJls (JD, Long, Speed)."""
    parts = line.split()
    if len(parts) < 3:
        return None
    try:
        jd = float(parts[0])
        lon = float(parts[1])
        speed = float(parts[2])
        return {"jd": jd, "lon": lon, "speed": speed}
    except ValueError:
        return None

def get_sign(lon):
    return int(lon / 30) % 12

def format_position(lon):
    """Format longitude as DD° MM' SS" Sign"""
    sign_idx = int(lon / 30) % 12
    deg_rem = lon % 30
    d = int(deg_rem)
    m = int((deg_rem - d) * 60)
    s = int(((deg_rem - d) * 60 - m) * 60)
    return f"{d:02d}° {m:02d}' {s:02d}\" {SIGNS[sign_idx]}"

def get_status_at_jd(planet_id, jd):
    """Get precise status (lon, speed) at a specific JD."""
    # Use -n1 and precise time
    args = [
        f"-p{planet_id}",
        f"-bj{jd}",
        "-n1",
        "-fJls",
        "-eswe"
    ]
    lines = run_swetest(args) # Adds -sid and -head
    if lines:
        return parse_line(lines[0])
    return None

def scan_period(planet_id, start_date_str, duration_days, step_days=1.0):
    """
    Run swetest for a period and return list of parsed data points.
    Using -fJls for precise JD, Longitude, Speed.
    """
    # -b format: DD.MM.YYYY
    # If start_date_str starts with 'j', it's JD.
    args = [
        f"-p{planet_id}",
        f"-b{start_date_str}",
        f"-n{int(duration_days / step_days) + 1}", # Ensure coverage
        f"-s{step_days}",
        "-fJls", # JD, Long, Speed
        "-eswe" # Ephemeris Swiss
    ]
    
    lines = run_swetest(args)
    data = []
    for line in lines:
        parsed = parse_line(line)
        if parsed:
            data.append(parsed)
    return data

def refine_event(planet_id, start_jd, end_jd, check_func, precision_mode='minute'):
    """
    Iteratively refine the event time.
    check_func(data1, data2) returns True if event occurred between them.
    """
    # 1. Hour scan
    # Interval is 1 day (approx). We want 24 hours.
    # swetest -bj... -n25 -s... 
    # step = 1/24 (approx 0.04166667)
    step_hour = 1.0 / 24.0
    
    # Run swetest for the day
    # We add ample buffer or exact range? swetest -n counts steps.
    # We need to cover start_jd to end_jd.
    # Number of steps = (end_jd - start_jd) / step_hour
    # Just do 25 steps to be safe covering the period
    args_hour = [
        f"-p{planet_id}",
        f"-bj{start_jd}",
        f"-n{int((end_jd - start_jd)/step_hour) + 2}",
        f"-s{step_hour}",
        "-fJls",
        "-eswe"
    ]
    lines = run_swetest(args_hour)
    data = [parse_line(l) for l in lines if parse_line(l)]
    
    found_interval = None
    for i in range(len(data) - 1):
        if check_func(data[i], data[i+1]):
            found_interval = (data[i], data[i+1])
            break
            
    if not found_interval:
        return None # Should not happen if coarse check was correct
        
    if precision_mode == 'hour':
        return found_interval[1]['jd'] # Return the time of the event (approx)

    # 2. Minute scan
    # limit search to the identified hour
    jd1, jd2 = found_interval[0]['jd'], found_interval[1]['jd']
    step_min = 1.0 / 1440.0 # 1 minute
    
    args_min = [
        f"-p{planet_id}",
        f"-bj{jd1}",
        f"-n{int((jd2 - jd1)/step_min) + 2}",
        f"-s{step_min}",
        "-fJls",
        "-eswe"
    ]
    lines = run_swetest(args_min)
    data_min = [parse_line(l) for l in lines if parse_line(l)]
    
    for i in range(len(data_min) - 1):
        if check_func(data_min[i], data_min[i+1]):
            # Event happened between i and i+1. Return i+1 time (or interpolate)
            return data_min[i+1]['jd']
            
    return jd2 # Fallback

def get_events(start_date_input, duration):
    all_events = []
    
    # Initial scan args
    # use step 1 day
    # But for accurate detection, we just run day by day
    
    formatted_start_date = start_date_input.strftime("%d.%m.%Y")
    
    print(f"Scanning for planetary events starting {formatted_start_date} for {duration} days...")
    
    for pid, pname in PLANETS.items():
        # Skip Moon (1) if not in list (it is not in PLANETS dict)
        
        # Coarse scan
        data = scan_period(pid, formatted_start_date, duration, step_days=1)
        
        for i in range(len(data) - 1):
            curr = data[i]
            next_pt = data[i+1]
            
            # 1. Ingress Check
            sign_curr = get_sign(curr['lon'])
            sign_next = get_sign(next_pt['lon'])
            
            if sign_curr != sign_next:
                # Ingress detected
                def check_ingress(d1, d2):
                    return get_sign(d1['lon']) != get_sign(d2['lon'])
                
                event_jd = refine_event(pid, curr['jd'], next_pt['jd'], check_ingress)
                if event_jd:
                    # Determine which sign we entered?
                    # The event time is when we are IN the new sign (or very close).
                    # Let's get the exact sign at event_jd
                    # Or just use sign_next for simplicity if it's a forward crossing
                    # But retrograde ingress is possible.
                    # We can infer from sign_curr -> sign_next
                    new_sign_id = sign_next
                    event_desc = f"Ingress into {SIGNS[new_sign_id]}"
                    
                    # Check for Retrograde Ingress
                    # Use precise status to check speed at event time
                    status = get_status_at_jd(pid, event_jd)
                    pos_str = format_position(status['lon']) if status else ""
                    
                    if status and status['speed'] < 0 and pid not in ["m"]: # Rahu is always retro (mostly)
                         event_desc = f"Retrograde Ingress into {SIGNS[new_sign_id]}"
                    
                    # Rahu Ingress is always "Retrograde" technically but distinct from "Retro/Direct" stations.
                    # Usually we just say "Ingress" for nodes, but user asked "if a graha goes in retroggrade...".
                    # Let's apply it generally if speed < 0. 
                    # For Rahu/Ketu (Mean), speed is always negative. 
                    # Maybe exclude Nodes from "Retrograde Ingress" label to avoid redundancy?
                    # Or include it. Let's include it if speed < 0, but usually nodes are treated simply as ingress.
                    # User said "graha". 
                    # If I apply to all, Rahu will always say "Retrograde Ingress".
                    # Let's apply to all except nodes if standard convention, or just apply it.
                    # Let's stick to planets. Nodes are always retrograde. 
                    # I will exclude 'm' (Rahu) from the "Retrograde Ingress" label to keep it clean, unless user insists.
                    
                    all_events.append({
                        "jd": event_jd,
                        "date_str": jd_to_gregorian(event_jd),
                        "planet": pname,
                        "type": "Ingress",
                        "details": event_desc,
                        "position": pos_str
                    })
                    
                    # Special Case: Rahu (m) -> Ketu Ingress
                    if pid == "m":
                        ketu_sign_id = (new_sign_id + 6) % 12
                        # Ketu position is Rahu + 180
                        if status:
                            ketu_lon = (status['lon'] + 180) % 360
                            ketu_pos = format_position(ketu_lon)
                        else:
                            ketu_pos = ""
                            
                        all_events.append({
                            "jd": event_jd,
                            "date_str": jd_to_gregorian(event_jd),
                            "planet": "Ketu", # Separate event
                            "type": "Ingress",
                            "details": f"Ingress into {SIGNS[ketu_sign_id]}",
                            "position": ketu_pos
                        })

            # 2. Retrograde/Direct Check
            # Only for non-Sun/Moon/Node (depending on node mode)
            # Sun (0) always direct. Speed > 0.
            # Rahu (m) always retro (Mean). Speed < 0.
            if pid not in ["0", "m"]:
                speed_curr = curr['speed']
                speed_next = next_pt['speed']
                
                # Check for zero crossing
                if (speed_curr >= 0 and speed_next < 0): # Turn Retro
                    def check_retro(d1, d2):
                        return (d1['speed'] >= 0 and d2['speed'] < 0)
                    
                    event_jd = refine_event(pid, curr['jd'], next_pt['jd'], check_retro)
                    if event_jd:
                        # Get precise status at event
                        status = get_status_at_jd(pid, event_jd)
                        pos_str = format_position(status['lon']) if status else ""
                        
                        all_events.append({
                            "jd": event_jd,
                            "date_str": jd_to_gregorian(event_jd),
                            "planet": pname,
                            "type": "Retrogression",
                            "details": "Starts Retrograde",
                            "position": pos_str
                        })
                        
                elif (speed_curr < 0 and speed_next >= 0): # Turn Direct
                    def check_direct(d1, d2):
                        return (d1['speed'] < 0 and d2['speed'] >= 0)
                    
                    event_jd = refine_event(pid, curr['jd'], next_pt['jd'], check_direct)
                    if event_jd:
                        # Get precise status at event
                        status = get_status_at_jd(pid, event_jd)
                        pos_str = format_position(status['lon']) if status else ""
                        
                        all_events.append({
                            "jd": event_jd,
                            "date_str": jd_to_gregorian(event_jd),
                            "planet": pname,
                            "type": "Retrogression",
                            "details": "Ends Retrograde (Direct)",
                            "position": pos_str
                        })

    return sorted(all_events, key=lambda x: x['jd'])

def main():
    # User Input
    print("Planetary Ingress and Retrogression Calculator")
    
    start_input = input(f"Enter Start Date (DD.MM.YYYY) [Default: {DEFAULT_START_DATE.strftime('%d.%m.%Y')}]: ").strip()
    if not start_input:
        start_date = DEFAULT_START_DATE
    else:
        try:
            day, month, year = map(int, start_input.split('.'))
            start_date = datetime.date(year, month, day)
        except ValueError:
            print("Invalid date format. Using default.")
            start_date = DEFAULT_START_DATE
            
    try:
        days_input = input(f"Enter number of days to search [Default: {DEFAULT_DURATION}]: ").strip()
        if not days_input:
            duration = DEFAULT_DURATION
        else:
            duration = int(days_input)
    except ValueError:
        print("Invalid number. Using default.")
        duration = DEFAULT_DURATION
        
    if duration < 0:
        # Backward search: Shift start_date back by 'duration' days
        # and make duration positive.
        duration = abs(duration)
        start_date = start_date - datetime.timedelta(days=duration)
        print(f"Negative duration detected. Shifted start date to {start_date.strftime('%d.%m.%Y')}.")
        
    events = get_events(start_date, duration)
    
    print("\n" + "="*80)
    print("\n" + "="*110)
    print(f"{'Date Time':<20} | {'Planet':<10} | {'Details':<30} | {'Position':<25} | {'Event':<15} ")
    print("="*110)
    
    for e in events:
        print(f"{e['date_str']:<20} | {e['planet']:<10} | {e['details']:<30} | {e.get('position', ''):<25} | {e['type']:<15} ")
    print("="*110)

if __name__ == "__main__":
    main()
