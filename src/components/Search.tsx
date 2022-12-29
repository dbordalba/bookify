import React from "react";

const Search = (props:any) => {
    const searchTxt = {
        txt: ''
    };

    const onChange = (event: { currentTarget: { value: string; }; }) => {
        searchTxt.txt = event.currentTarget.value;
    };

    const buttonClickHandler = () => {
        props.onClickSearch(searchTxt);
    }

    return  <div className="d-flex w-100 p-4" role="search">
                <input className="form-control me-2" type="search" placeholder="Search author or title..." aria-label="Search"
                    onChange={onChange}/>
                <button className="btn btn-outline-success" onClick={buttonClickHandler}>Search</button>
            </div>;
}

export default Search;