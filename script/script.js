"use strict";

const DAY_STRING = ['день', 'дня', 'дней'];

const DATA = {
    whichSite: ['landing', 'multiPage', 'onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],
    adapt: 20,
    mobileTemplates: 15,
    editable: 10,
    metrikaYandex: [500, 100, 2000],
    analyticsGoogle: [850, 1350, 3000],
    sendOrder: 500,
    deadlineDay: [[2, 7], [3, 10], [7, 14]],
    deadlinePercent: [20, 17, 15]

}

const startButton = document.querySelector('.start-button'),
    firstScreen = document.querySelector('.first-screen'),
    mainForm = document.querySelector('.main-form'),
    formCalculate = document.querySelector('.form-calculate'),
    endButton = document.querySelector('.end-button'),
    total = document.querySelector('.total'),
    fastRange = document.querySelector('.fast-range'),
    totalPriceSum = document.querySelector('.total_price__sum'),
    mobileTemplates = document.getElementById('mobileTemplates'),
    typeSite = document.querySelector('.type-site'),
    maxDeadline = document.querySelector('.max-deadline'),
    rangeDeadline = document.querySelector('.range-deadline'),
    deadlineValue = document.querySelector('.deadline-value'),
    desktopTemplatesValue = document.querySelector('.desktopTemplates_value'),
    adaptValue = document.querySelector('.adapt_value'),
    mobileTemplatesValue = document.querySelector('.mobileTemplates_value'),
    editableValue = document.querySelector('.editable_value');


    function declOfNum(n, titles) {
        return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
                                0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
      }

// console.dir(mobileTemplates);

function showElem(elem) {
    elem.style.display = "block";
}

function hideElem(elem) {
    elem.style.display = "none";
}

function renderTextContent(total, site, maxDay, minDay) {
    typeSite.textContent = site;
    totalPriceSum.textContent = total;
    maxDeadline.textContent = declOfNum(maxDay, DAY_STRING);
    rangeDeadline.min = minDay;
    rangeDeadline.max = maxDay;
    deadlineValue.textContent = declOfNum(rangeDeadline.value, DAY_STRING);
}

function priceCalculation(elem) {
    let result = 0,
        index = 0,
        options = [],
        site = '',
        maxDeadlineDay = DATA.deadlineDay[index][1],
        minDeadlineDay = DATA.deadlineDay[index][0];
        
        if (elem.checked && elem.getAttribute('name') === 'option') {
            if (elem.value === 'desktopTemplates') {
                desktopTemplatesValue.textContent = 'Да';
            } 
            if (elem.value === 'adapt') {
                adaptValue.textContent = 'Да';
            } 
            if (elem.value === 'mobileTemplates') {
                mobileTemplatesValue.textContent = 'Да';
            } 
            if (elem.value === 'editable') {
                editableValue.textContent = 'Да';
            } 
            console.log(elem.value);
            
        }
        if (elem.checked === false && elem.getAttribute('name') === 'option') {
            if (elem.value === 'desktopTemplates') {
                desktopTemplatesValue.textContent = 'Нет';
            } 
            if (elem.value === 'adapt') {
                adaptValue.textContent = 'Нет';
            } 
            if (elem.value === 'mobileTemplates' || !elem.checked) {
                mobileTemplatesValue.textContent = 'Нет';
            } 
            if (elem.value === 'editable') {
                editableValue.textContent = 'Нет';
            } 
        }

        if (elem.getAttribute('id') === 'adapt' && elem.checked) {
            mobileTemplates.disabled = false;

        } else if (elem.getAttribute('id') === 'adapt' && elem.checked === false) {
            mobileTemplates.disabled = true;
            mobileTemplates.checked = false;
        }

    if (elem.name === 'whichSite') {
        for (const item of formCalculate.elements) {
            if (item.type === 'checkbox') {
                item.checked = false;
                mobileTemplates.disabled = true;

                desktopTemplatesValue.textContent = 'Нет';
                adaptValue.textContent = 'Нет';
                mobileTemplatesValue.textContent = 'Нет';
                editableValue.textContent = 'Нет';
            }
        }
        hideElem(fastRange);
    }

    for (const item of formCalculate.elements) {
        if (item.name === 'whichSite' && item.checked) {
            index = DATA.whichSite.indexOf(item.value);
            site = item.dataset.site;
            maxDeadlineDay = DATA.deadlineDay[index][1];
            maxDeadlineDay = DATA.deadlineDay[index][0];
        } else if (item.classList.contains('calc-handler') && item.checked) {
            options.push(item.value);
        }
    }

    options.forEach(function(key){
        if (typeof(DATA[key]) === 'number') {
            if (key === 'sendOrder') {
                result += DATA[key]
            } else {
                result += DATA.price[index] * DATA[key] / 100;
            }
            
        } else {
            if (key === 'desktopTemplates') {
                result += DATA.price[index] * DATA.desktopTemplates[index] / 100;
            } else {
                result += DATA[key][index];
            }
        }
    })
    

    result += DATA.price[index];

    renderTextContent(result, site, maxDeadlineDay, minDeadlineDay);

}

function handlerCallBackForm(event) {
    // console.log(event.target);
    const target = event.target;

    if (target.classList.contains('want-faster')) {
        // if (target.checked) {
        //     showElem(fastRange);
        // } else {
        //     hideElem(fastRange);
        // }
        target.checked ? showElem(fastRange) : hideElem(fastRange);
    }

    if (target.classList.contains('calc-handler')) {
        priceCalculation(target);
    }
    
} 

startButton.addEventListener('click', function(){
    showElem(mainForm);
    hideElem(firstScreen);

});

endButton.addEventListener('click', function(){
    for (const elem of formCalculate.elements) {
        if (elem.tagName === 'FIELDSET') {
            hideElem(elem);
        }
    }
    showElem(total);
});

formCalculate.addEventListener('change', handlerCallBackForm);
