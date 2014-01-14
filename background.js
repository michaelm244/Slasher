var url = chrome.extension.getURL("man.jpg");
(function(){
	changeHTML(document.body);
})();
function changeHTML(tag) {
	var inner = false;
	if(tag.childNodes.length == 0)
		inner = true;
	if(inner) {
		if(tag.constructor.name == "Text") {
			// use nodeValue to replace content
			var newTag = document.createElement("span");
			var text = tag.nodeValue;
			text = text.replace(/\//g, "<img style=\"display:inline;width:20px;height:20px;\" src=\""+url+"\">");
			text = text.replace(/slash/gi, "<img style=\"display:inline;width:20px;height:20px;\" src=\""+url+"\">");
			newTag.innerHTML = text;
			tag.parentNode.insertBefore(newTag, tag);
			tag.remove();
		}
		else if(tag.constructor.name != "Comment") {
			// else, use innerHTML to replace content
			try {
			tag.innerHTML = tag.innerHTML.replace(/\//g, "<img style=\"display:inline;width:20px;height:20px;\" src=\""+url+"\">");
			tag.innerHTML = tag.innerHTML.replace(/slash/gi, "<img style=\"display:inline;width:20px;height:20px;\" src=\""+url+"\">");
			}
			catch(err) {
				console.log("error! tag with error is below:");
				console.log(tag);
				console.log(tag.constructor.name);
				for(prop in tag){console.log(prop);}
			}
		}
	}
	else {
		for(var i = 0; i < tag.childNodes.length; i++) {
			changeHTML(tag.childNodes[i]);
		}
	}
}