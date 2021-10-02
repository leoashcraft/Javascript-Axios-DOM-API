const submit = document.getElementById("submit")
const main = document.getElementById("main");
main.style.display = "none";

function parseXmlToJson(xml) {
    const json = {};
    for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
        const key = res[1] || res[3];
        const value = res[2] && parseXmlToJson(res[2]);
        json[key] = ((value && Object.keys(value).length) ? value : res[2]) || null;

    }
    return json;
}

const getData = (e) => {
    e.preventDefault();
    const season = document.getElementById("season").value;
    const round = document.getElementById("round").value;
    axios.get(`http://ergast.com/api/f1/${season}/${round}`
    ).then(response => {
        const data = parseXmlToJson(response.data)
        main.style.display = "block";
        const seasonName = document.getElementById("seasonName");
        const roundName = document.getElementById("roundName");
        const raceName = document.getElementById("raceName");
        const circuitName = document.getElementById("circuitName");
        const locality = document.getElementById("locality");
        const country = document.getElementById("country");
        const thedate = document.getElementById("date")

        seasonName.textContent = season;
        roundName.textContent = round;
        raceName.textContent = data.RaceName;
        circuitName.textContent = data.CircuitName;
        locality.textContent = data.Locality;
        country.textContent = data.Country;
        thedate.textContent = data.Date;

    }).catch(err => {
        const main = document.getElementById("main");
        main.textContent = "Data not found"
        console.log("Incorrect format")
        setTimeout(() => location.reload(), 1000);
    })

}

submit.addEventListener("click", getData)