import React, {useState, useEffect, useRef} from "react";
import './App.css';
import * as FaIcons from 'react-icons/fa';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
 

function App() {
  
  const [Nr_Laboranta, setNr_Laboranta] = useState('');
  const [Ilosc, setIlosc] = useState('');
  const [Miejsce, setMiejsce] = useState('');
  const [Nazwa_Sprzetu, setNazwa_Sprzetu] = useState('');
  const [Nr_Inwentarzowy, setNr_Inwentarzowy] = useState('');
  const [Uzytkownik_Sprzetu, setUzytkownik_Sprzetu] = useState('');
  const [Rodzaj_Sprzetu, setRodzaj_Sprzetu] = useState('');
  const [Typ_Sprzetu, setTyp_Sprzetu] = useState('');
  const [Do_Wybrakowania, setDo_Wybrakowania] = useState('');
  const [ListaDanych, setListaDanych] = useState([]);
  const [ListaLaboranta, setListaLaboranta] = useState([]);
  const [ListaMiejsc, setListaMiejsc] = useState([]);
  const [ListaUser, setListaUser] = useState([]);
  const [ListaRodzaj, setListaRodzaj] = useState([]);
  const [Searchlab, setSearchlab] = useState('');
  const [Searchmie, setSearchmie] = useState('');
  const [SearchNaz, setSearchNaz] = useState('');
  const [SearchInw, setSearchInw] = useState('');
  const [SearchUz, setSearchUz] = useState('');
  const [Searchrodz, setSearchrodz] = useState('');
  const [Searchtyp, setSearchtyp] = useState('');
  const [ImieLab, setImieLab] = useState('');
  const [NazwiskoLab, setNazwiskoLab] = useState('');
  const [Imie_Nazwisko, setImie_Nazwisko] = useState('');
  const [id_Uzytkownika, setid_Uzytkownika] = useState('');
  const [id_sprzet, setid_sprzet] = useState('');
  const [rodzaj, setrodzaj]= useState('');

  const [checkedRows, setCheckedRows] = useState([]);


    const handlePDFGeneration = () => {
      const doc = new jsPDF();
  
      doc.text('Tabela PDF', 10, 10);
      doc.autoTable({ html: '#table-data' });

      doc.save('tabela.pdf');
    };

    const handlePrint = () => {
      const tableWindow = window.open('', '', 'width=800,height=600');
      tableWindow.document.write('<html><head><title>Wydruk tabeli</title></head><body>');
      tableWindow.document.write(document.getElementById('table-data').outerHTML);
      tableWindow.document.write('</body></html>');
      tableWindow.document.close();
      tableWindow.print();
    };
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
    }
  };
  const filteredData = ListaDanych.filter((item) => checkedRows.includes(item.id));

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setListaDanych(response.data);
    });
  }, []);

  useEffect(()=>{
    fetch("http://localhost:3001/api/labget").then((data)=>data.json()).then((val)=>setListaLaboranta(val))
  }, []);

  useEffect(()=>{
    fetch("http://localhost:3001/api/mieget").then((data)=>data.json()).then((val)=>setListaMiejsc(val))
  }, []);

  useEffect(()=>{
    fetch("http://localhost:3001/api/userget").then((data)=>data.json()).then((val)=>setListaUser(val))
  }, []);

  useEffect(()=>{
    fetch("http://localhost:3001/api/rodzajget").then((data)=>data.json()).then((val)=>setListaRodzaj(val))
  }, []);

  const submit = () =>{
    Axios.post("http://localhost:3001/api/insert", {
      Nr_Laboranta: Nr_Laboranta,
      Ilosc: Ilosc, 
      Miejsce: Miejsce, 
      Nazwa_Sprzetu: Nazwa_Sprzetu, 
      Nr_Inwentarzowy: Nr_Inwentarzowy, 
      Uzytkownik_Sprzetu: Uzytkownik_Sprzetu, 
      Rodzaj_Sprzetu: Rodzaj_Sprzetu, 
      Typ_Sprzetu: Typ_Sprzetu,	
      Do_Wybrakowania: Do_Wybrakowania
    });
      setListaDanych([...ListaDanych, {Nr_Laboranta: Nr_Laboranta, Ilosc: Ilosc, Miejsce: Miejsce, Nazwa_Sprzetu: Nazwa_Sprzetu, Nr_Inwentarzowy: Nr_Inwentarzowy, Uzytkownik_Sprzetu: Uzytkownik_Sprzetu, Rodzaj_Sprzetu: Rodzaj_Sprzetu, Typ_Sprzetu: Typ_Sprzetu,	Do_Wybrakowania: Do_Wybrakowania}]);
  }

  const dodajLab = () =>{
    Axios.post("http://localhost:3001/api/insertLab", {
      Nr_Laboranta: Nr_Laboranta,
      Imie: ImieLab,
      Nazwisko: NazwiskoLab
    });
    window.location.reload(false);
  }

  const dodajMiejsce = () =>{
    Axios.post("http://localhost:3001/api/insertMiejsce", {
      Miejsce: Miejsce
    });
    window.location.reload(false);
  }

  const dodajUser = () =>{
    Axios.post("http://localhost:3001/api/insertUser", {
      id_Uzytkownika: id_Uzytkownika,
      Imie_Nazwisko: Imie_Nazwisko
    });
    window.location.reload(false);
  }
  const dodajSprzet = () => {
    Axios.post("http://localhost:3001/api/insertRodzaj", {
    id_sprzet : id_sprzet,
    rodzaj: rodzaj
    });
    window.location.reload(false);
  }


    const [open, setOpen] = useState(false)

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  const deleteRow = (tabela)=>{
    Axios.delete(`http://localhost:3001/api/delete/${tabela}`);
    window.location.reload(false);
  };

  return (
    <>
      <div className="logo">
    <img src="images_AMW_Logotypy_AMW_amw2.webp" alt="Logo Akademi" width="800" height="100"></img>
      </div>


    <div className="menu" ref={menuRef}>
      <div className="MenuButton" onClick={()=>{setOpen(!open)}}><FaIcons.FaBars /></div>
    <div className={`Navbar ${open? 'active' : 'inactive'}`} >
        <h1>Menu</h1>
        <p>Nr_Laboranta</p>
       <select onChange={(e)=>{setNr_Laboranta(e.target.value)}}>
        <option hidden select>Select</option>
        {
          ListaLaboranta.map((opts,i)=><option key={i}>{opts.Nr_Laboranta}</option>)
        }
       </select>
        <p>Ilosc</p><input type="text" name="Ilosc" onChange={(e)=>{setIlosc(e.target.value)}}></input>
        <p>Miejsce</p>
        <select onChange={(e)=>{setMiejsce(e.target.value)}}>
        <option hidden select>Select</option>
        {
          ListaMiejsc.map((opts,i)=><option key={i}>{opts.Miejsce}</option>)
        }
       </select>
        <p>Nazwa_Sprzetu</p><input type="text" name="Nazwa_Sprzetu" onChange={(e)=>{setNazwa_Sprzetu(e.target.value)}}></input>
        <p>Nr_Inwentarzowy</p><input type="text" name="Nr_Inwentarzowy" onChange={(e)=>{setNr_Inwentarzowy(e.target.value)}}></input>
        <p>Uzytkownik_Sprzetu</p>
        <select onChange={(e)=>{setUzytkownik_Sprzetu(e.target.value)}}>
        <option hidden select>Select</option>
        {
          ListaUser.map((opts,i)=><option key={i}>{opts.Imie_Nazwisko}</option>)
        }
       </select>
        <p>Rodzaj_Sprzetu</p>
        <select onChange={(e)=>{setRodzaj_Sprzetu(e.target.value)}}>
        <option hidden select>Select</option>
        {
          ListaRodzaj.map((opts,i)=><option key={i}>{opts.rodzaj}</option>)
        }
       </select>
        <p>Typ_Sprzetu</p>
        <select onChange={(e)=>{setTyp_Sprzetu(e.target.value)}}>
          <option hidden select>Select</option>
          <option>Stanowy</option>
          <option>Bezstanowy</option>
        </select>
        <p>Do_Wybrakowania</p>
        <select onChange={(e)=>{setDo_Wybrakowania(e.target.value)}}>
          <option hidden select>Select</option>
          <option>Tak</option>
          <option>Nie</option>
        </select> <br></br>
        <button onClick={submit}>Submit</button>
    </div>
    </div>
    <div className="Search">
    <b className="dod">Szukaj:</b><br /><br />
      <Form.Control onChange={(e) => setSearchlab(e.target.value)} placeholder='Szukaj Laboranta' /> <Form.Control onChange={(e) => setSearchmie(e.target.value)} placeholder='Szukaj Miejsce' /> <Form.Control onChange={(e) => setSearchNaz(e.target.value)} placeholder='Szukaj Nazwę Sprzętu' /> <Form.Control onChange={(e) => setSearchInw(e.target.value)} placeholder='Szukaj Nr Inwentarzowy' /> <Form.Control onChange={(e) => setSearchUz(e.target.value)} placeholder='Szukaj Użytkownika Sprzętu' /> <Form.Control onChange={(e) => setSearchrodz(e.target.value)} placeholder='Szukaj Rodzaj Sprzętu' /> <Form.Control onChange={(e) => setSearchtyp(e.target.value)} placeholder='Szukaj Typ Sprzętu' />
      <br /><br />
    </div>
    <div className="Dodaj">
    <b className="dod">Dodaj:</b><br /><br />
      <label>Nr_Laboranta: </label><input placeholder="Id Laboranta" name="Nr_Laboranta" type="number" onChange={(e)=>{setNr_Laboranta(e.target.value)}}></input><input name="Imie" placeholder="Imie" onChange={(e)=>{setImieLab(e.target.value)}}></input><input name="Nazwisko" placeholder="Nazwisko" onChange={(e)=>{setNazwiskoLab(e.target.value)}}></input> <button onClick={dodajLab}>Dodaj</button><br />
      <label>Miejsce: </label><input placeholder="Miejsce" name="miejsce" onChange={(e)=>{setMiejsce(e.target.value)}}></input> <button onClick={dodajMiejsce}>Dodaj</button><br />
      <label>Uzytkownik_Sprzetu: </label><input placeholder="Id Użytkownika" name="id_Uzytkownika" onChange={(e)=>{setid_Uzytkownika(e.target.value)}}></input><input placeholder="Imie i Nazwisko" name="Imie_Nazwisko" onChange={(e)=>{setImie_Nazwisko(e.target.value)}}></input> <button onClick={dodajUser}>Dodaj</button><br />
      <label>Rodzaj_Sprzetu: </label><input placeholder="Id Sprzętu" name="id_sprzet" onChange={(e)=>setid_sprzet(e.target.value)}></input><input placeholder="Rodzaj" name="rodzaj" onChange={(e)=>{setrodzaj(e.target.value)}}></input> <button onClick={dodajSprzet}>Dodaj</button>
    </div>
    <div className="Tabela">
    <b className="dod">Wyświetl:</b><br /><br />
          <table>
            <thead>  
            <tr>
                <th>Nr Laboranta</th>
                <th>Ilość</th>
                <th>Miejsce</th>
                <th>Nazwa sprzętu</th>
                <th>Nr inwentarzowy</th>
                <th>Użytkownik sprzętu</th>
                <th>Rodzaj sprzętu</th>
                <th>Typ sprzętu</th>
                <th>Do wybrakowania</th>   
                <th>Edytowanie</th>
            </tr>
        </thead>
        <tbody>
          {ListaDanych.filter((val)=>{
            return Searchtyp.toLowerCase() === ''
            ? val
            : val.Typ_Sprzetu.toString().toLowerCase().includes(Searchtyp);
          }).filter((val)=>{
            return Searchrodz.toLowerCase() === ''
            ? val
            : val.Rodzaj_Sprzetu.toString().toLowerCase().includes(Searchrodz);
          }).filter((val)=>{
            return SearchUz.toLowerCase() === ''
            ? val
            : val.Uzytkownik_Sprzetu.toString().toLowerCase().includes(SearchUz);
          }).filter((val)=>{
            return SearchInw.toLowerCase() === ''
            ? val
            : val.Nr_Inwentarzowy.toString().toLowerCase().includes(SearchInw);
          }).filter((val)=>{
            return SearchNaz.toLowerCase() === ''
            ? val
            : val.Nazwa_Sprzetu.toString().toLowerCase().includes(SearchNaz);
          }).filter((val)=>{
            return Searchmie.toLowerCase() === ''
            ? val
            : val.Miejsce.toString().toLowerCase().includes(Searchmie);
          }).filter((val)=>{
            return Searchlab.toLowerCase() === ''
            ? val
            : val.Nr_Laboranta.toString().toLowerCase().includes(Searchlab);
          }).map((val, index)=> (
          <tr key={index}>
            <td>{val.Nr_Laboranta}</td>
            <td>{val.Ilosc}</td>
            <td>{val.Miejsce}</td>
            <td>{val.Nazwa_Sprzetu}</td>
            <td>{val.Nr_Inwentarzowy}</td>
            <td>{val.Uzytkownik_Sprzetu}</td>
            <td>{val.Rodzaj_Sprzetu}</td>
            <td>{val.Typ_Sprzetu}</td>
            <td>{val.Do_Wybrakowania}</td>
            <td><button onClick={()=>{deleteRow(val.id)}}>Delete</button> <input type="checkbox" checked={checkedRows.includes(val.id)} onChange={(event) => handleCheckboxChange(event, val.id)}/></td>
          </tr>
          ))}
        </tbody>
          </table>
          
    </div>
    <div className="table2">
          {filteredData.length > 0 && (
        <div>
          <br /><b className="dod">Wybrane wiersze:</b><br /><br />
          <table id="table-data">
            <thead>  
            <tr>
                <th>Nr Laboranta</th>
                <th>Ilość</th>
                <th>Miejsce</th>
                <th>Nazwa sprzętu</th>
                <th>Nr inwentarzowy</th>
                <th>Użytkownik sprzętu</th>
                <th>Rodzaj sprzętu</th>
                <th>Typ sprzętu</th>
                <th>Do wybrakowania</th>   
            </tr>
        </thead>
        <tbody>
        {filteredData.map((val, i) => (
          <tr key={i}>
            <td>{val.Nr_Laboranta}</td>
            <td>{val.Ilosc}</td>
            <td>{val.Miejsce}</td>
            <td>{val.Nazwa_Sprzetu}</td>
            <td>{val.Nr_Inwentarzowy}</td>
            <td>{val.Uzytkownik_Sprzetu}</td>
            <td>{val.Rodzaj_Sprzetu}</td>
            <td>{val.Typ_Sprzetu}</td>
            <td>{val.Do_Wybrakowania}</td>
          </tr>))}
        </tbody>
        </table>
        <br />
        <button className="button" onClick={handlePDFGeneration}>Generowanie PDF</button>
        <button className="button" onClick={handlePrint}>Drukuj tabele</button><br/><br/><br/>
        </div>)}
        
      </div>
      </>
  );
}


export default App;
