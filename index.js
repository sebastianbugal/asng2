const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 1000
const {Pool}=require('pg');
var pool;

  
pool=new Pool({
  
  connectionString: process.env.DATABASE_URL})

  // pool=new Pool({
  //   user: 'postgres',
  //   host:'localhost',
  //   password:'root',
  //   port:5432});
  
  

var app=express()
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.post('/update',(req,res)=>{
  var uid=req.body.user_selected_up;
  console.log(uid)
  var query_update_usr=`SELECT * FROM usr WHERE uid=${Number(uid)}`;

  pool.query(query_update_usr,(error,result)=>{
    if(error){
      res.redirect('/display');}
    var results={'user':result.rows}

    console.log(results.user)
    if(results.user.length==0){
      console.log('redirect')
      res.redirect('/display')
    }
    else{
      res.render('pages/update',results);
    }
  
})
});
app.post('/send_update', (req,res)=>{
  var uid=req.body.user_selected_update;
  console.log(uid)
 
  var name=req.body.name_upload;
  console.log(name)
  var age=req.body.age_upload;
  console.log(age)
  var height=req.body.height_upload;
  console.log(height)
  var sex=req.body.sex_upload;
  console.log(sex)
  var elo=req.body.chess_elo_upload;
  console.log(elo)
  var query_update_usr=`UPDATE usr SET name=${name}, age=${Number(age)}, height=${Number(height)}, chess_elo=${Number(elo)}, sex='${sex}' WHERE uid=${Number(uid)}`;
  pool.query(query_update_usr,(error,result)=>{
    if(error){
      res.end(error);}
    res.redirect('/display')
  
  
})
})

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

app.post('/del_user',(req,res)=>{
  var uid=req.body.user_selected;
  console.log(uid)
  var del_user_query=`DELETE FROM usr WHERE uid=${Number(uid)}`;
  pool.query(del_user_query,(error,result)=>{
    if(error){
      res.end(error);}
    req.resume();
    var getUsrQuery =`SELECT * FROM usr`; 
    pool.query(getUsrQuery,(error,result)=>{
      if(error){
        res.end(error);}
      var results={'rows':result.rows}
      res.redirect('/display')

      
    })
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
    res.redirect('/')
    })

});
app.get('/users/:id',(req,res)=>{
  console.log(req.params.id);
  res.send("got it ")
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))