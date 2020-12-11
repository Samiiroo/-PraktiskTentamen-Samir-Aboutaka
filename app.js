/* Skriv din kod här */
const URL = 'https://restcountries.eu/rest/v2/all';

//hämtar responsen och kollar om det finns errorhär
fetch(URL).then(
    function(response){
        if(response.status === 404){
            throw 'Not found';
        }
            if (response.status === 100) {
                throw 'The API key passed was not valid or has expired';
            } else if (response.status === 105) {
                throw 'The requested service is temporarily unavailable'
            } else if (response.status === 106) {
                throw 'The requested operation failed due to a temporary issue.'
            } else if (response.status === 111) {
                throw 'The requested response format was not found'
            } else if (response.status === 112) {
                throw 'The requested method was not found'
            } else if (response.status === 114) {
                throw 'The SOAP envelope send in the request could not be parsed.'
            } else if (response.status === 115) {
                throw 'The XML-RPC request document could not be parsed.'
            }else if (response.status >= 200 && response.status <= 299) { //finns det ingen error så ska det forsätta som den ska alltså returna respons.json
                return response.json();
            }
    
    
    }
).then(
    function(data){
        let countries = [] //skapar tom array som ska innnehåla länderna
        for (let i = 0; i < 3; i++) { // loop som loopar igenom 3 slumpade länder
            let random = Math.floor(Math.random() * data.length) // random funktkionen
            let country =new Country(data[random].flag, data[random].name, data[random].timezones[0]); // contstruktorn där vi hämtar flagga namn och tid med hjälp av constructorn
            countries.push(country);

        }
        /// hämtar img name och time från HTML DOM Och sedan ger jag dem 3 länderna och lägger in dem i innerhtml med hjälp av DOM och tiden med hjälåp av time prototyp
            let img = document.querySelectorAll('img'); 
            let name = document.querySelectorAll('h1');
            let time = document.querySelectorAll('h3');
           
            for (let i=0; i<countries.length; i++ ) {
            img[i].src = countries[i].img;
            name[i].innerHTML = countries[i].name;
            time[i].innerHTML = ` nuvarande tiden är: ${countries[i].Time()}`;
        }

        })
        
            
///constructor
function Country(_img,_name,_timezone){
    this.img = _img;
    this.name = _name;
    this.timezone=_timezone;

}

    Country.prototype.Time = function () {
        let date = new Date;
        let hourHere = date.getUTCHours();
        let minutesHere = date.getMinutes()
        let time;
        time = Number((this.timezone).substr(3, 3));
        let countryTime = ` ${time + hourHere}:${minutesHere}`;
        return countryTime;
    }

