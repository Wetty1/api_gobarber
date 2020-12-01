import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllMonthFromProvider from '../dtos/IFindAllInMonthProviderDTO';
import IFindAllDayFromProvider from '../dtos/IFindAllInDayProviderDTO';

export default interface IAppointmentRepository {
  create(dto: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllMonthFromProvider): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllDayFromProvider): Promise<Appointment[]>;

}
