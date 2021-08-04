import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { BiArrowToTop } from "react-icons/bi";
import { useInView } from "react-intersection-observer";
const ToTopButton = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const clickHandler = () => {
    if (inView) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return ReactDOM.createPortal(
    <ToTopButtonStyled>
      <div ref={ref}></div>
      <button className={inView ? "" : "is-visible"} onClick={clickHandler}>
        <BiArrowToTop />
      </button>
    </ToTopButtonStyled>,
    document.getElementById("root")
  );
};

const ToTopButtonStyled = styled.div`
  div {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
  button {
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #dddddd99;
    border: none;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 1s;
    &.is-visible {
      opacity: 1;
    }
  }
  svg {
    font-size: 1.75rem;
    color: #333;
  }
`;
export default ToTopButton;
