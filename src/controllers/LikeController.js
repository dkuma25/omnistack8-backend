const Dev = require('../models/Dev')

module.exports = {
  async store(req, res) {
    const { user } = req.headers
    const { devId } = req.params

    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(devId)

    if (!targetDev) {
      return res.status(400).send({ error: 'Dev not exists.' })
    } else if (!loggedDev) {
      return res.status(400).send({ error: 'Dev not logged.' })
    }
    if (!loggedDev.likes.includes(targetDev._id)){
      loggedDev.likes.push(targetDev._id)
      await loggedDev.save()

      if (targetDev.likes.includes(loggedDev._id)) {
        const loggedSocket = req.connectedUsers[user]
        const targetSocket = req.connectedUsers[devId]

        if (loggedSocket && targetSocket) {
          req.io.to(loggedSocket).emit('match', targetDev)
          req.io.to(targetSocket).emit('match', loggedDev)
        }
      }
    }

    return res.json(loggedDev)
  }
}