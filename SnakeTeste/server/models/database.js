import fs from 'fs'

export default class Database {
  constructor(filename) {
    this.filename = filename;
    this.data = this.list()
  }

  saveToJson(data) {
    // Save the data to a JSON file
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.filename, jsonData, 'utf-8');
  }

  list(username) {
    // Load data from the JSON file, if it exists
    try {
      const fileData = fs.readFileSync(this.filename, 'utf-8');
      this.data = JSON.parse(fileData);

      if (username) {
        // Se o username for fornecido, encontre o registro correspondente
        const user = this.data.find((user) => user.username === username);

        if(!user){
          throw new Error('Username not found in database')
        }

        return user
      } 

      // Se nenhum username foi fornecido, retorne todos os registros
      return this.data;
      
    } catch (error) {
      console.log(error);
    }
  }

  update(username, updates) {
    // Find the user by username
    const userToUpdate = this.list(username)

    // If the user is found, update the specified keys
    if (userToUpdate) {
      for (const key in updates) {
        if (Object.prototype.hasOwnProperty.call(updates, key)) {
          userToUpdate[key] = updates[key];
        }
      }

      // Save the updated data to the JSON file
      this.saveToJson(this.data);
      return true; // Indicate successful update
    }

    throw new Error('Impossible to update user, it was not found in database')
  }


  // TODO: Work on it latter
  delete(username) {
    // Find the index of the user by username
    const userIndexToDelete = this.data.findIndex((user) => user.username === username);

    // If the user is found, remove it from the array
    if (userIndexToDelete !== -1) {
      this.data.splice(userIndexToDelete, 1);

      // Save the updated data to the JSON file
      this.saveToJson(this.data);
      return true; // Indicate successful deletion
    }

    return false; // Indicate user not found
  }
}