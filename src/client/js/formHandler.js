async function formHandler(event) {

    event.preventDefault();

    const location = document.getElementById('destination').value;
    const departure = document.getElementById('pickDate').value;

    console.log(departure);

    const inputCheck = Client.checkInput(location, departure);
    console.log(inputCheck);

    if (inputCheck.value == false) {
        alert(`${inputCheck.message}`);
        return;
    }

    // Generate dates data to compare with input
    // Modify user input
    const depDate = new Date(departure);
    const formattedDate = new Date(depDate);
    // generate and modify date object for comparison
    const today = new Date();
    const d = new Date();
    const weekFromNow = d.setDate(d.getDate() + 7);
    const formattedWeekFromNow = new Date(weekFromNow);

    // Compare the date values
    let tripScheduledNextWeek = formattedWeekFromNow < formattedDate; // if true the date is after a week from now

    let geoResData = {};
    let weatherResData = {};
    let pixabayResData = {};

    if (depDate < today ) {
        alert('Select a date in the future');
        return;
    }

    const geoResponse = await fetch('http://localhost:8081/location', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({location: location}),
    });
    try {
        geoResData = await geoResponse.json();
        console.log(geoResData);

    } catch (error) {
        console.log('error: ', error);
    };

    const weatherResponse = await fetch('http://localhost:8081/weather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({lat: geoResData.lat, lng: geoResData.lng, dateInFuture: tripScheduledNextWeek}),
    });
    try {
        const weatherRes = await weatherResponse.json();
        weatherResData = weatherRes.data;
        console.log(weatherResData);

    } catch (error) {
        console.log('error: ', error);
    };

    const pixabayResponse = await fetch('http://localhost:8081/picture', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({location: location, country: geoResData.countryName}),
    });
    try {
        pixabayResData = await pixabayResponse.json();
        console.log(pixabayResData);
    } catch (error) {
        console.log('error: ', error);
    };

    const article = document.getElementById('trip');
    article.innerHTML = Client.updateUI(geoResData, weatherResData, pixabayResData, departure);


}


export { formHandler }



