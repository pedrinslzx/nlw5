/**
 * @type {import('socket.io-client').Socket}
 */
const socket = window.io()
/**
 * @type {import('mustache')}
 */
const Mustache = window.Mustache
/**
 * @type {import('dayjs')}
 */
const dayjs = window.dayjs
/**
 * @type {import('../../src/entities/Connection').Connection[]}
 */
let connectionsUsers = []

socket.on('admin_list_all_users', (connections) => {
  connectionsUsers = connections
  document.getElementById('list_users').innerHTML = ''

  const template = document.getElementById('template').innerHTML

  connections.forEach((connection) => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socket_id
    })

    document.getElementById('list_users').innerHTML += rendered
  })
  document.querySelectorAll('#list_users > div ').forEach((e) => {
    const button = e.querySelector('button')
    const id = e.dataset.id
    button.addEventListener('click', () => call(id))
  })
})

function call(id) {
  const connection = connectionsUsers.find(
    (connection) => connection.socket_id === id
  )

  const template = document.getElementById('admin_template').innerHTML

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id
  })

  document.getElementById('supports').innerHTML += rendered

  const params = {
    user_id: connection.user_id
  }

  socket.emit('admin_user_in_support', params)

  function renderAllMessages() {
    socket.emit('admin_list_messages_by_user', params, (messages) => {
      document.getElementById(`allMessages_${connection.user_id}`).innerHTML =
        ''
      renderMessages(
        messages,
        connection,
        document.getElementById(`allMessages_${connection.user_id}`)
      )
    })
  }
  renderAllMessages()

  socket.on('admin_receive_message', (data) => {
    console.log(data)
    renderAllMessages()

    const divMessages = document.getElementById(
      `allMessages_${connection.user_id}`
    )

    const createDiv = document.createElement('div')

    createDiv.className = 'admin_message_client'
    createDiv.innerHTML = `<span>${connection.user.email} </span>`
    createDiv.innerHTML += `<span>${data.message.text}</span>`
    createDiv.innerHTML += `<span class="admin_date">${dayjs(
      data.message.created_at
    ).format('DD/MM/YYYY HH:mm:ss')}</span>`

    divMessages.appendChild(createDiv)
  })
}

// eslint-disable-next-line no-unused-vars
function sendMessage(id) {
  const text = document.getElementById(`send_message_${id}`)
  if (!text.value.trim()) return

  const params = {
    text: text.value.trim(),
    user_id: id
  }

  socket.emit('admin_send_message', params)

  const divMessages = document.getElementById(`allMessages_${id}`)

  const createDiv = document.createElement('div')
  createDiv.className = 'admin_message_admin'
  createDiv.innerHTML = `Atendente: <span>${params.text}</span>`
  createDiv.innerHTML += `<span class="admin_date>${dayjs(new Date()).format(
    'DD/MM/YYYY HH:mm:ss'
  )}`

  divMessages.appendChild(createDiv)

  text.value = ''
}

function renderMessages(messages, connection, divMessages) {
  messages.forEach((message) => {
    const createDiv = document.createElement('div')

    if (message.admin_id === null) {
      createDiv.className = 'admin_message_client'

      createDiv.innerHTML = `<span class="admin_date">${connection.user.email}</span>`
      createDiv.innerHTML += `<span>${message.text}</span>`
      createDiv.innerHTML += `<span class="admin_date">${dayjs(
        message.created_at
      ).format('DD/MM/YYYY HH:mm:ss')}</span>`
    } else {
      createDiv.className = 'admin_message_admin'

      createDiv.innerHTML = `Atendente: <span>${message.text}</span>`
      createDiv.innerHTML += `<span class="admin_date>${dayjs(
        message.created_at
      ).format('DD/MM/YYYY HH:mm:ss')}`
    }

    divMessages.appendChild(createDiv)
  })
  divMessages.scroll(0, divMessages.scrollHeight)
}
