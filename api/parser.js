const regex = require('regex');
const fs = require('fs');

class Parser {
  constructor(filePath, config) {
    this.filePath = filePath;
    this.config = config;
  }

  parse() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      const lines = data.split('\n');
      const parsedData = [];

      lines.forEach(line => {
        if (line.trim() !== '') {
          const match = line.match(this.config.regex);
          if (match) {
            const obj = {};
            Object.keys(match).forEach(key => {
              if (key !== 'input') {
                obj[key] = match[key];
              }
            });
            parsedData.push(obj);
          }
        }
      });

      return parsedData;
    } catch (error) {
      console.error(`Error parsing file: ${error}`);
      return [];
    }
  }
}

module.exports = Parser;