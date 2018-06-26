	var calendarPlugin = {
		getEvent: function(args, successCallback, errorCallback) {
        cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'SweEphPlugin', // mapped to our native Java class called "CalendarPlugin"
            'getSweEphData', // with this action name
            	args
        ); 
     }
}
