import styled from "styled-components";
import DragDropCards from "../DragDropCards/DragDropCards";
import { useStateContext } from "../../context/DragDropContextProvider";

function Notepad() {
  const {
    tasks,
    cards,
    cardOrder,
    setCards,
    setTasks,
    setCardOrder,
    onAddNewCard,
  } = useStateContext();

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

export default Notepad;

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
  min-width: 100px;
  text-align: center;
  cursor: pointer;
`;
