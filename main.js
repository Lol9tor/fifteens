function Field() {
    this.width = 4;
    this.height = 4;
    this.arrNumbers = [];
}

function Fifteens(){
    this.field = new Field();
    this.animator = new Animator();
    this.createField();
}

Fifteens.prototype.createField = function () {
    var k = 0;
    for (var i = 0; i < this.field.width; i++){
        this.field.arrNumbers[i] = [];
        for (var j = 0; j < this.field.height; j++){
           if (i==this.field.width-1 && j==this.field.arrNumbers.height-1){
                this.field.arrNumbers[i][j] = 0;
                break;
            }
            this.field.arrNumbers[i][j] = k;
            k++;
        }
    }
    this.animator.drawAll(this.field.arrNumbers);
};



