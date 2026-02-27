console.log(getExecutingFileName() + ".............");
// Data structure containing all sequences
const sequenceData = [
    // Shukla Paksha
    { day: "Sunday", bird: "Eagle", seqDay: "SD1", seqNight: "SN1", paksha: "Shukla" },
    { day: "Sunday", bird: "Owl", seqDay: "SD2", seqNight: "SN2", paksha: "Shukla" },
    { day: "Sunday", bird: "Crow", seqDay: "SD3", seqNight: "SN3", paksha: "Shukla" },
    { day: "Sunday", bird: "Cock", seqDay: "SD4", seqNight: "SN4", paksha: "Shukla" },
    { day: "Sunday", bird: "Peacock", seqDay: "SD5", seqNight: "SN5", paksha: "Shukla" },

    { day: "Tuesday", bird: "Eagle", seqDay: "SD1", seqNight: "SN1", paksha: "Shukla" },
    { day: "Tuesday", bird: "Owl", seqDay: "SD2", seqNight: "SN2", paksha: "Shukla" },
    { day: "Tuesday", bird: "Crow", seqDay: "SD3", seqNight: "SN3", paksha: "Shukla" },
    { day: "Tuesday", bird: "Cock", seqDay: "SD4", seqNight: "SN4", paksha: "Shukla" },
    { day: "Tuesday", bird: "Peacock", seqDay: "SD5", seqNight: "SN5", paksha: "Shukla" },

    { day: "Monday", bird: "Owl", seqDay: "SD5", seqNight: "SN5", paksha: "Shukla" },
    { day: "Monday", bird: "Crow", seqDay: "SD1", seqNight: "SN1", paksha: "Shukla" },
    { day: "Monday", bird: "Cock", seqDay: "SD2", seqNight: "SN2", paksha: "Shukla" },
    { day: "Monday", bird: "Peacock", seqDay: "SD3", seqNight: "SN3", paksha: "Shukla" },
    { day: "Monday", bird: "Eagle", seqDay: "SD4", seqNight: "SN4", paksha: "Shukla" },

    { day: "Wednesday", bird: "Owl", seqDay: "SD5", seqNight: "SN5", paksha: "Shukla" },
    { day: "Wednesday", bird: "Crow", seqDay: "SD1", seqNight: "SN1", paksha: "Shukla" },
    { day: "Wednesday", bird: "Cock", seqDay: "SD2", seqNight: "SN2", paksha: "Shukla" },
    { day: "Wednesday", bird: "Peacock", seqDay: "SD3", seqNight: "SN3", paksha: "Shukla" },
    { day: "Wednesday", bird: "Eagle", seqDay: "SD4", seqNight: "SN4", paksha: "Shukla" },

    { day: "Thursday", bird: "Crow", seqDay: "SD4", seqNight: "SN4", paksha: "Shukla" },
    { day: "Thursday", bird: "Cock", seqDay: "SD5", seqNight: "SN5", paksha: "Shukla" },
    { day: "Thursday", bird: "Peacock", seqDay: "SD1", seqNight: "SN1", paksha: "Shukla" },
    { day: "Thursday", bird: "Eagle", seqDay: "SD2", seqNight: "SN2", paksha: "Shukla" },
    { day: "Thursday", bird: "Owl", seqDay: "SD3", seqNight: "SN3", paksha: "Shukla" },

    { day: "Friday", bird: "Cock", seqDay: "SD3", seqNight: "SN3", paksha: "Shukla" },
    { day: "Friday", bird: "Peacock", seqDay: "SD4", seqNight: "SN4", paksha: "Shukla" },
    { day: "Friday", bird: "Eagle", seqDay: "SD5", seqNight: "SN5", paksha: "Shukla" },
    { day: "Friday", bird: "Owl", seqDay: "SD1", seqNight: "SN1", paksha: "Shukla" },
    { day: "Friday", bird: "Crow", seqDay: "SD2", seqNight: "SN2", paksha: "Shukla" },

    { day: "Saturday", bird: "Peacock", seqDay: "SD2", seqNight: "SN2", paksha: "Shukla" },
    { day: "Saturday", bird: "Eagle", seqDay: "SD3", seqNight: "SN3", paksha: "Shukla" },
    { day: "Saturday", bird: "Owl", seqDay: "SD4", seqNight: "SN4", paksha: "Shukla" },
    { day: "Saturday", bird: "Crow", seqDay: "SD5", seqNight: "SN5", paksha: "Shukla" },
    { day: "Saturday", bird: "Cock", seqDay: "SD1", seqNight: "SN1", paksha: "Shukla" },

    // Krishna Paksha
    { day: "Sunday", bird: "Cock", seqDay: "KD1", seqNight: "KN1", paksha: "Krishna" },
    { day: "Sunday", bird: "Eagle", seqDay: "KD2", seqNight: "KN2", paksha: "Krishna" },
    { day: "Sunday", bird: "Owl", seqDay: "KD3", seqNight: "KN3", paksha: "Krishna" },
    { day: "Sunday", bird: "Peacock", seqDay: "KD4", seqNight: "KN4", paksha: "Krishna" },
    { day: "Sunday", bird: "Crow", seqDay: "KD5", seqNight: "KN5", paksha: "Krishna" },

    { day: "Tuesday", bird: "Cock", seqDay: "KD1", seqNight: "KN1", paksha: "Krishna" },
    { day: "Tuesday", bird: "Eagle", seqDay: "KD2", seqNight: "KN2", paksha: "Krishna" },
    { day: "Tuesday", bird: "Owl", seqDay: "KD3", seqNight: "KN3", paksha: "Krishna" },
    { day: "Tuesday", bird: "Peacock", seqDay: "KD4", seqNight: "KN4", paksha: "Krishna" },
    { day: "Tuesday", bird: "Crow", seqDay: "KD5", seqNight: "KN5", paksha: "Krishna" },

    { day: "Monday", bird: "Cock", seqDay: "KD5", seqNight: "KN2", paksha: "Krishna" },
    { day: "Monday", bird: "Eagle", seqDay: "KD4", seqNight: "KN5", paksha: "Krishna" },
    { day: "Monday", bird: "Owl", seqDay: "KD2", seqNight: "KN1", paksha: "Krishna" },
    { day: "Monday", bird: "Peacock", seqDay: "KD1", seqNight: "KN3", paksha: "Krishna" },
    { day: "Monday", bird: "Crow", seqDay: "KD3", seqNight: "KN4", paksha: "Krishna" },

    { day: "Saturday", bird: "Cock", seqDay: "KD5", seqNight: "KN2", paksha: "Krishna" },
    { day: "Saturday", bird: "Eagle", seqDay: "KD4", seqNight: "KN5", paksha: "Krishna" },
    { day: "Saturday", bird: "Owl", seqDay: "KD2", seqNight: "KN1", paksha: "Krishna" },
    { day: "Saturday", bird: "Peacock", seqDay: "KD1", seqNight: "KN3", paksha: "Krishna" },
    { day: "Saturday", bird: "Crow", seqDay: "KD3", seqNight: "KN4", paksha: "Krishna" },

    { day: "Wednesday", bird: "Cock", seqDay: "KD4", seqNight: "KN5", paksha: "Krishna" },
    { day: "Wednesday", bird: "Eagle", seqDay: "KD3", seqNight: "KN4", paksha: "Krishna" },
    { day: "Wednesday", bird: "Owl", seqDay: "KD5", seqNight: "KN2", paksha: "Krishna" },
    { day: "Wednesday", bird: "Peacock", seqDay: "KD2", seqNight: "KN1", paksha: "Krishna" },
    { day: "Wednesday", bird: "Crow", seqDay: "KD1", seqNight: "KN3", paksha: "Krishna" },

    { day: "Thursday", bird: "Cock", seqDay: "KD2", seqNight: "KN3", paksha: "Krishna" },
    { day: "Thursday", bird: "Eagle", seqDay: "KD5", seqNight: "KN1", paksha: "Krishna" },
    { day: "Thursday", bird: "Owl", seqDay: "KD1", seqNight: "KN4", paksha: "Krishna" },
    { day: "Thursday", bird: "Peacock", seqDay: "KD3", seqNight: "KN5", paksha: "Krishna" },
    { day: "Thursday", bird: "Crow", seqDay: "KD4", seqNight: "KN2", paksha: "Krishna" },

    { day: "Friday", bird: "Cock", seqDay: "KD3", seqNight: "KN4", paksha: "Krishna" },
    { day: "Friday", bird: "Eagle", seqDay: "KD1", seqNight: "KN3", paksha: "Krishna" },
    { day: "Friday", bird: "Owl", seqDay: "KD4", seqNight: "KN5", paksha: "Krishna" },
    { day: "Friday", bird: "Peacock", seqDay: "KD5", seqNight: "KN2", paksha: "Krishna" },
    { day: "Friday", bird: "Crow", seqDay: "KD2", seqNight: "KN1", paksha: "Krishna" }
];

console.log("Sequence Data", sequenceData);

// Yama data structure based on Sequence ID
const yamaData = {
    // Shukla Paksha Day sequences
    "SD1": { yama1: "Eat", yama2: "Walk", yama3: "Rule", yama4: "Sleep", yama5: "Death" },
    "SD2": { yama1: "Walk", yama2: "Rule", yama3: "Sleep", yama4: "Death", yama5: "Eat" },
    "SD3": { yama1: "Rule", yama2: "Sleep", yama3: "Death", yama4: "Eat", yama5: "Walk" },
    "SD4": { yama1: "Sleep", yama2: "Death", yama3: "Eat", yama4: "Walk", yama5: "Rule" },
    "SD5": { yama1: "Death", yama2: "Eat", yama3: "Walk", yama4: "Rule", yama5: "Sleep" },

    // Shukla Paksha Night sequences
    "SN1": { yama1: "Death", yama2: "Walk", yama3: "Sleep", yama4: "Eat", yama5: "Rule" },
    "SN2": { yama1: "Rule", yama2: "Death", yama3: "Walk", yama4: "Sleep", yama5: "Eat" },
    "SN3": { yama1: "Eat", yama2: "Rule", yama3: "Death", yama4: "Walk", yama5: "Sleep" },
    "SN4": { yama1: "Sleep", yama2: "Eat", yama3: "Rule", yama4: "Death", yama5: "Walk" },
    "SN5": { yama1: "Walk", yama2: "Sleep", yama3: "Eat", yama4: "Rule", yama5: "Death" },

    // Krishna Paksha Day sequences
    "KD1": { yama1: "Eat", yama2: "Death", yama3: "Sleep", yama4: "Rule", yama5: "Walk" },
    "KD2": { yama1: "Walk", yama2: "Eat", yama3: "Death", yama4: "Sleep", yama5: "Rule" },
    "KD3": { yama1: "Death", yama2: "Sleep", yama3: "Rule", yama4: "Walk", yama5: "Eat" },
    "KD4": { yama1: "Sleep", yama2: "Rule", yama3: "Walk", yama4: "Eat", yama5: "Death" },
    "KD5": { yama1: "Rule", yama2: "Walk", yama3: "Eat", yama4: "Death", yama5: "Sleep" },

    // Krishna Paksha Night sequences
    "KN1": { yama1: "Walk", yama2: "Death", yama3: "Rule", yama4: "Eat", yama5: "Sleep" },
    "KN2": { yama1: "Eat", yama2: "Sleep", yama3: "Walk", yama4: "Death", yama5: "Rule" },
    "KN3": { yama1: "Rule", yama2: "Eat", yama3: "Sleep", yama4: "Walk", yama5: "Death" },
    "KN4": { yama1: "Sleep", yama2: "Walk", yama3: "Death", yama4: "Rule", yama5: "Eat" },
    "KN5": { yama1: "Death", yama2: "Rule", yama3: "Eat", yama4: "Sleep", yama5: "Walk" }
};

console.log("Yama Data", yamaData);
/**
 * Finds the Pakshi (Bird) based on the Nakshatra Number (1-27)
 * @param {number} nakshatraNumber - The index of the Nakshatra (1: Ashwini, 27: Revati)
 * @returns {string} - The name of the Bird or an error message
 */
function findPakshi(nakshatraNumber) { //Nakshatra Number for 1 to 27
    // Validation for valid Nakshatra range
    if (nakshatraNumber < 1 || nakshatraNumber > 27) {
        return "Invalid Nakshatra number. Please enter a value between 1 and 27.";
    }

    // Logic based on your specific ranges:
    // 1-5 (Ashwini to Mrigashira): Eagle
    if (nakshatraNumber >= 1 && nakshatraNumber <= 5) {
        return "Eagle (Vulture)";
    }
    // 6-11 (Ardra to Purva Phalguni): Owl
    else if (nakshatraNumber >= 6 && nakshatraNumber <= 11) {
        return "Owl";
    }
    // 12-16 (Uttara Phalguni to Vishakha): Crow
    else if (nakshatraNumber >= 12 && nakshatraNumber <= 16) {
        return "Crow";
    }
    // 17-21 (Anuradha to Uttarashada): Cock
    else if (nakshatraNumber >= 17 && nakshatraNumber <= 21) {
        return "Cock";
    }
    // 22-27 (Shraavana to Revati): Peacock
    else if (nakshatraNumber >= 22 && nakshatraNumber <= 27) {
        return "Peacock";
    }
}

// --- Example Usage ---
console.log(`Nakshatra ${myNakshatra = 13} belongs to: ${findPakshi(myNakshatra)}`);

// Example: If this is called in 'app.js'
console.log("Executed fromxxx:", getExecutingFileName());
scriptname = getExecutingFileName();
console.log(scriptname + "........");
// const waxingBirdSchedule = [
//     { daySP: "Sun,Tue", bird: "Eagle", seqID_SD: "SD1", sdy1: "Eat", sdy2: "Walk", sdy3: "Rule", sdy4: "Sleep", sdy5: "Death", seqID_SN: "SN1", sny1: "Death", sny2: "Walk", sny3: "Sleep", sny4: "Eat", sny5: "Rule" },
//     { daySP: "Sun,Tue", bird: "Owl", seqID_SD: "SD2", sdy1: "Walk", sdy2: "Rule", sdy3: "Sleep", sdy4: "Death", sdy5: "Eat", seqID_SN: "SN2", sny1: "Rule", sny2: "Death", sny3: "Walk", sny4: "Sleep", sny5: "Eat" },
//     { daySP: "Sun,Tue", bird: "Crow", seqID_SD: "SD3", sdy1: "Rule", sdy2: "Sleep", sdy3: "Death", sdy4: "Eat", sdy5: "Walk", seqID_SN: "SN3", sny1: "Eat", sny2: "Rule", sny3: "Death", sny4: "Walk", sny5: "Sleep" },
//     { daySP: "Sun,Tue", bird: "Cock", seqID_SD: "SD4", sdy1: "Sleep", sdy2: "Death", sdy3: "Eat", sdy4: "Walk", sdy5: "Rule", seqID_SN: "SN4", sny1: "Sleep", sny2: "Eat", sny3: "Rule", sny4: "Death", sny5: "Walk" },
//     { daySP: "Sun,Tue", bird: "Peacock", seqID_SD: "SD5", sdy1: "Death", sdy2: "Eat", sdy3: "Walk", sdy4: "Rule", sdy5: "Sleep", seqID_SN: "SN5", sny1: "Walk", sny2: "Sleep", sny3: "Eat", sny4: "Rule", sny5: "Death" },
//     { daySP: "Mon,Wed", bird: "Owl", seqID_SD: "SD5", sdy1: "Death", sdy2: "Eat", sdy3: "Walk", sdy4: "Rule", sdy5: "Sleep", seqID_SN: "SN5", sny1: "Walk", sny2: "Sleep", sny3: "Eat", sny4: "Rule", sny5: "Death" },
//     { daySP: "Mon,Wed", bird: "Crow", seqID_SD: "SD1", sdy1: "Eat", sdy2: "Walk", sdy3: "Rule", sdy4: "Sleep", sdy5: "Death", seqID_SN: "SN1", sny1: "Death", sny2: "Walk", sny3: "Sleep", sny4: "Eat", sny5: "Rule" },
//     { daySP: "Mon,Wed", bird: "Cock", seqID_SD: "SD2", sdy1: "Walk", sdy2: "Rule", sdy3: "Sleep", sdy4: "Death", sdy5: "Eat", seqID_SN: "SN2", sny1: "Rule", sny2: "Death", sny3: "Walk", sny4: "Sleep", sny5: "Eat" },
//     { daySP: "Mon,Wed", bird: "Peacock", seqID_SD: "SD3", sdy1: "Rule", sdy2: "Sleep", sdy3: "Death", sdy4: "Eat", sdy5: "Walk", seqID_SN: "SN3", sny1: "Eat", sny2: "Rule", sny3: "Death", sny4: "Walk", sny5: "Sleep" },
//     { daySP: "Mon,Wed", bird: "Eagle", seqID_SD: "SD4", sdy1: "Sleep", sdy2: "Death", sdy3: "Eat", sdy4: "Walk", sdy5: "Rule", seqID_SN: "SN4", sny1: "Sleep", sny2: "Eat", sny3: "Rule", sny4: "Death", sny5: "Walk" },
//     { daySP: "Thursday", bird: "Crow", seqID_SD: "SD4", sdy1: "Sleep", sdy2: "Death", sdy3: "Eat", sdy4: "Walk", sdy5: "Rule", seqID_SN: "SN4", sny1: "Sleep", sny2: "Eat", sny3: "Rule", sny4: "Death", sny5: "Walk" },
//     { daySP: "Thursday", bird: "Owl", seqID_SD: "SD5", sdy1: "Death", sdy2: "Eat", sdy3: "Walk", sdy4: "Rule", sdy5: "Sleep", seqID_SN: "SN5", sny1: "Walk", sny2: "Sleep", sny3: "Eat", sny4: "Rule", sny5: "Death" },
//     { daySP: "Thursday", bird: "Peacock", seqID_SD: "SD1", sdy1: "Eat", sdy2: "Walk", sdy3: "Rule", sdy4: "Sleep", sdy5: "Death", seqID_SN: "SN1", sny1: "Death", sny2: "Walk", sny3: "Sleep", sny4: "Eat", sny5: "Rule" },
//     { daySP: "Thursday", bird: "Eagle", seqID_SD: "SD2", sdy1: "Walk", sdy2: "Rule", sdy3: "Sleep", sdy4: "Death", sdy5: "Eat", seqID_SN: "SN2", sny1: "Rule", sny2: "Death", sny3: "Walk", sny4: "Sleep", sny5: "Eat" },
//     { daySP: "Thursday", bird: "Owl", seqID_SD: "SD3", sdy1: "Rule", sdy2: "Sleep", sdy3: "Death", sdy4: "Eat", sdy5: "Walk", seqID_SN: "SN3", sny1: "Eat", sny2: "Rule", sny3: "Death", sny4: "Walk", sny5: "Sleep" },
//     { daySP: "Friday", bird: "Cock", seqID_SD: "SD3", sdy1: "Rule", sdy2: "Sleep", sdy3: "Death", sdy4: "Eat", sdy5: "Walk", seqID_SN: "SN3", sny1: "Eat", sny2: "Rule", sny3: "Death", sny4: "Walk", sny5: "Sleep" },
//     { daySP: "Friday", bird: "Peacock", seqID_SD: "SD4", sdy1: "Sleep", sdy2: "Sleep", sdy3: "Eat", sdy4: "Walk", sdy5: "Rule", seqID_SN: "SN4", sny1: "Sleep", sny2: "Eat", sny3: "Rule", sny4: "Death", sny5: "Walk" },
//     { daySP: "Friday", bird: "Eagle", seqID_SD: "SD5", sdy1: "Death", sdy2: "Eat", sdy3: "Walk", sdy4: "Rule", sdy5: "Sleep", seqID_SN: "SN5", sny1: "Walk", sny2: "Sleep", sny3: "Eat", sny4: "Rule", sny5: "Death" },
//     { daySP: "Friday", bird: "Owl", seqID_SD: "SD1", sdy1: "Eat", sdy2: "Walk", sdy3: "Rule", sdy4: "Sleep", sdy5: "Death", seqID_SN: "SN1", sny1: "Death", sny2: "Walk", sny3: "Sleep", sny4: "Eat", sny5: "Rule" },
//     { daySP: "Friday", bird: "Crow", seqID_SD: "SD2", sdy1: "Walk", sdy2: "Rule", sdy3: "Sleep", sdy4: "Death", sdy5: "Eat", seqID_SN: "SN2", sny1: "Rule", sny2: "Death", sny3: "Walk", sny4: "Sleep", sny5: "Eat" },
//     { daySP: "Saturday", bird: "Peacock", seqID_SD: "SD2", sdy1: "Walk", sdy2: "Rule", sdy3: "Sleep", sdy4: "Death", sdy5: "Eat", seqID_SN: "SN2", sny1: "Rule", sny2: "Death", sny3: "Walk", sny4: "Sleep", sny5: "Eat" },
//     { daySP: "Saturday", bird: "Eagle", seqID_SD: "SD3", sdy1: "Rule", sdy2: "Sleep", sdy3: "Death", sdy4: "Eat", sdy5: "Walk", seqID_SN: "SN3", sny1: "Eat", sny2: "Rule", sny3: "Death", sny4: "Walk", sny5: "Sleep" },
//     { daySP: "Saturday", bird: "Owl", seqID_SD: "SD4", sdy1: "Sleep", sdy2: "Death", sdy3: "Eat", sdy4: "Walk", sdy5: "Rule", seqID_SN: "SN4", sny1: "Sleep", sny2: "Eat", sny3: "Rule", sny4: "Death", sny5: "Walk" },
//     { daySP: "Saturday", bird: "Crow", seqID_SD: "SD5", sdy1: "Death", sdy2: "Eat", sdy3: "Walk", sdy4: "Rule", sdy5: "Sleep", seqID_SN: "SN5", sny1: "Walk", sny2: "Sleep", sny3: "Eat", sny4: "Rule", sny5: "Death" },
//     { daySP: "Saturday", bird: "Cock", seqID_SD: "SD1", sdy1: "Eat", sdy2: "Walk", sdy3: "Rule", sdy4: "Sleep", sdy5: "Death", seqID_SN: "SN1", sny1: "Death", sny2: "Walk", sny3: "Sleep", sny4: "Eat", sny5: "Rule" }
// ];
// const waningBirdSchedule = [
//     { dayKP: "Sun,Tue", bird: "Cock", seqID_KD: "KD1", kdy1: "Eat", kdy2: "Death", kdy3: "Sleep", kdy4: "Rule", kdy5: "Walk", seqID_KN: "KN1", kny1: "Walk", kny2: "Death", kny3: "Rule", kny4: "Eat", kny5: "Sleep" },
//     { dayKP: "Sun,Tue", bird: "Eagle", seqID_KD: "KD2", kdy1: "Walk", kdy2: "Eat", kdy3: "Death", kdy4: "Sleep", kdy5: "Rule", seqID_KN: "KN2", kny1: "Eat", kny2: "Sleep", kny3: "Walk", kny4: "Death", kny5: "Rule" },
//     { dayKP: "Sun,Tue", bird: "Owl", seqID_KD: "KD3", kdy1: "Death", kdy2: "Sleep", kdy3: "Rule", kdy4: "Walk", kdy5: "Eat", seqID_KN: "KN3", kny1: "Rule", kny2: "Eat", kny3: "Sleep", kny4: "Walk", kny5: "Death" },
//     { dayKP: "Sun,Tue", bird: "Peacock", seqID_KD: "KD4", kdy1: "Sleep", kdy2: "Rule", kdy3: "Walk", kdy4: "Eat", kdy5: "Death", seqID_KN: "KN4", kny1: "Sleep", kny2: "Walk", kny3: "Death", kny4: "Rule", kny5: "Eat" },
//     { dayKP: "Sun,Tue", bird: "Crow", seqID_KD: "KD5", kdy1: "Rule", kdy2: "Walk", kdy3: "Eat", kdy4: "Death", kdy5: "Sleep", seqID_KN: "KN5", kny1: "Death", kny2: "Rule", kny3: "Eat", kny4: "Sleep", kny5: "Walk" },
//     { dayKP: "Mon,Sat", bird: "Cock", seqID_KD: "KD5", kdy1: "Rule", kdy2: "Walk", kdy3: "Eat", kdy4: "Death", kdy5: "Sleep", seqID_KN: "KN2", kny1: "Eat", kny2: "Sleep", kny3: "Walk", kny4: "Death", kny5: "Rule" },
//     { dayKP: "Mon,Sat", bird: "Eagle", seqID_KD: "KD4", kdy1: "Sleep", kdy2: "Rule", kdy3: "Walk", kdy4: "Eat", kdy5: "Death", seqID_KN: "KN5", kny1: "Death", kny2: "Rule", kny3: "Eat", kny4: "Sleep", kny5: "Walk" },
//     { dayKP: "Mon,Sat", bird: "Owl", seqID_KD: "KD2", kdy1: "Walk", kdy2: "Eat", kdy3: "Death", kdy4: "Sleep", kdy5: "Rule", seqID_KN: "KN1", kny1: "Walk", kny2: "Death", kny3: "Rule", kny4: "Eat", kny5: "Sleep" },
//     { dayKP: "Mon,Sat", bird: "Peacock", seqID_KD: "KD1", kdy1: "Eat", kdy2: "Death", kdy3: "Sleep", kdy4: "Rule", kdy5: "Walk", seqID_KN: "KN3", kny1: "Rule", kny2: "Eat", kny3: "Sleep", kny4: "Walk", kny5: "Death" },
//     { dayKP: "Mon,Sat", bird: "Crow", seqID_KD: "KD3", kdy1: "Death", kdy2: "Sleep", kdy3: "Rule", kdy4: "Walk", kdy5: "Eat", seqID_KN: "KN4", kny1: "Sleep", kny2: "Walk", kny3: "Death", kny4: "Rule", kny5: "Eat" },
//     { dayKP: "Wednes", bird: "Cock", seqID_KD: "KD4", kdy1: "Sleep", kdy2: "Rule", kdy3: "Walk", kdy4: "Eat", kdy5: "Death", seqID_KN: "KN5", kny1: "Death", kny2: "Rule", kny3: "Eat", kny4: "Sleep", kny5: "Walk" },
//     { dayKP: "Wednes", bird: "Eagle", seqID_KD: "KD3", kdy1: "Death", kdy2: "Sleep", kdy3: "Rule", kdy4: "Walk", kdy5: "Eat", seqID_KN: "KN4", kny1: "Sleep", kny2: "Walk", kny3: "Death", kny4: "Rule", kny5: "Eat" },
//     { dayKP: "Wednes", bird: "Owl", seqID_KD: "KD5", kdy1: "Rule", kdy2: "Walk", kdy3: "Eat", kdy4: "Death", kdy5: "Sleep", seqID_KN: "KN2", kny1: "Eat", kny2: "Sleep", kny3: "Walk", kny4: "Death", kny5: "Rule" },
//     { dayKP: "Wednes", bird: "Peacock", seqID_KD: "KD2", kdy1: "Walk", kdy2: "Eat", kdy3: "Death", kdy4: "Sleep", kdy5: "Rule", seqID_KN: "KN1", kny1: "Walk", kny2: "Death", kny3: "Rule", kny4: "Eat", kny5: "Sleep" },
//     { dayKP: "Wednes", bird: "Crow", seqID_KD: "KD1", kdy1: "Eat", kdy2: "Death", kdy3: "Sleep", kdy4: "Rule", kdy5: "Walk", seqID_KN: "KN3", kny1: "Rule", kny2: "Eat", kny3: "Sleep", kny4: "Walk", kny5: "Death" },
//     { dayKP: "Thursday", bird: "Cock", seqID_KD: "KD2", kdy1: "Walk", kdy2: "Eat", kdy3: "Death", kdy4: "Sleep", kdy5: "Rule", seqID_KN: "KN3", kny1: "Rule", kny2: "Eat", kny3: "Sleep", kny4: "Walk", kny5: "Death" },
//     { dayKP: "Thursday", bird: "Eagle", seqID_KD: "KD5", kdy1: "Rule", kdy2: "Walk", kdy3: "Eat", kdy4: "Death", kdy5: "Sleep", seqID_KN: "KN1", kny1: "Walk", kny2: "Death", kny3: "Rule", kny4: "Eat", kny5: "Sleep" },
//     { dayKP: "Thursday", bird: "Owl", seqID_KD: "KD1", kdy1: "Eat", kdy2: "Death", kdy3: "Sleep", kdy4: "Rule", kdy5: "Walk", seqID_KN: "KN4", kny1: "Sleep", kny2: "Walk", kny3: "Death", kny4: "Rule", kny5: "Eat" },
//     { dayKP: "Thursday", bird: "Peacock", seqID_KD: "KD3", kdy1: "Death", kdy2: "Sleep", kdy3: "Rule", kdy4: "Walk", kdy5: "Eat", seqID_KN: "KN5", kny1: "Death", kny2: "Rule", kny3: "Eat", kny4: "Sleep", kny5: "Walk" },
//     { dayKP: "Thursday", bird: "Crow", seqID_KD: "KD4", kdy1: "Sleep", kdy2: "Rule", kdy3: "Walk", kdy4: "Eat", kdy5: "Death", seqID_KN: "KN2", kny1: "Eat", kny2: "Sleep", kny3: "Walk", kny4: "Death", kny5: "Rule" },
//     { dayKP: "Friday", bird: "Cock", seqID_KD: "KD3", kdy1: "Death", kdy2: "Sleep", kdy3: "Rule", kdy4: "Walk", kdy5: "Eat", seqID_KN: "KN4", kny1: "Sleep", kny2: "Walk", kny3: "Death", kny4: "Rule", kny5: "Eat" },
//     { dayKP: "Friday", bird: "Eagle", seqID_KD: "KD1", kdy1: "Eat", kdy2: "Death", kdy3: "Sleep", kdy4: "Rule", kdy5: "Walk", seqID_KN: "KN3", kny1: "Rule", kny2: "Eat", kny3: "Sleep", kny4: "Walk", kny5: "Death" },
//     { dayKP: "Friday", bird: "Owl", seqID_KD: "KD4", kdy1: "Sleep", kdy2: "Rule", kdy3: "Walk", kdy4: "Eat", kdy5: "Death", seqID_KN: "KN5", kny1: "Death", kny2: "Rule", kny3: "Eat", kny4: "Sleep", kny5: "Walk" },
//     { dayKP: "Friday", bird: "Peacock", seqID_KD: "KD5", kdy1: "Rule", kdy2: "Walk", kdy3: "Eat", kdy4: "Death", kdy5: "Sleep", seqID_KN: "KN2", kny1: "Eat", kny2: "Sleep", kny3: "Walk", kny4: "Death", kny5: "Rule" },
//     { dayKP: "Friday", bird: "Crow", seqID_KD: "KD2", kdy1: "Walk", kdy2: "Eat", kdy3: "Death", kdy4: "Sleep", kdy5: "Rule", seqID_KN: "KN1", kny1: "Walk", kny2: "Death", kny3: "Rule", kny4: "Eat", kny5: "Sleep" }
// ];

/**
 * Returns all rows matching a specific day.
 * @param {string} day - e.g., "Tuesday" or "Mon"
 * @returns {Array} - Array of matching bird objects
 */
function getScheduleByDay(day) {
    return sequenceData.filter(row => {
        // Standardize to lowercase for easier searching
        const searchDay = day.toLowerCase();
        const tableDay = row.day.toLowerCase();

        return tableDay.includes(searchDay);
    });
}

// Example usage:
const tuesdaySchedule = getScheduleByDay("Tue");
//console.log(JSON.stringify(tuesdaySchedule, null, 2));
//console.log(scriptname + "........LOADED");

/**
 * Function to retrieve sequence ID based on parameters
 * @param {string} currentDay - Day of the week (e.g., "Monday", "Tuesday")
 * @param {string} paksha - Lunar phase ("Shukla" or "Krishna")
 * @param {string} bird - Bird type ("Eagle", "Owl", "Crow", "Cock", "Peacock")
 * @param {string} dayNight - Time of day ("Day" or "Night")
 * @returns {string|null} - Returns the sequence ID or null if not found
 */
function getSequenceId(currentDay, paksha, bird, dayNight) {
    // Normalize inputs
    console.log("Passed Parametets", currentDay, paksha, bird, dayNight);
    currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1).toLowerCase();
    paksha = paksha.charAt(0).toUpperCase() + paksha.slice(1).toLowerCase();
    bird = bird.charAt(0).toUpperCase() + bird.slice(1).toLowerCase();
    dayNight = dayNight.charAt(0).toUpperCase() + dayNight.slice(1).toLowerCase();

    // Find matching record
    const record = sequenceData.find(item =>
        item.day === currentDay &&
        item.paksha === paksha &&
        item.bird === bird
    );

    if (!record) {
        return null;
    }

    // Return appropriate sequence based on day/night
    if (dayNight === "Day") {
        return record.seqDay;
    } else if (dayNight === "Night") {
        return record.seqNight;
    } else {
        return null;
    }
}

// Example usage:
console.log("Example 1:", getSequenceId("Sunday", "Shukla", "Eagle", "Day"));     // Output: SD1
console.log("Example 2:", getSequenceId("Monday", "Krishna", "Peacock", "Night")); // Output: KN3
console.log("Example 3:", getSequenceId("Friday", "Shukla", "Crow", "Night"));    // Output: SN2
console.log("Example 4:", getSequenceId("Thursday", "Krishna", "Owl", "Day"));    // Output: KD1

// Export for use in other modules (if using Node.js modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getSequenceId, sequenceData };
}
/**
 * Function to get Yama element based on Sequence ID and Yama number
 * @param {string} seqID - Sequence ID (e.g., "SD1", "KN3")
 * @param {number|string} yamaNum - Yama number (1-5 or "yama1"-"yama5")
 * @returns {string|null} - Returns the Yama element (Eat, Walk, Rule, Sleep, Death) or null if not found
 */
function getYamaElement(seqID, yamaNum) {
    // Normalize seqID to uppercase
    seqID = seqID.toUpperCase();

    // Check if sequence exists
    if (!yamaData[seqID]) {
        return null;
    }

    // Handle different yamaNum formats
    let yamaKey;
    if (typeof yamaNum === 'number') {
        // If number, validate range and convert to key
        if (yamaNum < 1 || yamaNum > 5) {
            return null;
        }
        yamaKey = `yama${yamaNum}`;
    } else if (typeof yamaNum === 'string') {
        // If string, check if it's a number or already formatted
        if (yamaNum.toLowerCase().startsWith('yama')) {
            yamaKey = yamaNum.toLowerCase();
        } else {
            const num = parseInt(yamaNum);
            if (isNaN(num) || num < 1 || num > 5) {
                return null;
            }
            yamaKey = `yama${num}`;
        }
    } else {
        return null;
    }

    // Return the Yama element
    return yamaData[seqID][yamaKey] || null;
}

/**
 * Combined function to get Yama element directly from day, paksha, bird, daynight, and yama number
 * This combines both functions for convenience
 * @param {string} currentDay - Day of the week
 * @param {string} paksha - Lunar phase (Shukla or Krishna)
 * @param {string} bird - Bird type
 * @param {string} dayNight - Time of day (Day or Night)
 * @param {number|string} yamaNum - Yama number (1-5)
 * @returns {object} - Returns object with sequenceId and yamaElement, or null if not found
 */
function getYamaFromParameters(currentDay, paksha, bird, dayNight, yamaNum) {
    // First get the sequence ID (assuming getSequenceId is available)
    const sequenceId = getSequenceId(currentDay, paksha, bird, dayNight);

    if (!sequenceId) {
        return { sequenceId: null, yamaElement: null, error: "Sequence not found" };
    }

    // Then get the Yama element
    const yamaElement = getYamaElement(sequenceId, yamaNum);

    if (!yamaElement) {
        return { sequenceId, yamaElement: null, error: "Yama element not found" };
    }

    return { sequenceId, yamaElement, error: null };
}

/**
 * Function to get all Yama elements for a given Sequence ID
 * @param {string} seqID - Sequence ID
 * @returns {object|null} - Returns object with all 5 Yama elements or null if not found
 */
function getAllYamas(seqID) {
    seqID = seqID.toUpperCase();

    if (!yamaData[seqID]) {
        return null;
    }

    return yamaData[seqID];
}

// Example usage:
console.log("\n=== Example Usage ===\n");

// Example 1: Get a specific Yama element
console.log("Example 1: getYamaElement('SD1', 1)");
console.log("Result:", getYamaElement("SD1", 1)); // Output: Eat

// Example 2: Get Yama with different number format
console.log("\nExample 2: getYamaElement('KN3', 'yama3')");
console.log("Result:", getYamaElement("KN3", "yama3")); // Output: Sleep

// Example 3: Get all Yamas for a sequence
console.log("\nExample 3: getAllYamas('SD2')");
console.log("Result:", getAllYamas("SD2"));
// Output: { yama1: 'Walk', yama2: 'Rule', yama3: 'Sleep', yama4: 'Death', yama5: 'Eat' }

// Example 4: Combined function (requires getSequenceId from previous file)
console.log("\nExample 4: Combined lookup");
console.log("Parameters: Sunday, Shukla, Eagle, Day, Yama 2");
// First, we need getSequenceId which returns "SD1"
// Then getYamaElement("SD1", 2) returns "Walk"

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getYamaElement,
        getAllYamas,
        getYamaFromParameters,
        yamaData
    };
}

console.log(getExecutingFileName() + ".............LOADED");
