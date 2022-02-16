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
import { useEffect, useRef, useState } from "react";

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

const fetchWord = (word) => {
  return fetch(`${API_URL}/${word}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log("err:", err));
};

function App() {
  const wordOfTheDay = "hello";

  const [guesses, setGuesses] = useState({ ...newGame });
  const [markers, setMarkers] = useState({
    0: Array.from({ length: wordLength }).fill(""),
    1: Array.from({ length: wordLength }).fill(""),
    2: Array.from({ length: wordLength }).fill(""),
    3: Array.from({ length: wordLength }).fill(""),
    4: Array.from({ length: wordLength }).fill(""),
  });

  let letterIndex = useRef(0);
  let round = useRef(0);

  const submit = () => {
    const _round = round.current;

    const updatedMarkers = {
      ...markers,
    };

    const tempWord = wordOfTheDay.split("");

    const leftoverIndices = [];

    // Prioritize the letters in the correct spot
    tempWord.forEach((letter, index) => {
      const guessedLetter = guesses[_round][index];

      if (guessedLetter === letter) {
        updatedMarkers[_round][index] = "green";
        tempWord[index] = "";
      } else {
        // We will use this to mark other letters for hints
        leftoverIndices.push(index);
      }
    });

    // Then find the letters in wrong spots
    if (leftoverIndices.length) {
      leftoverIndices.forEach((index) => {
        const guessedLetter = guesses[_round][index];
        const correctPositionOfLetter = tempWord.indexOf(guessedLetter);

        if (
          tempWord.includes(guessedLetter) &&
          correctPositionOfLetter !== index
        ) {
          // Mark yellow when letter is in the word of the day but in the wrong spot
          updatedMarkers[_round][index] = "yellow";
          tempWord[correctPositionOfLetter] = "";
        } else {
          // This means the letter is not in the word of the day.
          updatedMarkers[_round][index] = "grey";
          tempWord[index] = "";
        }
      });
    }

    setMarkers(updatedMarkers);
    round.current = _round + 1;
    letterIndex.current = 0;
  };

  const erase = () => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex !== 0) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex - 1] = "";
        return newGuesses;
      });

      letterIndex.current = _letterIndex - 1;
    }
  };

  const publish = ({ pressedKey }) => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex < wordLength) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex] = pressedKey;
        return newGuesses;
      });

      letterIndex.current = _letterIndex + 1;
    }
  };

  const enterGuess = async (pressedKey) => {
    if (pressedKey === "enter" && !guesses[round.current].includes("")) {
      const validWord = await fetchWord(guesses[round.current].join(""));

      if (Array.isArray(validWord)) {
        submit();
      }
    } else if (pressedKey === "backspace") {
      erase();
    } else if (pressedKey !== "enter") {
      publish({ pressedKey });
    }
  };

  const handleClick = (key) => {
    const pressedKey = key.toLowerCase();

    enterGuess(pressedKey);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.key.toLowerCase();

      if (allKeys.includes(pressedKey)) {
        enterGuess(pressedKey);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Main>
      <Header>WORDLE</Header>
      <GameSection>
        <TileContainer>
          {Object.values(guesses).map((word, wordIndex) => (
            <TileRow key={wordIndex}>
              {word.map((letter, i) => (
                <Tile key={i} hint={markers[wordIndex][i]}>
                  {letter}
                </Tile>
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
