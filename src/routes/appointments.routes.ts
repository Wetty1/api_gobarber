import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentServices'
import { getCustomRepository } from 'typeorm'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return res.json({ appointments })
})

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body

    const parseDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = createAppointment.execute({provider, date: parseDate})

    return res.json(appointment)

  } catch (error) {
    return res
      .status(400)
      .json({ error: error.message })
  }
})

export default appointmentsRouter

