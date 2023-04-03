function appendDiv(classes, container, divId) {
	let div = document.createElement("div");
	div.setAttribute("class", classes);
	if (divId != undefined) {
		div.setAttribute("id", divId);
	}
	container.appendChild(div);
	return div;
}

function appendImg(container, img) {
	if (img != undefined) {
		let newImg = new Image();
		newImg.src = `images/${img}`;
		newImg.setAttribute("class", "groupImg");
		container.appendChild(newImg);
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

function createRegionSection(regionName, regionData) {
	const section = document.createElement("section");
	section.setAttribute("class", "region");

	//create Title
	const headerDiv = appendDiv("headerDiv", section);
	const regionHeader = appendText(regionName, headerDiv, "h1", "header");

	//create Cards
	const groupsDiv = appendDiv("groupsDiv", section);
	regionData.forEach((group) => {
		groupsDiv.appendChild(createGroupCard(group));	
	});

	return section;
}

function createGroupCard(group){
	const {groupName, period, location, size, desc, img, links, status} = group;

	const groupCard = document.createElement("div");
	groupCard.setAttribute('class', 'groupCard');

	appendImg(groupCard, img);
	appendText(groupName, groupCard, "h2", "textCenter");
	appendText(`<i>${period}</i>`, groupCard, "p", "textCenter lessHeight");
	appendText(`${location}<br><b>Member Count: </b>${size}<br>${desc}`, groupCard, "p");
	let linksLoc = links;
	appendDiv("links", groupCard, "links");
	for (var e = 0; e < linksLoc.length; e++) {
			if (linksLoc[e].includes("instagram")) {
				var linkText = "Instagram";
			} else if (linksLoc[e].includes("discord")) {
				var linkText = "Discord";
			} else if (linksLoc[e].includes("tumblr")) {
				var linkText = "Tumblr";
			} else if (linksLoc[e].includes("tiktok")) {
				var linkText = "TikTok";
			} else if (linksLoc[e].includes("youtube")) {
				var linkText = "YouTube";
			} else if (linksLoc[e].includes("linktr.ee")) {
				var linkText = "Linktree";
			} else if (linksLoc[e].includes("facebook")) {
				var linkText = "Facebook";
			}	else if (linksLoc[e].includes("twitter")) {
				var linkText = "Twitter";
			} else if (linksLoc[e].includes("deviantart")) {
				var linkText = "DeviantArt";
			} else {
				var linkText = "Unknown";
			}
			appendText(`<a href=${linksLoc[e]} target="_blank">${linkText}</a> `, groupCard.lastChild, "span", linkText);
			}
	appendDiv(`${status} activityDiv`, groupCard)
	appendText(`<b>${status.toUpperCase()}</b>`, groupCard.lastChild, "p");

	return groupCard;
}

fetch('worldstuck.json')
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		const mainContainer = document.getElementById("myData");
		for (const [regionName, regionData] of Object.entries(data)) {
			regionData.sort((a,b) => a.groupName.localeCompare(b.groupName))
			const section = createRegionSection(regionName, regionData)
			mainContainer.appendChild(section);
		}
		})
	.catch(function(err) {
		console.log('error: ' + err);
	});