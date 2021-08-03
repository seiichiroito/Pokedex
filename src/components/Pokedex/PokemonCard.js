import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";
import { rgba, lighten } from "polished";
import { Link } from "react-router-dom";
const PokemonCard = ({ pokemon, onClickCard }) => {
  const [hoverPokemon, setHoverPokemon] = useState(null);
  const [visible, setVisible] = useState(false);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setVisible(true);
    }
  }, [inView]);

  const hoverHandler = (e) => {
    const name = e.target.closest(".card").id;
    setHoverPokemon(name);
  };
  const hoverLeaveHandler = () => {
    setHoverPokemon(null);
  };

  const clickHandler = () => {
    onClickCard(pokemon.name);
  };

  return (
    <Link to={`/${pokemon.name}`}>
      <PokemonCardStyled
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverLeaveHandler}
        className={`card ${visible ? "active" : ""}`}
        id={pokemon.name}
        onClick={clickHandler}
        types={pokemon.types}
        ref={ref}
      >
        <div className="header">
          {hoverPokemon === pokemon.name ? (
            <img src={pokemon.hoverImage} alt={pokemon.name} />
          ) : (
            <img src={pokemon.image} alt={pokemon.name} />
          )}
        </div>
        <div className="detail">
          <p className="id">#{pokemon.id.toString().padStart(3, "0")}</p>
          <p className="name">{pokemon.name}</p>
          <ul>
            {pokemon.types.map(({ type }) => {
              return (
                <TypeTag key={type.name} type={type.name}>
                  {type.name}
                </TypeTag>
              );
            })}
          </ul>
        </div>
      </PokemonCardStyled>
    </Link>
  );
};

const wobbleHorBottom = keyframes`
    0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }
  15% {
    transform: translateX(-30px) rotate(-4.8deg);
  }
  30% {
    transform: translateX(15px) rotate(3.6deg);
  }
  45% {
    transform: translateX(-15px) rotate(-2.4deg);
  }
  60% {
    transform: translateX(9px) rotate(1.2deg);
  }
  75% {
    transform: translateX(-6px) rotate(-0.6deg);
  }
`;

const TypeTag = styled.li`
  padding: 0.25rem 1.25rem;
  border-radius: 5px;
  font-size: 0.875rem;
  text-transform: capitalize;
  box-shadow: ${({ theme, type }) => {
    const typeColor = theme[type];
    if (typeof typeColor === "string") {
      return `3px 3px 5px ${lighten(0.1, typeColor)},
          -3px -3px 5px ${lighten(0.2, typeColor)}`;
    } else {
      return `3px 3px 5px ${lighten(0.1, typeColor[0])},
          -3px -3px 5px ${lighten(0.2, typeColor[0])}`;
    }
  }};
  background: ${({ theme, type }) => {
    const typeColor = theme[type];
    if (typeof typeColor === "string") {
      return typeColor;
    } else {
      return `linear-gradient(to bottom right, ${typeColor[0]}, ${typeColor[1]})`;
    }
  }};
`;
const PokemonCardStyled = styled.div`
  border-radius: 15px;
  box-shadow: 20px 20px 60px #c9c9c9, -20px -20px 60px #ffffff;
  backdrop-filter: blur(5px);

  &.card {
    background: ${({ theme, types }) => {
      const typeColor = theme[types[0].type.name];
      if (typeof typeColor === "string") {
        return rgba(typeColor, theme.alpha.sm);
      } else {
        return `linear-gradient(to bottom right, ${rgba(
          typeColor[0],
          theme.alpha.sm
        )}, ${rgba(typeColor[1], theme.alpha.sm)})`;
      }
    }};
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease-in;
    &.active {
      opacity: 1;
      transform: translateY(0);
    }
    .header {
      background: ${({ theme, types }) => {
        const typeColor = theme[types[0].type.name];
        if (typeof typeColor === "string") {
          return rgba(typeColor, theme.alpha.md);
        } else {
          return `linear-gradient(to bottom right, ${rgba(
            typeColor[0],
            theme.alpha.md
          )}, ${rgba(typeColor[1], theme.alpha.md)})`;
        }
      }};
    }
  }

  &:hover {
    animation: ${wobbleHorBottom} 0.8s both;
  }
  .header {
    padding: 2rem;
    display: flex;
    justify-content: center;
    aspect-ratio: 1;
    border-radius: 10px 10px 0 0;
  }

  .detail {
    padding: 0.5rem;
    display: grid;
    gap: 1rem;
  }
  .id {
    color: #999;
    font-size: 0.875rem;
  }
  .name {
    text-transform: capitalize;
    font-weight: bold;
    font-size: 1.125rem;
  }
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
`;

export default PokemonCard;
