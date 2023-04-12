var questionCount = 0;
var errorCount = 0;
var num1 = 0;
var num2 = 0;
var timerseconds = 0;

function generateQuestion() {
    // ランダムに足し算、引き算、乗算を生成する
    var operator;
    var num = 0;
    randomGenerate();

    switch(Math.floor(Math.random() * 4)){
        case 0:
            operator = "+";
            answer = num1 + num2;
            break;
        case 1:
            operator = "-";
            // マイナスにならないようにする
            if(num1 < num2){
                num = num1;
                num1 = num2;
                num2 = num;
            }
            answer = num1 - num2;
            break;
        case 2:
            operator = "×";
            // 1を避ける
            while(true){
                if(num1 == 1 || num2 == 1){
                    console.log("かけ算でかける数が1になった");
                    randomGenerate();
                }
                else{
                    answer = num1 * num2;
                    break;
                }
            }
            break;
        case 3:
            operator = "÷";
            // 割り切れる数を作成する
            while(true){
                if(num1 % num2 != 0){
                    console.log("割り切れない数になった");
                    randomGenerate();
                }
                else if(num1 == num2){
                    console.log("同じ数になった");
                    randomGenerate();
                }
                else if(num1 == 1 || num2 == 1){
                    console.log("割る数が1になった")
                    randomGenerate();
                }
                else{
                    answer = num1 / num2;
                    break;
                }
            }
            break;
    }

    // 問題を表示する
	document.getElementById('question').innerHTML = num1 + ' ' + operator + ' ' + num2 + ' = ';
    questionCount += 1;
}

function randomGenerate(){
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
}

function checkAnswer() {
    // ユーザーが入力した答えを取得する
    var userAnswer = document.getElementById('answer').value;
    // 正解かどうかをチェックする
    if (userAnswer == answer) {
        timerseconds = 1500;
        showDialog('せいかい！');
        // 次の問題を生成する
        generateQuestion();
        // 入力欄をクリアする
        document.getElementById('answer').value = '';
    } else {
        timerseconds = 1500;
        showDialog('ちがいます。<br>がんばろう！');
        // 入力欄クリア
        document.getElementById('answer').value = '';
        errorCount += 1
    }
}

function addToInput(value) {
    document.getElementById('answer').value += value;
}

function clearInput() {
    document.getElementById('answer').value = '';
}

function answerCheck(){
    alert('いま' + ' ' + questionCount + ' ' + 'もんめで、' + ' ' + errorCount + ' ' + 'かいまちがえています。');
}

function showDialog(message) {
    var dialog = document.createElement('div');
    dialog.innerHTML = message;
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = 'white';
    dialog.style.border = '1px solid black';
    dialog.style.padding = '20px';
    dialog.style.zIndex = '9999';

    document.body.appendChild(dialog);

    setTimeout(function() {
        document.body.removeChild(dialog);
    }, timerseconds); // 指定秒数後にダイアログを非表示にする
}