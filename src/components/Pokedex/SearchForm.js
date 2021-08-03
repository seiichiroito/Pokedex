import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

import AdvanceSearch from "./AdvanceSearch";

const SearchForm = ({ onInputChange, onTypeChange }) => {
  const [showAdvance, setShowAdvance] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const changeHandler = (e) => {
    onInputChange(e.target.value.toLowerCase());
  };

  const toggleAdvanceHandler = () => {
    setShowAdvance((prevState) => !prevState);
  };

  const changeTypesHandler = (types) => {
    onTypeChange(types);
  };

  return (
    <SearchFormStyled>
      <form onSubmit={submitHandler}>
        <div>
          <AiOutlineSearch />
          <input
            type="text"
            id="search"
            onChange={changeHandler}
            placeholder="search by name"
          />
        </div>
      </form>
      <AdvanceSearch show={showAdvance} onChangeTypes={changeTypesHandler} />
      {showAdvance ? (
        <>
          <button onClick={toggleAdvanceHandler}>Hide Advanced Search</button>
        </>
      ) : (
        <>
          <button onClick={toggleAdvanceHandler}>Show Advanced Search</button>
        </>
      )}
    </SearchFormStyled>
  );
};

const SearchFormStyled = styled.div`
  padding: 1rem 0;
  background-color: #555;
  display: grid;
  gap: 0.5rem;
  position: relative;
  form {
    display: flex;
    justify-content: center;
    div {
      position: relative;
    }
  }
  input {
    padding: 0.5rem 2.5rem;
    font-size: 1.5rem;
    width: 100%;
    &::placeholder {
      color: #999;
    }
    &:focus {
      outline-color: #203a43;
    }
  }
  svg {
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  > p {
    color: #f5f5f5;
    text-align: center;
  }
  > button {
    position: absolute;
    width: 50%;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -40%);
    padding: 1rem 0;
    background-color: #555;
    border: none;
    border-radius: 0 0 20px 20px / 0 0 50px 50px;
    color: #f5f5f5;
    cursor: pointer;
  }
`;
export default SearchForm;
