const errorHandler = (err, req, res, next) => {
  
  if(err.name === "Error Not Found!") {
    res.status(404).json({name: "Error Not Found!", message: err.message})
  } else {
    res.status(500).json({message: "Internal Server Error!"})
  }
  
}

module.exports = errorHandler;