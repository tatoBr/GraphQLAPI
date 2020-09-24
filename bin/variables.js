exports.variables = {
    databaseVars: {
        uri: `mongodb+srv://${ process.env.MONGO_USER }:${ process.env.MONGO_PASSWORD }@aifooddb.ghkbc.gcp.mongodb.net/${ process.env.MONGO_DBNAME }?retryWrites=true&w=majority`,
        models: {
            event: {
                label: "Event",
                fields: {
                    _id: '_id',
                    title: 'title',
                    description: 'description',
                    price: 'price',
                    date: 'date'
                }
            }
        }
    },
    serverVars: {
        PORT: 3000
    }
}

