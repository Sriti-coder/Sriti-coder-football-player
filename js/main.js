// input field value
function getInputValue(inputId) {
    const elementValue = document.getElementById(inputId).value;
    if (isNaN(elementValue) === false && parseFloat(elementValue) > -1) {
        document.getElementById(inputId).style.border = '2px solid white';
    }
    else {
        document.getElementById(inputId).style.border = '2px solid red';
    }
    return elementValue;
}
// player added
function addPlayerList(playerName) {
    const playerList = document.getElementById('select-player-list');
    // player list full or not
    if (playerList.children.length < 5) {
        //create new li element
        const li = document.createElement('li');
        li.innerText = playerName;
        // add class
        li.classList.add('text-xl', 'mt-3')
        //append li to player list 
        playerList.appendChild(li);
        if (playerList.children.length == 5) {
            document.getElementById('player-list-error').classList.remove('hidden');
        }
        return true;
    }
    else {
        //if list aready full , then show error 
        document.getElementById('player-list-error').classList.remove('hidden');
        alert('Already 5 players added !!!')
        return false;
    }

}
// expenses calculate
function expensesCalculate() {
    // get cost value
    const perPlayerCostString = getInputValue('per-player-cost');
    //  convert to number
    const perPlayerCostNumber = parseFloat(perPlayerCostString);
    // check NaN and valid input
    if (isNaN(perPlayerCostNumber) || perPlayerCostNumber < 0) {
        // show error
        document.getElementById('player-expenses').innerText = '0'
        return '';
    }
    else {
        //  get how many player selected
        const playerList = document.getElementById('select-player-list');
        const playerLength = playerList.children.length;
        // check player list empty or not
        if (parseInt(playerLength) == 0) {
            alert('No player selected...!!!');
            return '';
        }
        else {
            // finally calculate expenses and set expenses
            const playerExpense = document.getElementById('player-expenses');
            playerExpense.innerText = (playerLength * perPlayerCostNumber).toFixed(2);
            return playerExpense.innerText;
        }
    }
}
// player expenses calculate
document.getElementById('calculate-btn').addEventListener('click', function () {
    const status = expensesCalculate();
    if (status == '') {
        alert('Please select player and put player expenses !!!');
    }
});
// player select button event handle
document.getElementById('player-card-list').addEventListener('click', function (event) {
    const button = event.target;
    // check click on the correct button
    if (button.classList[0] === 'select-btn') {
        // get select player card info
        const playerCard = button.parentNode.parentNode;
        // get player name
        const playerName = playerCard.children[0].innerText;
        // add player name to player list 
        // call add function
        const addStatus = addPlayerList(playerName);
        // if player added retur true otherwise false
        if (addStatus) {
            // make disables the button and change background
            button.disabled = true;
            button.style.backgroundColor = '#A2A9AF';
        }
    }
});
// calculate total cost
document.getElementById('calculate-total-btn').addEventListener('click', function () {
    // get player expense
    const playerExpenses = expensesCalculate();
    // get manager and coach cost 
    let managerCostString = getInputValue('manager-cost');
    let coachCostString = getInputValue('coach-cost');
    const managerCostNumber = parseFloat(managerCostString);
    const coachCostNumber = parseFloat(coachCostString);
    // check negative and NaN value
    if (!isNaN(managerCostNumber) && managerCostNumber > -1 && !isNaN(coachCostNumber) && coachCostNumber > -1) {
        if (playerExpenses !== '') {
            let playerExpensesNumber = parseFloat(playerExpenses);
            let totalCost = playerExpensesNumber + managerCostNumber + coachCostNumber;
            document.getElementById('total-cost').innerText = totalCost.toFixed(2);
        }
        else {
            let totalCost =  managerCostNumber + coachCostNumber;
            document.getElementById('total-cost').innerText = totalCost.toFixed(2);
        }
    }
    else {
        document.getElementById('total-cost').innerText = '0';
    }
}

)

// end