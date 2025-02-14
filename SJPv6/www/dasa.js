//-----------------------------------------------------------
onerror=handleErr;
function formChanged(element){
	console.log("Element Changed="+element.id+"\nValue="+element.value);
	switch(element.id){
		case 'dasha':
			if(element.value=="Ashtottari-Ardra")document.getElementById('ayush').value=108;
			break;
	}
}
function handleErr(msg,url,l)
{
    txt="There was an error on this page.\n\n";
    txt+="Error: " + msg + "\n";
    txt+="URL: " + url + "\n";
    txt+="Line: " + l + "\n\n";
    txt+="Click OK to continue.\n\n";
    alert(txt);
	return true;
}
var DEBUG=true;
function debug()
{
 if(!DEBUG)return;
 k="Values";
 for(i=0;i<arguments.length;++i)k+="--\n"+arguments[i];
 alert(k);
 return
}
// function to calculate local time
// in a different city
// given the citys UTC offset
function calcLocalTime(d) {
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);    // convert to msec , add local time zone offset , get UTC time in msec
    nd = new Date(utc + (3600000*TimeZoneOffset));// create new Date object for different city using supplied offset
    return nd;//nd.toLocaleString();
}
//-----------------------------------------------------------
var UduDasaVimshottari = [
//		[0 "27Scheme",1 "Nakshatra",2 0/*End sphuta*/,2 "Dasa",4 "120"/*Vim Years"*/],
		[27,"Revati",0,"Mercury",17],
		[ 1,"Ashvini",13+1/3,"Ketu",7],
		[ 2,"Bharani",26+2/3,"Venus",20],
		[ 3,"Kritika",40,"Sun",6],
		[ 4,"Rohini",53+1/3,"Moon",10],
		[ 5,"Mrigashira",66+2/3,"Mars",7],
		[ 6,"Ardra",80,"Rahu",18],
		[ 7,"Punarvasu",93+1/3,"Jupiter",16],
		[ 8,"Pushya",106+2/3,"Saturn",19],
		[ 9,"Ashlesha",120,"Mercury",17],
		[10,"Magha",133+1/3,"Ketu",7],
		[11,"Purva Phalguni",146+2/3,"Venus",20],
		[12,"Uttara Phalguni",160,"Sun",6],
		[13,"Hasta",173+1/3,"Moon",10],
		[14,"Chitra",186+2/3,"Mars",7],
		[15,"Swati",200,"Rahu",18],
		[16,"Vishakha",213+1/3,"Jupiter",16],
		[17,"Anuradha",226+2/3,"Saturn",19],
		[18,"Jyeshtha",240,"Mercury",17],
		[19,"Mula",253+1/3,"Ketu",7],
		[20,"Purva Ashadha",266+2/3,"Venus",20],
		[21,"Uttara Ashadha",280,"Sun",6],
		[22,"Shravan",293+1/3,"Moon",10],
		[23,"Dhanistha",306+2/3,"Mars",7],
		[24,"Shatabhishaj",320,"Rahu",18],
		[25,"Purva Bhadrapad",333+1/3,"Jupiter",16],
		[26,"Uttara Bhadrapad",346+2/3,"Saturn",19],
		[27,"Revati",360,"Mercury",17]
];
var nax28 = [//28 Nakshatra begininng degrees and index number
	[28,"Revati",346.67], //i=0 28th nax, revati
	[1,"Aswini",0.00],
	[2,"Bharani",13.33],
	[3,"Krittika",26.67],
	[4,"Rohini",40.00],
	[5,"Mriga",53.33],
	[6,"Ardra",66.67],
	[7,"Punarvasu",80.00],
	[8,"Pushya",93.33],
	[9,"Ashlesha",106.67],
	[10,"Magha",120.00],
	[11,"Purva P",133.33],
	[12,"Uttara P",146.67],
	[13,"Hasta",160.00],
	[14,"Chitra",173.33],
	[15,"Swati",186.67],
	[16,"Vishaka",200.00],
	[17,"Anuradha",213.33],
	[18,"Jyeshta",226.67],
	[19,"Moola",240.00],
	[20,"P. Ashada",253.33],
	[21,"U. Ashada",266.67],
	[22,"Abhijit",276.67],
	[23,"Shravana",280.89],
	[24,"Dhanishta",293.33],
	[25,"Shatabhishaj",306.67],
	[26,"P. Bhadra",320.00],
	[27,"U. Bhadra",333.33],
	[28,"Revati",346.67]
];



//Though below is const it's properties can be changed.
const DasaNx28= [ 
{nax:'Revati',graha:'Rahu',years:'3.000',dashasamaa:12},
{nax:'Aswini',graha:'Rahu',years:'3.000',dashasamaa:12},
{nax:'Bharani',graha:'Rahu',years:'3.000',dashasamaa:12},
{nax:'Krittika',graha:'Venus',years:'7.000',dashasamaa:21},
{nax:'Rohini',graha:'Venus',years:'7.000',dashasamaa:21},
{nax:'Mriga',graha:'Venus',years:'7.000',dashasamaa:21},
{nax:'Ardra',graha:'Sun',years:'1.500',dashasamaa:6},
{nax:'Punarvasu',graha:'Sun',years:'1.500',dashasamaa:6},
{nax:'Pushya',graha:'Sun',years:'1.500',dashasamaa:6},
{nax:'Ashlesha',graha:'Sun',years:'1.500',dashasamaa:6},
{nax:'Magha',graha:'Moon',years:'5.000',dashasamaa:15},
{nax:'Purva P',graha:'Moon',years:'5.000',dashasamaa:15},
{nax:'Uttara P',graha:'Moon',years:'5.000',dashasamaa:15},
{nax:'Hasta',graha:'Mars',years:'2.000',dashasamaa:8},
{nax:'Chitra',graha:'Mars',years:'2.000',dashasamaa:8},
{nax:'Swati',graha:'Mars',years:'2.000',dashasamaa:8},
{nax:'Vishaka',graha:'Mars',years:'2.000',dashasamaa:8},
{nax:'Anuradha',graha:'Mercury',years:'5.667',dashasamaa:17},
{nax:'Jyeshta',graha:'Mercury',years:'5.667',dashasamaa:17},
{nax:'Moola',graha:'Mercury',years:'5.667',dashasamaa:17},
{nax:'P. Ashada',graha:'Saturn',years:'2.500',dashasamaa:10},
{nax:'U. Ashada',graha:'Saturn',years:'2.500',dashasamaa:10},
{nax:'Abhijit',graha:'Saturn',years:'2.500',dashasamaa:10},
{nax:'Shravana',graha:'Saturn',years:'2.500',dashasamaa:10},
{nax:'Dhanishta',graha:'Jupiter',years:'6.333',dashasamaa:19},
{nax:'Shatabhishaj',graha:'Jupiter',years:'6.333',dashasamaa:19},
{nax:'P. Bhadra',graha:'Jupiter',years:'6.333',dashasamaa:19},
{nax:'U. Bhadra',graha:'Rahu',years:'3.000',dashasamaa:12},
{nax:'Revati',graha:'Rahu',years:'3.000',dashasamaa:12}
 ];

var params; //from the URL
var paramslist=[];

function subtractFractionalDays(date, fractionalDays) {
    // Calculate milliseconds in the fractional days
    const millisecondsToSubtract = fractionalDays * 24 * 60 * 60 * 1000;
    
    // Subtract the milliseconds from the date
    const newDate = new Date(date.getTime() - millisecondsToSubtract);
    
    return newDate;
}
function dasaNxStartdate(naxamsha,dasakaala,ishtadate){
	//d=new Date();
	//i=new Date(ishtadate);
	fdays=dasakaala*365.256363004*(naxamsha%1);
	d=structuredClone(ishtadate);
	d=subtractFractionalDays(d,fdays);
	return d;
}
function find28nax(moondeg){
	moondeg%=360;
	i=0;
	bhukt=0;
	search=true;
	do{
		console.log(nax28[i+1]);
		if(moondeg<nax28[i+1][2]){
			//Found 
			span=nax28[i+1][2]-nax28[i][2];
			past=moondeg-nax28[i][2];
			bhukt=past/span;
			search=false;
			break;
		}
		i++;
		if(i==28){
			alert("nx not found ");
			break;
		}
	}while(search);
	return i+bhukt-1;
}
///script script
//------------------Init block-------------------------
function init(){
	submit=false;
	URL2params();
	window.status="Set values.";
	if(paramslist["submit"]=="Calculate")submit=true;
	if(submit==true)calculate();
	
}
function URL2params(){//Loads the global params and params list variable.
	params=window.location.href.split("?");
	if(params[1] != null)
	{
	 params=params[1].split("&");
	 for(i=0;i<params.length;++i){
			var p = params[i].split("=");
			document.getElementById(p[0]).value =document.getElementById(p[0]).value.replace(/\+/g," ");
			document.getElementById(p[0]).value=unescape(p[1]);
			p[1]=p[1].replace(/\+/g," ");
			params[p[0]]=unescape(p[1]).replaceAll("+"," ");
			paramslist[p[0]]=unescape(p[1]).replaceAll("+"," ");
			if(p[0]=="submit" && p[1]=="Calculate")submit=true;
		}
	}
return params;
}
//-----------------------------------------------------------
function MakeURLParams(fromURL,paramslist,submit){
// Pass in URL and it will add parameters from 'paramslist' example: paramslist['lat']=12 becomes "lat=12&" appended to URL.
//always make submit =1 to append.
// note: previous parameters in 'fromURL' will be not used and removed.
	var url="";
	var p=fromURL.split("?");
	url = p[0]+"?";
	for(keys in paramslist){
		if ( submit || (keys != "submit" && paramslist[keys] != "Calculate"))
		{
			url+=keys+"="+encodeURIComponent(paramslist[keys])+"&";
		}	
	}
	url=url.substring(0,url.length-1);
	return url;
}
function calculate(){//Called when 'calculate' button is pressed.
	document.getElementsByTagName("body")[0].innerHTML="";
    var editlink = '<a href='+window.location.href.replace("&submit=Calculate","")+'><strong>Change the Data</strong></a>';    
   if(typeof(params['starting'])=='undefined')params['starting']=0;
   
    document.write("<b>URL Command : </b>"+MakeURLParams(window.location.href,paramslist,1)+"<br><br>"+
					editlink + 
					getUduDasa(params['desc'],params['sphuta'],params['datetime'],params['dasha'],params['eventdatetime'],params['antaradasha'],params['ayush'],params['starting']).html + 
					editlink);
	document.close();
}

function getUduDasa(desc,sphuta,datetime,dasha,eventdatetime,antaradasha,ayush,starting){
	sphuta%=360;
	text="";
	var d= new Date();
	d.setTime(Date.parse(datetime));
	this.moon = sphuta;
	this.date = d;
	this.html="<table border=1>";
	switch(dasha){
		default:
			alert("Not Implemented "+dasha);
		case undefined:
		case "Vimshottari":
			compress=ayush/120;
			this.dasa="VIMSHOTTARI";
			var dasayear = new Array();
			nx=this.moon/13.333333;
			i=Math.trunc(nx)+1; //Nx index
			nx_past = nx-Math.trunc(nx);////(moon-UduDasaVimshottari[i-1][2])/(UduDasaVimshottari[i][2]-UduDasaVimshottari[i-1][2]);
			i=(antaradasha==1)?i+1*starting:i;
			yearsPast=(nx_past)*UduDasaVimshottari[i][4]; //Years past in the 
			this.html+= "<br>"+desc+"<br>Vimshottari<br><tr><th>Dasa</th><th>Start Year</th><th>Duration</th></tr>";
			d.setTime(d.getTime()-yearsPast*365.25*compress*24*60*60*1000);
			//alert(i);
			--i;//Correct NX Index after calculating the 1st dasa balance, to start sequence.
			cycles=(antaradasha==1)?30:10;
			for(k=1;k<cycles;++k){
				++i;if(i>27)i=i-27//1;//i is the dasa index
				var dasa_end = new Date();
				var eventdatetime = new Date();
				eventdatetime.setTime(d.getTime()+1);
				duration=UduDasaVimshottari[i][4]*compress;
				dasa_end.setTime(d.getTime()+duration*365.25*24*60*60*1000);		
				console.log("Dasa End:"+dasa_end);
				paramslist['desc']= desc+" : "+UduDasaVimshottari[i][3]+" "+d.toLocaleString();
				paramslist['sphuta']=UduDasaVimshottari[i][2]-13.33333331;
				paramslist["antaradasha"]=1*(params['antaradasha'])+1;
				paramslist["eventdatetime"]=eventdatetime.toLocaleString();//params['datetime'];;	
				paramslist['timezone']=params['timezone'];
				paramslist['starting']=params['starting'];
				paramslist['datetime']=d.toISOString();//params['datetime'];
				paramslist['ayush']=UduDasaVimshottari[i][4]*compress;
				paramslist['submit']='Calculate';
  				this.html+= "<tr><td>"+
							"<a href="+MakeURLParams(window.location.href,paramslist,1)+">"+
								UduDasaVimshottari[i][3]+"</a></td><td>"+											
							d.toLocaleString()+"</td><td>"+
							duration.toPrecision(2)+"</td></tr>";
				console.log("Dasa Start:"+d);
				d.setTime(dasa_end.getTime());	
			}
			break;
		case "Ashtottari-Ardra":
			d=new Date();
			d.setTime(Date.parse(datetime));
			naxa=find28nax(sphuta);
			naxi=parseInt(naxa+0.99999);
			dasastart=dasaNxStartdate(naxa,DasaNx28[naxi].years,d);
			//alert("dasa params\n"+naxa+"\n"+dasastart+"\n"+DasaNx28[naxi].graha+"\n"+DasaNx28[naxi].years);
			console.log("dasa params\n"+naxa+"\n"+dasastart+"\n"+DasaNx28[naxi].graha+"\n"+DasaNx28[naxi].years);
			///changes to Vismhottari code below
			{
			
			compress=ayush/108;
			this.dasa="ASHTOTTARI";

//			var dasayear = new Array();
//			nx=this.moon/13.333333; replace with naxa from above.
			//i=Math.trunc(nx)+1; //Nx index, use naxi

			nx_past = 1-(naxi-naxa);//nx-Math.trunc(nx);////(moon-UduDasaVimshottari[i-1][2])/(UduDasaVimshottari[i][2]-UduDasaVimshottari[i-1][2]);
			i=(antaradasha==1)?i+1*starting:i;
			desc=(antaradasha==1)?"":i;
			yearsPast=(nx_past)*DasaNx28[naxi].years;//UduDasaVimshottari[i][4]; //Years past in the 
			this.html+= "<br>"+desc+"<br>Ashtottari<br><tr><th>Dasa</th><th>Start Year</th><th>Duration</th></tr>";
			d=dasastart;//d.setTime(d.getTime()-yearsPast*365.25*compress*24*60*60*1000);
			//alert(i);
			--i;//Correct NX Index after calculating the 1st dasa balance, to start sequence.
			cycles=29;//Only eight grahas //(antaradasha==1)?30:10;
			for(k=1;k<cycles;++k){
				++i;if(i>28)i=i-28//1;//i is the dasa index
				var dasa_end = new Date();
				var eventdatetime = new Date();
				eventdatetime.setTime(d.getTime()+1);
				duration=DasaNx28[i].years*compress;//UduDasaVimshottari[i][4]*compress;
				dasa_end.setTime(d.getTime()+duration*365.25*24*60*60*1000);		
				console.log("Dasa End:"+dasa_end);
				paramslist['desc']= desc+" : "+DasaNx28[i].graha+" "+d.toLocaleString();
				paramslist['sphuta']=nax28[i][2];//UduDasaVimshottari[i][2]-13.33333331;
				paramslist["antaradasha"]=1*(params['antaradasha'])+1;
				paramslist["eventdatetime"]=eventdatetime.toLocaleString();//params['datetime'];;	
				paramslist['timezone']=params['timezone'];
				paramslist['starting']=params['starting'];
				paramslist['datetime']=d.toISOString();//params['datetime'];
				paramslist['ayush']=DasaNx28[i].dashasamaa*compress;//UduDasaVimshottari[i][4]*compress;
				paramslist['submit']='Calculate';
  				this.html+= "<tr><td>"+
							"<a href="+MakeURLParams(window.location.href,paramslist,1)+">"+
								DasaNx28[i].graha+"</a></td><td>"+											
							d.toLocaleString()+"</td><td>"+
							duration.toPrecision(2)+"</td></tr>";
				console.log("Dasa Start:"+d);
				d.setTime(dasa_end.getTime());	
			}

			}
			break;
			
	}
	this.html+= "</table>";
	return this;
}
