const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const lab = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "projekt"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req,res)=>{
    const sqlSelect = "SELECT * FROM praktyki;"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});


app.get("/api/labget", (req,res)=>{
    const sqlLabSelect = "SELECT Nr_Laboranta FROM laboranci;"
    db.query(sqlLabSelect, (err,result)=>{
        res.send(result);
    });
});

app.get("/api/mieget", (req,res)=>{
    const sqlMieSelect = "SELECT Miejsce FROM miejsce;"
    db.query(sqlMieSelect, (err,result)=>{
        res.send(result);
    });
});

app.get("/api/userget", (req,res)=>{
    const sqlUserSelect = "SELECT Imie_Nazwisko FROM uzytkownicy;"
    db.query(sqlUserSelect, (err,result)=>{
        res.send(result);
    });
});

app.get("/api/rodzajget", (req,res)=>{
    const sqlRodzajSelect = "SELECT rodzaj FROM sprzet;"
    db.query(sqlRodzajSelect, (err,result)=>{
        res.send(result);
    });
});

app.post("/api/insertLab", (req,res)=>{
    const Nr_Laboranta = req.body.Nr_Laboranta;
    const Imie = req.body.Imie;
    const Nazwisko = req.body.Nazwisko;

    const sqlInsert = "INSERT INTO laboranci (Nr_Laboranta, Imie, Nazwisko) VALUES (?,?,?);"
    db.query(sqlInsert, [Nr_Laboranta, Imie, Nazwisko], (err, result)=>{
        console.log(err);
    })
})
app.post("/api/insertMiejsce", (req,res)=>{
    const Miejsce = req.body.Miejsce;

    const sqlInsert = "INSERT INTO miejsce (Miejsce) VALUES (?);"
    db.query(sqlInsert, [Miejsce], (err, result)=>{
        console.log(err);
    })
})
app.post("/api/insertUser", (req,res)=>{
    const id_Uzytkownika =req.body.id_Uzytkownika;
    const Imie_Nazwisko = req.body.Imie_Nazwisko;

    const sqlInsert = "INSERT INTO uzytkownicy (id_Uzytkownika, Imie_Nazwisko) VALUES (?,?);"
    db.query(sqlInsert, [id_Uzytkownika, Imie_Nazwisko], (err, result)=>{
        console.log(err);
    })
})
app.post("/api/insertRodzaj", (req,res)=>{
    const id_sprzet = req.body.id_sprzet;
    const rodzaj = req.body.rodzaj;

    const sqlInsert = "INSERT INTO sprzet (id_sprzet, rodzaj) VALUES (?,?);"
    db.query(sqlInsert, [id_sprzet, rodzaj], (err, result)=>{
        console.log(err);
    })
})


app.post("/api/insert", (req,res)=>{
    const Nr_Laboranta = req.body.Nr_Laboranta;
    const Ilosc = req.body.Ilosc;
    const Miejsce = req.body.Miejsce;
    const Nazwa_Sprzetu = req.body.Nazwa_Sprzetu;
    const Nr_Inwentarzowy = req.body.Nr_Inwentarzowy;
    const Uzytkownik_Sprzetu = req.body.Uzytkownik_Sprzetu;
    const Rodzaj_Sprzetu = req.body.Rodzaj_Sprzetu;
    const Typ_Sprzetu = req.body.Typ_Sprzetu;
    const Do_Wybrakowania = req.body.Do_Wybrakowania;


    const sqlInsert = "INSERT INTO praktyki (Nr_Laboranta, Ilosc, Miejsce, Nazwa_Sprzetu, Nr_Inwentarzowy, Uzytkownik_Sprzetu, Rodzaj_Sprzetu, Typ_Sprzetu,	Do_Wybrakowania) VALUES (?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert, [Nr_Laboranta, Ilosc, Miejsce, Nazwa_Sprzetu, Nr_Inwentarzowy, Uzytkownik_Sprzetu, Rodzaj_Sprzetu, Typ_Sprzetu,	Do_Wybrakowania], (err, result)=>{
        console.log(err);
    });
});

app.delete("/api/delete/:id", (req, res)=>{
    const name = req.params.id
    const sqlDelete = "DELETE FROM praktyki WHERE id = ?";

    db.query(sqlDelete, name, (err, result)=>{
        if(err) console.log(err);
    })
})

app.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM admin WHERE username = ? AND password = ?",
        [username, password],
        (err, result) =>{
            if (err){
                res.send({err: err});
            }
                if (result.length > 0){
                    res.send(result)
                }else{
                    res.send({message: "Nie ma takiego użytkownika"});
                }
        }
    )
})

app.listen(3001, () => {
    console.log("running on port 3001");
});