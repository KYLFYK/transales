let burgerBtn = document.querySelector('.header__burger')
let headerMenu = document.querySelector('.header__nav-block')
let headerLogo = document.querySelector('.header__logo-block');

burgerBtn.addEventListener('click', function() {
    this.classList.toggle('opened')
    headerLogo.classList.toggle('opened')
    headerMenu.classList.toggle('opened')
});

let findBtns = document.querySelectorAll('.main__find-type-btn');

findBtns.forEach( (elem) => {
    elem.addEventListener('click', function () {
        let selectedBtn = document.querySelector('.main__find-type-btn.selected')
        selectedBtn.classList.remove('selected')
        this.classList.add('selected')
    })
})

let popup = document.getElementById('val-popup');
let input = document.getElementById('calc-input');
let resultBtn = document.getElementById('calcBtn');

let popupS = document.getElementById('val-popup1');
let inputS = document.getElementById('calc-input1');
let resultBtnS = document.getElementById('calcBtn1');

input.addEventListener('click', function() {
    popup.classList.remove('closed')
})

inputS.addEventListener('click', function() {
    popupS.classList.remove('closed')
})

document.addEventListener('click', e => {
    let target = e.target;
    let its_popup = target === popup || popup.contains(target) || target === input;
    let its_btn = target === resultBtn || target === resultBtnS;
    if (!its_popup) {
        popup.classList.add('closed');
    } else {
        popup.classList.remove('closed')
    }
    if (its_btn) {
        popup.classList.add('closed');
    }

    let its_popups = popupS.contains(target) || target === inputS || target === popupS;
    let its_btns = target === resultBtnS;
    if (!its_popups) {
        popupS.classList.add('closed');
    } else {
        popupS.classList.remove('closed')
    }
    if (its_btns) {
        popupS.classList.add('closed');
    }
})

let collectionOfSizes = document.querySelectorAll('.value-calculate-input');
let result = 0;

resultBtn.addEventListener('click', function(e) {
    e.preventDefault();
    result = collectionOfSizes[0].value * collectionOfSizes[1].value * collectionOfSizes[2].value;
    result = result.toFixed(2);
    if (result % 2 === 0) {
        result = Math.floor(result);
    }
    input.value = result;
})

let collectionOfSizesS = document.querySelectorAll('.value-calculate-input-s');
let resultS = 0;

resultBtnS.addEventListener('click', function(e) {
    e.preventDefault();
    resultS = collectionOfSizesS[0].value * collectionOfSizesS[1].value * collectionOfSizesS[2].value;
    resultS = resultS.toFixed(2);
    if (resultS % 2 === 0) {
        resultS = Math.floor(resultS);
    }
    inputS.value = resultS;
})