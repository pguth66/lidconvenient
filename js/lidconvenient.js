// these need to be global to go between runAll and runSim
var numMales = 2 ;
var numFemales = 2 ;
var cumPIU = 0 ;
var cumPID = 0 ;
var cumLIR = 0 ;

function runAll() {

	// get the input, validate it, and run the 3 simulators
	numMales = Number(document.getElementById("malesinput").value);
	numFemales = Number(document.getElementById("femalesinput").value);
	try {
		if((isNaN(numMales)) || (isNaN(numFemales))) throw "Please enter numbers only" ;
		if ((numMales < 0 ) || ( numFemales < 0 )) throw "Cannot have negative people" ;
		if ( numMales + numFemales == 0 ) throw "Have to have at least one person";
		if (numMales + numFemales > 10000 ) throw "Too many people";
		
		// clear any highlighting left over from previous run
		document.getElementById("col1inconvpercent").classList.remove("w3-green");
		document.getElementById("col2inconvpercent").classList.remove("w3-green");
		document.getElementById("col3inconvpercent").classList.remove("w3-green");

		runSim("PIU");
		runSim("PID");
		runSim("LIR");

		// now that we've done the sims, highlight the lowest one
		if (( cumPIU < cumPID) && (cumPIU < cumLIR))  {
			document.getElementById("col3inconvpercent").classList.add("w3-green");
		}
		else if (( cumPID < cumPIU) && (cumPID < cumLIR )) {
			document.getElementById("col1inconvpercent").classList.add("w3-green");
		}
		else {
			document.getElementById("col2inconvpercent").classList.add("w3-green");
		}
		// unhide the note about highlighting the optimal strategy
		document.getElementById("footer").style.display="block";
	}
	catch(err) {
		console.log(err);
	}
}
	
// runs the sims - which strategy to use is passed as an arg
function runSim(strategy) {

	var runs = 1000 ;
	var lastState = 0 ; // 0 = lid down, 1 = seat down, 2 = seat up
	var isMan = false ;
	var currentRun = 0 ;
	var numInconv = 0 ;
	const numberTwoPercent = 0.2 ; // assume you poo 1 in 5 times
	var isNumberTwo = false ;
	var sexRatio = numFemales / ( numMales + numFemales ) ; // from the user input

	// loop through all the runs
	for ( i = 1 ; i <= runs ; i++ ) {
		if ( Math.random() > sexRatio ) {
			isMan = true ;
		}
		else {
			isMan = false ; 
		}

		if ( Math.random() < numberTwoPercent ) {
			isNumberTwo = true ; 
		}
		else {
			isNumberTwo = false ;
		}

		// everone is inconvnienced if the lid is down
		if ( lastState == 0 ) {
			numInconv++ ;
		}
		// if the lid is up, it's a man, and he's not going poo, he's inconvenienced
		else if ( ( lastState == 1 ) && isMan && !isNumberTwo ) {
			numInconv++ ;
			lastState = 2 ; // seat iw now up
		}
		// if the lid is up and it's a woman, she's inconvenienced
		else if ( ( lastState == 2  ) && (!isMan) ) {
			numInconv++ ;
			lastState = 1 ; // seat is now down
		}
		// if the lid is up and it's man going poo, he's inconvenienced
		else if ( ( lastState == 2 ) && isMan && isNumberTwo ) {
			numInconv++ ;
		}	

		if ( isMan && !isNumberTwo ) {
			lastState = 2 ; 
		}
		else {
			lastState = 1 ;
		}

		switch(strategy) {
			case "PIU":
				lastState = 2 ; //always put the seat up
				document.getElementById("col3runs").innerHTML =  i;
				document.getElementById("col3inconv").innerHTML = numInconv ;
				document.getElementById("col3inconvpercent").innerHTML = ((numInconv / i).toFixed(2) * 100 ) + "%" ;
				break ;
			case "PID":
				lastState = 1 ; //always put the seat down
				document.getElementById("col1runs").innerHTML =  i;
				document.getElementById("col1inconv").innerHTML = numInconv ;
				document.getElementById("col1inconvpercent").innerHTML = ((numInconv / i).toFixed(2) * 100 ) + "%";
				break ;
			case "LIR":
				document.getElementById("col2runs").innerHTML =  i;
				document.getElementById("col2inconv").innerHTML = numInconv ;
				document.getElementById("col2inconvpercent").innerHTML = ((numInconv / i).toFixed(2) * 100) + "%" ;
				break ; // leave the seat as it was
		}
	} // end of for loop

	// after loop, save the inconvenience value for this strategy to find the minimum after all 3 run
	switch(strategy) {
		case "PIU":
			cumPIU = numInconv ;
			break;
		case "PID":
			cumPID = numInconv ;
			break;
		case "LIR":
			cumLIR = numInconv;
	}
}

