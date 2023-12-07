import fs from 'fs'

export default class Database {
  constructor(filename) {
    this.filename = filename;
    // this.data = [];
    this.loadFromJSON();
  }

  saveToJson(data) {
    // Save the data to a JSON file
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.filename, jsonData, 'utf-8');
  }

  loadFromJSON() {
    // Load data from the JSON file, if it exists
    try {
      const fileData = fs.readFileSync(this.filename, 'utf-8');
      this.data = JSON.parse(fileData);
    } catch (error) {
      // If the file doesn't exist or there's an error, initialize with an empty array
      this.data = [];
    }
  }
}