(function() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
})();

function randomizeNumbers(a, b){
    return 1 - (Math.random()*2)
}

function Field() {
    this.width = 4;
    this.height = 4;
    this.arrNumbers = [];
    this.createField();
}

Field.prototype.createField = function () {
    for (var i = 0; i < this.width*this.height; i++){
        this.arrNumbers[i] = i;
    }

    this.arrNumbers.sort(randomizeNumbers);
    var checkSolveField = this.checkSolveField();
    while (!checkSolveField){
        this.arrNumbers.sort(randomizeNumbers);
        checkSolveField = this.checkSolveField();
    }
};

Field.prototype.checkSolveField = function () {
    var sum = 0,
        k = 0,
        isOdd;
    for (var i = 0; i < this.arrNumbers.length; i++){
        if (this.arrNumbers[i] == 0){
            var e = Math.ceil(i/4);// row with 0
            continue;
        }
        k = (this.arrNumbers[i] - (i+1));
        sum += k;
    }
    isOdd = !!((sum+e)%2);
    return !isOdd;
};

function Fifteens(){
    this.field = new Field();
    this.animator = new Animator(this.field.arrNumbers);
    this.animator.drawField();
}

Fifteens.prototype.checkStateField = function (x, y) {
    var x0 = 0,
        y0 = 0,
        numbers = this.field.arrNumbers;
    for (var i = 0; i < numbers.length; i++){
        if (numbers[i] === 0){
            x0 = i%this.field.width;
            y0 = Math.floor(i/this.field.width);
            break;
        }
    }
    // condition click near emptyCell
    var clickNear0 = (Math.abs(x-x0) + Math.abs(y-y0)) == 1;
    if (clickNear0){
        var emptyElemIndex = x0+y0*this.field.width;
        var currElemIndex = x+y*this.field.width;
        numbers[emptyElemIndex] = numbers[currElemIndex];
        numbers[currElemIndex] = 0;
       this.animator.moveChip(emptyElemIndex, currElemIndex);
    }
    var checkVictory = this.checkVictory();
    if (checkVictory){
        console.log('YOU WIN! GOOD JOB!');
    }
};

Fifteens.prototype.checkVictory = function () {
    var victory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    var result = false,
        arrNumbers = this.field.arrNumbers,
        k = 0;
    for (var i = 0; i < arrNumbers.length; i++){
        if (arrNumbers[i] == victory[i]){
            k++;
        }
    }
    if (k == 16){
        result = true;
    }
    return result;
};


