import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {

    try {

      const response = await axios.get("http://localhost:5000/notes");

      setNotes(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const addNote = async () => {

    if(!title || !content){
      return;
    }

    try {

      await axios.post("http://localhost:5000/notes", {
        title,
        content
      });

      setTitle("");
      setContent("");

      fetchNotes();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(()=>{

    fetchNotes();

  },[]);

  return (

    <div className="container">

      <h1 className="heading">
        Notes App
      </h1>

      <div className="form-container">

        <input
          type="text"
          placeholder="Enter note title"
          className="input"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter note content"
          className="input"
          rows="5"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />

        <button
          className="button"
          onClick={addNote}
        >
          Add Note
        </button>

      </div>

      <div className="notes-grid">

        {
          notes.map((note)=>(

            <div
              className="note-card"
              key={note._id}
            >

              <h2 className="note-title">
                {note.title}
              </h2>

              <p className="note-content">
                {note.content}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default App;