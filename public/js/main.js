const cityName= document.getElementById("cityName");
const city_name= document.getElementById("city_name");
const submitBtn = document.getElementById("submitBtn");

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');
const datahide2 = document.querySelector('.main_layer_right');

const temp_real_val1 = document.getElementById("temp_real_val1");
const temp_real_val2 = document.getElementById("temp_real_val2");
const temp_real_val3 = document.getElementById("temp_real_val3");
const temp_real_val4 = document.getElementById("temp_real_val4");
const temp_real_val5 = document.getElementById("temp_real_val5");
const temp_real_val6 = document.getElementById("temp_real_val6");

const getInfo = async(event) => {
    event.preventDefault();

     let cityVal = cityName.value;
    if(cityVal === ""){
      city_name.innerText = `Please enter a City Name before search`;
      datahide.classList.add('data_hide');
      datahide2.classList.add('data_hide');
    } else {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=713e283b83f8b0fa79b9dd883b621801`;
            const response = await fetch(url);
            const arrData = await response.json();
    
            city_name.innerText = `${arrData.name}, ${arrData.sys.country}`;
            temp_real_val.innerText = arrData.main.temp;

            const tempMood = arrData.weather[0].main;

            const lat = arrData.coord.lat;
            const lon = arrData.coord.lon;
 
            let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=713e283b83f8b0fa79b9dd883b621801`;
            const response2 = await fetch(url2);
            const arrData2 = await response2.json();
           
            temp_real_val1.innerText = arrData2.daily[1].temp.day;
            temp_real_val2.innerText = arrData2.daily[2].temp.day;
            temp_real_val3.innerText = arrData2.daily[3].temp.day;
            temp_real_val4.innerText = arrData2.daily[4].temp.day;
            temp_real_val5.innerText = arrData2.daily[5].temp.day;
            temp_real_val6.innerText = arrData2.daily[6].temp.day;

            // condition to check weather
            if(tempMood == "Clear") {
               temp_status.innerHTML = "<i class ='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class ='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if(tempMood == "Rain") {
                temp_status.innerHTML = "<i class ='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class ='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }
            datahide.classList.remove('data_hide');
            datahide2.classList.remove('data_hide');
        } catch{
            city_name.innerText = `Please enter a Valid City Name`;
            datahide.classList.add('data_hide');
            datahide2.classList.add('data_hide');
        }
    }
}
submitBtn.addEventListener('click', getInfo);