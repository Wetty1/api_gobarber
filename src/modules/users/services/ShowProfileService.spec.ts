import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfile from './UpdateProfileService';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('showProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(
      fakeUserRepository,
    );
  })

  it('should be able show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com')
  });

  it('shoul not be able show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({ user_id: 'non-existing-user-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
})
