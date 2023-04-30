let result = [];
let numberInitial = 0;
let numberFinal = 0;
let resultText = document.querySelector('#result');
let previousResult = document.querySelector('#previousResult');

function getNumber() {
    numberFinal = document.querySelector('#finalNumber').value; 

    $('.container__initial').addClass('hide');

    getRandom(numberFinal);
}

function getRandom(max) {
    const randomNumber = Math.floor(Math.floor(Math.random() * max + 1)); 

    if(randomNumber === 0) {
        getNumber();
    } else {
        verifyNumber(randomNumber);   
    }

}

function verifyNumber(testNumber) {
    if(result.length != 0) {
        let resultVerify = result.includes(testNumber);

        if(resultVerify == false) {
            result.push(testNumber);
            getPrint(testNumber);
        } else {
            getNumber();
        }
    } else {
        result.push(testNumber);
        getPrint(testNumber);
    }

   
}

function getPrint(valueFinal) {
    resultText.innerHTML = valueFinal;
    $('.container__textResult').addClass('show');

    const data = result.map((num) => {
        return `
            <li>
                ${num}
            </li>
        `
    })
    .join(' - ');

    previousResult.innerHTML = data;
}