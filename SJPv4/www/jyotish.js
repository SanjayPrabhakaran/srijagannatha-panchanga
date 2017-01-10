//Functions for Jyotish 
//By : Sanjay Prabhakaran
//1 Aries, 2 Taurus....12/0 Pisces
function GetDivisionalSign(degrees,division,object)//For a given degree get the division (D1,D2, etc) sign 
{
	//alert(object);
		degrees%=360; //Remove Excess of 360
		var Sign = parseInt(degrees/30+0.999999999); /// 1 = Aries;
		var SignOdd = Sign%2;//1=Odd 0=Even
		var SignDeg = degrees%30;
		var Amsha = 0;
		switch(division){
			case "Rashi":
			case "D1":
			default: //Assume Rashi on default i.e if not clear.
				division="Rashi";
				k=Sign;
				break;
			case "Dreshkana":
			case "D3":
				AmshaPortion = 10;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=Sign+(Amsha*4-4);
				k%=12;
				if(k==0)k=12;
				break;
			case "Saptamsa":
			case "D7":
				AmshaCycles = 7;
				k=parseInt(( (degrees*AmshaCycles)%360)/30+0.999999999);
				break;
			case "Navamsa":
			case "D9":
				AmshaCycles = 9;
				k=parseInt(( (degrees*AmshaCycles)%360)/30+0.999999999);
				break;
			case "Dasamsa":
			case "D10":
				AmshaPortion = 3;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=SignOdd?Sign+(Amsha-1):Sign+(9-1)+(Amsha-1);
				k%=12;
				if(k==0)k=12;
				break;
			case "Dasamsa-EvenReverse":
				AmshaPortion = 3;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=SignOdd?Sign+(Amsha-1):Sign+(9-1)-(Amsha-1);
				k%=12;
				if(k==0)k=12;
				break;
			case "Dwadasamsa":
			case "D12":
				AmshaPortion = 2.5;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=Sign+Amsha-1;
				k%=12;
				if(k==0)k=12;
				break;
			case "Shodashamsa":
			case "D16":
				AmshaCycles = 16;
				k=parseInt(( (degrees*AmshaCycles)%360)/30+0.999999999);
				break;
			case "Vimsamsa":
			case "D20":
				k=parseInt(( (degrees*20)%360)/30+0.999999999);
				break;
			case "ChaturVimshamsha":
			case "D24":
				AmshaPortion = 30/24;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=SignOdd?5+(Amsha-1):4+(Amsha-1);
				k+=24;k%=12;
				if(k==0)k=12;
				break;
			case "ChaturVimshamsha-EvenReverse":
				AmshaPortion = 30/24;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=SignOdd?5+(Amsha-1):4-(Amsha-1);
				k+=24;k%=12;
				if(k==0)k=12;
				break;
			case "KhaVedamsa":
			case "D40":
				AmshaCycles = 40;
				k=parseInt(( (degrees*AmshaCycles)%360)/30+0.999999999);
				break;
			case "AkshaVedamsa":
			case "D45":
				AmshaCycles = 45;
				k=parseInt(( (degrees*AmshaCycles)%360)/30+0.999999999);
				break;
			case "Shastiamsha":
			case "D60":
				AmshaPortion = 0.5;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=Sign+Amsha-1;
				k%=12;
				if(k==0)k=12;
				break;
		}
	return k;
}
