import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { DATASET } from "./Data";
import DragDropCards from "./DragDropCards";

function App1() {
  const [dataset, _] = useState(() => {
    const savedDataset: any = localStorage.getItem(
      "aleka-trello-board-dataset"
    );
    const initialValue = JSON.parse(savedDataset);
    return initialValue || DATASET;
  });

  const [tasks, setTasks] = useState(dataset.tasks);
  const [cards, setCards] = useState(dataset.cards);
  const [cardOrder, setCardOrder] = useState(dataset.cardOrder);

  useEffect(() => {
    localStorage.setItem(
      "aleka-trello-board-dataset",
      JSON.stringify({ tasks, cards, cardOrder })
    );
  }, [tasks, cards, cardOrder]);

  const onAddNewCard = () => {
    const newCard = {
      id: "card-" + genRandomID(),
      title: "**New**",
      taskIds: [],
    };
    const newCardOrder = Array.from(cardOrder);
    newCardOrder.unshift(newCard.id);
    setCards({
      ...cards,
      [newCard.id]: newCard,
    });
    setCardOrder(newCardOrder);
  };

  function genRandomID() {
    return (Math.random() + 1).toString(36).substring(7);
  }

  return (
    <Container>
      <Menu>
        <Note>
          you can add, edit, or remove cards & tasks. <br />
          double click to edit card title or task content. <br />
          task is removed when content is empty. <br />
          drag/drop card or task to desired order. <br />
          your edited changes are saved in local storage.
        </Note>
        <NewCard onClick={onAddNewCard}>+ New Card</NewCard>
      </Menu>
      <DragDropCards
        cards={cards}
        tasks={tasks}
        cardOrder={cardOrder}
        setCards={setCards}
        setTasks={setTasks}
        setCardOrder={setCardOrder}
      />
    </Container>
  );
}

export default App1;

const Container = styled.div`
  margin: 2em;
  display: flex;
  @media (max-width: 720px) {
    flex-direction: column;
  }
  align-items: center;
  justify-items: center;
`;

const Menu = styled.div`
  margin: 2em;
  display: flex;
  flex-direction: column;
`;

const Note = styled.div`
  font-size: 0.8em;
  margin: 20px 0;
`;

const NewCard = styled.div`
  font-size: 1em;
  color: grey;
  min-width: 100px;
  text-align: center;
  cursor: pointer;
`;