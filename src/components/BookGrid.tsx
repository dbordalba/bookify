import React, { useEffect, useState } from "react";
import { Card, Col, Image } from "react-bootstrap";
import logo from '../images/bookify-logo.svg';
import BookModel from '../interface/BookModel'
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {  Button, Modal, Container,ToastContainer, Toast, Form, ModalFooter, Alert } from 'react-bootstrap';
import BooksService from "../services/BooksService";


const BooksGrid = (books :any) => {
    const bookss = books.books as BookModel[];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (item:BookModel) => {
        setShow(true)
        setShowBook(item);
    };

    const [showBook, setShowBook] = useState<BookModel>();
    const [alert, setAlert] = useState(false);
    const handleDelete = (item:BookModel) =>{
        BooksService.deleteBook(item.id).then(res =>{
            setAlert(true);
        })
    }
  
    const [alertUpdate, setAlertUpdate] = useState(false);

    const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (item:BookModel) => {
        
        setShowUpdate(true)
        setAuthor(item.author);
        setTitle(item.title);
        setId(item.id);
    };

    const defaultPosts:BookModel = {
        id: 0,
        title: '',
        author: '',
        info: {}
      };

    const [id, setId] = useState(0);
    const [author,setAuthor] = useState('');
    const [title, setTitle] = useState('');


    const [validated, setValidated] = useState(false);

    const handleSubmit = (event:any) => {
        event.preventDefault();

        defaultPosts.id = id;
        defaultPosts.author = author;
        defaultPosts.title = title;
  
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          setValidated(true)
  
        }
        else{
        
          BooksService.updateBook(defaultPosts).then((response)=>{
  
            if(response.status === 200){
              setValidated(false);
  
              setAlertUpdate(true);
              handleCloseUpdate();
  
            }
            else{
              setValidated(true);
  
              event.preventDefault();
            }
          })
        }
      };

    if(bookss.length == 0){
        return <Alert key={'info'} variant={'danger'} show={true}>
        <Alert.Heading>No added Books!</Alert.Heading>
        Please add books.
      </Alert>;
    }

    return <>
            {
            bookss.map((item)=>(
            <Col xs={4} xl={3}  key={item.id} 
                className="text-center">
                    <img src={Object.keys(item.info).length > 0 ? item.info.imageLinks.smallThumbnail: logo}
                    alt={item.title}
                    loading="lazy"
                    onClick={()=>handleShow(item)} 
                    />
                   <div className="mt-3">
                    <Button size="sm" variant="danger" className="m-1"
                        onClick={()=>handleDelete(item)}>Delete</Button>
                    <Button size="sm" className="m-1"
                     onClick={()=>handleShowUpdate(item)}>Update</Button>
                   </div>
                </Col>

            ))
            
         }

        <ToastContainer position='bottom-end' className='m-5'>
        <Toast bg='warning' 
            onClose={()=>setAlert(false)}
            show={alert} delay={3000} autohide={true} 
        >
            <Toast.Body className={'text-white'}>
            Book successfully deleted!
            </Toast.Body>
        </Toast>
        </ToastContainer>

        <ToastContainer position='bottom-end' className='m-5'>
        <Toast bg='success' 
            onClose={()=>setAlertUpdate(false)}
            show={alertUpdate} delay={3000} autohide={true} 
        >
            <Toast.Body className={'text-white'}>
            Book successfully updated!
            </Toast.Body>
        </Toast>
        </ToastContainer>

        <Modal show={show} onHide={handleClose}>
       
        <Modal.Body >
            <Container className="d-flex mb-3">
                <img src={showBook?.info.imageLinks.smallThumbnail}
                    alt={showBook?.title}
                    className='me-2'/>
                    <div className="mt-auto">
                        <strong>{showBook?.title}</strong><br/>
                        <small>
                        Author: {showBook?.author} <br/>
                        Publisher: {showBook?.info.publisher}<br/>
                        Published: {showBook?.info.publishedDate}
                        </small>
                    </div>
            </Container>
            <Container>
                <p><small>{showBook?.info.description}</small></p>
            </Container>
        </Modal.Body>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
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
                value={author}
                onChange={(event) => setAuthor(event.currentTarget.value)}
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
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid book title.
                  </Form.Control.Feedback>
            </Form.Group>

            <ModalFooter>
              <Button variant="secondary" onClick={handleCloseUpdate}>
                Close
              </Button>
            
              <Button variant="primary" type='submit'>
                Update
              </Button>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>

        
    </>;
}

export default BooksGrid;
