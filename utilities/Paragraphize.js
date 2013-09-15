
module.exports = function (content) {
	var result = "<p>" + content + "</p>";

	result = result.replace(/\r\n\r\n/g, "</p><p>").replace(/\n\n/g, "</p><p>");
	result = result.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />");

	return result;
};