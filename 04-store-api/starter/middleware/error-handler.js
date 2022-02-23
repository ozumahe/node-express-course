const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ msg: 'Something went wrong, PLS try again' })
}

module.exports = errorHandlerMiddleware
