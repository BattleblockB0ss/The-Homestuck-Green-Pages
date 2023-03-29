fetch('worldstuck.json')
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		var numRegions = Object.values(data).length
		for (var a = 0; a < numRegions; a++) {
			appendData(data, a);
		}
	})
	.catch(function(err) {
		console.log('error: ' + err);
	});
function appendData(data, a) {
	var mainContainer = document.getElementById("myData");
	var regionGroups = Object.values(data)[a]
	for (var i = 0; i < regionGroups.length; i++) {
		var group = regionGroups[i];
		function appendDiv() {
			var div = document.createElement("div");
			div.setAttribute("class", `groupSection group-${group.id}`);
			mainContainer.appendChild(div);
		}
		function appendImg() {
			var img = new Image();
			img.src = group.img;
			img.setAttribute("class", "image");
			img.setAttribute("alt", "MSPA Reader");
			mainContainer.lastChild.appendChild(img);
		}
		function appendPar() {
			var par = document.createElement("p");
			par.innerHTML = `<b>Name: </b>${group.groupName}`;
			par.setAttribute("class", "para");
			mainContainer.lastChild.appendChild(par);
		}
		appendDiv();
		appendPar();
		appendImg();
	}
}