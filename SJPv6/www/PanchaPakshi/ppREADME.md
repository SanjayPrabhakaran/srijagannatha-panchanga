# 🦅 Pancha Pakshi Activities 🦚

**Ancient Vedic Bird-Based Time Calculator with Location Intelligence**

## Overview

Pancha Pakshi is an ancient Vedic astrology system that divides each day and night into 5 equal periods (Yamas), with each period associated with specific activities of five birds (Vulture/Eagle, Owl, Crow, Cock, and Peacock). This application calculates precise Yama timings based on your location's sunrise and sunset times.

## Features

### 🌍 Location-Based Calculations
- **Automatic Location Lookup**: Simply enter a city name and the app will automatically find the coordinates
- **Manual Coordinates**: Or enter latitude/longitude directly
- **Astronomical Accuracy**: Calculates precise sunrise and sunset times for any location on Earth
- **Timezone Support**: Automatic timezone offset calculation or manual entry

### ⏰ Intelligent Time Division
- **Day Yamas**: Divides day duration (sunrise to sunset) into 5 equal periods
- **Night Yamas**: Divides night duration (sunset to sunrise) into 5 equal periods
- **Precise Timing**: Shows exact start and end times for each Yama period

### 🔍 Three Lookup Modes

1. **Activity Lookup**
   - Select: Paksha (Moon Phase), Yama Number, Bird, Weekday
   - Get: Activities for both day and night with exact time periods

2. **Complete Lookup**
   - Select: Day, Paksha, Bird, Day/Night, Yama Number
   - Get: Specific activity with sequence ID and time period

3. **Current Yama**
   - Real-time detection of which Yama period you're currently in
   - Shows current activity based on selected Paksha and Bird

## How to Use

### Step 1: Set Your Location

**Option A: Automatic Lookup (Recommended)**
1. Enter your city name in the "Location Name" field
   - Examples: "Chennai", "New York", "London", "Tokyo"
2. Click "🔍 Lookup Location"
3. The app will automatically fill in:
   - Latitude
   - Longitude
   - Timezone offset
   - And calculate sun times

**Option B: Manual Entry**
1. Enter Latitude and Longitude manually
2. Enter Timezone offset (e.g., 5.5 for India, -5 for EST, 0 for GMT)
3. Click "Calculate Sun Times & Yama Periods"

### Step 2: Choose Your Parameters

**Know Your Bird Type:**
- This is typically determined by your birth date in Vedic astrology
- Consult a Pancha Pakshi calculator or astrologer to find your bird

**Know the Paksha:**
- **Shukla Paksha**: Waxing moon (New Moon to Full Moon)
- **Krishna Paksha**: Waning moon (Full Moon to New Moon)

### Step 3: Get Your Results

Navigate to the appropriate tab and select your parameters to see:
- Exact time periods for each Yama
- Activities associated with each period
- Current Yama period (in real-time mode)

## The Five Birds

1. **🦅 Eagle (Vulture)** - Garuda
2. **🦉 Owl** - Uluka
3. **🐦 Crow** - Kaka
4. **🐓 Cock (Rooster)** - Kukkuta
5. **🦚 Peacock** - Mayura

## The Five Activities

1. **Eat** (Eating/Feeding) - Good for meals, nourishment
2. **Walk** (Moving/Travel) - Good for journeys, movement
3. **Rule** (Ruling/Governing) - Good for authority, decision-making
4. **Sleep** (Resting) - Good for rest, recuperation
5. **Death** (Danger/Inauspicious) - Avoid important activities

## Technical Details

### Files
- `pancha-pakshi.html` - Main HTML interface
- `pancha-pakshi.js` - All JavaScript logic and calculations

### Technologies Used
- Pure JavaScript (no frameworks required)
- OpenStreetMap Nominatim API for geocoding
- Astronomical calculations for sunrise/sunset
- Responsive CSS design

### Geocoding Service
The app uses OpenStreetMap's Nominatim service for free location lookup:
- No API key required
- Worldwide coverage
- Respects user privacy

### Calculations
- **Sunrise/Sunset**: Uses astronomical formulas based on latitude, longitude, and date
- **Day Duration**: Sunset time - Sunrise time
- **Night Duration**: 24 hours - Day Duration
- **Yama Duration**: Day/Night Duration ÷ 5

## Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

Requires JavaScript enabled.

## Privacy

- All calculations are performed locally in your browser
- Location lookup uses public OpenStreetMap API
- No data is stored or transmitted to any server
- No tracking or analytics

## Usage Tips

1. **First-time setup**: Enter your location once, then bookmark the page
2. **Daily use**: The app remembers coordinates between sessions
3. **Traveling**: Update location when you change cities
4. **Accuracy**: More accurate for locations near the equator
5. **Date selection**: Default is today, but you can plan ahead

## Limitations

- Requires internet connection for initial location lookup
- After lookup, works offline
- Timezone offset may need manual adjustment for some locations
- Polar regions (extreme latitudes) may have calculation issues during polar night/day

## Credits

Based on the ancient Vedic Pancha Pakshi Shastra system of Tamil Nadu.

## License

Free to use for personal purposes.

---

**Version**: 1.0  
**Last Updated**: February 2026

For questions or support, please refer to traditional Pancha Pakshi texts or consult a Vedic astrologer.
