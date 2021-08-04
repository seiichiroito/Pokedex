import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";
import { rgba, lighten } from "polished";
const PokemonCard = ({ pokemon }) => {
  const [visibleInScreen, setVisibleInScreen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setVisibleInScreen(true);
    }
  }, [inView]);

  const clickCardHandler = () => {
    setFlipped((prevState) => !prevState);
  };

  return (
    <PokemonCardStyled
      className={`scene ${visibleInScreen ? "active" : ""}`}
      id={pokemon.name}
      onClick={clickCardHandler}
      types={pokemon.types}
      ref={ref}
    >
      <div className={`card ${flipped ? "is-flipped" : ""}`}>
        <div className="card__face card__face--front">
          <div className="header">
            <img src={pokemon.image.default} alt={pokemon.name} />
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
        </div>
        <div className="card__face card__face--back">
          <img src={pokemon.image.icon} alt={pokemon.name} />
          <div className="table">
            <div>
              <p>Height</p>
              <p>{(pokemon.height * 0.1).toPrecision(2)} m</p>
            </div>
            <div>
              <p>Weight</p>
              <p>{(pokemon.weight * 0.1).toPrecision(3)} kg</p>
            </div>
            <div className="ability">
              <p>Ability</p>
              {pokemon.abilities.map(({ ability }) => {
                return <p key={ability.name}>{ability.name}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </PokemonCardStyled>
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
      return `2px 2px 4px ${lighten(0.1, typeColor)},
          -2px -2px 4px ${lighten(0.3, typeColor)}`;
    } else {
      return `2px 2px 4px ${lighten(0.1, typeColor[0])},
          -2px -2px 4px ${lighten(0.3, typeColor[0])}`;
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
  /* backdrop-filter: blur(5px); */

  & {
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease-in;
    &.active {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    animation: ${wobbleHorBottom} 0.8s both;
  }

  &.scene {
    width: 100%;
    aspect-ratio: 2 / 3;
    height: 100%;
    perspective: 600px;
  }

  @supports not (aspect-ratio: 2/ 3) {
    &.scene::before {
      float: left;
      padding-top: 150%;
      content: "";
    }
    &.scene::after {
      display: block;
      content: "";
      clear: both;
    }
  }

  .card {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
  }

  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: 20px 20px 60px #c9c9c9, -20px -20px 60px #ffffff;
  }

  .card.is-flipped {
    transform: rotateY(180deg);
  }

  .card__face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .card__face--front {
    display: flex;
    flex-direction: column;
  }

  .card__face--back {
    transform: rotateY(180deg);
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
    flex: 1;

    padding: 1rem;
    display: flex;
    flex-direction: column;
    img {
      width: 5rem;
      position: relative;
      top: -1rem;
      left: -1rem;
      filter: drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.2));
    }
    .table {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      p:nth-of-type(1) {
        color: #555;
        line-height: 1.5;
        border-bottom: ${({ theme, types }) => {
          const typeColor = theme[types[0].type.name];

          if (typeof typeColor === "string") {
            return `1px solid ${typeColor}`;
          } else {
            return `1px solid ${typeColor[0]}`;
          }
        }};
      }
      p:nth-of-type(2) {
        margin-top: 0.25rem;
        line-height: 1.5;
      }
    }
    .ability {
      grid-column: 1 / -1;
      p {
        text-transform: capitalize;
      }
    }
    .detail-button {
      display: flex;
      justify-content: flex-end;
      a {
        display: flex;
        gap: 1rem;
        align-items: center;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 10px;

        background: ${({ theme, types }) => {
          const typeColor = theme[types[0].type.name];

          if (typeof typeColor === "string") {
            return `${rgba(typeColor, theme.alpha.md)}`;
          } else {
            return `${typeColor[0]}`;
          }
        }};
      }
    }
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

    padding: 2rem;
    display: flex;
    aspect-ratio: 1;
    border-radius: 10px 10px 0 0;
    @supports not (aspect-ratio: 1) {
      position: relative;
      &::before {
        float: left;
        padding-top: 100%;
        content: "";
      }
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      img {
        position: absolute;
        height: calc(100% - 4rem);
        width: calc(100% - 4rem);
      }
    }
    img {
      flex: 1;
    }
  }

  .detail {
    flex: 1;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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
  }
  .id {
    color: #999;
    font-size: 0.875rem;
  }
  .name {
    text-transform: capitalize;
    font-weight: bold;
    font-size: 1.125rem;
    flex: 1;
  }
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
`;

export default PokemonCard;
