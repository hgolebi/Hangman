const o = '⭕'
const x = '❌'
var isXTurn = true;

var positionMap = new Object;
positionMap = {
    'box1': ['h1', 'v1', 'd1'],
    'box2': ['h1', 'v2'],
    'box3': ['h1', 'v3', 'd2'],
    'box4': ['h2', 'v1'],
    'box5': ['h2', 'v2', 'd1', 'd2'],
    'box6': ['h2', 'v3'],
    'box7': ['h3', 'v1', 'd2'],
    'box8': ['h3', 'v2'],
    'box9': ['h3', 'v3', 'd1'],
}
var state = new Object;

function resetState() {
    state = {
        'h1': 0,
        'h2': 0,
        'h3': 0,
        'v1': 0,
        'v2': 0,
        'v3': 0,
        'd1': 0,
        'd2': 0,
    }
}

function initBoard() {
    for (i=1; i<=9; i++) {
        new_div = document.createElement('div');
        new_div.id = "box" + i;
        new_div.className = 'box';
        new_div.innerHTML = x;

        $("#board").append(new_div);
    }
    $('.box').click(boxClicked);

}

function resetGame() {
    $('#end_message').css('display', 'none');
    $('.box').css('pointer-events', 'auto');
    $('.boxClicked').css('pointer-events', 'auto');
    document.body.removeEventListener('click', resetGame);

    resetState();
    $('.boxClicked').addClass('box');
    $('.boxClicked').click(boxClicked);
    $('.boxClicked').removeClass('boxClicked');
    $('.box').html(x);
    isXTurn = true;
}

function endMessage() {
    header = document.createElement('h1');
    header.id = 'header';
    message = document.createElement('h3');
    message.id = 'message';
    retry_mess = document.createElement('h6');
    retry_mess.id = 'retry_mess';

    if (isXTurn) {
        header.innerHTML = 'Gratulacje!';
        message.innerHTML = 'Udało ci się pokonać przeciwnika';
    }
    else {
        header.innerHTML = 'Porażka!';
        message.innerHTML = 'Niestety, nie udało ci się pokonać przeciwnika';
    }
    retry_mess.innerHTML = 'Kliknij aby zagrać ponownie';
    $('#end_message').append(header);
    $('#end_message').append(message);
    $('#end_message').append(retry_mess);
    // $('#end_message').css('visibility', 'visible');
    $('#end_message').css('display', 'list-item');
    setTimeout(function() {
        document.body.addEventListener('click', resetGame);
    }, 1000);
}

function gameFinished() {
    $('.box').css('pointer-events', 'none');
    $('.boxClicked').css('pointer-events', 'none');
    endMessage();
}

function calculateWin(elem) {
    var id = $(elem).attr('id');
    for(pos of positionMap[id]) {
            if (isXTurn)
            state[pos]++;
        else
            state[pos]--;
        if (state[pos] == 3 || state[pos] == -3) {
            gameFinished();
            return true;
        }
    }
}

function boxClicked() {
    $(this).removeClass('box');
    $(this).addClass('boxClicked');
    $(this).off('click');
    if (calculateWin(this))
        return;
    if (isXTurn)
        $('.box').html(o);
        else
        $('.box').html(x);
    isXTurn = !isXTurn;
}

function start() {
    initBoard();
    resetState();
}

window.onload = start;