import * as Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

export const schemas = {
  task: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.number(),
  }),
}

const validator = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)

    if (!error) {
      next()
    } else {
      const { details } = error
      const message = details.map(i => i.message).join(',')
      console.log('error', message)
      res.status(400).json({ error: message })
    }
  }
}

export default validator
