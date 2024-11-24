import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NoteModal = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [tagline, setTagline] = useState(note?.tagline || "");
  const [body, setBody] = useState(note?.body || "");

  const handleSave = () => {
    onSave({ ...note, title, tagline, body });
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{note?.id ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="noteTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="noteTagline" className="mt-3">
            <Form.Label>Tagline</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="noteBody" className="mt-3">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter body text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteModal;
