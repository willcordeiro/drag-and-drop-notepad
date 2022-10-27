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
