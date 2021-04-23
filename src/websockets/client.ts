import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsServices'
import { MessagesService } from '../services/MessagesService'
import { UsersService } from '../services/UsersService'

interface IParams {
  text: string
  email: string
}

io.on('connect', (socket) => {
  const connectionService = new ConnectionsService()
  const usersService = new UsersService()
  const messagesService = new MessagesService()
  const sendAdminConnections = async () =>
    io.emit(
      'admin_list_all_users',
      await connectionService.findAllWithoutAdmin()
    )

  socket.on('client_first_access', async ({ email, text }: IParams) => {
    const user = await usersService.create({ email })

    const connection = await connectionService.create({
      socket_id: socket.id,
      user_id: user.id
    })

    await messagesService.create({
      text,
      user_id: connection.user_id
    })

    const allMessages = await messagesService.listByUser(user.id)
    socket.emit('client_list_all_messages', allMessages)
    sendAdminConnections()
  })

  socket.on('client_send_to_admin', async (params) => {
    if (params.socket_admin_id) {
      const connection = await connectionService.findBySocketID({
        socket_id: socket.id
      })
      const message = await messagesService.create({
        text: params.text,
        user_id: connection.user_id
      })

      io.to(params.socket_admin_id).emit('admin_receive_message', {
        message,
        socket_id: socket.id
      })
    }
  })
  socket.on('disconnect', sendAdminConnections)
  socket.on('disconnect', async () => {
    await connectionService.removeUserSocket({ socket_id: socket.id })
  })
})
