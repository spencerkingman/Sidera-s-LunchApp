	var mediumIndex = 2;
	var dingIndex = 0;
	var ding1 = new Audio("audio/ding1.wav"); // buffers automatically when created
	var ding2 = new Audio("audio/ding2.wav");
	var ding3 = new Audio("audio/ding3.wav");
	var ding4 = new Audio("audio/ding4.wav");
	var ding5 = new Audio("audio/ding5.wav");
	var boxClose = new Audio("audio/boxClose2.wav");
	var dings = [ding1, ding2, ding3, ding4, ding5];

/*	$( "#help" ).click(function() {
  		$( "#helpText" ).fadeIn( "fast", function() {
  		});
	});*/

	$('#help').hover(function() {
    	$('#helpText').stop(true, true).fadeIn(200).slideDown({ duration: 200, queue: false });
	}, function() {
    	$('#helpText').stop(true, true).slideUp(300).fadeOut({ duration: 200, queue: false });
	});

	function allowDrop(ev) {
		ev.preventDefault();
	}

	function drag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
	}

	function fade(element, finalOpacity, frameSpeed) {
	    var op = 0.99;  // initial opacity
	    var timer = setInterval(function () {
	        if (op <= finalOpacity){
	            clearInterval(timer);
	   //         element.style.display = 'none';
	        }
	        element.style.opacity = op;
	        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op -= op * 0.5;
	    }, frameSpeed);
	}

	function unfade(element, finalOpacity, frameSpeed) {
	    var op = 0.01;  // initial opacity
	 //   element.style.display = 'block';
	    var timer = setInterval(function () {
	        if (op >= finalOpacity){
	            clearInterval(timer);
	        }
	        element.style.opacity = op;
	        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op += op * 0.1;
	    }, frameSpeed);
	}

	function drop(ev) {
		var lunch = document.getElementById("lunch")    		//get the lunchList
		var lunchList = document.getElementById("lunchList")
		var chosenFood = lunch.childNodes;						//get the elements of lunchList 
		if (chosenFood.length <= 5) {							//if there is space in the lunchList

			ev.preventDefault();
			var data = ev.dataTransfer.getData("text");			//get the ID of the chosen item
			var el = document.getElementById(data);				//get the chosen item's object for manipulation
			el.className += " chosen";							//add the 'chosen' class to the item
			unfade(el, 1, 10);
			el.style.width = "15%";
			lunch.appendChild(document.getElementById(data));	//put the image in the 'lunch' div
			var li = document.createElement("li");				//create a new place in the list for the item's name
			var dataDecoded = decodeURI(data);					//take the "%20"s out of the name	
			unfade(li, 1, 10);
			li.appendChild(document.createTextNode(dataDecoded));	
			lunchList.appendChild(li);							//add the item's name to the list

			dings[dingIndex].play();
			dingIndex++;

			if (el.className.includes("big")) {
//				bento1 = document.getElementById("bento1");
//				bento1.className += " visible";
//				unfade(bento1, 0.25, 18);
				big = document.getElementsByClassName("big");
				for (var i = 0; i < big.length; i++) {
					console.log(big[i]);
					if (!big[i].className.includes("chosen")) {
						big[i].className += " unchoosable";
						fade(big[i], 0, 10);
						big[i].draggable = false;
					}
				}
			}
		
			if (el.className.includes("med")) {
				bento234 = "bento"+mediumIndex;
				mediumIndex++;

//				bentoMed = document.getElementById(bento234);
//				bentoMed.className += " visible";
//				unfade(bentoMed, 0.25, 18);
			}			

			if (el.className.includes("small")) {
//				bento5 = document.getElementById("bento5");
//				bento5.className += " visible";
//				unfade(bento5, 0.25, 18);
				small = document.getElementsByClassName("small");
				for (var i = 0; i < small.length; i++) {
					console.log(small[i]);
					if (!small[i].className.includes("chosen")) {
						small[i].className += " unchoosable";
						fade(small[i], 0, 10);
						small[i].draggable = false;
					}
				}
			}

			if (chosenFood.length == 6) {						//if the lunch is full, make all other food unchoosable
				bentoClosed = document.getElementById("bentoClosed");
				bento = document.getElementById("bento");
				setTimeout(function() {
					bento.style.display = "none";
					bentoClosed.style.display = "inline";
					boxClose.play();
				//	unfade(bentoClosed, 1, 0);	
				}, 500);
				var food = document.getElementsByClassName("food");
				for (var i = 0; i < food.length; i++) {
					if (!food[i].className.includes("chosen") && !food[i].className.includes("unchoosable")) {
						food[i].className += " unchoosable";
						fade(food[i], 0, 100);
					}
				}
			}
		}
		else {		
															//if there is not space in the lunch list, do nothing.
		}
	}


