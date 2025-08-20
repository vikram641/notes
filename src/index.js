const express = require("express");
const userRouter = require("./routes/userRouts");
const app = express();
const mongoose = require("mongoose");
const noteRouter = require("./routes/notesRouts");
mongoose.connect("mongodb+srv://vikram8575229:JnQPq1c1TI8s48sy@notes.yi5izwk.mongodb.net/")
// .then(() => {
//     app.listen(3000,'0.0.0.0', ()=>{
//         console.log("server started");
//     }
// );
//   })
//   .catch((error) => {
//     console.error('❌ MongoDB connection error:', error.message);
//     process.exit(1); // Exit the app if the DB fails to connect
//   });

.then(() => {
  const PORT = process.env.PORT || 3000;   // Use Render's PORT if available
  app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server started on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  process.exit(1);
});

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes",  noteRouter);

app.get("/",(req , res)=>{
    res.send("hello");
    
} );

