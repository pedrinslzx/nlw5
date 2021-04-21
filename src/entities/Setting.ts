import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('settings')
class Setting {

  @PrimaryColumn()
  id: string

  @Column()
  username: string

  @Column()
  chat: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  constructor(){
    if(!this.id) this.id = uuid() 
  }

}

export { Setting }
