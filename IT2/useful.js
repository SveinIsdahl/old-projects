   let requestURL = 'projects/calendar/calendar.json';
   let request = new XMLHttpRequest();
   request.open('GET', requestURL);
   request.responseType = 'json';
   request.send();

   request.onload = function() {
       const response = request.response;
   }