module.exports = (rows) => {
    //making column names like 'created_at' camelCase aka. 'createdAt'
    return rows.map((row) => {
        const rowWithCorrectCasing = {}

        for (let key in row){
            const camelCase = key.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('_', '')
            )
            rowWithCorrectCasing[camelCase] = row[key]
        }

        return rowWithCorrectCasing
    })
    
}