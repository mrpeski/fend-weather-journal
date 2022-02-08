/* Global Variables */
const openWeatherKey = '3321fb262ae62ce9675dd8f70e36f0b9';
const baseUrl = 'http://api.openweathermap.org/data/2.5';

// Create a new date instance dynamically with JS
let d = new Date();
// Adds 1 to month because its zero based.
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


function main(){
    let elem = document.getElementById("generate");
    elem.addEventListener('click', handleGenerateClick);
}

window.addEventListener('load', main);

async function handleGenerateClick(){
    let zip = document.getElementById("zip").value;
    let feelings = document.getElementById("feelings").value;
    let data = {
        date: newDate,
        content: feelings
    };
    try {
        execFetch(baseUrl,zip,openWeatherKey)
            .then((temperature) => {
                return postData("/project", {...data, temperature})
            }, handleError)
            .then((res) => fetch('/project')).then(res => res.json())
            .then((data) => updateUI(data));
    } catch (e) {
        console.log(e)
    }
}

async function execFetch(baseUrl, zip, apiKey) {
        // 94040
       return fetch(`${baseUrl}/weather?zip=${zip},us&appid=${apiKey}`)
           .then(res => res.json())
           .then(res => res.main.temp);
}


async function postData(path="/project", data){
    try {
        const res = await fetch(path, {
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            method:"POST",
            body: JSON.stringify(data)
        })
        return res.json();
    } catch (e) {
        console.log(e);
    }
}


async function updateUI(data){
    document.getElementById("date").innerHTML = `<span>${data.date}</span>`;
    document.getElementById("temp").innerHTML = `<span>${data.temperature}</span>`;
    document.getElementById("content").innerHTML = `<span>${data.content}</span>`;
}


const handleError = (e) => {
    return Promise.reject(e)
}