require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const persons = []

morgan.token("body", (req, res) => {
	return JSON.stringify(req.body);
});



app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"),);


// Get info route
app.get("/info", (req, res) => {

	Person.find({}).then((persons) => {

		const date = new Date().toString();

		res.send(`<div>
				<p>Phonebook has info for ${persons.length} people</p>
				<p>${date}</p>
			</div>`);
	})
});

//Get all persons route
app.get("/api/persons", (req, res) => {

	Person.find({}).then((persons) => {
		res.json(persons)
	})
});

//Get a person route
app.get("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	person = persons.find((person) => person.id === id);

	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

//Delete a person route
app.delete("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	const person = persons.filter((person) => person.id !== id);

	res.status(204).end();
});

//Post  person route
app.post("/api/persons", (req, res) => {
	const body = req.body;

	const personName = body.name;
	const personNumber = body.number;

	// Check if name already exit
	const isNameFound = (name) => {
		const nameFound = persons.find((person) => person.name === name)
			? true
			: false;
		return nameFound;
	};

	if (!personName) {
		return res.status(400).json({
			error: "name is missing",
		});
	}

	if (!personNumber) {
		return res.status(400).json({
			error: "number is missing",
		});
	}

	if (isNameFound(personName)) {
		return res.status(400).json({
			error: "name must be unique",
		});
	}

	const generateId = () => {
		const id = Math.floor(Math.random() * 1000000000);

		return String(id);
	};

	const person = {
		id: generateId(),
		name: personName,
		number: personNumber,
	};

	persons = persons.concat(person);

	res.json(person);
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
