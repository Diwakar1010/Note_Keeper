import React, { useState, useEffect } from "react";
import db from "./firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import Pagination from "./components/Pagination";
import { Container, Row, Col, Button } from "react-bootstrap";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [modalNote, setModalNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const notesPerPage = 6;

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const notesCollection = collection(db, "notes");
    const snapshot = await getDocs(notesCollection);
    const notesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    notesData.sort((a, b) => b.pinned - a.pinned); // Pin sorting
    setNotes(notesData);
  };

  const handleSaveNote = async (note) => {
    if (note.id) {
      const noteRef = doc(db, "notes", note.id);
      await updateDoc(noteRef, note);
    } else {
      await addDoc(collection(db, "notes"), { ...note, pinned: false });
    }
    fetchNotes();
    setModalNote(null);
  };

  const handlePinToggle = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await updateDoc(noteRef, { pinned: !note.pinned });
    fetchNotes();
  };

  const handleDeleteNote = async (id) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
    fetchNotes();
  };

  const notesToDisplay = notes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-primary">Note Keeper</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="text-center">
          <Button variant="primary" onClick={() => setModalNote({})}>
            Add Note
          </Button>
        </Col>
      </Row>
      <Row className="g-4">
        {notesToDisplay.map((note) => (
          <Col xs={12} md={6} lg={4} key={note.id}>
            <NoteCard
              note={note}
              onEdit={setModalNote}
              onPin={handlePinToggle}
              onDelete={handleDeleteNote}
            />
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(notes.length / notesPerPage)}
            onPageChange={setCurrentPage}
          />
        </Col>
      </Row>
      {modalNote && (
        <NoteModal
          note={modalNote}
          onSave={handleSaveNote}
          onClose={() => setModalNote(null)}
        />
      )}
    </Container>
  );
};

export default App;
