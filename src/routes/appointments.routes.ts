import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentServices'
import { getCustomRepository } from 'typeorm'

import ensureAuthenticated from '../middleware/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return res.json({ appointments })
})

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body

  const parseDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({ provider_id, date: parseDate })

  return res.json(appointment)
})

export default appointmentsRouter

