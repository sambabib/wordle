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
import { useEffect, useState } from "react";

const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

const allKeys = keyboardRows.flat();

const wordLength = 5;

const newGame = {
  0: Array.from({ length: wordLength }).fill(""),
  1: Array.from({ length: wordLength }).fill(""),
  2: Array.from({ length: wordLength }).fill(""),
  3: Array.from({ length: wordLength }).fill(""),
  4: Array.from({ length: wordLength }).fill(""),
};

function App() {
  /**
   * [[],[],[],[],[],[]]
   * [[],[],[],[],[],[]]
   * [[],[],[],[],[],[]]
   * [[],[],[],[],[],[]]
   * [[],[],[],[],[],[]]
   * [[],[],[],[],[],[]]
   */
  const [guesses, setGuesses] = useState(newGame);

  const handleClick = (key) => {};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (allKeys.includes(e.key)) {
        console.log(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Main>
      <Header>WORDLE</Header>
      <GameSection>
        <TileContainer>
          {Object.values(guesses).map((word, i) => (
            <TileRow key={i}>
              {word.map((letter, i) => (
                <Tile key={i}>{letter}</Tile>
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
