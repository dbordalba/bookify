import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost/booking/public/api/";

class BooksService{

    getBooks(searchTxt:string,sort:string){
        return axios.get(API_URL + 'books', {params:{searchTxt,sort}, headers : AuthHeader()})
    }

    getBook(id:number){
        return axios.get(API_URL + 'books/' + id,{ headers: AuthHeader()})
    }

    storeBook(books:any){
        return axios.post(API_URL + 'books', books, { headers: AuthHeader()})
        .then(response => {return response})
        .catch(error => {return error.response})
    }

    updateBook(books:any){
        return axios.put(API_URL + 'books/' + books.id, books, { headers:AuthHeader()})
    }

    deleteBook(id:number){
        return axios.delete(API_URL + 'books/' + id, { headers: AuthHeader()} )
    }

}

export default new BooksService;