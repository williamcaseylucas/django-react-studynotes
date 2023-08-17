// import notes from "../assets/data";
import ListItem from "../components/ListItem";
import { useState, useEffect } from "react";
import axios from "axios";
import AddButton from "../components/AddButton";
const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get("http://localhost:8000/notes");
      const { data } = res;
      setNotes(data);
    };
    getNotes();
  }, []);

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
