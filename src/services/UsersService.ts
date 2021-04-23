import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

interface IUserCreate {
  email: string
}

class UsersService {
  private repository: UsersRepository
  constructor() {
    this.repository = getCustomRepository(UsersRepository)
  }

  async create({ email }: IUserCreate) {
    const userExists = await this.repository.findOne({ where: { email } })

    if (userExists) return userExists

    const user = this.repository.create({ email })

    await this.repository.save(user)

    return user
  }

  async findByEmail({ email }: { email: string }) {
    return await this.repository.findOne({ where: { email } })
  }
}

export { UsersService }
