//Functions for Jyotish 
//By : Sanjay Prabhakaran
//Signs: 1 Aries, 2 Taurus....12/0 Pisces
function GetDivisionalSign(degrees,division,object)//For a given degree get the division (D1,D2, etc) sign 
{
	//alert(object);
		degrees%=360; //Remove Excess of 360
		var Sign = parseInt(degrees/30+0.999999999); /// 1 = Aries;
		var SignOdd = Sign%2;//1=Odd 0=Even
		var SignDeg = degrees%30;
		var Amsha = 0;
		var ParasharaTrimshamsa=[ 
				[ 2,2,2,2,2, 6,6,6,6,6,6,6, 12,12,12,12,12,12,12,12,  10,10,10,10,10, 8,8,8,8,8  ], //For Even Signs
				[1,1,1,1,1, 11,11,11,11,11, 9,9,9,9,9,9,9,9, 3,3,3,3,3,3,3, 7,7,7,7,7  ] //For Odd Signs
				];
		var d3s = [7,//Index begins from 1, so this is dummy on second cycle i.e 37th Somanatha D3 falls on Tula.
		   1,2,3,    12,11,10,//Ta
		   4,5,6,    9,8,7,//Cn
		   7,8,9,    6,5,4,
		   10,11,12, 3,2,1,
			1,2,3,    12,11,10,
		   4,5,6,    9,8,7
		   ];
		switch(division){
			case "Rashi":
			case "D1":
			default: {//Assume we need Rashi chart on default i.e if not clear.
				division="Rashi";
				k=Sign; //Rashi sign does no change
				break;}
			case "Dreshkana":
			case "D3":
				{
				AmshaPortion = 10;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=Sign+(Amsha*4-4);
				k%=12;
				if(k==0)k=12;
				break;
				}
			case "D3-Somanatha":
			case "D3-S":{
				AmshaCycles = 3;//cycles
				AmshaPortion = 10;//Degrees
				AmshaPada = parseInt((degrees%360)/AmshaPortion+0.999999999);
				k=d3s[AmshaPada];
				console.log(degrees,AmshaPortion,AmshaPada,k);
				break;}
			case "Chaturtamsa":
			case "D4":
				AmshaPortion = 7.5;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=Sign+(Amsha*3-3);
				k%=12;
				if(k==0)k=12;
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
			case "Trimshamsha":
			case "D30":
				AmshaPortion = 1;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=ParasharaTrimshamsa[SignOdd][Amsha];
				break;
			case "Shastiamsha":
			case "D60":
				AmshaPortion = 0.5;
				Amsha = parseInt(SignDeg/AmshaPortion+0.999999999);
				k=Sign+Amsha-1;
				k%=12;
				if(k==0)k=12;
				break;
			//For All Cyclic 
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
			case "Shodashamsa":
			case "D16":
				AmshaCycles = 16;
				k=parseInt(( (degrees*AmshaCycles)%360)/30+0.999999999);
				break;
			case "Vimsamsa":
			case "D20":
				AmshaCycles = 20;
				k=parseInt(( (degrees*AmshaCycles)%360)/30+0.999999999);
				break;
			case "Bhamsa-Nakshatramsa":
			case "D27":
				AmshaCycles = 27;
				k=parseInt(( (degrees*AmshaCycles)%360)/30+0.999999999);
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
			//For All Cyclic Charts

		}
	return k;
}
///////////////////////////////////////////////////////////////////
function getPlainChart(chart,division){
	var a="";
	var k=0;
	var i=0;
	var s = ["","","","","","","","","","","","",""];
	for(i=0;i<=9;++i){//For each of the Graha in 'i' find the divisional sign 'k'
		k=GetDivisionalSign(chart[i].long,division);
		s[k]=(s[k]?s[k]+", ":"")+chart[i].tx+chart[i].retro;
	}
	for(i=0;i<=12;++i) s[i]=s[i]+"&nbsp";
	a="<style type='text/css'>.chart td {width: 4em;height: 4em;}</style>";
	a=a+"<div id=chart class='chart'> <table cellspacing=1 border=1 cellpadding=1 border=0>\n";
	a=a+"  <tr>";
	a=a+"    <td id=12 align=center>"+s[12]+"</td>";
	a=a+"    <td id=1 align=center>"+s[1]+" </td>";
	a=a+"    <td id=2 align=center>"+s[2]+" </td>";
	a=a+"    <td id=3 align=center>"+s[3]+" </td>";
	a=a+"    </tr>";
	a=a+"  <tr>";
	a=a+"    <td id=11 align=center>"+s[11]+" </td>";
	a=a+"    <td border=1 colspan=2 rowspan=2 id=0 align=middle>"+division+"</td>";
	a=a+"    <td  id=4 align=center>"+s[4]+" </td>";
	a=a+"    </tr>";
	a=a+"  <tr>";
	a=a+"    <td id=10 align=center>"+s[10]+" </td>";
	a=a+"    <td id=5 align=center>"+s[5]+" </td>";
	a=a+"    </tr>";
	a=a+"  <tr>";
	a=a+"    <td id=9 align=center>"+s[9]+" </td>";
	a=a+"    <td id=8 align=center>"+s[8]+" </td>";
	a=a+"    <td id=7 align=center>"+s[7]+" </td>";
	a=a+"    <td id=6 align=center>"+s[6]+" </td>";
	a=a+"    </tr>";
	a=a+" </table></div>";
 return a;
 }
///////////////////////////////////////////////////////////////////