import React, { useEffect, useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";

function Notes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    dueDate: "",
  });
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [currentPage]);

  const fetchNotes = () => {
    fetch(`http://localhost:8080/notes?page=${currentPage}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.notes);
        setTotalPages(data.totalPages);
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  const handleShowModal = (editId = null) => {
    setEditNoteId(editId);
    setShowModal(true);
    if (editId) {
      const note = data.find((item) => item._id === editId);
      if (note) {
        setFormData({
          title: note.title,
          body: note.body,
          dueDate: note.dueDate,
        });
      }
    } else {
      setFormData({
        title: "",
        body: "",
        dueDate: "",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editNoteId
      ? `http://localhost:8080/notes/${editNoteId}`
      : "http://localhost:8080/notes";
    const method = editNoteId ? "PATCH" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchNotes(); // Fetch notes again to update the list
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteNote = (noteId) => {
    fetch(`http://localhost:8080/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchNotes(); // Fetch notes again to update the list
      })
      .catch((err) => console.log(err));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      {localStorage.getItem("token")!==null ? (
        <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <Button variant="success" onClick={() => handleShowModal()}>
          Add New Note
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Body</th>
            <th>DueDate</th>
            <th>Update Note</th>
            <th>Delete Note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>{item.dueDate}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowModal(item._id)}
                >
                  Update
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteNote(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editNoteId ? "Update Note" : "Add New Note"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="text"
                placeholder="Body"
                name="body"
                value={formData.body}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Due Date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="pagination" style={{display:'flex', justifyContent:'center'}}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
        <span>Page {currentPage}</span>
        <Button onClick={handleNextPage} disabled={currentPage===totalPage}>Next</Button>
      </div>
      </>
      ) : (
        <h3>Please Login to access notes.</h3>
      )}
    </div>
  );
}

export default Notes;
