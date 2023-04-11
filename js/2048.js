/**
* 
* M413 - TD3 - 2048 Game
* * 
* @author Jean-Michel Bruneau
*	@copyright UCA - IUT -INFO
* @version	1.0
* @date			2021-01-31
*
*/
"use strict";

// M413 - 2048
let message = 'JavaScript is ok :)';
// alert( message);
console.log(message);

// myBox object initializer
const myBox = {
	value: "",
	lastInsert: false
	};

let game = [];

function onLoad() {
	console.log('Processus de chargement du document terminé…');
	init();
	document.addEventListener('keydown', keyboardAction ,false);
}

function init() {
	//Création de la grille par un tableau
	
	for (let i = 0; i < 4; i++) {
		game[i]=[];
		for(let j = 0; j<4; j++){
			game[i][j] = Object.create(myBox);
		}
	}

	for (let i = 0; i < 16; i++) {
		let boxInit = document.createElement("span");
		document.getElementsByClassName("box")[i].appendChild(boxInit);
	}
	// Faire un truc pour démarrer le jeu (Type "appuie sur une touche")

	//Init de 2 case aléatoirement

	let firstBox_X = Math.floor(Math.random()*4);
	let firstBox_Y = Math.floor(Math.random()*4);

	game[firstBox_X][firstBox_Y].value = getNewValue();

	let secondBox_X = firstBox_X;
	let secondBox_Y = firstBox_Y;

	while(secondBox_X == firstBox_X && secondBox_Y == firstBox_Y){
		secondBox_X = Math.floor(Math.random()*4);
		secondBox_Y = Math.floor(Math.random()*4);
	}
	game[secondBox_X][secondBox_Y].value = getNewValue();
	displayGrid(game);
}

function keyboardAction (event) {
	let nomTouche = event.key;
	switch (nomTouche) {
		case "ArrowDown":
			MoveDown()
			break;

		case "ArrowUp":
			MoveUp()
			break;
		
		case "ArrowRight":
			MoveRight()
			break;

		case "ArrowLeft":
			MoveLeft()
			break;
	
		default:
			break;
	}
}


function MoveDown (){
	for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
			if(game[i][j].value != "") {
				game[i][j].lastInsert = false;
				let tmpcmpt = 0;
				while(i+tmpcmpt+1 < 4 && game[i+tmpcmpt+1][j].value == "") {
					game[i+tmpcmpt+1][j].value = game[i+tmpcmpt][j].value;
					game[i+tmpcmpt][j].value = "";
					tmpcmpt++;
				}
				if(i+tmpcmpt+1 < 4 && game[i+tmpcmpt][j].value == game[i+tmpcmpt+1][j].value) {
					game[i+tmpcmpt+1][j].value += game[i+tmpcmpt][j].value;
					 game[i+tmpcmpt][j].value = "";
				}
			}
        }
    }
	insertValue();
	displayGrid(game);
	
}

function MoveUp (){
	for (let j = 0; j < 4; j++) {
        for (let i = 3; i >= 0; i--) {
            if(game[i][j].value != "") {
                game[i][j].lastInsert = false;
				let comp = 1;
                while(i-comp >= 0 && game[i-comp][j].value == "") {
					console.log("a");
                    game[i-comp][j].value = game[i-comp+1][j].value;
                    game[i-comp+1][j].value = "";
					comp++;
                }
                if(i-comp >= 0 && game[i-comp][j].value == game[i-comp+1][j].value) {
					console.log("a");
                    game[i-comp][j].value += game[i-comp+1][j].value;
                     game[i-comp+1][j].value = "";
                }
            }
			console.log("game"+j+"|"+i);
        }
    }
	insertValue();
	displayGrid(game);
}

function MoveLeft (){
	for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(game[i][j].value != "") {
                game[i][j].lastInsert = false;
				let comp = 1;
                while(j-comp >= 0 && game[i][j-comp].value == "") {
                    game[i][j-comp].value = game[i][j-comp+1].value;
                    game[i][j-comp+1].value = "";
					comp++;
                }
                if(j-comp >= 0 && game[i][j-comp].value == game[i][j-comp+1].value) {
                    game[i][j-comp].value += game[i][j-comp+1].value;
                     game[i][j-comp+1].value = "";
                }
            }
        }
    }
	insertValue();
	displayGrid(game);
}

function MoveRight (){
	for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            if(game[i][j].value != "") {
                game[i][j].lastInsert = false;
                let tmpcmpt = 0;
                while(j+tmpcmpt+1 < 4 && game[i][j+tmpcmpt+1].value == "") {
                    game[i][j+tmpcmpt+1].value = game[i][j+tmpcmpt].value;
                    game[i][j+tmpcmpt].value = "";
                    tmpcmpt++;
                }
                if(j+tmpcmpt+1 < 4 && game[i][j+tmpcmpt].value == game[i][j+tmpcmpt+1].value) {
                    game[i][j+tmpcmpt+1].value += game[i][j+tmpcmpt].value;
                     game[i][j+tmpcmpt].value = "";
                }
            }
			console.log("game"+j+"|"+i);
        }
    }
	insertValue();
	displayGrid(game);
}

function insertValue(){
	if(isWin()){
		console.log("gg t'as gagné");
	}
	if(haveEmpty()){
		let X = Math.floor(Math.random()*4);
		let Y = Math.floor(Math.random()*4);
		if(game[X][Y].value != ""){
			while(game[X][Y].value != ""){
				X = Math.floor(Math.random()*4);
				Y = Math.floor(Math.random()*4);
			}
		}
		game[X][Y].lastInsert = true;
		game[X][Y].value = getNewValue();
	}else{
		endGame();
	}
}

function getNewValue(){
	if(Math.random()>0.1){
		return 2;
	} else {
		return 4;
	}
}

function haveEmpty(){
	for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
			if(game[i][j].value == ""){
				return true
			}
		}
	}
	return false;
}

function endGame(){
	console.log("La partie est finie")
	document.removeEventListener('keydown', keyboardAction ,false);
}

function isWin(){
	for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
			if(game[i][j].value == 2048){
				return true
			}
		}
	}
	return false;
}

function displayGrid(Oarray){
	let i = 0
	Oarray.forEach(element => {
		element.forEach(nombre => {
			document.querySelectorAll(".box")[i].getElementsByTagName("span")[0].textContent = nombre.value;
			i++;
		});
	});
}

// Toute les ressources de la page sont complètement chargées.
window.onload = onLoad;
