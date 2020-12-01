import { injectable, inject } from "tsyringe";

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IAppoitmentsRepository from '../../appointments/repositories/IAppointmentsRepository'
import { boolean, number } from "yargs";
import { getDate, getDaysInMonth, getHours, isAfter } from "date-fns";

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>

@injectable()
class ListProvidersDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppoitmentsRepository,
  ) { }

  public async execute({ provider_id, month, year, day }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day
    })

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppoitmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppoitmentInHour && isAfter(compareDate, currentDate),
      }
    })

    return availability;
  }
}

export default ListProvidersDayAvailabilityService;
