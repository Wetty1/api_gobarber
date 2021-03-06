import { uuid } from "uuidv4";
import { getMonth, getYear, isEqual, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllProvidersDTO from "@modules/appointments/dtos/IFindAllProvidersDTO";
import IFindAllMonthFromProvider from "@modules/appointments/dtos/IFindAllInMonthProviderDTO";
import IFindAllDayFromProvider from "@modules/appointments/dtos/IFindAllInDayProviderDTO";

class AppointmentsRepository implements IAppointmentsRepository {
  private appoitments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appoitments.find(
      appointment => isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({ month, provider_id, year }: IFindAllMonthFromProvider): Promise<Appointment[]> {
    const appointments = this.appoitments.filter(appointment =>
      appointment.provider_id === provider_id &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year);

    return appointments;
  }

  public async findAllInDayFromProvider({ day, month, provider_id, year }: IFindAllDayFromProvider): Promise<Appointment[]> {
    const appointments = this.appoitments.filter(appointment =>
      appointment.provider_id === provider_id &&
      getDate(appointment.date) === day &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year);

    return appointments;
  }

  public async create({ provider_id, date, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;

    this.appoitments.push(appointment);

    return appointment;
  }

}

export default AppointmentsRepository;
