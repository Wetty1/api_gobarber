import "reflect-metadata"
import { getHours, isBefore, startOfHour, format } from 'date-fns'

import AppError from '@shared/errors/AppError'
import { injectable, inject } from "tsyringe";

import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import INotificationsRepository from "@modules/notifications/repositories/INotificationRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  provider_id: string,
  date: Date,
  user_id: string,
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private readonly appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private readonly notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ provider_id, date, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a paste date.");
    }

    if (user_id === provider_id)
      throw new AppError("you can't create an appointment with yourself.");

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError("You Can only create appointments between 8am and 5pm");

    const findAppointInsameDate = await this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointInsameDate) {
      throw new AppError('this appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id
    })

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`
    })

    await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`)

    return appointment;
  }

}

export default CreateAppointmentService
