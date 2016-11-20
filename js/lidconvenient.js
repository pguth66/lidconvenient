var numMales = 2 ;
var numFemales = 2 ;

function setSexes() {

	numMales = Number(document.getElementById("malesinput").value);
	numFemales = Number(document.getElementById("femalesinput").value);
}
	
function runLU ( ) {

	var runs = 1000 ;
	var lastState = 0 ; // 0 = lid down, 1 = seat down, 2 = seat up
	var isMan = false ;
	var currentRun = 0 ;
	var numInconv = 0 ;
	const numberTwoPercent = 0.2 ;
	var isNumberTwo = false ;
	var ranNum = 0 ;
	var sexRatio = numFemales / ( numMales + numFemales ) ;

	for ( i = 1 ; i < runs ; i++ ) {
		// assume 50% chance it's a man or a woman
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

		if ( lastState == 0 ) {
			numInconv++ ;
		}
		else if ( ( lastState == 1 ) && isMan && !isNumberTwo ) {
			numInconv++ ;
			lastState = 2 ;
		}
		else if ( ( lastState == 2  ) && (!isMan) ) {
			numInconv++ ;
			lastState = 1 ;
		}
		else if ( ( lastState == 2 ) && isMan && isNumberTwo ) {
			numInconv++ ;
		}	

		if ( isMan && !isNumberTwo ) {
			lastState = 2 ; 
		}
		else {
			lastState = 1 ;
		}

		lastState = 2 ; //always put the seat up

		document.getElementById("col3runs").innerHTML =  i ;
		document.getElementById("col3inconv").innerHTML = numInconv ;
		document.getElementById("col3inconvpercent").innerHTML = (numInconv / i).toFixed(2) * 100 ;
	}
}
function runLIR ( ) {

	var runs = 1000 ;
	var lastState = 0 ; // 0 = lid down, 1 = seat down, 2 = seat up
	var isMan = false ;
	var currentRun = 0 ;
	var numInconv = 0 ;
	const numberTwoPercent = 0.2 ;
	var isNumberTwo = false ;
	var ranNum = 0 ;

	for ( i = 1 ; i < runs ; i++ ) {
		// assume 50% chance it's a man or a woman
		if ( Math.random() > 0.6 ) {
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

		if ( lastState == 0 ) {
			numInconv++ ;
			console.log("Lid was down");
			if ( isMan && !isNumberTwo ) {
				lastState = 2 ; 
			}
			else {
				lastState = 1 ;
			}
		}
		else if ( ( lastState == 1 ) && isMan && !isNumberTwo ) {
			numInconv++ ;
			lastState = 2 ;
		}
		else if ( ( lastState == 2 ) && (!isMan) ) {
			numInconv++ ;
			console.log("seat was up and it's a man");
			lastState = 1 ;
		}

		document.getElementById("col2runs").innerHTML =  i ;
		document.getElementById("col2inconv").innerHTML = numInconv ;
		document.getElementById("col2inconvpercent").innerHTML = (numInconv / i).toFixed(2) * 100 ;
	}
}

function runLUSD ( ) {

	var runs = 1000 ;
	var lastState = 0 ; // 0 = lid down, 1 = seat down, 2 = seat up
	var isMan = false ;
	var currentRun = 0 ;
	var numInconv = 0 ;
	const numberTwoPercent = 0.2 ;
	var isNumberTwo = false ;
	var ranNum = 0 ;

	for ( i = 1 ; i < runs ; i++ ) {
		// assume 50% chance it's a man or a woman
		if ( Math.random() > 0.6 ) {
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

		if ( lastState == 0 ) {
			numInconv++ ;
			console.log("Lid was down");
		}
		else if ( ( lastState == 1 ) && isMan && !isNumberTwo ) {
			numInconv++ ;
		}
		else if ( ( lastState == 2 ) && (!isMan) ) {
			numInconv++ ;
			console.log("seat was up and it's a man");
		}

		lastState = 1 ; // always put the seat down

		document.getElementById("col1runs").innerHTML =  i ;
		document.getElementById("col1inconv").innerHTML = numInconv ;
		document.getElementById("col1inconvpercent").innerHTML = (numInconv / i).toFixed(2) * 100 ;
	}
}

