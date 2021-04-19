import express from 'express'

const app = express()


/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Excluir/Deletar
 * PATCH = Alterar uma informação especifica
 */


// Rota GET para '/'
app.get('/', (request, response) => {
  return response.json({
    message: 'Olá NLW#05'
  })
})


// Rota POST para '/users'
app.post('/users', (request, response) => {
  return response.json({
    message: 'Usuário salvo com sucesso'
  })
})


app.listen(3333, () => console.log('Server is running on port 3333'))