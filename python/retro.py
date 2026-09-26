import swisseph as swe
import datetime

swe.set_sid_mode(swe.SIDM_LAHIRI)


def format_sidereal_degree(longitude):
    longitude = longitude % 360
    degrees = int(longitude)
    minutes = int((longitude - degrees) * 60)
    seconds = int(round((((longitude - degrees) * 60) - minutes) * 60))

    if seconds == 60:
        seconds = 0
        minutes += 1
    if minutes == 60:
        minutes = 0
        degrees += 1

    return f"{degrees:03.0f}° {minutes:02d}' {seconds:02d}\""


def sidereal_degree_on_date(date_value, planet_id):
    jd = swe.julday(date_value.year, date_value.month, date_value.day)
    position, _ = swe.calc_ut(jd, planet_id, swe.FLG_SIDEREAL)
    return position[0]


def merge_continuous_periods(periods):
    merged_periods = []
    for period in periods:
        if not merged_periods:
            merged_periods.append(period)
        else:
            last_period = merged_periods[-1]
            # Check if the current period starts the day after the last period ends
            if last_period[1] + datetime.timedelta(days=1) == period[0]:
                # Extend the last period's end date
                merged_periods[-1][1] = period[1]
            else:
                # Add a new period
                merged_periods.append(period)
    return merged_periods


def find_retrogression_and_forward_periods(start_date, days_to_check):
    # List of planets to check
    planets = {
        "Mars": swe.MARS,
        "Venus": swe.VENUS,
        "Mercury": swe.MERCURY,
        "Jupiter": swe.JUPITER,
        "Saturn": swe.SATURN,
    }

    # Initialize results dictionary
    results = {planet: {"Retrogression Periods": [], "Forward Periods": []} for planet in planets}

    # Iterate through each day in the range
    for day_offset in range(days_to_check):
        current_date = start_date + datetime.timedelta(days=day_offset)
        jd = swe.julday(current_date.year, current_date.month, current_date.day)

        for planet_name, planet_id in planets.items():
            # Get planetary data with speed information
            planet_data, _ = swe.calc(jd, planet_id, swe.FLG_SPEED)  # Use swe.FLG_SPEED to include speed in output
            speed = planet_data[3]  # Extract speed (apparent motion) from the first tuple

            # Retrograde motion occurs when speed is negative
            if speed < 0:
                if not results[planet_name]["Retrogression Periods"] or results[planet_name]["Retrogression Periods"][-1][1] is not None:
                    # Start a new retrogression period
                    results[planet_name]["Retrogression Periods"].append([current_date, None])
            else:
                if results[planet_name]["Retrogression Periods"] and results[planet_name]["Retrogression Periods"][-1][1] is None:
                    # End the current retrogression period
                    results[planet_name]["Retrogression Periods"][-1][1] = current_date

                if not results[planet_name]["Forward Periods"] or results[planet_name]["Forward Periods"][-1][1] is not None:
                    # Start a new forward period
                    results[planet_name]["Forward Periods"].append([current_date, None])
                elif results[planet_name]["Forward Periods"] and results[planet_name]["Forward Periods"][-1][1] is None:
                    # End the current forward period
                    results[planet_name]["Forward Periods"][-1][1] = current_date

    # Close any open periods at the end of the range
    for planet_name in planets:
        if results[planet_name]["Retrogression Periods"] and results[planet_name]["Retrogression Periods"][-1][1] is None:
            results[planet_name]["Retrogression Periods"][-1][1] = start_date + datetime.timedelta(days=days_to_check - 1)
        if results[planet_name]["Forward Periods"] and results[planet_name]["Forward Periods"][-1][1] is None:
            results[planet_name]["Forward Periods"][-1][1] = start_date + datetime.timedelta(days=days_to_check - 1)

    # Merge continuous periods for retrogression and forward motion
    for planet_name in planets:
        results[planet_name]["Retrogression Periods"] = merge_continuous_periods(results[planet_name]["Retrogression Periods"])
        results[planet_name]["Forward Periods"] = merge_continuous_periods(results[planet_name]["Forward Periods"])

    return results


# Main function
if __name__ == "__main__":
    # Start date and range
    start_date = datetime.date.today()
    days_to_check = 365
    planet_ids = {
        "Mars": swe.MARS,
        "Venus": swe.VENUS,
        "Mercury": swe.MERCURY,
        "Jupiter": swe.JUPITER,
        "Saturn": swe.SATURN,
    }

    # Get retrogression and forward periods
    retrogression_forward_periods = find_retrogression_and_forward_periods(start_date, days_to_check)

    # Print results
    for planet, data in retrogression_forward_periods.items():
        print(f"\n{planet}:")
        print("Retrogression Periods:")
        for period in data["Retrogression Periods"]:
            start = period[0].strftime("%Y-%m-%d")
            end = period[1].strftime("%Y-%m-%d") if period[1] else "Ongoing"
            start_deg = format_sidereal_degree(sidereal_degree_on_date(period[0], planet_ids[planet]))
            end_deg = format_sidereal_degree(sidereal_degree_on_date(period[1], planet_ids[planet])) if period[1] else "Ongoing"
            print(f"  Start: {start} ({start_deg}), End: {end} ({end_deg})")
        print("Forward Periods:")
        for period in data["Forward Periods"]:
            start = period[0].strftime("%Y-%m-%d")
            end = period[1].strftime("%Y-%m-%d") if period[1] else "Ongoing"
            start_deg = format_sidereal_degree(sidereal_degree_on_date(period[0], planet_ids[planet]))
            end_deg = format_sidereal_degree(sidereal_degree_on_date(period[1], planet_ids[planet])) if period[1] else "Ongoing"
            print(f"  Start: {start} ({start_deg}), End: {end} ({end_deg})")
