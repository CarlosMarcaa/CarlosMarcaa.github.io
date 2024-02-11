
class board {
    constructor(n, name){
    this.n = n;
    this.length = n*n;
    this.numbers = [];
    this.checkedNumbers = [];
    this.matrix = [];
    this.score = 0;
    this.name = name;
    this.flagLeftDiagonal = false;
    this.flagRightDiagonal = false;
    }
    
    getName(){
        return this.name;
    }
    generateBoard(){
        const n = this.n
        
        var counter = 0;
        for (let i = 0; i < this.length;) {     //Creates the list with all the numbers contained on the board
            var numeroAleatorioDecimal = Math.random();
            // Ajusta el rango para obtener un número entre 1 y 50
            var numeroAleatorio = Math.floor(numeroAleatorioDecimal * 50) + 1;
            if (!this.getNumbers().includes(numeroAleatorio)) {
                this.numbers.push(numeroAleatorio)                
                i++;
            }           
        }

        for (let i = 0; i < this.n; i++) {
            const fila = [];
            for (let j = 0; j < this.n; j++) {
                fila.push(this.numbers[counter]);
                counter++;
            }
            this.matrix.push(fila);
        }

    }

    printMatrix(){
        for (let i = 0; i < this.n; i++) {

            const fila = this.matrix[i] || [];  // Manejo de filas undefined
            console.log(fila.join(" "));
        }
    }
    
    getNumbers(){
        return this.numbers;
    }

    verifyNumber(n){
        return this.numbers.includes(n);
    }

    verifyCheckedSet(set){
        return set.every(number => this.checkedNumbers.includes(number));
    }

    addCheckedNumbers(n){
        if (this.verifyNumber(n)){
            this.checkedNumbers.push(n);
        }else{
            console.log("Number " + n + " is not contained in the board")
        }
    }
    findNumberPosition(n) {    //Returns the position of the number in an array as [i,j]
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === n) {
                    return [i, j];
                }
            }
        }
    
        return null; // Returns null if the number is not found
    }
    checkMatrix(n){
        if (!this.numbers.includes(n)){return null;}

        const recentAdded = n;
        const checkedNumbers = this.checkedNumbers;
        const position = this.findNumberPosition(n);
        const positionX = this.findNumberPosition(n)[0];
        const positionY = this.findNumberPosition(n)[1];
        //Checking rows
        if (this.verifyCheckedSet(this.matrix[positionX])){
            console.log("---------" +this.name + " Tiene una linea horizontal, gana 1 punto!---------")
            this.score = this.score + 1;
        }
        //Checking columns
        const tempContainer = [] //Creates a temporal container with all the column numbers
        for (let i =0; i < this.n; i++){
            tempContainer.push(this.matrix[i][positionY])            
        }
        if (this.verifyCheckedSet(tempContainer)){
            console.log("---------" + this.name + " Tiene una linea vertical, gana 1 punto!---------")
            this.score = this.score + 1;
        }
        //Checking diagonals

        //Generates a list with all diagonal positions
        // Verifica la diagonal principal
                    const mainDiagonal = [];
                    for (let i = 0; i < this.n; i++) {
                        mainDiagonal.push(this.matrix[i][i]);
                    }
                    if (mainDiagonal.every(number => checkedNumbers.includes(number)) && !this.flagLeftDiagonal) {
                        console.log("---------"+this.name + " Tiene una diagonal izquierda, gana 3 puntos!---------")
                        this.score = this.score + 3;
                        this.flagLeftDiagonal = true;
                    }

                    // Verifica la diagonal secundaria
                    const secondaryDiagonal = [];
                    for (let i = 0; i < this.matrix.length; i++) {
                        secondaryDiagonal.push(this.matrix[i][this.matrix.length - 1 - i]);
                    }
                    if (secondaryDiagonal.every(number => checkedNumbers.includes(number)) && !this.flagRightDiagonal) {
                        console.log("---------"+this.name + " Tiene una diagonal derecha, gana 3 puntos!---------")
                        this.score = this.score + 3;
                        this.flagRightDiagonal = true;
                    }

        if (this.verifyCheckedSet(this.numbers)){
            console.log("---------"+this.name + " Tiene una carton lleno, gana 5 puntos!---------")
                this.score = this.score + 5;
        }

    }

    getMatrix(){
        return this.matrix;
    }

}

var board1 = new board(3, "holga");
board1.generateBoard();
board1.printMatrix();
for (let i = 0; i < 51; i++){
    
    board1.addCheckedNumbers(i);
    board1.checkMatrix(i);
}