import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react';
import {useHistory } from 'react-router-dom';



function SearchBar() {

  const [search, setSearch] = useState('');

  const history=useHistory();

  function Search() {
  history.push(`/${search}`)
  }

  const searchUpdate = (e) => {
    setSearch(e.target.value);
}



    return (
        <Stack direction="horizontal" gap={3} style={{ position: "relative", left: "50vw"}}>
          <Form.Control onChange={searchUpdate} className="me-auto" placeholder="🔍" />
          <Button type="submit" onClick={Search}  variant="secondary">Submit</Button>
          <div className="vr" />
        </Stack>
      );
    }

export default SearchBar;