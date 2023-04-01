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
	//END VARIABLES

	//FUNCTIONS
	function appendDiv(classes, container, divId) {
		let div = document.createElement("div");
		div.setAttribute("class", classes);
		if (divId != undefined) {
			div.setAttribute("id", divId);
		}
		container.appendChild(div);
	}
	function appendImg(container) {
		if (regionValues[i].img != undefined) {
			let img = new Image();
			img.src = `images/${regionValues[i].img}`;
			container.appendChild(img);
		}
	}
	function appendText(textVal, container, textTag, classes) {
		let text = document.createElement(textTag);
		if (classes != undefined) {
			text.setAttribute("class", classes);
		}
		text.innerHTML = textVal;
		container.appendChild(text);
	}
	//END FUNCTIONS

	//THE GOOD SHIT
	appendDiv("region", mainContainer, regionKeys);
	appendDiv("headerDiv", mainContainer.lastChild);
	appendText(Object.keys(data)[a], mainContainer.lastChild.lastChild, "h1", "header");
	appendDiv("groupsDiv", mainContainer.lastChild);
	for (var i = 0; i < regionValues.length; i++) {
		appendDiv("group", mainContainer.lastChild.lastChild);
		groupDiv = mainContainer.lastChild.lastChild.lastChild
		appendImg(groupDiv);
		appendText(regionValues[i].groupName, groupDiv, "h2");
		appendText(regionValues[i].location, groupDiv, "p");
		appendText(`<b>Member Count: </b>${regionValues[i].size}`, groupDiv, "p");
		appendText(`<i>Period Active: ${regionValues[i].period}</i>`, groupDiv, "p");
		appendText(regionValues[i].desc, groupDiv, "p");
		let linksLoc = regionValues[i].links;
		appendDiv("links", groupDiv, "links");
		for (var e = 0; e < linksLoc.length/2; e++) {
			appendText(`<a href=${linksLoc[2*e+1]}>${linksLoc[e*2]}</a> `, groupDiv.lastChild, "span", linksLoc[e*2]);
		}
		appendDiv("regionValues[i].status", groupDiv)
		appendText(regionValues[i].status, groupDiv.lastChild, "p");
	}
	//END THE GOOD SHIT
}