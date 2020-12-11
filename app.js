/* Skriv din kod här */
const URL = 'https://restcountries.eu/rest/v2/all';


fetch(URL).then(
    function(response){
        if(response.status === 404){
            throw 'Not found';
        }
        else{
            return response.json();
        }
    
    }
).then(
    function(data){
        let countries = []
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * data.length)
            let country =new Country(data[random].flag, data[random].name, data[random].timezones[0]);
            countries.push(country);

        }
            let img = document.querySelectorAll('img');
            let name = document.querySelectorAll('h1');
            let time = document.querySelectorAll('h3');
           
            for (let i=0; i<countries.length; i++ ) {
            img[i].src = countries[i].img;
            name[i].innerHTML = countries[i].name;
            time[i].innerHTML = ` nuvarande tiden är: ${countries[i].Time()}`;
        }

        })
        
            

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

