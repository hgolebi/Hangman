var phrase = "Ala ma kota"
phrase = phrase.toUpperCase();
var shown_phrase = "";
var photo_num = 0;
const ALPHABET = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ"

for (char in phrase)
{
    if (phrase[char] != ' ') shown_phrase += '_';
    else shown_phrase += phrase[char];
}

function setCharAt(str,index,chr){
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function start_phrase()
{
    div_code = "";
    for (i in shown_phrase){
        div_code += '<div class="unknown_letter" id="u_let' + i + '">' + shown_phrase.charAt(i) + '</div>';
    }
    document.getElementById("phrase").innerHTML = div_code;
}

function update_phrase(letter)
{
    var old_shown_phrase = shown_phrase;
    var finished = true;
    for (i in phrase){
        if (phrase.charAt(i) == letter){
            shown_phrase = setCharAt(shown_phrase, parseInt(i), phrase.charAt(i));
            document.getElementById('u_let' + i).innerHTML = letter;
        }
        if (shown_phrase.charAt(i) == '_') finished = false;
    }
    if (finished) winning_screen();
    if (shown_phrase == old_shown_phrase) return false;
    else return true;
}

function winning_screen()
{
    var mess1 = "GRATULACJE!";
    var mess2 = "Udało ci się znaleźć hasło!";
    var innerHTML = '<div class="big_message">' + mess1 + '</div><br>';
    innerHTML += '<div class="small_message">' + mess2 + '</div>';
    var elem = document.getElementById("letters");
    elem.innerHTML = innerHTML;
    elem.id = "end_letters";
}

function losing_screen()
{
    var mess1 = "PORAŻKA!";
    var mess2 = "Niestety nie<br>udało Ci się znaleźć hasła!";
    var innerHTML = '<div class="big_message">' + mess1 + '</div><br>';
    innerHTML += '<div class="small_message">' + mess2 + '</div>';
    var elem = document.getElementById("letters");
    elem.innerHTML = innerHTML;
    elem.id = "end_letters";
    shown_phrase = phrase;
    for (i in phrase){
        document.getElementById('u_let' + i).innerHTML = phrase.charAt(i);
    }
}

function start_letters()
{
    var div_code = "";
    for (i = 0; i<32; i++){
        letter = ALPHABET.charAt(i);
        div_code += '<div class="letter" id="let' + i + '" onclick="letter_clicked(\'let' + i + '\')">' + letter + '</div>';
    }
    div_code += '<div style="height: 50px;"></div>'
    document.getElementById("letters").innerHTML = div_code;
}

function letter_clicked(id)
{
    var button = document.getElementById(id)
    var letter = button.innerHTML;
    if (update_phrase(letter)){
        button.style = 'border: 3px solid rgb(163, 226, 133); color: rgb(163, 226, 133); background-color: #635e7c; cursor: default;';
        button.onclick = ";";
    }
    else {
        button.style = 'border: 3px solid rgb(231, 138, 138); color: rgb(231, 138, 138); background-color: #635e7c; cursor: default';
        button.onclick = ";";
        photo_num++;
        document.getElementById("hangman").innerHTML = '<img src="images/hm' + photo_num + '.png" style="margin-top:25px">';
        if (photo_num >= 11) {
            losing_screen();
        }
    }
}

function start(){
    start_letters();
    start_phrase();
}

window.onload = start;