import React, { useState, useEffect } from "react";
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { v4 } from "uuid";
import api from ".../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactCard from "./ContactCard";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const retrieveContacts= async()=> {
    const response= await api.get("/contacts");
    return response.data;

  }

  const addContactHandler = async(contact) => {
    console.log(contact);
    const request={
      id:v4(),
      ...contact
    }
    const response=await pi.post("/contacts",request)
    setContacts([...contacts, response.data]);
    
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts) setContacts(retrieveContacts);
    const getAllContacts= async()=>{
      const allContacts= await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };

      getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
        <Route path="/" exact 
        render={(props)=>(<ContactList{...props} getContactId={removeContactHandler}/>)}
        />
        <Route path="/add" 
       render= {(props)=>(<AddContact {...props} addContactHandler={addContactHandler} />)}
       />
       <Route path="/contact/:id" element={<ContactDetail/>}/>
        </Routes>
  
        </Router>
      
    </div>
  );
}

export default App;