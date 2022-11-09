import styled from "styled-components";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";

function DragDropCards({
  cards,
  tasks,
  cardOrder,
  setCards,
  setTasks,
  setCardOrder,
}: any) {
  const [editing, setEditing] = useState(null);

  const onAddNewTask = (cardID: string, content: string) => {
    const newTask = {
      id: "task-" + genRandomID(),
      content,
    };
    setTasks({
      ...tasks,
      [newTask.id]: newTask,
    });
    const newTaskIds = Array.from(cards[cardID].taskIds);
    newTaskIds.push(newTask.id);
    setCards({ ...cards, [cardID]: { ...cards[cardID], taskIds: newTaskIds } });
  };

  const onRemoveCard = (cardID: string) => {
    const newCardOrder = cardOrder.filter((id: string) => id !== cardID);
    setCardOrder(newCardOrder);

    const cardTaskIds = cards[cardID].taskIds;
    cardTaskIds.forEach((taskID: string) => delete tasks[taskID]);
    delete cards[cardID];
    setCards(cards);
    setTasks(tasks);
  };

  const onRemoveTask = (taskID: string, cardID: string) => {
    const newTaskIds = cards[cardID].taskIds.filter(
      (id: string) => id !== taskID
    );
    setCards({ ...cards, [cardID]: { ...cards[cardID], taskIds: newTaskIds } });
    delete tasks[taskID];
    setTasks(tasks);
  };

  const onSaveTitleEdit = (cardID: string, newTitle: string) => {
    if (newTitle !== cards[cardID].title) {
      setCards({
        ...cards,
        [cardID]: {
          ...cards[cardID],
          title: newTitle,
        },
      });
    }
    setEditing(null);
  };

  const onSaveTaskEdit = (
    taskID: string,
    cardID: string,
    newContent: string
  ) => {
    if (newContent.trim() === "") {
      onRemoveTask(taskID, cardID);
    } else if (newContent !== tasks[taskID].content) {
      setTasks({
        ...tasks,
        [taskID]: { ...tasks[taskID], content: newContent },
      });
    }
    setEditing(null);
  };

  function genRandomID() {
    return (Math.random() + 1).toString(36).substring(7);
  }

  return (
    <Droppable droppableId="all-cards" direction="horizontal" type="card">
      {(provided) => (
        <CardsContainer {...provided.droppableProps} ref={provided.innerRef}>
          {cardOrder.map((id: string, index: string) => {
            const card = cards[id];

            const cardTasks = card.taskIds.map(
              (taskId: string) => tasks[taskId]
            );
            return (
              <Card
                key={card.id}
                card={card}
                tasks={cardTasks}
                index={index}
                onSaveTitleEdit={(title: string) =>
                  onSaveTitleEdit(card.id, title)
                }
                onRemoveCard={() => onRemoveCard(card.id)}
                onAddNewTask={(content: string) =>
                  onAddNewTask(card.id, content)
                }
                onSaveTaskEdit={(taskID: string, newContent: string) =>
                  onSaveTaskEdit(taskID, card.id, newContent)
                }
                onTitleDoubleClick={() => setEditing(card.id)}
                onTaskDoubleClick={(task: any) => setEditing(task.id)}
                isTitleEditing={editing === card.id}
                isTaskEditing={(task: any) => editing === task.id}
              />
            );
          })}
          {provided.placeholder}
        </CardsContainer>
      )}
    </Droppable>
  );
}

export default DragDropCards;
const CardsContainer = styled.div`
  margin: 2em;
  display: flex;
  @media (min-width: 368px) {
    flex-direction: column;
    justify-items: center;
  }

  @media only screen and (min-width: 368px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    display: grid;
  }

  @media only screen and (min-width: 678px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: center;
  }

  @media only screen and (min-width: 1400px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: center;
    width: 100%;
  }
`;
