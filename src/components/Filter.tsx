import React from "react";

function Filter(){

    const [value, setValue] = React.useState('');

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setValue(event.target.value);
    };

    return (
        <div className="ms-4">
          <label>
            Sort By: 
          </label>
          
          <select className="form-select" value={value} onChange={handleChange}>
   
            <option value="title_asc">Title Asc</option>
            <option value="title_desc">Title Desc</option>
            <option value="author_asc">Author Asc</option>
            <option value="author_desc">Author Desc</option>
   
          </select>
   
   
        {/* <p>We eat {value}!</p> */}
   
      </div>
   );
}

export default Filter;