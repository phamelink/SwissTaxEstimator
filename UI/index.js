const cantons = {
	ar: "Appenzell Rhodes-Extérieures ",
	ai: "Appenzell Rhodes-Intérieures ",
	ag: "Argovie ",
	bl: "Bâle-campagne ",
	bs: "Bâle-ville ",
	be: "Berne ",
	fr: "Fribourg ",
	ge: "Genève ",
	gl: "Glaris ",
	gr: "Grisons ",
	ju: "Jura ",
	lu: "Lucerne ",
	ne: "Neuchâtel ",
	nw: "Nidwald ",
	ow: "Obwald ",
	sg: "Saint-Gall ",
	sh: "Schaffouse ",
	sz: "Schwytz ",
	so: "Soleure ",
	ti: "Tessin ",
	tg: "Thurgovie ",
	ur: "Uri ",
	vs: "Valais ",
	vd: "Vaud ",
	zg: "Zoug ",
	zh: "Zurich ",
}

var data = {
	salaireBrut: "",
	situation: "celib",
	conjointTravaille: "oui",
	salaire13eme: false,
	salaire13emeMA: "annuel",
	age: "",
	childrenCount: "0",
	children: [{}, {}, {}, {}, {}],
	canton: "ge",
}

// Inputs
const ageInput = document.getElementById("age")
const container13eme = document.getElementById("13eme-container")
const salaire13emeInput = document.getElementById("13eme")
const situationContainer = document.getElementById("situation-container")
const birthdatesContainer = document.getElementById("date-naissance-container")

// Salaire Brut handler

function handleSalaireBrut(value) {
	if (value) {
		data.salaireBrut = Number(value)
	} else {
		data.salaireBrut = ""
	}
	console.log(data)
}

// 13 eme salaire handler

const salaire13emeMensuelOuAnnuel = `
	<div id="salaire13eme-MA-container">
		<label for="13emeMensuelAnnuel">Vous recevez ce salaire annuellement ou mensuellement ?</label><br />
		<input type="radio" 
		name="13emeMensuelAnnuel"
		value="annuel"
		checked
		onchange="handle13emeMA(value)">
				Annuel
		</input>

		<input type="radio" 
			name="13emeMensuelAnnuel"
			value="mensuel"
			onchange="handle13emeMA(value)">
				Mensuel
		</input>
	</div>`

function handle13eme() {
	if (salaire13emeInput.checked) {
		container13eme.insertAdjacentHTML(
			"beforeend",
			salaire13emeMensuelOuAnnuel
		)
		data.salaire13eme = true
	} else {
		container13eme.removeChild(
			document.getElementById("salaire13eme-MA-container")
		)
		data.salaire13eme = false
	}
	data.salaire13emeMA = "annuel"
	console.log(data)
}

function handle13emeMA(value) {
	data.salaire13emeMA = value
	console.log(data)
}

// Age handler

function handleAge(value) {
	console.log(value)
	if (value.includes(".")) {
		ageInput.value = parseInt(value)
	}
	if (!value) {
		data.age = null
	} else {
		data.age = parseInt(value)
	}
	console.log(data)
}

// Handle situation

const conjointTravaille = `
	<div id="conjoint-travaille-container">
		<label for="conjoint-travaille">Votre conjoint travaille ?</label><br />
		<input type="radio" 
			name="conjoint-travaille"
			value="oui"
			checked
			onchange="handleSituation(value)">
			Oui
		</input>

		<input type="radio" 
			name="conjoint-travaille"
			value="non"
			onchange="handleSituation(value)">
				Non
		</input>
	</div>
`

function handleSituation(value) {
	if (value === "marie") {
		situationContainer.insertAdjacentHTML("beforeend", conjointTravaille)
		data.conjointTravaille = "oui"
		data.situation = value
	} else if (value === "celib") {
		situationContainer.removeChild(
			document.getElementById("conjoint-travaille-container")
		)
		data.conjointTravaille = null
		data.situation = value
	} else {
		data.conjointTravaille = value
	}
	console.log(data)
}

// Handle enfants

function handleChildBDinput(value) {
	data.childrenCount = value
	let count = parseInt(value)
	let oldChildren = data.children ? [...data.children] : Array(5).fill({})
	data.children = Array(5).fill({})
	for (let i = 0; i < count && i < oldChildren.length; i++) {
		data.children[i] = oldChildren[i]
	}

	let childrenCount = birthdatesContainer.childElementCount
	while (childrenCount > value) {
		birthdatesContainer.removeChild(birthdatesContainer.lastElementChild)
		childrenCount = birthdatesContainer.childElementCount
	}

	while (childrenCount < value) {
		birthdatesContainer.appendChild(createBirthdateInput(childrenCount))
		childrenCount = birthdatesContainer.childElementCount
	}
	console.log(data)
}

function createBirthdateInput(childNumber) {
	let bdInput = `
		<label for="childDate1">Date de naissance pour le ${childNumber + 1}${
		childNumber === 0 ? "er" : "ème"
	} enfant</label><br>
		<input type="date" name="childDate1" onchange="handleAgeOfChild(value, ${
			childNumber + 1
		})">
	`

	let div = document.createElement("div")
	let divId = document.createAttribute("id")
	divId.value = `bday-div-container-${childNumber + 1}`
	div.setAttributeNode(divId)
	div.innerHTML = bdInput

	return div
}

// Handler enfants etudiants

const enfantEtudiant = (childNumber) => {
	return `
		<label for="enfant-etudiant-${childNumber}">Votre est-il est études ?</label><br />
		<input type="radio" 
			name="enfant-etudiant-${childNumber}"
			value="oui"
			checked
			onchange="handleEtudesEnfant(value, ${childNumber})">
			Oui
		</input>

		<input type="radio" 
			name="enfant-etudiant-${childNumber}"
			value="non"
			onchange="handleEtudesEnfant(value, ${childNumber})">
				Non
		</input>
	`
}

function handleAgeOfChild(dateOfBirth, childNumber) {
	let div = document.getElementById(`bday-div-container-${childNumber}`)
	let child = document.getElementById(`etudes-container-${childNumber}`)
	if (child !== null) {
		div.removeChild(child)
		data.children[parseInt(childNumber) - 1] = null
	}
	if (is18orOlder(dateOfBirth)) {
		let container = document.createElement("div")
		let contId = document.createAttribute("id")
		contId.value = `etudes-container-${childNumber}`
		container.setAttributeNode(contId)

		container.innerHTML = enfantEtudiant(childNumber)

		div.appendChild(container)
		data.children[parseInt(childNumber) - 1] = {
			dateOfBirth: dateOfBirth,
			isOlder18: true,
			enEtude: true,
		}
	} else {
		data.children[parseInt(childNumber) - 1] = {
			dateOfBirth: dateOfBirth,
			isOlder18: false,
		}
	}
	console.log(data)
}

function is18orOlder(dateOfBirth) {
	let today = new Date()
	let dob = new Date(dateOfBirth)
	var age = today.getFullYear() - dob.getFullYear()
	var m = today.getMonth() - dob.getMonth()
	if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
		age--
	}
	return age >= 18
}

function handleEtudesEnfant(value, childNumber) {
	data.children[childNumber - 1].enEtude = value === "oui"
	console.log(data)
}

// Handle canton

function handleCanton(value) {
	data.canton = value
	console.log(data)
}

async function calculate() {
	if (!validateForm()) {
		console.log(data, "error")
		return
	}
	data.salaireBrut = Number(data.salaireBrut)
	data.age = parseInt(data.age)

	// Salaire imposable
	let salaireImposable = data.salaire13eme
		? (data.salaireBrut * 13) / 12
		: data.salaireBrut
	let salaireNet = data.salaireBrut
	let salaireBrutAnnuel = data.salaire13eme
		? data.salaireBrut * 13
		: data.salaireBrut * 12

	// Salaire brut avec 13eme mensuel
	if (data.salaire13eme) {
		salaireNet =
			data.salaire13emeMA === "annuel"
				? data.salaireBrut
				: (data.salaireBrut * 13) / 12
	}

	// Nombre enfants bareme

	let enfantsBareme = parseInt(data.childrenCount)

	// allocation familiale
	for (let i = 0; i < data.childrenCount; i++) {
		if (!data.children[i].isOlder18) {
			salaireImposable += 400
			enfantsBareme -= 1
		} else {
			salaireImposable += 300
		}
	}

	// Charge fixes AVS, AI, APG

	let chargesFixes = 0.04 * salaireNet

	// bareme

	let bareme = ""

	if (data.situation === "celib") {
		bareme = `A${enfantsBareme}`
	} else {
		if (data.conjointTravaille === "non") {
			bareme = `B${enfantsBareme}`
		} else {
			bareme = `C${enfantsBareme}`
		}
	}

	bareme = data.canton + bareme

	try {
		let baremeFileResponse = await fetch(`./../Formatter/jsonData/${bareme}.json`)
		let baremeFile = await baremeFileResponse.json()

		let impot = baremeFile.filter(
			(b) => Number(b.Revenu_imposable_fr) >= salaireImposable
		)
		let impotPourcent = 0.0
		if (impot.length === 0) {
			impotPourcent = baremeFile[baremeFile.length - 1].Impot_pourcent
		} else {
			impotPourcent = impot[0].Impot_pourcent
		}

		salaireNet =
			salaireNet * ((100 - Number(impotPourcent)) / 100) - chargesFixes
		console.log(salaireNet)

		// Output of result

		let result = document.createElement("div")
		let resultId = document.createAttribute("id")
		resultId.value = `resultat`
		result.innerHTML = `
		<h1>Vous recevez ce mois ci ${
			salaireNet - chargesFixes
		} de revenu net. Les charges fixes s elevent a ${impotPourcent}% et vous appartenez au bareme ${bareme}  </h1>
		`
		if (document.getElementById("resultat")) {
			document.body.removeChild(document.getElementById("resultat"))
		}
		document.body.appendChild(result)
	} catch (e) {
		console.log(e)
	}
}

function validateForm() {
	return data.salaireBrut !== "" && parseInt(data.age) >= 16
}

// var jsonData = {
// 	salaireBrut: "",
// 	situation: "celib",
// 	conjointTravaille = "oui",
// 	salaire13eme: false,
// 	salaire13emeMA: "annuel",
// 	age: "",
// 	childrenCount: "0",
// 	children: [{}, {}, {}, {}, {}],
// 	canton: "ge",
// }
