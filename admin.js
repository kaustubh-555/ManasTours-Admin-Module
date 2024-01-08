const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Tour = require('./models/tourSchema');
const router=require("./routes/routes")
const app = express();
const port =3000;

mongoose.connect("mongodb+srv://KautubhSuroshi:tourisma%40123@cluster0.bt1crzy.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
  console.log(req.url);
  next();
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/adminIndex.html');
});
app.get('*/adminIndex.html', (req, res) => {
  res.sendFile(__dirname + '/adminIndex.html');
});
app.get('/form.html', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});
app.get('/scripts.js', (req, res) => {
  res.sendFile(__dirname + '/scripts.js');
});
app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
});
app.get('/adminIndexStyle.css', (req, res) => {
  res.sendFile(__dirname + '/adminIndexStyle.css');
});
// app.get('/graph.html',(req,res)=>{
//   res.sendFile(__dirname + 'adminpages' +'graph.html');
// }
// )
// app.get('/graph.css',(req,res)=>{
//   res.sendFile(__dirname + 'adminpages' +'graph.css');
// }
// )
// app.get('/graph.js',(req,res)=>{
//   res.sendFile(__dirname + '/adminpages/graph.js');
// }
// )
// app.get('/editTour.html',(req,res)=>{
//   res.sendFile(__dirname + '/adminpages/editTour.html');
// }
// )
// app.get('/editTour.css',(req,res)=>{
//   res.sendFile(__dirname + 'adminpages/editTour.css');
// }
// )
// app.get('/edittour.js',(req,res)=>{
//   res.sendFile(__dirname + 'adminpages/edittour.js');
// }
// )
// app.get('/editPage.js',(req,res)=>{
//   res.sendFile(__dirname + 'adminpages' +'editPage.js');
// }
// )
// app.get('/editPage.html',(req,res)=>{
//   res.sendFile(__dirname + 'adminpages' +'editPage.html');
// }
// )
// app.get('/editPage.css',(req,res)=>{
//   res.sendFile(__dirname + 'adminpages' +'editPage.css');
// }
// )
app.post('/upload', upload.single('imageCover'), async (req, res) => {
  const {
    name,
    visits,
    price,
    AverageRating,
    description,
    imageCover,
    duration,
    discount,
    places,
    stay,
    food,
  } = req.body;

  const newTour = new Tour({
    name,
    visits,
    price,
    AverageRating,
    description,
    imageCover: req.file.filename,
    duration,
    discount,
    places: places.split(','),
    stay,
    food,
  });

  try {
    const savedTour = await newTour.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.post("getTourData",async(req,res)=>{
//     let tid=req.body.id;
//     console.log(req.body)
//     let tour=await tourSchema.findOne({_id:tid});
//     res.json({tour: tour});
//     tour.visits+=1;
//     tour.save();
// })

app.use(router);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
