fetch('worldstuck.json')
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		var regions = Object.values(data);	
		for (var a = 0; a < regions.length; a++) {
			regions[a].sort(function(a, b) {
				return a.groupName.localeCompare(b.groupName);
			});
			appendData(data, a);
		}
	})
	.catch(function(err) {
		console.log('error: ' + err);
	});
function appendData(data, a) {

	//VARIABLES
	var mainContainer = document.getElementById("myData");
	var regionKeys = Object.keys(data)[a];
	var regionValues = Object.values(data)[a];
	var regions = Object.values(data)
	//END VARIABLES

	//FUNCTIONS
	function appendDiv(classes, idNeed, divId, container) {
		let div = document.createElement("div");
		div.setAttribute("class", classes);
		if (idNeed) {
			div.setAttribute("id", divId);
		}
		container.appendChild(div);
	}
	function appendImg(alt, container) {
		let img = new Image();
		img.src = regionValues[i].img;
		img.setAttribute("alt", alt);
		container.appendChild(img);
	}
	function appendText(textVal, container, textTag) {
		let text = document.createElement(textTag);
		text.innerHTML = textVal;
		container.appendChild(text);
	}
	//END FUNCTIONS

	//THE GOOD SHIT
	appendDiv("region", true, regionKeys, mainContainer);
	appendText(Object.keys(data)[a], mainContainer.lastChild, "h1")
	for (var i = 0; i < regionValues.length; i++) {
		appendDiv("group", false, "", mainContainer.lastChild);
		groupDiv = mainContainer.lastChild.lastChild
		appendText(`<b>Name: </b>${regionValues[i].groupName}`, groupDiv, "p");
		appendImg("wowza", groupDiv);
	}
	//END THE GOOD SHIT
}