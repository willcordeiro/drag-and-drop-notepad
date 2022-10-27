import styled from "styled-components";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ITEM_TYPES } from "./Data";
import Card from "./Card";
function DragDropCards({
  cards,
  tasks,
  cardOrder,
  setCards,
  setTasks,
  setCardOrder,
}: any) {
  const [editing, setEditing] = useState(null);

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

  const onAddNewTask = (cardID: number, content: number) => {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-cards" direction="horizontal" type="card">
        {(provided) => (
          <CardsContainer {...provided.droppableProps} ref={provided.innerRef}>
            {cardOrder.map((id: string, index: number) => {
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
                  onFocusClick={() => onFocusClick(card.id)}
                  onSaveTitleEdit={(title: string) =>
                    onSaveTitleEdit(card.id, title)
                  }
                  onRemoveCard={() => onRemoveCard(card.id)}
                  onAddNewTask={(content: any) =>
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
    </DragDropContext>
  );
}

export default DragDropCards;
const CardsContainer = styled.div`
  margin: 2em;
  display: flex;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;
