
class board {
    constructor(n, name,boardnumber){
    this.n = n;
    this.length = n*n;
    this.numbers = [];
    this.checkedNumbers = [];
    this.matrix = [];
    this.score = 0;
    this.name = name;
    this.flagLeftDiagonal = false;
    this.flagRightDiagonal = false; 
    this.boardnumber = boardnumber;
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
                this.numbers.push(numeroAleatorio);              
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
        const numbers = this.getNumbers();
        const container = document.getElementById(`number-list${this.boardnumber}`);
        numbers.forEach((number) => {
            const div = document.createElement('div');
            div.className = 'number';
            div.id = `${this.boardnumber*25 + (numbers.indexOf(number))}`;
            div.textContent = `${number}`;
            container.appendChild(div);
        });
        const BingoBoard = document.createElement('div');
        BingoBoard.className = 'bingo-card';
        const playerName =  document.getElementById(`player-name${this.boardnumber}`);
        playerName.innerText = `${this.getName()} ${this.score}pts.`;

        if (this.n == 5) {
            document.getElementById(`number-list${this.boardnumber}`).className = 'number-list-5';
        } else if (this.n == 4) {
            document.getElementById(`number-list${this.boardnumber}`).className = 'number-list-4';
        } else if (this.n == 3) {
            document.getElementById(`number-list${this.boardnumber}`).className = 'number-list-3';
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

            const numberVerify = document.getElementById(`${this.boardnumber*25 + (this.numbers.indexOf(n))}`);
            numberVerify.className = 'number-validate';
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
        const playerName =  document.getElementById(`player-name${this.boardnumber}`);
        playerName.innerText = `${this.getName()}   ${this.score}pts.`;

    }

    getMatrix(){
        return this.matrix;
    }

}
function generateBoardSize() {
    // Generate a decimal number between 0 (inclusive) and 1 (exclusive)
    const decimalNumber = Math.random();
  
    // Convert the decimal number to an integer between 3 and 6 (6 is exclusive)
    const randomNumber = Math.floor(decimalNumber * (5 - 3 + 1) + 3);
  
    return randomNumber;
  }
function generateRandomNumberList(){
    randomNumbersList = [];
    for (let i = 0; i < 26;) {     //Creates the list with all the numbers contained on the board
        var numeroAleatorioDecimal = Math.random();
        // Ajusta el rango para obtener un número entre 1 y 50
        var numeroAleatorio = Math.floor(numeroAleatorioDecimal * 50) + 1;
        if (!randomNumbersList.includes(numeroAleatorio)) {
            randomNumbersList.push(numeroAleatorio)                
            i++;
        }
                  
    }
    return randomNumbersList; 
}
randomNumbersList = []
var iterations = 0;


    boardSize = generateBoardSize();
    randomNumbersList = generateRandomNumberList();
    player0name = localStorage.getItem('player1');
    player1name = localStorage.getItem('player2');
    player2name = localStorage.getItem('player3');
    player3name = localStorage.getItem('player4');
    board0 = new board(boardSize, player0name+ " ----  ", 0 );
    board1 = new board(boardSize, player1name+ " ----  ", 1);
    board2 = new board(boardSize, player2name+ " ----  ", 2);
    board3 = new board(boardSize, player3name+ " ----  ", 3);

    board0.generateBoard();
    board1.generateBoard();
    board2.generateBoard();
    board3.generateBoard();

    boardList = [];
    boardList.push(board0);
    boardList.push(board1);
    boardList.push(board2);
    boardList.push(board3);

    var ballNumberToShow = document.getElementById("bingo-call-number");
    var turn = document.getElementById("turns");
    turn.innerText = iterations;
    ballNumberToShow.innerText = 0;
function getBingoBall(){
    if (iterations < 25){
        const ballNumber = randomNumbersList[iterations];
        turn.innerText = iterations + 1;
        ballNumberToShow.innerText = ballNumber;

        board0.addCheckedNumbers(ballNumber);
        board1.addCheckedNumbers(ballNumber);
        board2.addCheckedNumbers(ballNumber);
        board3.addCheckedNumbers(ballNumber);

        board0.checkMatrix(ballNumber);
        board1.checkMatrix(ballNumber);
        board2.checkMatrix(ballNumber);
        board3.checkMatrix(ballNumber);


        iterations++;
    }
   
}



// function finishGame(){
    
//     for (let i =0; i < 5; i++){
        
//         const boardPointer = boardList[i];

//         const wins =0;
//         if (boardPointer.name == findHighestScore(boardList).name){
//             wins = 1;
//         }

//         const statistics = generatePlayerStatistics(boardPointer);
//         const oldStatistics = localStorage.getItem(`${boardPointer.name}`);
//         if (!oldStatistics === 'undefined'){
//             oldStatistics =  statistics ? JSON.parse(statistics) : [];
//             oldStatistics.score = oldStatistics.score + boardPointer.score;
//             oldStatistics.wins = oldStatistics.wins + wins;
//             statistics = oldStatistics;
//         }
        
//         localStorage.setItem( boardPointer.name, statistics);
//     }
//     }
    


// generatePlayerStatistics(board){
//     const wins =0;
//     const score = board.score;
//     const name = board.name;
//     if (board.name == findHighestScore(boardList).name){
//         wins = 1;
//     }
//     const list = {
//         score: score,
//         wins: wins
//     }
//     return list;
//   }