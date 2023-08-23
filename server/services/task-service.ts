import DatabaseClient, { DbConfiguration } from '../database/database-client'
import getDate from '../utils/datetime'
import { uuid } from 'uuidv4'

export type TaskInputType = {
  title: string
  description: string
  status: number
}

const dbConfig: DbConfiguration = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

const databaseConnection = new DatabaseClient(dbConfig)

export const create = async ({ title, description, status }: TaskInputType) => {
  const result = await databaseConnection.dbQuery({
    queryString:
      'INSERT INTO `task` (`uuid`,`title`,`description`,`status`,`date_created`) VALUES (?, ?, ?, ?, ?)',
    params: [uuid(), title, description, status, getDate()],
  })
  return result
}

export const findOne = async (uuid: string) => {
  const result = await databaseConnection.dbQuery({
    queryString:
      'SELECT * FROM `task` WHERE `uuid` = ?',
    params: [uuid]
  })
  return result
}

export const getAll = async () => {
  const result = await databaseConnection.dbQuery({
    queryString:
      'SELECT * FROM `task`'
  })
  return result
}

export const update = async (
  uuid: string,
  { title, description, status }: TaskInputType
) => {
  const result = await databaseConnection.dbQuery({
    queryString:
      'UPDATE `task` SET `title`= ?, `description` = ?, `status` = ?, `date_updated` = ? WHERE `uuid` = ?',
    params: [title, description, status, getDate(), uuid],
  })
  return result
}

export const deleteOne = async (uuid: string) => {
  const result = await databaseConnection.dbQuery({
    queryString:
      'DELETE FROM `task` WHERE `uuid` = ?',
    params: [uuid],
  })
  return result
}

export default {
  create,
  getAll
  findOne,
  update,
  deleteOne
}