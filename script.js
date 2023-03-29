fetch('worldstuck.json')
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		appendData(data);
	})
	.catch(function(err) {
		console.log('error: ' + err);
	});
function appendData(data) {
	var mainContainer = document.getElementById("myData");
	for (var i = 0; i < data.length; i++) {
		function appendDiv(i) {
			var div = document.createElement("div");
			div.setAttribute("class", `groupSection group-${i}`);
			mainContainer.appendChild(div);
		}
		function appendImg(data, i) {
			var img = new Image();
			img.src = data[i].img
			img.setAttribute("class", "image");
  		img.setAttribute("alt", "MSPA Reader");
			mainContainer.lastChild.appendChild(img);
		}
		function appendPar(data, i) {
			var par = document.createElement("p");
			par.innerHTML = `<b>Name: </b>${data[i].groupName}`;
			par.setAttribute("class", "para");
			mainContainer.lastChild.appendChild(par);
		}
		appendDiv(i);
		appendPar(data, i);
		appendImg(data, i);
	}
}