export const ITEM_TYPES = {
  CARD: "card",
  TASK: "task",
};

export const DATASET = {
  tasks: {
    "task-1": { id: "task-1", content: "water plants" },
    "task-2": { id: "task-2", content: "buy oat milk" },
    "task-3": { id: "task-3", content: "build a trello board" },
    "task-4": { id: "task-4", content: "have a beach day" },
    "task-5": { id: "task-5", content: "build tic tac toe" },
  },
  cards: {
    "card-1": {
      id: "card-1",
      title: "Home Todos",
      taskIds: ["task-1", "task-2"],
    },
    "card-2": {
      id: "card-2",
      title: "Work Todos",
      taskIds: ["task-3"],
    },
    "card-3": { id: "card-3", title: "Fun Todos", taskIds: ["task-4"] },
    "card-4": { id: "card-4", title: "Completed", taskIds: ["task-5"] },
  },
  cardOrder: ["card-1", "card-2", "card-3", "card-4"],
};
