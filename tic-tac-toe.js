class TicTacToe {
    constructor (selector) {
       this.parrentElement=document.querySelector(selector);
       this.playerList=['x','o'];
       this.GameBoards= Array(9).fill('');
       this.currentPlayer=0;
       this.Init();


        
    }

    Init(){
        this.buildGameUI();
    
    }
    getPlayerLabel(){
        return this.playerList[this.currentPlayer];
    }

    buildCardPlayer(playerName,playerNumber){
        return ` <div class="box-player">
                <p class="player-label ${playerName}">
                ${playerName}
                </p>
                <p class="player-name">
                    Player ${playerNumber}
                </p>
                <p class="turn">Giliran Mu!</p>
            </div>`
    }
    buildGameUI(){

        //game info
        const gameInfoEl =document.createElement('div');
        gameInfoEl.className='game-info';

        let playerCards='';
        this.playerList.forEach((player,i)=>{
            playerCards +=this.buildCardPlayer(player,i+1);
        });

        gameInfoEl.innerHTML=playerCards;

        //button reset
        const gameControl=document.createElement('div');
        gameControl.className='game-control';
        
        const btnReset =document.createElement('button');
        btnReset.className='btn btn-reset';
        btnReset.innerText='Reset Game';
        btnReset.addEventListener('click',()=> this.gameReset());

        gameControl.appendChild(btnReset);
        gameInfoEl.appendChild(gameControl);

        //gameplay
        const gamePlayEl =document.createElement('div');
        gamePlayEl.className='game-play';

        for (let i=0; i <9; i++){
            const btn =document.createElement('button');
            btn.className='btn-tic-tac-toe';
            btn.addEventListener('click',(e)=>this.onCellClick(e,i));
            gamePlayEl.appendChild(btn);
        }
        //apend to parrent elemnt 
        this.parrentElement.append(gameInfoEl,gamePlayEl);
        this.gamePlayEl=gamePlayEl;
    }

     onCellClick(e,i){
        const btn=e.target;
        btn.innerText=this.getPlayerLabel();
        btn.classList.add(btn.innerText);
        btn.disabled=true
        this.GameBoards[i]= btn.innerText;
        this.checkwinner();
        this.switchPlayer();
     }

     switchPlayer(currentPlayer=undefined){
        if (currentPlayer != undefined){
        }else{
            this.currentPlayer=this.currentPlayer==1?0:1;
            
        }

        const BoxPlayer=document.querySelectorAll('.box-player');
        BoxPlayer.forEach((box,i)=>{
            if(this.currentPlayer==i){
                box.classList.add('active');
                
            }else{
                box.classList.remove('active');

            }
        })
     }

     gameReset(){
        this.GameBoards= Array(9).fill('');
        this.switchPlayer(0);
    
        for (const btn of this.gamePlayEl.children) {
            console.log(btn);
            btn.innerHTML='';
            btn.classList.remove(...this.playerList);
            btn.disabled=false;   
        } 
     }
     checkwinner(){
         const winConditions= [
         [0, 1, 2], //horizontal
         [3, 4, 5],
         [6, 7, 8],

         [0, 3, 6], //vertical
         [1, 4, 7],
         [2, 5, 8],

         [0, 4, 8], //diagonal left to bottom right
         [2, 4, 6], //diagonal right to bottom left
         ];

         for (let i = 0; i < winConditions.length; i++){
             console.log('loop');
            const [a,b,c] = winConditions[i];
            if(
                this.getPlayerLabel()==this.GameBoards[a] &&
                this.getPlayerLabel()==this.GameBoards[b] &&
                this.getPlayerLabel()==this.GameBoards[c] 
            ) {
                Swal.fire({
                    title: 'Good Jobs',
                    text:`Selamat Player ${this.currentPlayer+1} kamu memenangkan game ini`,
                    showDenyButton: true,
                    confirmButtonText: ' Bagus sekaliiii',
                    denyButtonText: `Ulangi dong`,
                    icon:'berhasil',
                  }).then((result) => {
                    for (const btn of this.gamePlayEl.children) {
                        btn.disabled=true; 
                    } 
                    
                    if (result.isConfirmed) {
                        this.gameReset();
                      Swal.fire('Permainan sudah direset,Ayo main lagi', '', 'info')
                    }
                  })

            }
            
         }

     }
}