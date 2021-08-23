const dateInput = document.querySelector("#dob");
const btnSubmit = document.querySelector('.btn-submit');
const outputDiv = document.querySelector(".output");
const loadGif =  document.querySelector(".primary-sub-container-loader");

const stringReverse = (str) => {
    const charArray = str.split('');
    console.log(charArray);
    const charArrayRev = charArray.reverse();
    console.log(charArrayRev);
    const charArrayReversed = charArrayRev.join('');
    console.log(charArrayReversed);
    return charArrayReversed;
}

const checkIfPalindrome = (str) => {
    return str === stringReverse(str);
}

const dateToString = (date) => {
    const dateObj = {
        day: '', 
        month: '', 
        year: ''
    };

    if(date.day < 10){
        dateObj.day = '0'+date.day;
    }else{
        dateObj.day = date.day.toString();
    }

    if(date.month < 10){
        dateObj.month = '0'+date.month;
    }else{
        dateObj.month = date.month.toString();
    }

    dateObj.year = date.year.toString();

    return dateObj;
}

const formatDates = (date) => {
    const dateAsString = dateToString(date);
    
    const ddmmyyyy = dateAsString.day + dateAsString.month + dateAsString.year;
    const mmddyyyy = dateAsString.month + dateAsString.day + dateAsString.year;
    const yyyymmdd = dateAsString.year + dateAsString.month + dateAsString.day;
    const ddmmyy = dateAsString.day + dateAsString.month + dateAsString.year.slice(-2);
    const mmddyy = dateAsString.month + dateAsString.day + dateAsString.year.slice(-2);
    const yyddmm = dateAsString.year.slice(-2) + dateAsString.day + dateAsString.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

const checkIfPalindromeExists = (date) => {
    const listOfFormats = formatDates(date);
    let isPalindrome = false;
    
    for(let i = 0; i<listOfFormats.length; i++){
        if(checkIfPalindrome(listOfFormats[i])){
            isPalindrome = true;
            break;
        }else{
            return isPalindrome;
        }
    }

    return isPalindrome;
}

const checkForLeapYear = (year) => {
    if(year%400 === 0){
        return true;
    } else if(year%100 === 0){
        return true;
    } else if(year%4 === 0){
        return true;
    } else {
        return false;
    }
}

const getNextDate = (date) => {
    let day = date.day+1;
    let month = date.month;
    let year = date.year;

    const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(checkForLeapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }else{
            if(day>28){
                day = 1;
                month++;
            }
        }
    }else{
        if(day > numberOfDays[month-1]){
            day=1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }
    return {day: day, month: month, year: year};
}

const findNextPalindrome = (date) => {
    let findNextDay = getNextDate(date);
    let counter = 0;

    while(1){
        counter++;
        let isItAPalindrome = checkIfPalindromeExists(findNextDay);
        if(isItAPalindrome){
            break;
        }
        findNextDay = getNextDate(findNextDay);
    }
    return [counter, findNextDay];
}

const checkDateForPalindrome = () => {
    loadGif.style.display = "none";
    const birthday = dateInput.value;
    
    if(birthday !== ''){
        let dateList = birthday.split('-');
        console.log(dateList);
        const date = {
            day: Number(dateList[2]), 
            month: Number(dateList[1]), 
            year: Number(dateList[0])
        };

        const isDatePalindrome = checkIfPalindromeExists(date);
        console.log(isDatePalindrome);
        if(isDatePalindrome){
            outputDiv.style.display = "block";
            outputDiv.innerText = 'Yes! Your birthday is a palindrome!';
        }else{
            let [counter, findNextDay] = findNextPalindrome(date);
            outputDiv.style.display = "block";
            outputDiv.innerText = `Your birthday is not a palindrome! The next palindrome date is ${findNextDay.day}-${findNextDay.month}-${findNextDay.year}. Which is ${counter} days away.`;
        }
    }else{
        outputDiv.style.display = "block";
        outputDiv.innerText = 'Cant be empty';
    }
}

btnSubmit.addEventListener("click", ()=>{
    loadGif.style.display = "block";
    setTimeout(checkDateForPalindrome, 2500);
});