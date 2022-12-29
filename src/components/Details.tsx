import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Toast, Button, Modal, ModalFooter, Form, Alert, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import BooksService from '../services/BooksService';

function Details() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [alert, setAlert] = useState(false);


    interface IPost {
      id: number;
      title: string;
      author: string;
    }

    const defaultPosts:IPost = {
      id: 0,
      title: '',
      author: ''
    };

    const [posts, setPosts]: [IPost, (posts: IPost) => void] = useState(defaultPosts);
    const [error, setError]: [string, (error: string) => void] = useState('');

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event:any) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        setValidated(true)

      }
      else{
        BooksService.storeBook(defaultPosts).then((response)=>{

          if(response.status === 200){
            setValidated(false);

            setAlert(true);
            handleClose();

          }
          else{
            setValidated(true);

            event.preventDefault();
          }
        })
      }
  
      
    };
 
  return (
    <div className='pt-4'
    >
      <ToastContainer position='bottom-end' className='m-5'>
      <Toast bg='success' 
        onClose={()=>setAlert(false)}
        show={alert} delay={3000} autohide={true} 
      >
        <Toast.Body className={'text-white'}>
          Book successfully saved!
        </Toast.Body>
      </Toast>
      </ToastContainer>
      
      <Button variant="primary" onClick={handleShow}>
        Add new book
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="author"
            >
              <Form.Label>Author</Form.Label>
              <Form.Control
                required 
                type="text"
                placeholder="Enter author name"
                onChange={(event) => defaultPosts.author = event.currentTarget.value}
                 />
                 <Form.Control.Feedback type="invalid">
                    Please provide a valid author.
                  </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="title"
            >
              <Form.Label>Book Title</Form.Label>
              <Form.Control 
                required
                type="text"
                placeholder="Enter book title" 
                onChange={(event) => defaultPosts.title = event.currentTarget.value}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid book title.
                  </Form.Control.Feedback>
            </Form.Group>

            <ModalFooter>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            
              <Button variant="primary" type='submit'>
                Save
              </Button>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>

 
    </div>
  );
}

export default Details;