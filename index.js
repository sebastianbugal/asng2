const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 1100
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


app.post('/info',(req,res)=>{
  var uid=req.body.user_selected_info;
  var query_select_info=`SELECT * FROM usr WHERE uid=${uid}`;
  pool.query(query_select_info,(error,result)=>{
    var results={'user':result}
    if(error){
      res.redirect('/');
    }
    else if(result==undefined){
      return res.redirect('/')
    }
    else{
        res.render('pages/info',results);
    }
  })
});

app.get('/activity',(req,res)=>{
  var query_time_added=`SELECT time_added, uid, name FROM usr ORDER BY time_added DESC`;
  pool.query(query_time_added,(error,result)=>{
    if(error){
      res.redirect('/');}
    var results={'rows':result.rows}
    res.render('pages/activity',results);

  })
})

app.post('/update',(req,res)=>{
  var uid=req.body.user_selected_up;
  var query_update_usr=`SELECT * FROM usr WHERE uid=${Number(uid)}`;

  pool.query(query_update_usr,(error,result)=>{
    if(error){
      res.redirect('/');}
    var results={'user':result.rows}

    if(results.user.length==0){
      res.redirect('/')
    }
    else{
      res.render('pages/update',results);
    }
  
})
});
app.post('/send_update', (req,res)=>{
  var uid=req.body.user_selected_update;
 
  var name=req.body.name_upload;
  var age=req.body.age_upload;
  var height=req.body.height_upload;
  var sex=req.body.sex_upload;
  var elo=req.body.chess_elo_upload;
  var type=req.body.type;
  var size=req.body.size;
  var query_update_usr=`UPDATE usr SET name='${name}', age=${Number(age)}, height=${Number(height)}, chess_elo=${Number(elo)}, sex='${sex}', type='${type}',size=${size} WHERE uid=${Number(uid)}`;
  pool.query(query_update_usr,(error,result)=>{
    if(error){
      res.end(error);}
    res.redirect('/')
})
})

app.get('/input',(req,res) => {
  var getUsrQuery =`SELECT * FROM usr`; 
  pool.query(getUsrQuery,(error,result)=>{
    if(error){
      res.end(error);}
    var results={'rows':result.rows}
    res.render('pages/user_enter',results);
  })
});

app.get('/leader_board', (req,res)=>{
  var get_leader_board=`SELECT * FROM usr ORDER BY chess_elo DESC`;
  pool.query(get_leader_board,(error,result)=>{
    if(error){
      res.end(error);}
    var results={'rows':result.rows};
    res.render('pages/leaderboard',results)
    })
})

app.get('/',(req,res) => {
  var getUsrQuery =`SELECT * FROM usr`; 
  pool.query(getUsrQuery,(error,result)=>{
    if(error){
      res.end(error);}
    var results={'rows':result.rows}
    res.render('pages/display',results);
    
  })
});

app.post('/del_user',(req,res)=>{
  var uid=req.body.user_selected;
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
      res.redirect('/')

      
    })
})
});
app.post('/adduser',(req,res)=>{
  var uname=req.body.uname;
  var age=req.body.age;
  var height=req.body.height;
  var sex=req.body.sex;
  var elo=req.body.chess_elo;
  var type=req.body.type;
  var size=req.body.size;
  var insert_user_query=`insert into usr (name, age, height, sex,chess_elo, type, size) values('${uname}',${age},${height},'${sex}',${elo}, '${type}', ${size})`;
  pool.query(insert_user_query,(error,result)=>{
    if(error){
      res.end(error);}
    res.redirect('/')
    })

});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))