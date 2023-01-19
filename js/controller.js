function selectDate(date_, i){
    dateSelected = date_ - 1;
    weekdayIndex = i;

    showCalendar();
}

function totalPriceBooking(){
    let totalPrice = 0;
    if(prices.length > 0){
        for(let price of prices){
            totalPrice += price;
        }
        return totalPrice;
    }
    else return 0;
}

function addBooking(){
    let booking = {};
    booking.name = username;
    booking.price = totalPriceBooking();
    booking.month = chosenMonth;
    booking.day = dateSelected;
    booking.hours = hoursSelected;

    bookings.push(booking);
    

    //

    chosenMonth = 0;

    weekdayIndex = null;

    dateSelected = null;

    hoursSelected = [];

    prices = [];

    console.log(bookings);
    showCalendar();

}

function selectHour(hour, priceOfHour){
    console.log(hour);
    console.log(priceOfHour);

    //hourCurrentlySelected = hour;

    hoursSelected.push(hour);

        //dette forutsetter at addons legges til etter at tid er valgt
    if(checkIfSelectionIsFull()){
        prices = [];
        prices.push(getPriceOfDay(weekdayIndex));
    }
    else prices.push(priceOfHour);

    showCalendar();

}

function chooseAllDay(){
    for(let i = 0; i < 24; i++){
        hoursSelected.push(i);

    }
    prices.push(getPriceOfDay(weekdayIndex));

    showCalendar();
}

function emptySelection(){
    hoursSelected = [];
    prices = [];
    showCalendar();
}

