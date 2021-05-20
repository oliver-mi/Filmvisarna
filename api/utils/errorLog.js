const path = require("path");
const fs = require("fs");

function errorLog(error) {
	console.error(error);

	const filePath = path.join(__dirname, "../../errorlog.md");
	const content = `${new Date()}\n${error.stack}`;

	if (fs.existsSync(filePath)) {
		fs.appendFile(
			filePath,
			`\n\n${content}`,
			(error) => error && console.error(error)
		);
	} else {
		fs.writeFile(
			path.join(__dirname, "../../errorlog.md"),
			`${content}`,
			(error) => error && console.error(error)
		);
	}
}

module.exports = errorLog;
