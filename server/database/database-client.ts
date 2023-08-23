import mysql, { Connection } from 'mysql2'

export type DbConfiguration = {
  host: string | undefined
  port: number | undefined
  user: string | undefined
  password: string | undefined
  database: string | undefined
}

class DatabaseClient {
  private connection: Connection | null = null
  private dbConfig: DbConfiguration

  constructor(dbConfig: DbConfiguration) {
    this.dbConfig = dbConfig
  }

  private createConnection() {
    if (!this.connection) {
      this.connection = mysql.createConnection(this.dbConfig)
    }
  }

  private closeConnection() {
    if (this.connection) {
      this.connection.end()
      this.connection = null
    }
  }

  private query({
    queryString,
    params,
  }: {
    queryString: string
    params?: any[]
  }) {
    return new Promise<any>((resolve, reject) => {
      if (this.connection) {
        this.connection.query(queryString, params, (error, results) => {
          if (error) {
            reject(`There is an error in database query ${error}`)
          } else {
            console.log(`Query ${queryString} has been executed`)
            resolve(results)
          }
        })
      }
    })
  }

  async dbQuery(query: { queryString: string; params?: any }) {
    this.createConnection()
    const results = await this.query(query).catch(e => { throw new Error(e) })
    this.closeConnection()
    return results
  }
}

export default DatabaseClient
