function Field() {
    this.width = 15;
    this.height = 15;
    this.arrNumbers = [];
}

function Fifteens(){
    this.field = new Field();
    this.createField();
    this.createNumbers();
    this.createEmptyCell();
}

Fifteens.prototype.createField = function () {
    for (var i = 0; i < this.field.width; i++){
        this.field.arrNumbers[i] = [];
        for (var j = 0; j < this.field.height; j++){
            
        }
    }
};



