import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { listResourceType } from '../services/ResourceTypeService';
import '../css/AddResourceComponent.css'

const AddResourceModal = ({ show, handleClose, handleSave }) => {
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceNote, setResourceNote] = useState('');
const [resourceTypes, setResourceTypes] = useState([]); // State để lưu danh sách loại tài nguyên

  useEffect(() => {
    // Lấy danh sách loại tài nguyên khi component mount
    const fetchResourceTypes = async () => {
      const types = await listResourceType();
      console.log(types);
      setResourceTypes(types.data); // Giả sử API trả về danh sách loại tài nguyên trong `data`
    };

    fetchResourceTypes();
  }, []);

  const onSave = () => {
    const newResource = {
      name: resourceName,
      resourceType: { id: resourceType }, // Tham chiếu đến loại tài nguyên
      status: "Còn trống",
      note: resourceNote
    };
    handleSave(newResource);
    handleClose();
  };

  return (
    <Modal  show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Tài Nguyên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formResourceName">
            <Form.Label>Tên tài nguyên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên tài nguyên"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
            />

          </Form.Group>

            <Form.Group controlId="formResourceType">
            <Form.Label>Loại tài nguyên</Form.Label>
            <Form.Control
              as="select"
              value={resourceTypes}     
              onChange={(e) => setResourceType(e.target.value)}
            >
              <option value="">Chọn loại tài nguyên</option>
              {resourceTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formResourceNote">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập ghi chú"
              value={resourceNote}
              onChange={(e) => setResourceNote(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={onSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddResourceModal;
