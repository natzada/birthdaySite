import { useEffect } from "react";
import styled from "styled-components";

const Loader: React.FC = () => {
  useEffect(() => {
    // Simula um carregamento (opcional, para teste)
    const timer = setTimeout(() => {}, 2000); // 2 segundos de exibição
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledWrapper>
      <div className="heart" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #000000, #830000ff);

  .heart {
    height: 70px;
    width: 70px;
    background: #f20044;
    transform: rotate(-45deg);
    box-shadow: -10px -10px 90px #f20044;
    animation: anim 0.6s linear infinite;
    position: relative;
  }

  .heart:before {
    content: "";
    position: absolute;
    height: 70px;
    width: 70px;
    background: #f20044;
    top: -50%;
    border-radius: 50px;
  }

  .heart:after {
    content: "";
    position: absolute;
    height: 70px;
    width: 70px;
    background: #f20044;
    right: -50%;
    border-radius: 50px;
  }

  @media (min-width: 640px) {
    .heart {
      height: 70px;
      width: 70px;
    }
    .heart:before,
    .heart:after {
      height: 70px;
      width: 70px;
    }
  }


  @keyframes anim {
    0% {
      transform: rotate(-45deg) scale(1.07);
      filter: blur(0px);
    }
    80% {
      transform: rotate(-45deg) scale(1);
      filter: blur(1px);
    }
    100% {
      transform: rotate(-45deg) scale(0.8);
      filter: blur(2px);
    }
  }
`;

export default Loader;
