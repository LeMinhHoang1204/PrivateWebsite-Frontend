import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const UpdateResourceComponent = ({ show, handleClose, handleSave, note, setNote }) => {
const [newNote, setNewNote] = useState('');
useEffect(() => {
    setNote(note); // Initialize the note value when the modal is opened
  }, [note, setNote]);

const handleSaveNote = () => {
    handleSave(newNote);
    handleClose();
};

// JSX cho modal
return (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Cập nhật ghi chú</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formUpdateNote">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập ghi chú"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Hủy
      </Button>
      <Button variant="primary" onClick={handleSaveNote}>
        Lưu
      </Button>
    </Modal.Footer>
  </Modal>
);
}

export default UpdateResourceComponent
