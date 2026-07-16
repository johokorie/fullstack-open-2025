const mongoose = require('mongoose');



const name = process.argv[3];
const number = process.argv[4];
const password = process.argv[2];

// DB URI
const url = `mongodb+srv://panda_db:${password}@cluster0.p7mridj.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;


// Initialize DB connection
mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

// Declare data schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// Declare data model
const Person = new mongoose.model('Person', personSchema)

// Add person to DB
if (name && number) {
    const person = new Person({
			name: name,
			number: number,
		});

    person.save().then(({name, number}) => {
        console.log(`Added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
}


if (password && !name && !number) {
	Person.find({}).then((result) => {
		if (result && result.length !== 0) {
			console.log(`Phonebook:`);
			result.forEach((person) => {
				console.log(`${person.name} ${person.number}`);
			});
		} else {
			console.log(
				"Phonebook is empty. To add a new contact, provide the contact name and number as an argument like so: node mongo.js <your password> <contact name> <contact number>",
			);
		}
		mongoose.connection.close();
	});
}









