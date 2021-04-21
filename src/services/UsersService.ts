import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

class UsersService {
  private repository: UsersRepository
  constructor() {
    this.repository = getCustomRepository(UsersRepository)
  }

  async create(email: string) {
    const userExists = await this.repository.findOne({ where: { email } })

    if (userExists) return userExists

    const user = this.repository.create({ email })

    await this.repository.save(user)

    return user
  }
}

export { UsersService }
