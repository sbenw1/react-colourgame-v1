/*
*	This is the code for the colour game.
*	It is a remix.
*/

class ColourRep {
	constructor(name, code, cName){
		this.name = name;
		this.code = code;
		this.cName = cName;
	}
}

class ColourGame extends React.Component {
	
	constructor(props){
		
		super(props);
		
		/*
		*	this.props.gameStats.
		*	gameStats[0] = The flag if game is on or not 
		*	gameStats[1] = The number of lives player has left.
		*	gameStats[2] = The score of the player.
		*	gameStats[3] = The maximum score the player can have.
		*/
		
		let gameIsOn = false;
		let	livesLeft = 0;
		let playerScore = 0;
		
		const maxScore = 15;
		
		this.props.gameStats = [
			gameIsOn, livesLeft, playerScore, maxScore
		];
		
		//	Sets the state object so it does not have to be declared all the time.
		this.StateManager = () => {
			
			//	The state object to be set.
			let stobj = {
				"randomWord" : this.props.randomWord,
				"colourRep" : this.props.colourRep,
				"gameIsOn" : this.props.gameStats[0],
				"lives" : this.props.gameStats[1],
				"score" : this.props.gameStats[2]
			};
					
			//	Set the state.
			this.setState(stobj);
			
		}
		
		//	Check if the score has hit the maximum allowed.
		this.CheckScoreCeiling = () => {
			
			if(this.state.gameIsOn == true){
				
				if(this.state.score == this.props.gameStats[3]){
					
					window.alert("Congratulations, you've won the game!");
					this.props.gameStats[0] = false;
					
					//	Set the state.
					this.StateManager();
					
				}
				
			}			
			
		}
		
		//	The function that checks to see if all lives have been lost. 
		this.CheckAllLivesLost = () => {
			
			if(this.state.gameIsOn == true){
				
				if(this.state.lives == 0){
					
					window.alert("All lives lost!");
					this.props.gameStats[0] = false;
					
					this.StateManager();

				}
				
			}
			
		}
		
		//	Decides the random colour and word. 
		this.RandomColourWord = () => {
			
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
			
			this.props.randomWord = rWord;
			this.props.colourRep = rColourRep;
			
			this.StateManager();
			
		}
		
		//	Starts the game.
		this.StartTheGame = () => {
			
			window.alert("Starting the game!");
			
			let gameIsOn = true;
			
			let currentScore = 0;
			let currentLives = 3;
			
			this.props.gameStats[0] = gameIsOn;
			this.props.gameStats[1] = currentLives;
			
			this.StateManager();
			
			//	Select random colour words.
			this.RandomColourWord();
			
		}
		
		//	The one function for all of the buttons.
		this.SelectionButton = (e) => {
			
			if(this.state.gameIsOn == true){
				
				if(this.props.colourRep.name != e.target.dataset.colourname){
											
					window.alert("Incorrect!");
					this.props.gameStats[1]--;
						
				} else {
						
					window.alert("Correct!");
					this.props.gameStats[2]++;
						
				}
					
				//	Check the game status.
				this.CheckAllLivesLost();
				this.CheckScoreCeiling();
					
				//	Selects a new word.
				this.RandomColourWord();
					
				this.StateManager();
				
			}
			
		}
		
		this.RandomColourWord();
		
		//	The state object to be set.
		let stobj = {
			"randomWord" : this.props.randomWord,
			"colourRep" : this.props.colourRep,
			"gameIsOn" : this.props.gameStats[0],
			"lives" : this.props.gameStats[1],
			"score" : this.props.gameStats[2]
		};
					
		//	Set the state.
		this.state = stobj;


	}
	
	render(){
		
		return (
				<div id="cgame">
					<h1>Colour game</h1>
					<p>Click on the colour of the word, not the content.</p>
					<button onClick = { this.StartTheGame }>Start!</button>
					<label>Score: { this.state.score } </label>
					<label>Lives: { this.state.lives } </label>
					<br/>
					<label className={ this.state.colourRep.cName }> { this.state.randomWord } </label>
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
	<ColourGame />,
	document.getElementById("app")
);