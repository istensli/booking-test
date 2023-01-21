

//dette blir som hotellbooking...
showCalendar();
function showCalendar(){
    let html = '';
    html += getMonthAsTable();
    document.getElementById('app').innerHTML = html;

}

function getMonthAsTable(){
    let currentMonthIndex = chosenMonth;
    let _table = '';
    let rows = 5;
    let cols = 7;
    let date_ = 1;
    var daysMonth =daysInMonth[currentMonthIndex];                  //${checkIfDayIsFull(chosenMonth, (date_ - 1))? 'class="date-button red-button"' : 'class="date-button"'}
    for(var r=0; r<rows; r++){
        _table+= "<tr>";
            for(var i=0; i<cols; i++){
            if(date_<=daysMonth){
                _table+= /*html*/`<td>                
                    <button ${checkIfDayIsFull(chosenMonth, (date_ - 1))} onclick="selectDate(${date_}, ${i})">
                         ${date_} <br /> ${getPriceOfDay(i)} 
                    </button>
                    </td>`;
            }else{
            break;
            }

            date_++;
        
        }


    _table+= "</tr>";

 }

 return `<table> ${_table}</table>` + ` <br /> dato valgt: ${(dateSelected || dateSelected === 0)? dateSelected+1 : ''} <br /> ${showTimePicker()}`; 

}




//flyttes til controller eller common??
function getPriceOfDay(weekday){ //bør fjerne parameter weekday og erstatte med weekdayIndex??
    if(weekday < 5) return priceNormalDay;
    else return priceWeekend;

}
//flyttes til controller eller common??
function getPriceOfHour(){
    if (weekdayIndex < 5) return pricePerHourDay;
    else return pricePerHourWeekend;
}

function showTimePicker(){
    let html = '<table>';
    let rows = 4;
    let cols = 6;
    let hour = 0;
    let hoursInDay = 24;

    for(let r=0; r<rows; r++){
        html+= "<tr>";
            for(var i=0; i<cols; i++){                  //${checkIfHourIsChosen(chosenMonth, dateSelected, hour)? 'class="hour-button red-button"' : 'class="hour-button"'} 
            if(hour <= hoursInDay){
                html += /*html*/`<td>
                    <button ${checkIfHourIsChosen(chosenMonth, dateSelected, hour)} 
                        onclick="selectHour(${hour},${getPriceOfHour()} )">
                             ${hour} <br /> ${getPriceOfHour()} 
                    </button>
                </td>`;
            }
            else{
                break;
            }

            hour++;
        
        }

    }
    html+= "</tr></table>";
    html += /*html*/`<button 
                        onclick="chooseAllDay()"
                        ${checkIfDayIsEmpty(chosenMonth, dateSelected)? (checkIfSelectionIsEmpty()? '': 'class="disabled-button"' ) : 'class="disabled-button"' }> Velg hele dagen
                    </button>`;
    html += /*html*/`<button onclick="emptySelection()">Tøm bestilling</button>`;                
    html += /*html*/`<button onclick="addBooking()">Bestill</button>`;
    html += /*html*/`<br /><br /><div> Pris på bestilling: ${totalPriceBooking()},-</div>`; //totalPriceBooking()


    //hva gjør denne koden igjen??Åja...den viser datePickeren..
    if(dateSelected || dateSelected === 0){
        return html;
    }
    else return '';

}



function checkIfHourIsChosen(month, day, hour){
    for (let booking of bookings){
        if(booking.month == month && booking.day == day){
            for(let hour_ of booking.hours){

                if (hour_ == hour){
                    console.log('Knappen skal være rød');
                    return 'class="hour-button red-button"';
                }    
            }
            
        }
    }
    //spent på om dette funker
    if(checkIfHourIsSelected(hour)){
        return 'class="hour-button green-button"'
    }


    return 'class="hour-button"';
    
    
}
//burde ha nytt navn
function checkIfDayIsFull(month, day){
    let count = 0;

    for (let booking of bookings){
        if(booking.month == month && booking.day == day){
           count += booking.hours.length;
            
        }

    }
    if(count >= 24){
        console.log('Dagen er full! Count:'+ count);
        return 'class="date-button red-button"';

    }
    else if(count >= 12) return 'class="date-button blue-button"';
    return 'class="date-button"';
    

}

//ligge i common??
function checkIfDayIsEmpty(month, day){
    let count = 0;
    for(let booking of bookings){
        if(booking.month == month && booking.day == day){
            count += booking.hours.length;
        }
    }
    if (count == 0){
        console.log('dag nr: ' + day + ' er tom!');
        return true;
    }
    else return false;
}

//ligge i common??
function checkIfHourIsSelected(hour){
    for(let selectedHour of hoursSelected){
        if(hour === selectedHour){
            console.log('Knappen skal være grønn');
            return true;
        }

    }
    return false;

}
//common??
function checkIfSelectionIsEmpty(){
    if(hoursSelected.length < 1) return true;
    else return false;
}
//common??
function checkIfSelectionIsFull(){
    if(hoursSelected.length > 23)
        return true;
    else return false;    
}

//tester å ha den i viewet, men dette er jo feil!!!!

/*
function totalPriceBooking(){
    let totalPrice = 0;
    if(prices.length > 0){
        for(let price of prices){
            totalPrice += price;
        }
        return totalPrice;
    }
    else return 0;
}*/