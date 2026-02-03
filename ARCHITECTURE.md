# Sri Jagannatha Panchanga Architecture

This document outlines the architecture of the Sri Jagannatha Panchanga application.

## Overview

The Sri Jagannatha Panchanga is a web-based astrological application that provides detailed panchanga information, horoscopes, and other astrological charts. The application is designed as a client-side single-page application (SPA) and is packaged as a hybrid mobile app using Apache Cordova.

## Frontend

The frontend is the core of the application and is responsible for the user interface, user input, and all astrological calculations.

*   **Framework:** The frontend is built using plain HTML, CSS, and JavaScript. It does not use any major frontend frameworks like React, Angular, or Vue.js.
*   **User Interface:** The UI consists of a simple, form-based interface for entering birth details (date, time, and place). The results are displayed as a series of tables and charts.
*   **Mapping and Location Services:** The application uses the [HERE Maps API for JavaScript](https://www.here.com/docs/bundle/maps-api-for-javascript-developer-guide/page/topics/quick-start.html) for location-based services, allowing users to easily input their geographical coordinates.
*   **Astrological Calculations:** All astrological calculations are performed on the client-side in JavaScript. The application includes a comprehensive library of functions for calculating:
    *   Planetary positions (using a JavaScript implementation of the Moshier ephemeris)
    *   Panchanga elements: Tithi, Nakshatra, Yoga, Karana, and Vaara
    *   Lagna (Ascendant) and other houses
    *   Divisional charts (Navamsa)
    *   Various kaalas (time periods) and muhurthas
    *   Chara karakas
*   **Packaging:** The application is packaged as a hybrid mobile app for Android using [Apache Cordova](https://cordova.apache.org/). The `config.xml` file in the `SJPv6` directory contains the Cordova configuration.

### Key Frontend Files

*   **`SJPv6/www/SJP.html`**: The main HTML file that serves as the entry point of the application.
*   **`SJPv6/www/sjp.js`**: A large JavaScript file containing the core application logic, including all astrological calculations and UI generation.
*   **`SJPv6/www/jyotish.js`**: Another JavaScript file with astrological calculations.
*   **`SJPv6/www/ephemeris/`**: This directory contains the JavaScript implementation of the Moshier ephemeris used for planetary calculations.
*   **`SJPv6/config.xml`**: The Cordova configuration file for the mobile app.

## Backend

The project also includes a Python-based backend, which appears to be a separate, standalone component that is not directly integrated with the frontend web application.

*   **Language:** The backend is written in Python.
*   **Functionality:** The Python backend provides command-line tools for performing astrological calculations. It uses the `swisseph` library, a high-precision ephemeris library.
*   **Key Backend Files:**
    *   **`python/jyotish.py`**: This file defines the basic data structures (Chart, Jataka) and astrological formulas.
    *   **`python/swe.py`**: This file uses the `swisseph` library to calculate planetary positions, sign transitions, and retrogression periods.
    *   **`python/retro.py`**: This file is dedicated to calculating planetary retrogression periods.

## Data

The application uses several data files:

*   **`SJPv6/www/ephe-objects.json`**: A JSON file containing ephemeris data.
*   **`SJPv6/www/places-india.txt`** and **`SJPv6/www/places-world.txt`**: Text files containing lists of places with their latitudes and longitudes.
*   **`SJPv6/www/*.jhd`**: Jagannatha Hora Datus files, which are used to save and load birth chart data.

## Overall Architecture Diagram

```
+--------------------------------------------------+
|                                                  |
|          Sri Jagannatha Panchanga App            |
|              (Cordova Hybrid App)                |
|                                                  |
+--------------------------------------------------+
|                                                  |
|                 Frontend (Client-side)           |
|                                                  |
|   +------------------------------------------+   |
|   |                                          |   |
|   |        HTML + CSS + JavaScript           |   |
|   |                                          |   |
|   +------------------------------------------+   |
|   |                                          |   |
|   |      Astrological Calculations           |   |
|   | (JavaScript - Moshier Ephemeris)         |   |
|   |                                          |   |
|   +------------------------------------------+   |
|   |                                          |   |
|   |         HERE Maps API Integration        |   |
|   |                                          |   |
|   +------------------------------------------+   |
|                                                  |
+--------------------------------------------------+

+--------------------------------------------------+
|                                                  |
|            Backend (Standalone Tool)             |
|                                                  |
|   +------------------------------------------+   |
|   |                                          |   |
|   |              Python Scripts              |   |
|   |                                          |   |
|   +------------------------------------------+   |
|   |                                          |   |
|   |      Astrological Calculations           |   |
|   |           (swisseph library)             |   |
|   |                                          |   |
|   +------------------------------------------+   |
|                                                  |
+--------------------------------------------------+
```
