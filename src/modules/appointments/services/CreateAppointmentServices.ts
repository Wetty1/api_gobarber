import "reflect-metadata"
import { startOfHour } from 'date-fns'

import AppError from '@shared/errors/AppError'
import { injectable, inject } from "tsyringe";

import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string,
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private readonly appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date)

    const findAppointInsameDate = await this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointInsameDate) {
      throw new AppError('this appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })


    return appointment;
  }

}

export default CreateAppointmentService
