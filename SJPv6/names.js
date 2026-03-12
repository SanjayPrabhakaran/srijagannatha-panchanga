console.log(getExecutingFileName() + ".............");
//Constants and functions which are language dependent like names of signs, planets, etc. are defined here. This file is included in jyotish.js and not in jyotish.min.js because the latter is minified and the names are replaced by single characters. This file is not minified to allow users to edit it and change the names as per their language and preference.     
//By : Sanjay Prabhakaran
//Signs: 1 Aries, 2 Taurus....12 and 0 Pisces
//Grahas: 1 Sun, 2 Moon, 3 Mars, 4 Mercury, 5 Jupiter, 6 Venus, 7 Saturn, 8 Rahu, 9 Ketu, 10 and 0 Lagna. Lagna is not a planet but we can treat it as one for ease of calculation and representation. Lagna is the sign which is rising on the eastern horizon at the time of birth. It is also called Ascendant. It is very important in Jyotish as it represents the self and the body. It is also the first house in the birth chart. The position of Lagna and its lord (the planet which rules the sign of Lagna) in the birth chart gives a lot of information about the person's physical appearance, health, personality, etc.
var SignNames = ["Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius","Pisces"];
var GrahaNames = [ "Lagna","Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu","Ketu", `Lagna`];
var GrahaNamesShort = [ "La","Su", "Mo", "Ma", "Me", "Ju", "Ve", "Sa", "Ra","Ke", `La`];
var GrahaSymbosl = [ "/","☉", "☽", "♂", "☿", "♃", "♀", "♄", "☊","☋","/"];

///////////////////////////////////////////////////////////////////
console.log(getExecutingFileName() + ".............LOADED");
