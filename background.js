var counter = 0;
var url = chrome.extension.getURL("man.jpg");
var insert = "<img style=\"display:inline;width:20px;height:20px;\" src=\""+url+"\">";
var jump1 = insert.length - "slash".length;
var jump2 = insert.length - "/".length;
var bodytag = $("body")[0];
var html = bodytag.innerHTML;
var inAttr = false;
for(var j = 0; j < html.length; j++) {
	if(html.charAt(j) == "<") {
		// start of tag
		inAttr = true;
	}
	else if(html.charAt(j) == ">") {
		// close of tag
		inAttr = false;
	}
	else if(!inAttr && j+4<html.length && html.substring(j,j+5).toLowerCase() == "slash") {
		// this is if were not in a tag, then replace
		var begin = html.substring(0,j);
		var end = html.substring(j+5);
		html = begin+insert+end;
		j+=jump1;
		counter++;
	}
	else if(!inAttr && html.charAt(j) == "/") {
		// this is if were not in a tag, then replace
		var begin = html.substring(0,j);
		var end = html.substring(j+1);
		html = begin+insert+end;
		j+=jump2;
		counter++;
	}
}
bodytag.innerHTML = html;