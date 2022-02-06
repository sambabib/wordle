import styled from "styled-components";
import "./App.css";

const Main = styled.main`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;

  border-bottom: 1px solid #3a3a3c;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

const GameSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
const TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;

  height: 420px;
  width: 350px;
`;
const TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;
const Tile = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #3a3a3c;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 3.2rem;
  text-transform: uppercase;

  user-select: none;
`;

const KeyboardSection = styled.section`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const KeyboardRow = styled.div`
  width: 100%;
  margin: 0 auto 8px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const KeyboardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  ${({ item }) => (item ? `flex: ${item};` : `flex: 1;`)}

  border: 0;
  border-radius: 4px;
  background-color: #818384;
  font-weight: bold;
  text-transform: uppercase;
  color: #d7dadc;

  cursor: pointer;
  user-select: none;

  &:last-of-type {
    margin: 0;
  }
`;

const Flex = styled.div`
  ${({ item }) => `flex: ${item};`}
`;

const BackspaceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      fill="#d7dadc"
      d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
    ></path>
  </svg>
);

function App() {
  return (
    <Main>
      <Header>WORDLE</Header>
      <GameSection>
        <TileContainer>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <TileRow key={i}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Tile key={i}></Tile>
              ))}
            </TileRow>
          ))}
        </TileContainer>
      </GameSection>
      <KeyboardSection>
        <KeyboardRow>
          {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
            <KeyboardButton>{key}</KeyboardButton>
          ))}
        </KeyboardRow>
        <KeyboardRow>
          <Flex item={0.5} />
          {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((key) => (
            <KeyboardButton>{key}</KeyboardButton>
          ))}
          <Flex item={0.5} />
        </KeyboardRow>
        <KeyboardRow>
          {["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"].map(
            (key) => (
              <KeyboardButton
                flex={["enter", "backspace"].includes(key) ? 1.5 : 1}
              >
                {key === "backspace" ? <BackspaceIcon /> : key}
              </KeyboardButton>
            )
          )}
        </KeyboardRow>
      </KeyboardSection>
    </Main>
  );
}

export default App;
