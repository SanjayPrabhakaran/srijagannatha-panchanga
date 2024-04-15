//	["Cyc","Pada","Paramayus","Deha","Jeeva","R1","R2","R3","R4","R5","R6","R7","R8","R9","Amshi","Years"],
const kcd_desc = `[
	["S1","1","100","Aries","Sagittarius","Ar","Ta","Ge","Cn","Le","Vi","Li","Sc","Sg","Ar","7"],
	["S2","2","85","Capricorn","Gemini","Cp","Aq","Pi","Sc","Li","Vi","Cn","Le","Ge","Ta","16"],
	["S3","3","83","Taurus","Gemini","Ta","Ar","Pi","Aq","Cp","Sg","Ar","Ta","Ge","Ge","9"],
	["S4","4","86","Cancer","Pisces","Cn","Le","Vi","Li","Sc","Sg","Cp","Aq","Pi","Cn","21"],
	["S5","1","100","Scorpio","Pisces","Sc","Li","Vi","Cn","Le","Ge","Ta","Ar","Pi","Le","5"],
	["S6","2","85","Aquarius","Virgo","Aq","Cp","Sg","Ar","Ta","Ge","Cn","Le","Vi","Vi","9"],
	["S7","3","83","Libra","Virgo","Li","Sc","Sg","Cp","Aq","Pi","Sc","Li","Vi","Li","16"],
	["S8","4","86","Cancer","Sagittarius","Cn","Le","Ge","Ta","Ar","Pi","Aq","Cp","Sg","Sc","7"],
	["S1","1","100","Aries","Sagittarius","Ar","Ta","Ge","Cn","Le","Vi","Li","Sc","Sg","Sa","10"],
	["S2","2","85","Capricorn","Gemini","Cp","Aq","Pi","Sc","Li","Vi","Cn","Le","Ge","Cp","4"],
	["S3","3","83","Taurus","Gemini","Ta","Ar","Pi","Aq","Cp","Sg","Ar","Ta","Ge","Aq","4"],
	["S4","4","86","Cancer","Pisces","Cn","Le","Vi","Li","Sc","Sg","Cp","Aq","Pi","Pi","10"],
	["S8'","1","86","Sagittarius","Cancer","Sg","Cp","Aq","Pi","Ar","Ta","Ge","Le","Cn","Sc","7"],
	["S7'","2","83","Virgo","Libra","Vi","Li","Sc","Pi","Aq","Cp","Sg","Sc","Li","Li","16"],
	["S6'","3","85","Virgo","Aquarius","Vi","Le","Cn","Ge","Ta","Ar","Sg","Cp","Aq","Vi","9"],
	["S5'","4","100","Pisces","Scorpio","Pi","Ar","Ta","Ge","Le","Cn","Vi","Li","Sc","Cn","21"],
	["S4'","1","86","Pisces","Cancer","Pi","Aq","Cp","Sg","Sc","Li","Vi","Le","Cn","Le","5"],
	["S3'","2","83","Gemini","Taurus","Ge","Ta","Ar","Sg","Cp","Aq","Pi","Ar","Ta","Ge","9"],
	["S2'","3","85","Gemini","Capricorn","Ge","Le","Cn","Vi","Li","Sc","Pi","Aq","Cp","Ta","16"],
	["S1'","4","100","Saggitarius","Aries","Sg","Sc","Li","Vi","Le","Cn","Ge","Ta","Ar","Ar","7"],
	["S4'","1","86","Pisces","Cancer","Pi","Aq","Cp","Sg","Sc","Li","Vi","Le","Cn","Pi","10"],
	["S3'","2","83","Gemini","Taurus","Ge","Ta","Ar","Sg","Cp","Aq","Pi","Ar","Ta","Aq","4"],
	["S2'","3","85","Gemini","Capricorn","Ge","Le","Cn","Vi","Li","Sc","Pi","Aq","Cp","Cp","4"],
	["S1'","4","100","Saggitarius","Aries","Sg","Sc","Li","Vi","Le","Cn","Ge","Ta","Ar","Sa","10"]
]`;
const rashi2chars= ["Ar","Ta","Ge","Cn","Le","Vi","Li","Sc","Sg","Cp","Aq","Pi"];
const kcd_years={"Ar":7,"Ta":16,"Ge":9,"Cn":21,"Le":5,"Vi":9,"Li":16,"Sc":7,"Sg":10,"Cp":4,"Aq":4,"Pi":10};
const kcd_tbl = JSON.parse(kcd_desc);
function getKCDdasa(nax,d,fraction=false)
{
 var kcd={};
 kcd.nak=nax-0.00000000000000000000000001;
 kcd.pada=parseInt(nax*4);
 kcd.pada%=108;
 kcd.i= kcd.pada%24
 kcd.seq=kcd_tbl[kcd.i];
 kcd.dates=[];
 kcd.dasa=[];
 kcd.duration=[];
 kcd.dates[0]=new Date(d);
 kcd.dasa[0]=kcd.seq[5];
 kcd.duration[0]=kcd_years[kcd.dasa[0]];
 if(fraction){
	kcd.duration[0] *= (1-(kcd.nak*4)%1);
 }
 for (j=1;j<9;++j){
	kcd.dasa[j]=kcd.seq[j+5];
	kcd.duration[j]=kcd_years[kcd.dasa[j]];
	kcd.dates[j]=new Date(kcd.dates[j-1]);
	kcd.dates[j].setDate(kcd.dates[j].getDate()+365.2425*kcd.duration[j-1]);
 }
 return kcd;
}