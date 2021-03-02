const mongoose = require('mongoose')
/*Conexion a la base de datos*/
mongoose.connect(process.env.MONGO,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify:false
})
.then(res=>console.log("Database connected"))
.catch(error => console.log("Error: "+error))