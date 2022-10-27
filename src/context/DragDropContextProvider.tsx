import { ITEM_TYPES } from "../components/defaultCardsData/Data";
import { useState, useEffect, createContext, useContext } from "react";
import { DATASET } from "../components/defaultCardsData/Data";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";

interface AppContextInterface {
  tasks: any;
  cards: any;
  cardOrder: any;
  onDragEnd: any;
  setCards: any;
  setTasks: any;
  setCardOrder: any;
  onAddNewCard: any;
}

const DragAndDropContext = createContext<AppContextInterface | any>(null);

export const DragDropContextProvider = ({ children }: any) => {
  const [dataset, setDataset] = useState(() => {
    const savedDataset: any = localStorage.getItem("cat-notepad-board-dataset");
    const initialValue = JSON.parse(savedDataset);
    return initialValue || DATASET;
  });

  const [tasks, setTasks] = useState(dataset.tasks);
  const [cards, setCards] = useState(dataset.cards);
  const [cardOrder, setCardOrder] = useState(dataset.cardOrder);

  useEffect(() => {
    localStorage.setItem(
      "cat-notepad-board-dataset",
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

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === ITEM_TYPES.CARD) {
      reorderCards(source, destination, draggableId);
    } else {
      // type === tasks
      const start = cards[source.droppableId];
      const finish = cards[destination.droppableId];
      if (start.id === finish.id) {
        reorderTasksWithinCard(
          start,
          source.index,
          destination.index,
          draggableId
        );
      } else {
        moveTask(start, finish, source.index, destination.index, draggableId);
      }
    }
  };

  const reorderCards = (source: any, destination: any, draggableId: any) => {
    const newCardOrder = Array.from(cardOrder);
    newCardOrder.splice(source.index, 1);
    newCardOrder.splice(destination.index, 0, draggableId);
    setCardOrder(newCardOrder);
  };

  const reorderTasksWithinCard = (
    card: any,
    sourceIdx: any,
    destinationIdx: any,
    draggableId: any
  ) => {
    const newTaskIds = Array.from(card.taskIds);
    newTaskIds.splice(sourceIdx, 1);
    newTaskIds.splice(destinationIdx, 0, draggableId);
    setCards({
      ...cards,
      [card.id]: {
        ...card,
        taskIds: newTaskIds,
      },
    });
  };

  const moveTask = (
    start: any,
    finish: any,
    sourceIdx: any,
    destinationIdx: any,
    draggableId: any
  ) => {
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(sourceIdx, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destinationIdx, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    setCards({
      ...cards,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  return (
    <DragAndDropContext.Provider
      value={{
        tasks,
        cards,
        cardOrder,
        onDragEnd,
        setCards,
        setTasks,
        setCardOrder,
        onAddNewCard,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </DragAndDropContext.Provider>
  );
};

export const useStateContext = () => useContext(DragAndDropContext);
