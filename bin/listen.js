const app = require("../app.js")
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try{
    console.log(`App is now listening on port ${port}`);
  }catch (err){
    console.log("Something went wrong!")
  }
})