function setBoard() {
    for (i=0; i<9; i++) {
        new_div = document.createElement('div');
        new_div.id = "box" + i;
        new_div.className = 'box';
        new_div.innerHTML = i;


        $("#board").append(new_div);
    }
}

function start() {
    setBoard();
}

window.onload = start;