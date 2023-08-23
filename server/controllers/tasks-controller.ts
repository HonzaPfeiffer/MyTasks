import validator, { schemas } from '../middleware/validator'
import { Request, Response } from 'express'
const router = require('express').Router()
import taskService from '../services/task-service'

// GET /api/tasks
router.get('/', async (req: Request, res: Response) => {
  const tasks = await taskService.getAll()
  res.send(tasks)
})

router.get('/:uuid', async (req: Request, res: Response) => {
  const id = req.params.uuid
  const task = await taskService.findOne(id)
  res.send(task)
})

router.post(
  '/',
  validator(schemas.task),
  async (req: Request, res: Response) => {
    const task = await taskService.create(req.body)
    res.send(task)
  }
)

router.put(
  '/:uuid',
  validator(schemas.task),
  async (req: Request, res: Response) => {
    const id = req.params.uuid
    const task = await taskService.update(id, req.body)
    res.send(task)
  }
)

router.delete('/:uuid', async (req: Request, res: Response) => {
    const id = req.params.uuid
    await taskService.deleteOne(id)
    res.sendStatus(200)
})

export default router
