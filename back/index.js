const bodyparser=require('body-parser')
const cors=require('cors')

//creation app express
var express=require('express');
const app=express();
app.listen(5000);

app.use(cors())//allows incoming requests from ip
const multer  = require('multer')
const upload = multer({ dest: __dirname+'uploads/' })

//Connection base de donnees
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projetNode'
})

//route

//liste de tous les prets
app.get("/liste",(req,res) => {
    con.query("select * from Pret_bancaire",(error,data,fields)=>{
        if(error)return res.json(error);
        return res.json(data);
        }
    )
})

//ajout nouveau pret
app.post("/ajout", upload.single(),(req,res)=>{
    //return(req);
    con.query("insert into Pret_bancaire(num_compte,nom_client,nom_banque,montant,date_pret,taux_pret)values(?,?,?,?,?,?)"
    , [req.body.num_compte,req.body.nom_client,req.body.nom_banque,req.body.montant,req.body.date_pret,req.body.taux_pret],(error,data,fields)=>{
        if(error)return res.send(error);
        return res.send(data);
    })
    //return res.json(req.num_compte);
    /*con.query("insert into Pret_bancaire(num_compte,nom_client,nom_banque,montant,date_pret,taux_pret)values(?,?,?,?,?,?)"
    , ["P004","Bao","BFV",20000,"10/10/10",7],(error,data,fields)=>{
        if(error)return res.json(error);
        return res.json(data);
    })*/ return;
})

//supprimer un pret
app.delete("/supprimer/:num_compte",(req,res) => {
    con.query('delete from Pret_bancaire where num_compte=?',req.params.num_compte,(error,data,fields)=>{
        if(error)return res.json(error);
        return res.json(data);
        }
    )
})
//modifier un pret
app.put("/modifier/:num_compte", upload.single(),(req,res) => {
    con.query('update Pret_bancaire set nom_client=?, nom_banque=?, montant=?, date_pret=?, taux_pret=? where num_compte=?',
    [req.body.nom_client,req.body.nom_banque,req.body.montant,req.body.date_pret,req.body.taux_pret,req.params.num_compte],(error,data,fields)=>{
        if(error)return res.json(error);
        return res.json(data);
        }
    )
})
