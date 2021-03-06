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
    var k = 0,
        isOdd;
    for (var i = 1; i < this.arrNumbers.length; i++){
        for (var j = i-1; j>=0; j--) {
            if (this.arrNumbers[j] > this.arrNumbers[i]) {
                k++;
            }
        }
    }
    i = 0;
    for (i = 0; i < this.arrNumbers.length; i++) {
        if (this.arrNumbers[i] == 0) {
            var e = Math.ceil(i / 4);// row with 0
        }
    }
    isOdd = !!((k+e)%2);
    return isOdd;
};

function Fifteens(){
    this.field = new Field();
    this.elem = document.createElement('div');
    this.elem.setAttribute('id', 'gameField');
    this.htmlAnimator = new HtmlAnimator(this.field.arrNumbers);
    this.canvasAnimator = new Animator(this.field.arrNumbers);
    this.animator = this.checkRadio()=='canvas' ? this.canvasAnimator : this.htmlAnimator;
    this.elem.appendChild(this.animator.elem);
    this.chooseDrawer();
    this.animator.drawField();
    this.eventClick();
}

Fifteens.prototype.chooseDrawer = function (){
    var self = this;
    this.button = document.getElementById('button');
    this.button.addEventListener('click', function () {
        self.htmlAnimator = new HtmlAnimator(self.field.arrNumbers);
        self.canvasAnimator = new Animator(self.field.arrNumbers);
        self.elem.removeChild(self.elem.childNodes[0]);
        self.animator = self.checkRadio()=='canvas' ? self.canvasAnimator : self.htmlAnimator;
        self.animator.drawField();
        self.elem.appendChild(self.animator.elem);
    });
};

Fifteens.prototype.eventClick = function () {
    var self = this;
    this.elem.addEventListener('click', function (e) {
        if (self.animator.isMoving) {
            return;
        }
        var x = Math.floor((e.pageX - self.animator.elem.offsetLeft) / self.animator.cellSize);
        var y = Math.floor((e.pageY - self.animator.elem.offsetTop) / self.animator.cellSize);
        self.checkStateField(x, y);
    });
};

Fifteens.prototype.checkRadio = function () {
    var inp = document.getElementsByName('choice');
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
            return inp[i].value;
        }
    }
};

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
    //condition click near emptyCell
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
