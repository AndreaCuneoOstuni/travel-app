function checkInput(location, departure) {

    // const regex = ;
    const cityRegex = location.match(/^[a-zA-Z]*$/);

    let input = {
        value: true,
        message: '',
    };

    if (departure == '' || location == '') {
        input.message = 'Please select a date and destination';
        input.value = false;
    } else if (cityRegex == null) {
        input.message = 'Please select a valid destination';
        input.value = false;
    }
    return input;
}

export { checkInput }