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

  const onAddNewTask = (cardID: any, content: any) => {
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

  const onRemoveCard = (cardID: any) => {
    const newCardOrder = cardOrder.filter((id: any) => id !== cardID);
    setCardOrder(newCardOrder);

    const cardTaskIds = cards[cardID].taskIds;
    cardTaskIds.forEach((taskID: any) => delete tasks[taskID]);
    delete cards[cardID];
    setCards(cards);
    setTasks(tasks);
  };

  const onRemoveTask = (taskID: any, cardID: any) => {
    const newTaskIds = cards[cardID].taskIds.filter((id: any) => id !== taskID);
    setCards({ ...cards, [cardID]: { ...cards[cardID], taskIds: newTaskIds } });
    delete tasks[taskID];
    setTasks(tasks);
  };

  const onSaveTitleEdit = (cardID: any, newTitle: any) => {
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

  const onSaveTaskEdit = (taskID: any, cardID: any, newContent: any) => {
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
          {cardOrder.map((id: any, index: any) => {
            const card = cards[id];

            const cardTasks = card.taskIds.map((taskId: any) => tasks[taskId]);
            return (
              <Card
                key={card.id}
                card={card}
                tasks={cardTasks}
                index={index}
                onSaveTitleEdit={(title: any) =>
                  onSaveTitleEdit(card.id, title)
                }
                onRemoveCard={() => onRemoveCard(card.id)}
                onAddNewTask={(content: any) => onAddNewTask(card.id, content)}
                onSaveTaskEdit={(taskID: any, newContent: any) =>
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
  @media (max-width: 720px) {
    flex-direction: column;
  }

  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 50px;
    grid-row-gap: 10px;
    justify-items: center;
  }

  @media only screen and (min-width: 1700px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: center;
    width: 100%;
  }
`;
