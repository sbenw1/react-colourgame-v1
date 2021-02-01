/*
*	React Colourgame2
*	=================
*	The goal of this game is to select the correct
*	colour that the word is painted, and not the 
*	word itself.
*
*/

/*
*	This is a representation of a colour.
*/
class ColourRep {
	constructor(name, code, cName){
		this.name = name;
		this.code = code;
		this.cName = cName;
	}
}

/*
*	A representation of the game stats.
*/
class GameStats {
	constructor(rWord, rColourRepOBJ, gameIsOn, maxScore, currentScore, lives){
		this.rWord = rWord;
		this.rColourRepOBJ = rColourRepOBJ;
		this.gameIsOn = gameIsOn;
		this.maxScore = maxScore;
		this.currentScore = currentScore;
		this.currentLives = lives;
	}
}

/*
*	ColourGameOBJ
*	
*/
class ColourGame2 extends React.Component {
	
	constructor(props){
		
		super(props);
		
		let gameIsOn = false;
		
		let	livesLeft = 0;
		let currentScore = 0;
		
		const maxScore = 15;
		
		let randomWords = this.RandomColourWord();
		let randomWord = randomWords[0];
		let colourRepObj = randomWords[1];
		
		//	Set the stats object as state.
		this.state = new GameStats(randomWord, colourRepObj, gameIsOn, maxScore, currentScore, livesLeft);
		
		//	Apply methods to buttons.
		//	Need this method to get the "this" context.
		this.StartGame = () => {
			this.StartTheGame();
		};
		
		this.SelectionButton = (e) => {
			this.SelectWord(e.target.dataset.colourname);			
		}
		
	}
	
	/*
	*	Checks if the maximum score has been reached.
	*/
	CheckScoreCeiling(){
		
		let stats = this.state;
		
		if(stats.gameIsOn == true){
			
			if(stats.currentScore == stats.maxScore){
				
				window.alert("Congratulations, you've won the game!");
				
				stats.gameIsOn = false;
				
				this.setState(stats);
				
			}
			
		}
		
	}
	
	/*
	*	Checks if all lives are lost.
	*/
	CheckAllLivesLost(){
		
		let stats = this.state;
		
		if(stats.currentLives == 0){
			
			window.alert("All lives are lost!");
			window.alert("Game over!");
			
			stats.gameIsOn = false;
			
			this.setState(stats);
			
		}
		
	}
	
	/*
	*	Decides a random colour object and a random word.
	*/
	RandomColourWord(){
		
		//	Array of colour objects.
		let rColour = [
			new ColourRep("red", "#f41937", "rText"),
			new ColourRep("blue", "#4719f4", "bText"),
			new ColourRep("green", "#1df419", "gText"),
			new ColourRep("orange", "#f48619", "oText"),
			new ColourRep("yellow", "#f0f419", "yText"),
			new ColourRep("pink", "#f019f4", "pText")
		];
			
		//	Randomly assigns a colour object and word.
		let rWord = rColour[Math.floor(Math.random() * rColour.length)].name;
		let rColourRep = rColour[Math.floor(Math.random() * rColour.length)];
		
		//	Return the two values as an array.
		return [rWord, rColourRep];
		
	}
	
	/*
	*	Starts the game.
	*/
	StartTheGame(){
		
		window.alert("Starting the game!");
		
		let stats = this.state;
		
		let currentScore = 0;
		let currentLives = 3;
		
		stats.gameIsOn = true;
		stats.currentScore = currentScore;
		stats.currentLives = currentLives;
			
		this.setState(stats);
		
	}
	
	/*
	*	Selects a word.
	*/
	SelectWord(colourName){
		
		let stats = this.state;
		
		if(stats.gameIsOn == true){
				
			if(stats.rColourRepOBJ.name != colourName){
											
				window.alert("Incorrect!");
				stats.currentLives--;
						
			} else {
						
				window.alert("Correct!");
				stats.currentScore++;
						
			}
			
			this.setState(stats);
					
			//	Check the game status.
			this.CheckAllLivesLost();
			this.CheckScoreCeiling();
			
			//	Get current state again.
			let stats2 = this.state;
					
			//	Selects a new word.
			let rwords = this.RandomColourWord();
			
			stats2.rWord = rwords[0];
			stats2.rColourRepOBJ = rwords[1];
			
			this.setState(stats2);					
				
		}
	}

	render(){
		
		return (
				<div id="cgame">
					<h1>Colour game</h1>
					<p>Click on the colour of the word, not the content.</p>
					<button onClick = { this.StartGame }>Start!</button>
					<label>Score: { this.state.currentScore } </label>
					<label>Lives: { this.state.currentLives } </label>
					<br/>
					<label className={ this.state.rColourRepOBJ.cName }> { this.state.rWord } </label>
					<div id="cntrlr">
						<button data-colourName="red" className="controlBtn" onClick = { this.SelectionButton } >RED</button>
						<button data-colourName="blue" className="controlBtn" onClick = { this.SelectionButton }>BLUE</button>
						<button data-colourName="green" className="controlBtn" onClick = { this.SelectionButton }>GREEN</button>
						<button data-colourName="yellow" className="controlBtn" onClick = { this.SelectionButton }>YELLOW</button>
						<button data-colourName="orange" className="controlBtn" onClick = { this.SelectionButton }>ORANGE</button>
						<button data-colourName="pink" className="controlBtn" onClick = { this.SelectionButton }>PINK</button>
					</div>
				</div>
			);
		
	}
	
}

ReactDOM.render(
	<ColourGame2 />,
	document.getElementById("app")
);