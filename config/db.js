const mongooseBaseName = 'to-do-app'

const database = {
	development: `mongodb://127.0.0.1:27020/${mongooseBaseName}-development`,
	test: `mongodb://127.0.0.1:27020/${mongooseBaseName}-test`,
}

const localDb = process.env.TESTENV ? database.test : database.development

const currentDb = process.env.DB_URI || localDb

module.exports = currentDb