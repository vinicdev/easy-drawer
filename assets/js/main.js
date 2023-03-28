let result = [];
let numberInitial = 0;
let numberFinal = 0;
let resultText = document.querySelector('#result');
let previousResult = document.querySelector('#previousResult');

function getNumber() {
    numberInitial = document.querySelector('#initialNumber').value;
    numberFinal = document.querySelector('#finalNumber').value; 

    getRandom(numberInitial, numberFinal);
}

function getRandom(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min) + min); 

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

    let newResult = result.reverse();

    const data = newResult.map((num) => {
        return `
            <li>
                ${num}
            </li>
        `
    })
    .join(' - ');

    previousResult.innerHTML = data;
}