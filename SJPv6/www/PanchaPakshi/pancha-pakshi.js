// Pancha Pakshi Activities - Main JavaScript File
// All data structures and functions for the Pancha Pakshi system

// ============================================================================
// DATA STRUCTURES
// ============================================================================


// Global variables for sun times
let sunriseTime, sunsetTime, dayDuration, nightDuration, yamaDayDuration, yamaNightDuration;

// ============================================================================
// MOON PHASE CALCULATION
// ============================================================================

function calculateMoonPhase(date) {
    // Calculate moon phase using astronomical algorithms
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Convert to Julian date
    let jd;
    if (month <= 2) {
        year -= 1;
        month += 12;
    }

    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);

    jd = Math.floor(365.25 * (year + 4716)) +
        Math.floor(30.6001 * (month + 1)) +
        day + b - 1524.5;

    // Calculate days since known new moon (Jan 6, 2000)
    const daysSinceNew = jd - 2451549.5;

    // Moon cycle is approximately 29.53 days
    const newMoons = daysSinceNew / 29.53058867;
    const phase = (newMoons - Math.floor(newMoons));

    // Phase: 0-0.5 is waxing (Shukla), 0.5-1.0 is waning (Krishna)
    if (phase < 0.5) {
        return {
            paksha: "Shukla",
            phaseName: "Waxing Moon",
            phasePercent: (phase * 2 * 100).toFixed(0)
        };
    } else {
        return {
            paksha: "Krishna",
            phaseName: "Waning Moon",
            phasePercent: ((1 - phase) * 2 * 100).toFixed(0)
        };
    }
}

function updateMoonPhase() {
    const selectedDate = new Date(document.getElementById('selectedDate').value);
    const moonPhase = calculateMoonPhase(selectedDate);

    // Update all paksha dropdowns - enable, set value, then disable
    const pakshaSelects = ['paksha0', 'paksha1', 'paksha2'];
    pakshaSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.disabled = false;
            select.value = moonPhase.paksha;
            select.disabled = true;
        }
    });

    // Display moon phase info
    const moonInfoDiv = document.getElementById('moonPhaseInfo');
    if (moonInfoDiv) {
        moonInfoDiv.style.display = 'block';
        moonInfoDiv.innerHTML = `
            <span style="font-weight: bold; color: #667eea;">
                ${moonPhase.paksha === 'Shukla' ? '🌒' : '🌖'} 
                ${moonPhase.paksha} Paksha
            </span>
            <span style="color: #666; font-size: 14px; margin-left: 10px;">
                (${moonPhase.phaseName} - ${moonPhase.phasePercent}%)
            </span>
        `;
    }
}

function getCurrentYamaPeriod() {
    if (!sunriseTime || !sunsetTime) {
        return null;
    }

    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

    let isDayTime, currentYamaNum;

    if (currentHour >= sunriseTime && currentHour < sunsetTime) {
        // Day time
        isDayTime = true;
        const elapsedTime = currentHour - sunriseTime;
        currentYamaNum = Math.floor(elapsedTime / yamaDayDuration) + 1;
        if (currentYamaNum > 5) currentYamaNum = 5;
        if (currentYamaNum < 1) currentYamaNum = 1;
    } else {
        // Night time
        isDayTime = false;
        let adjustedCurrent = currentHour;
        if (currentHour < sunriseTime) adjustedCurrent += 24;

        const elapsedTime = adjustedCurrent - sunsetTime;
        currentYamaNum = Math.floor(elapsedTime / yamaNightDuration) + 1;
        if (currentYamaNum > 5) currentYamaNum = 5;
        if (currentYamaNum < 1) currentYamaNum = 1;
    }

    return {
        isDayTime: isDayTime,
        yamaNumber: currentYamaNum,
        timeOfDay: isDayTime ? "Day" : "Night"
    };
}

function autoSelectCurrentYama() {
    const currentYama = getCurrentYamaPeriod();

    if (!currentYama) {
        return;
    }

    // Get current weekday
    const selectedDate = new Date(document.getElementById('selectedDate').value);
    const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Update weekday dropdowns - enable, set value, then disable
    const weekdaySelects = ['weekday0', 'day1'];
    weekdaySelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.disabled = false;
            select.value = weekday;
            select.disabled = true;
        }
    });

    // Update Yama number dropdowns - enable, set value, then disable
    const yamaSelects = ['yamaNum0', 'yamaNum1'];
    yamaSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.disabled = false;
            select.value = currentYama.yamaNumber.toString();
            select.disabled = true;
        }
    });

    // Update day/night selector in complete lookup - enable, set value, then disable
    const dayNightSelect = document.getElementById('daynight1');
    if (dayNightSelect) {
        dayNightSelect.disabled = false;
        dayNightSelect.value = currentYama.timeOfDay;
        dayNightSelect.disabled = true;
    }

    // Update current yama info display
    const yamaInfoDiv = document.getElementById('currentYamaInfo');
    if (yamaInfoDiv) {
        yamaInfoDiv.style.display = 'block';
        yamaInfoDiv.innerHTML = `
            <span style="font-weight: bold; color: #f57f17;">
                ${currentYama.isDayTime ? '☀️' : '🌙'} 
                Currently: Yama ${currentYama.yamaNumber} (${currentYama.timeOfDay})
            </span>
        `;
    }
}

// ============================================================================
// GEOCODING FUNCTIONS
// ============================================================================

async function lookupLocation() {
    const locationName = document.getElementById('locationName').value.trim();
    const lookupBtn = document.querySelector('.lookup-btn');
    const statusDiv = document.getElementById('locationStatus');

    if (!locationName) {
        if (statusDiv) {
            statusDiv.className = 'location-status error';
            statusDiv.style.display = 'block';
            statusDiv.textContent = '⚠️ Please enter a location name';
        }
        return;
    }

    // Show loading state
    if (lookupBtn) {
        lookupBtn.disabled = true;
        lookupBtn.textContent = '🔍 Looking up...';
    }
    if (statusDiv) {
        statusDiv.className = 'location-status';
        statusDiv.style.display = 'block';
        statusDiv.textContent = '🔍 Searching for location...';
    }

    try {
        // Use Nominatim OpenStreetMap API (free, no API key required)
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`,
            {
                headers: {
                    'User-Agent': 'PanchaPakshiApp/1.0'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Geocoding service unavailable');
        }

        const data = await response.json();

        if (data.length === 0) {
            if (statusDiv) {
                statusDiv.className = 'location-status error';
                statusDiv.textContent = '❌ Location not found. Please try a different name.';
            }
            return;
        }

        const location = data[0];
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);

        // Update the input fields
        document.getElementById('latitude').value = lat.toFixed(4);
        document.getElementById('longitude').value = lon.toFixed(4);

        // Get timezone offset based on longitude (rough approximation)
        const timezoneOffset = Math.round(lon / 15 * 2) / 2; // Round to nearest 0.5
        document.getElementById('timezone').value = timezoneOffset;

        // Update status
        if (statusDiv) {
            statusDiv.className = 'location-status success';
            statusDiv.textContent = `✅ Found: ${location.display_name}`;
        }

        // Auto-calculate sun times after successful lookup
        setTimeout(() => {
            calculateSunTimes();
        }, 500);

    } catch (error) {
        console.error('Geocoding error:', error);
        if (statusDiv) {
            statusDiv.className = 'location-status error';
            statusDiv.textContent = '❌ Error looking up location. Please enter coordinates manually.';
        }
    } finally {
        // Reset button state
        if (lookupBtn) {
            lookupBtn.disabled = false;
            lookupBtn.textContent = '🔍 Lookup Location';
        }
    }
}


// ============================================================================
// INITIALIZATION
// ============================================================================

function initializePage() {
    // Set date to today
    document.getElementById('selectedDate').valueAsDate = new Date();

    // Update current time display
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // Add enter key listener for location lookup
    const locationInput = document.getElementById('locationName');
    if (locationInput) {
        locationInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                lookupLocation();
            }
        });
    }

    // Add date change listener to update moon phase
    const dateInput = document.getElementById('selectedDate');
    if (dateInput) {
        dateInput.addEventListener('change', function () {
            if (sunriseTime && sunsetTime) {
                updateMoonPhase();
                autoSelectCurrentYama();
            }
        });
    }

    // Initial moon phase calculation
    updateMoonPhase();
}

function updateCurrentTime() {
    const now = new Date();
    const timeDisplay = document.getElementById('currentTimeDisplay');
    if (timeDisplay) {
        timeDisplay.textContent = now.toLocaleTimeString();
    }
}

// ============================================================================
// CORE CALCULATION FUNCTIONS
// ============================================================================

function calculateSunrise(lat, lng, date) {
    const J2000 = 2451545.0;
    const rad = Math.PI / 180;
    const deg = 180 / Math.PI;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) -
        Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    const n = jdn - J2000 + 0.0008;

    const meanAnomaly = (357.5291 + 0.98560028 * n) % 360;
    const center = 1.9148 * Math.sin(meanAnomaly * rad) +
        0.0200 * Math.sin(2 * meanAnomaly * rad) +
        0.0003 * Math.sin(3 * meanAnomaly * rad);
    const eclipticLongitude = (meanAnomaly + center + 180 + 102.9372) % 360;

    const solarTransit = n + 0.0053 * Math.sin(meanAnomaly * rad) -
        0.0069 * Math.sin(2 * eclipticLongitude * rad);

    const declination = Math.asin(Math.sin(eclipticLongitude * rad) *
        Math.sin(23.44 * rad)) * deg;

    const hourAngle = Math.acos((Math.sin(-0.833 * rad) -
        Math.sin(lat * rad) * Math.sin(declination * rad)) /
        (Math.cos(lat * rad) * Math.cos(declination * rad))) * deg;

    const sunrise = (solarTransit - hourAngle / 360) * 24;
    const sunset = (solarTransit + hourAngle / 360) * 24;

    return { sunrise, sunset };
}

function hoursToTime(hours) {
    // Normalize hours to 24-hour format
    let normalizedHours = hours % 24;
    if (normalizedHours < 0) normalizedHours += 24;

    const h = Math.floor(normalizedHours);
    const m = Math.floor((normalizedHours - h) * 60);
    const s = Math.floor(((normalizedHours - h) * 60 - m) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function calculateSunTimes() {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lng = parseFloat(document.getElementById('longitude').value);
    const locationName = document.getElementById('locationName').value;
    const selectedDate = new Date(document.getElementById('selectedDate').value);
    const timezone = parseFloat(document.getElementById('timezone').value);
    const resultDiv = document.getElementById('sunTimesResult');

    if (isNaN(lat) || isNaN(lng) || isNaN(timezone)) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Please enter valid latitude, longitude, and timezone.</p>';
        return;
    }

    const times = calculateSunrise(lat, lng, selectedDate);

    sunriseTime = times.sunrise + timezone;
    sunsetTime = times.sunset + timezone;

    if (sunriseTime >= 24) sunriseTime -= 24;
    if (sunsetTime >= 24) sunsetTime -= 24;

    dayDuration = sunsetTime - sunriseTime;
    if (dayDuration < 0) dayDuration += 24;

    nightDuration = 24 - dayDuration;

    yamaDayDuration = dayDuration / 5;
    yamaNightDuration = nightDuration / 5;

    const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

    let yamaTimesHTML = '<div class="yama-times">';

    // Day Yamas
    for (let i = 1; i <= 5; i++) {
        const startTime = sunriseTime + (i - 1) * yamaDayDuration;
        const endTime = sunriseTime + i * yamaDayDuration;
        yamaTimesHTML += `
            <div class="yama-time-card">
                <h5>Day Yama ${i}</h5>
                <div class="time">${hoursToTime(startTime)} - ${hoursToTime(endTime)}</div>
                <div style="font-size: 12px; color: #666; margin-top: 5px;">
                    Duration: ${(yamaDayDuration * 60).toFixed(0)} min
                </div>
            </div>
        `;
    }

    // Night Yamas
    for (let i = 1; i <= 5; i++) {
        const startTime = sunsetTime + (i - 1) * yamaNightDuration;
        const endTime = sunsetTime + i * yamaNightDuration;
        yamaTimesHTML += `
            <div class="yama-time-card">
                <h5>Night Yama ${i}</h5>
                <div class="time">${hoursToTime(startTime)} - ${hoursToTime(endTime)}</div>
                <div style="font-size: 12px; color: #666; margin-top: 5px;">
                    Duration: ${(yamaNightDuration * 60).toFixed(0)} min
                </div>
            </div>
        `;
    }
    yamaTimesHTML += '</div>';

    resultDiv.className = 'result';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>✅ Sun Times Calculated!</h3>
        <div class="time-info">
            <h4>📍 ${locationName} - ${dayOfWeek}, ${selectedDate.toLocaleDateString()}</h4>
            <div class="result-detail">
                <strong>🌅 Sunrise:</strong><span>${hoursToTime(sunriseTime)}</span>
                <strong>🌇 Sunset:</strong><span>${hoursToTime(sunsetTime)}</span>
                <strong>☀️ Day Duration:</strong><span>${dayDuration.toFixed(2)} hours (${(dayDuration * 60).toFixed(0)} min)</span>
                <strong>🌙 Night Duration:</strong><span>${nightDuration.toFixed(2)} hours (${(nightDuration * 60).toFixed(0)} min)</span>
                <strong>⏱️ Day Yama Duration:</strong><span>${yamaDayDuration.toFixed(2)} hours (${(yamaDayDuration * 60).toFixed(0)} min)</span>
                <strong>⏱️ Night Yama Duration:</strong><span>${yamaNightDuration.toFixed(2)} hours (${(yamaNightDuration * 60).toFixed(0)} min)</span>
            </div>
            <h4 style="margin-top: 20px;">⏰ Yama Time Periods</h4>
            ${yamaTimesHTML}
        </div>
    `;

    // Auto-update moon phase and current yama after calculation
    updateMoonPhase();
    autoSelectCurrentYama();
}

// ============================================================================
// PANCHA PAKSHI LOOKUP FUNCTIONS
// ============================================================================

function getSequenceId(currentDay, paksha, bird, dayNight) {
    const record = sequenceData.find(item =>
        item.day === currentDay &&
        item.paksha === paksha &&
        item.bird === bird
    );
    if (!record) return null;
    return dayNight === "Day" ? record.seqDay : record.seqNight;
}

function getYamaElement(seqID, yamaNum) {
    seqID = seqID.toUpperCase();
    if (!yamaData[seqID]) return null;
    const yamaKey = `yama${yamaNum}`;
    return yamaData[seqID][yamaKey] || null;
}

function getActivity(paksha, yamaNumber, bird, weekday) {
    paksha = paksha.charAt(0).toUpperCase() + paksha.slice(1).toLowerCase();
    bird = bird.charAt(0).toUpperCase() + bird.slice(1).toLowerCase();
    weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase();

    const yamaNum = typeof yamaNumber === 'string' ? parseInt(yamaNumber) : yamaNumber;

    if (isNaN(yamaNum) || yamaNum < 1 || yamaNum > 5) {
        return { success: false, error: "Invalid Yama number" };
    }

    const daySequenceId = getSequenceId(weekday, paksha, bird, "Day");
    const nightSequenceId = getSequenceId(weekday, paksha, bird, "Night");

    if (!daySequenceId || !nightSequenceId) {
        return { success: false, error: "Sequence not found" };
    }

    const dayActivity = getYamaElement(daySequenceId, yamaNum);
    const nightActivity = getYamaElement(nightSequenceId, yamaNum);

    return {
        success: true,
        paksha, yamaNumber, bird, weekday,
        daySequenceId, nightSequenceId,
        dayActivity, nightActivity
    };
}

// ============================================================================
// UI FUNCTIONS
// ============================================================================

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

    if (tabName === 'activity') {
        document.getElementById('activity-tab').classList.add('active');
        document.querySelector('.tab:nth-child(1)').classList.add('active');
    } else if (tabName === 'complete') {
        document.getElementById('complete-tab').classList.add('active');
        document.querySelector('.tab:nth-child(2)').classList.add('active');
    } else {
        document.getElementById('currentYama-tab').classList.add('active');
        document.querySelector('.tab:nth-child(3)').classList.add('active');
    }
}

function activityLookup() {
    // Get bird (user selection - only field that's not auto-selected)
    const bird = document.getElementById('bird0').value;

    // Get auto-selected values (from disabled fields)
    const pakshaSelect = document.getElementById('paksha0');
    const yamaNumSelect = document.getElementById('yamaNum0');
    const weekdaySelect = document.getElementById('weekday0');

    pakshaSelect.disabled = false;
    yamaNumSelect.disabled = false;
    weekdaySelect.disabled = false;

    const paksha = pakshaSelect.value;
    const yamaNum = yamaNumSelect.value;
    const weekday = weekdaySelect.value;

    pakshaSelect.disabled = true;
    yamaNumSelect.disabled = true;
    weekdaySelect.disabled = true;

    const resultDiv = document.getElementById('result0');

    if (!bird) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Please select your bird based on your birth Nakshatra.</p>';
        return;
    }

    if (!paksha || !yamaNum || !weekday) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Please calculate sun times first to auto-detect Paksha and Yama.</p>';
        return;
    }

    if (!sunriseTime || !sunsetTime) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Please calculate sun times first in the Location section above.</p>';
        return;
    }

    const result = getActivity(paksha, yamaNum, bird, weekday);

    if (!result.success) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<h3>❌ Error</h3><p>${result.error}</p>`;
        return;
    }

    const dayStart = sunriseTime + (yamaNum - 1) * yamaDayDuration;
    const dayEnd = sunriseTime + yamaNum * yamaDayDuration;
    const nightStart = sunsetTime + (yamaNum - 1) * yamaNightDuration;
    const nightEnd = sunsetTime + yamaNum * yamaNightDuration;

    resultDiv.className = 'result';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>✅ Activities Found!</h3>
        <div class="result-detail">
            <strong>Paksha:</strong><span>${result.paksha}</span>
            <strong>Yama Number:</strong><span>${result.yamaNumber}</span>
            <strong>Bird:</strong><span>${result.bird}</span>
            <strong>Weekday:</strong><span>${result.weekday}</span>
        </div>
        <div class="activity-box">
            <div class="activity-card day">
                <h4>☀️ Day Time</h4>
                <div class="activity">${result.dayActivity}</div>
                <div style="margin-top: 10px; font-size: 14px;">
                    <strong>Time:</strong> ${hoursToTime(dayStart)} - ${hoursToTime(dayEnd)}<br>
                    <strong>Sequence:</strong> ${result.daySequenceId}
                </div>
            </div>
            <div class="activity-card night">
                <h4>🌙 Night Time</h4>
                <div class="activity">${result.nightActivity}</div>
                <div style="margin-top: 10px; font-size: 14px;">
                    <strong>Time:</strong> ${hoursToTime(nightStart)} - ${hoursToTime(nightEnd)}<br>
                    <strong>Sequence:</strong> ${result.nightSequenceId}
                </div>
            </div>
        </div>
    `;
}

function completeLookup() {
    // Get bird (user selection)
    const bird = document.getElementById('bird1').value;

    // Get auto-selected values (from disabled fields)
    const daySelect = document.getElementById('day1');
    const pakshaSelect = document.getElementById('paksha1');
    const dayNightSelect = document.getElementById('daynight1');
    const yamaNumSelect = document.getElementById('yamaNum1');

    daySelect.disabled = false;
    pakshaSelect.disabled = false;
    dayNightSelect.disabled = false;
    yamaNumSelect.disabled = false;

    const day = daySelect.value;
    const paksha = pakshaSelect.value;
    const daynight = dayNightSelect.value;
    const yamaNum = yamaNumSelect.value;

    daySelect.disabled = true;
    pakshaSelect.disabled = true;
    dayNightSelect.disabled = true;
    yamaNumSelect.disabled = true;

    const resultDiv = document.getElementById('result1');

    if (!bird) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Please select your bird based on your birth Nakshatra.</p>';
        return;
    }

    if (!day || !paksha || !daynight || !yamaNum) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Please calculate sun times first to auto-detect parameters.</p>';
        return;
    }

    if (!sunriseTime || !sunsetTime) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Please calculate sun times first.</p>';
        return;
    }

    const sequenceId = getSequenceId(day, paksha, bird, daynight);
    const yamaElement = getYamaElement(sequenceId, yamaNum);

    if (!sequenceId || !yamaElement) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Not Found</h3><p>Invalid combination.</p>';
        return;
    }

    const isDayTime = daynight === "Day";
    const yamaStart = isDayTime ?
        sunriseTime + (yamaNum - 1) * yamaDayDuration :
        sunsetTime + (yamaNum - 1) * yamaNightDuration;
    const yamaEnd = isDayTime ?
        sunriseTime + yamaNum * yamaDayDuration :
        sunsetTime + yamaNum * yamaNightDuration;

    resultDiv.className = 'result';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>✅ Result Found!</h3>
        <div class="result-detail">
            <strong>Day:</strong><span>${day}</span>
            <strong>Paksha:</strong><span>${paksha}</span>
            <strong>Bird:</strong><span>${bird}</span>
            <strong>Time:</strong><span>${daynight}</span>
            <strong>Sequence ID:</strong><span style="font-size: 20px; color: #667eea;">${sequenceId}</span>
            <strong>Yama ${yamaNum}:</strong><span style="font-size: 24px; font-weight: bold; color: #667eea;">${yamaElement}</span>
        </div>
        <div class="time-info">
            <h4>⏰ Yama ${yamaNum} Time Period</h4>
            <div style="text-align: center; font-size: 22px; font-weight: bold; margin: 15px 0;">
                ${hoursToTime(yamaStart)} - ${hoursToTime(yamaEnd)}
            </div>
            <div style="text-align: center; font-size: 14px; color: #666;">
                Duration: ${((isDayTime ? yamaDayDuration : yamaNightDuration) * 60).toFixed(0)} minutes
            </div>
        </div>
    `;
}

function getCurrentYama() {
    // Get bird (user selection)
    const bird = document.getElementById('bird2').value;

    // Get auto-selected paksha
    const pakshaSelect = document.getElementById('paksha2');
    pakshaSelect.disabled = false;
    const paksha = pakshaSelect.value;
    pakshaSelect.disabled = true;

    const resultDiv = document.getElementById('result2');

    if (!bird) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Please select your bird based on your birth Nakshatra.</p>';
        return;
    }

    if (!paksha) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Paksha not detected. Please check the date.</p>';
        return;
    }

    if (!sunriseTime || !sunsetTime) {
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<h3>❌ Error</h3><p>Please calculate sun times first.</p>';
        return;
    }

    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

    const selectedDate = new Date(document.getElementById('selectedDate').value);
    const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

    let isDayTime, currentYamaNum, yamaStart, yamaEnd, sequenceId, activity;

    if (currentHour >= sunriseTime && currentHour < sunsetTime) {
        isDayTime = true;
        const elapsedTime = currentHour - sunriseTime;
        currentYamaNum = Math.floor(elapsedTime / yamaDayDuration) + 1;
        if (currentYamaNum > 5) currentYamaNum = 5;

        yamaStart = sunriseTime + (currentYamaNum - 1) * yamaDayDuration;
        yamaEnd = sunriseTime + currentYamaNum * yamaDayDuration;
        sequenceId = getSequenceId(weekday, paksha, bird, "Day");
        activity = getYamaElement(sequenceId, currentYamaNum);
    } else {
        isDayTime = false;
        let adjustedCurrent = currentHour;
        if (currentHour < sunriseTime) adjustedCurrent += 24;

        const elapsedTime = adjustedCurrent - sunsetTime;
        currentYamaNum = Math.floor(elapsedTime / yamaNightDuration) + 1;
        if (currentYamaNum > 5) currentYamaNum = 5;

        yamaStart = sunsetTime + (currentYamaNum - 1) * yamaNightDuration;
        yamaEnd = sunsetTime + currentYamaNum * yamaNightDuration;
        sequenceId = getSequenceId(weekday, paksha, bird, "Night");
        activity = getYamaElement(sequenceId, currentYamaNum);
    }

    resultDiv.className = 'result';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>✅ Current Yama Period!</h3>
        <div class="time-info">
            <h4>${isDayTime ? '☀️ Day Time' : '🌙 Night Time'} - Yama ${currentYamaNum}</h4>
            <div style="text-align: center; font-size: 32px; font-weight: bold; color: ${isDayTime ? '#f57f17' : '#6a1b9a'}; margin: 20px 0;">
                ${activity}
            </div>
            <div class="result-detail">
                <strong>Current Time:</strong><span>${now.toLocaleTimeString()}</span>
                <strong>Yama Period:</strong><span>${hoursToTime(yamaStart)} - ${hoursToTime(yamaEnd)}</span>
                <strong>Sequence ID:</strong><span>${sequenceId}</span>
                <strong>Paksha:</strong><span>${paksha}</span>
                <strong>Bird:</strong><span>${bird}</span>
                <strong>Weekday:</strong><span>${weekday}</span>
            </div>
        </div>
    `;
}

// ============================================================================
// INITIALIZATION ON PAGE LOAD
// ============================================================================

window.addEventListener('DOMContentLoaded', initializePage);
