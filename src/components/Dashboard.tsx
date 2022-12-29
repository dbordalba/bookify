import React, {useEffect, useState} from "react";
import { Alert, Col, Container, Row, Dropdown } from "react-bootstrap";
import BooksService from "../services/BooksService";
import Filter from "./Filter";
import Search from "./Search";

import logo from '../images/bookify-logo.svg';
import BooksGrid from "./BookGrid";
import BookModel from "../interface/BookModel";


function Dashboard(){
    
    const [error,setError] = useState('');
    const [searchTxt, setSearchTxt] = useState({
        txt: ''
      });
  
    const passData = (data:any) => {
      setSearchTxt(data);
    };
    const [books,setBooks] = useState<BookModel[]>([]);

    const [sort, setSort] = useState('title_asc');
    const handleSortChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setSort(event.target.value);
    };
    
    useEffect(()=>{
      BooksService.getBooks(searchTxt.txt,sort).then((response)=>{
        if(response.status === 200){
          if(response.data && response.data.data)
          {
            books.splice(0);
            const newBooks = [...books];

            (response.data.data).forEach((element:any) => {

              
              newBooks.push({
                id: element.id,
                author: element.author,
                title: element.title,
                info: Object.keys(element.info).length ? element.info.items[0].volumeInfo:{}
              });
              setError('');
            });

            setBooks(newBooks);
          }

        }
        else{
          setError(response.statusText)
        }

      });
    },[searchTxt,sort]);

      return (
        <>
        <div className="d-flex">
            <Search onClickSearch={passData} />
            <div>
              <label>
                Sort By: 
              </label>
              <select className="form-select" value={sort} onChange={handleSortChange}>
                <option value="title_asc">Title Asc</option>
              <option value="title_desc">Title Desc</option>
              <option value="author_asc">Author Asc</option>
              <option value="author_desc">Author Desc</option>
              </select>
          </div>
        </div>
        <Container className="mt-3">
          <Row>
            <Col xs={12} className="text-center">
              <Alert key={'danger'} variant={'danger'} show={error!=''}>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                {error} Click <Alert.Link onClick={passData}>reload</Alert.Link> to try again.
              </Alert>
              </Col>
                <BooksGrid books={books}/>
          </Row>
        </Container>
        </>
      );
}

export default Dashboard;