import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsServices'
import { MessagesService } from '../services/MessagesService'

io.on('connect', async (socket) => {
  const connectionServices = new ConnectionsService()
  const messageServices = new MessagesService()
  const allConnectionWithoutAdmin = await connectionServices.findAllWithoutAdmin()
  io.emit('admin_list_all_users', allConnectionWithoutAdmin)
  socket.on(
    'admin_list_messages_by_user',
    async (params: { user_id: string }, cb) => {
      console.log(params)
      const messages = await messageServices.listByUser(params.user_id)
      cb(messages)
    }
  )

  socket.on(
    'admin_send_message',
    async (params: { user_id: string; text: string }) => {
      const { user_id, text } = params
      await messageServices.create({ text, user_id, admin_id: socket.id })
      const user = await connectionServices.findByUserID({ user_id })

      io.to(user.socket_id).emit('admin_send_to_client', {
        text,
        socket_id: socket.id
      })
    }
  )
  socket.on('admin_user_in_support', async (params) => {
    await connectionServices.updateAdminID({
      admin_id: socket.id,
      user_id: params.user_id
    })
  })
  socket.on('disconnect', async () => {
    await connectionServices.removeAdmin({ admin_id: socket.id })
  })
})
