const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 1000
const {Pool}=require('pg');
var pool;
try{
pool=new Pool({
  connectionString: process.env.DATABASE_URL
});
}
finally{
  pool=new Pool({
    user: 'postgres',
    host:'localhost',
    password:'root',
    port:5432});
  
  };



var app=express()
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/display',(req,res) => {
  var getUsrQuery =`SELECT * FROM usr`; 
  pool.query(getUsrQuery,(error,result)=>{
    if(error){
      res.end(error);}
    var results={'rows':result.rows}
    res.render('pages/display',results);
  
  })
});
app.get('/',(req,res) => {
  var getUsrQuery =`SELECT * FROM usr`; 
  pool.query(getUsrQuery,(error,result)=>{
    if(error){
      res.end(error);}
    var results={'rows':result.rows}
    res.render('pages/user_enter',results);
    
  })
});


app.post('/adduser',(req,res)=>{
  var uname=req.body.uname;
  var age=req.body.age;
  var height=req.body.height;
  var sex=req.body.sex;
  var elo=req.body.chess_elo;
  var insert_user_query=`insert into usr (name, age, height, sex,chess_elo) values('${uname}',${age},${height},'${sex}',${elo})`;
  pool.query(insert_user_query,(error,result)=>{
    if(error){
      res.end(error);}
    req.resume();
})

});
app.get('/users/:id',(req,res)=>{
  console.log(req.params.id);
  res.send("got it ")
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))