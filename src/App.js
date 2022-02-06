import {
  Main,
  Header,
  GameSection,
  TileContainer,
  TileRow,
  Tile,
  KeyboardSection,
  KeyboardRow,
  KeyboardButton,
  Flex,
} from "./styled";
import { BackspaceIcon } from "./icons";
import "./App.css";
import { useEffect } from "react";

const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

function App() {
  const handleClick = (key) => {};

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      console.log(e.key);
    });
  }, []);

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
        {keyboardRows.map((keys, i) => (
          <KeyboardRow key={i}>
            {i === 1 && <Flex item={0.5} />}
            {keys.map((key) => (
              <KeyboardButton
                key={key}
                onClick={() => handleClick(key)}
                flex={["enter", "backspace"].includes(key) ? 1.5 : 1}
              >
                {key === "backspace" ? <BackspaceIcon /> : key}
              </KeyboardButton>
            ))}
            {i === 1 && <Flex item={0.5} />}
          </KeyboardRow>
        ))}
      </KeyboardSection>
    </Main>
  );
}

export default App;
