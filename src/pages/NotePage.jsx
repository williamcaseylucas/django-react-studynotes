import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import notes from "../assets/data";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

const NotePage = () => {
  const [note, setNote] = useState([]);
  const { id: noteId } = useParams();
  const nav = useNavigate();

  // Run this whenever noteId changes
  useEffect(() => {
    const getNote = async () => {
      const res = await axios.get(`http://localhost:8000/notes/${noteId}`);
      const { data } = res;
      setNote(data);
    };

    if (noteId === "new") return;
    getNote();
  }, [noteId]);

  const createNote = async () => {
    await axios.post(
      `http://localhost:8000/notes/`,
      {
        ...note,
        updated: new Date(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleSubmit = () => {
    // Need to update date until Django is setup
    const updateNote = async () => {
      await axios.put(
        `http://localhost:8000/notes/${noteId}`,
        {
          ...note,
          updated: new Date(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };

    // if note is not new or if note does not have any content in its body
    if (noteId !== "new" && !note.body) {
      handleDelete();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note.length !== 0) {
      console.log("note: ", note);
      createNote();
    }
    // nav("/");
  };

  const handleDelete = () => {
    // {
    //       ...note,
    //       updated: new Date(),
    //     },
    const deleteNote = async () => {
      await axios.delete(`http://localhost:8000/notes/${noteId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    deleteNote();
    nav("/");
  };

  // let noteVal = notes.find((note) => note.id === Number(id));
  return (
    <div className="note">
      <div id="note-header">
        <div className="space-between">
          <div id="go_back">
            <Link to="/">
              <div onClick={handleSubmit} className="note-back-button">
                <div>
                  <AiOutlineArrowLeft />
                  Go Back
                </div>
              </div>
            </Link>
          </div>
          <div id="delete">
            {noteId !== "new" ? (
              <button onClick={handleDelete} className="deleteButton">
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <textarea
        // Update body and keep the rest the same
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
