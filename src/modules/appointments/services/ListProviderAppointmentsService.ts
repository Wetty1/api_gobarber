import { injectable, inject } from "tsyringe";

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppoitmentsRepository from '../../appointments/repositories/IAppointmentsRepository'
import { boolean, number } from "yargs";
import { getDate, getDaysInMonth, getHours, isAfter } from "date-fns";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppoitmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}:${month}:${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day,
      });

      console.log('Buscou do banco');

      await this.cacheProvider.save(
        cacheKey,
        appointments,
      );
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
