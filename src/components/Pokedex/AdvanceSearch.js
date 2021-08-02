import React, { useCallback, useEffect, useState } from "react";

import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import useHttp from "../../hooks/use-http";
const API_URL = "https://pokeapi.co/api/v2/type";

const AdvanceSearch = ({ show, onChangeTypes }) => {
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(new Map());
  const { sendRequest } = useHttp();

  const fetchTypes = useCallback(async () => {
    const data = await sendRequest({
      url: API_URL,
    });

    const typesData = data.results.map((res) => {
      return res.name;
    });

    setTypes(typesData);
  }, [sendRequest]);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  useEffect(() => {
    let typesMap = new Map();

    types.forEach((type) => {
      typesMap.set(type);
    });

    setSelectedTypes(typesMap);
  }, [types]);

  const clickHandler = (e) => {
    let typesMap = new Map(selectedTypes);

    if (typesMap.has(e.target.id)) {
      typesMap.delete(e.target.id);
    } else {
      typesMap.set(e.target.id);
    }

    setSelectedTypes(typesMap);
    onChangeTypes(typesMap);
  };

  const deselectAll = () => {
    setSelectedTypes(new Map());
    onChangeTypes(new Map());
  };

  const selectAll = () => {
    let typesMap = new Map();

    types.forEach((type) => {
      typesMap.set(type);
    });

    setSelectedTypes(typesMap);
    onChangeTypes(typesMap);
  };

  return (
    <AdvanceSearchStyeled>
      <CSSTransition in={show} timeout={200} classNames="fading">
        <section>
          <div className="type">
            <div className="title">
              <p>Type</p>
              <div>
                <button onClick={deselectAll}>Deselect All</button>
                <button onClick={selectAll}>Select All</button>
              </div>
            </div>
            <div className="content">
              {types.map((type) => {
                return (
                  <button
                    id={type}
                    className={`${type} ${
                      selectedTypes.has(type) ? "" : "disabled"
                    }`}
                    key={type}
                    onClick={clickHandler}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </CSSTransition>
    </AdvanceSearchStyeled>
  );
};

const AdvanceSearchStyeled = styled.div`
  section {
    max-height: 0;
    overflow: hidden;
    max-width: 680px;
    margin: 0 auto;
    padding: 0 2rem;
    transition: all 400ms ease;
  }

  .fading-enter {
    max-height: 0;
  }
  .fading-enter-active,
  .fading-enter-done {
    padding-top: 2rem;
    padding-bottom: 2rem;
    max-height: 100vh;
  }
  .fading-exit {
    max-height: 100vh;
  }
  .fading-exit-active,
  .fading-exit-done {
    max-height: 0;
  }

  .type {
    display: grid;
    gap: 1rem;
  }
  .title {
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      gap: 1rem;
    }
    button {
      font-size: 0.75rem;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 5px;
      background-color: #f3f3f3;
    }
  }
  .content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
    button {
      color: var(--c-text-dark);
      border: 1px solid #f5f5f5;
      box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.1);
      padding: 6px 0;

      border-radius: 5px;
      text-transform: capitalize;
      &:active {
        transform: translateY(2px);
      }
      &.disabled {
        padding: 8px 0;
        border: none;
        background: unset;
        background-color: #999;
      }
    }
  }

  p {
    color: #f5f5f5;
  }
`;

export default AdvanceSearch;
