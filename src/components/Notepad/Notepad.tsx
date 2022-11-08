import styled from "styled-components";
import DragDropCards from "../DragDropCards/DragDropCards";
import { useStateContext } from "../../context/DragDropContextProvider";
import { ThemeProps } from "../../styles/Themes";

type GlobalThemeProps = {
  theme: ThemeProps;
};

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
          Hey mate in this app you can add, edit, or remove cards and tasks.
          double click to edit card title or task content. to remove a task just
          let the content empty. drag/drop card or task to desired order. You
          can toggle the page theme as you wish by clicking in the sun/moon icon
          in the header. Your edited changes are saved feel free to use!
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
  display: flex;
  width: 90%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Menu = styled.div`
  margin: 2em;
  display: flex;
  flex-direction: column;
`;

const Note = styled.div`
  font-size: 1rem;
  margin: 20px 0;
  text-align: left;
  overflow-wrap: break-word;
  color: ${({ theme }: GlobalThemeProps) => theme.color};
`;

const NewCard = styled.div`
  font-size: 1em;
  min-width: 100px;
  text-align: center;
  cursor: pointer;
  color: grey;
  padding: 10px;
  margin: 10px 7px;
  :hover {
    background-color: #8a43f2;
    border-radius: 3px;
    color: white;
  }
`;
