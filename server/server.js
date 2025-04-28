const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

// Модели пользователя
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', UserSchema);

const app = express();
app.use(cors());
app.use(express.json());


app.get('/users',async (req,res)=>{
  res.status(201).json(await User.find())
})
app.post('/users', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, role });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Қолданушыны қосу қатесі', error });
  }
});


app.put('/users/:id', async (req, res) => {
  const { username, email, password, role } = req.body;
  
  const user = await User.findByIdAndUpdate(req.params.id, { username, email, password, role }, { new: true });

  if (!user) return res.status(404).send('Пользователь не найден');

  res.json(user);
});


app.delete('/users/:id',async (req,res)=>{
  await User.findByIdAndDelete(req.params.id);

  res.json({message:'deleted'});

})





app.post('/register',async (req,res)=>{
  const {username,email,password}=req.body;
  
  const Email = await User.findOne({email})
  if(Email) return res.status(400).send('tirkelgensiz');

  const hash = await bcrypt.hash(password,10)

  const user = new User({username,email,password:hash})

  await user.save();

  res.status(400).send('tirkeldiniz');

})
app.post('/login',async (req,res)=>{
  const {email,password}=req.body;
  
  const user = await User.findOne({email})
  if(!user) return res.status(400).send('tirkelmegensiz');

  const math = await bcrypt.compare(password,user.password)
  if(!math) return res.status(400).send('invalid password');

  const token = jwt.sign({userId:user._id,role:user.role},'secretkey',{expiresIn:'1h'});


  res.json({token})

})

app.get('/protected',async (req,res)=>{
  res.send('this is a p');
}
)
























app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
