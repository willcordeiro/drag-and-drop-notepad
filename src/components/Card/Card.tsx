import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "../Task/Task";
import EditInput from "../EditInput/EditInput";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

function Card(props: any) {
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const onSaveTask = (content: any) => {
    if (content.trim() !== "") {
      props.onAddNewTask(content);
    }
    setIsAddingNewTask(false);
  };

  return (
    <Draggable draggableId={props.card.id} index={props.index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          id={props.card.id}
        >
          <TitleBar>
            {props.isTitleEditing ? (
              <EditInput
                key={props.card.id}
                value={props.card.title}
                onSave={props.onSaveTitleEdit}
                fontSize="1.5em"
                margin="20px 0 20px 8px"
              />
            ) : (
              <Title
                onDoubleClick={props.onTitleDoubleClick}
                {...provided.dragHandleProps}
              >
                {props.card.title}
              </Title>
            )}
            <Cross onClick={props.onRemoveCard}>
              <AiFillCloseCircle />
            </Cross>
          </TitleBar>
          <Droppable droppableId={props.card.id} type="task">
            {(provided, snapshot) => (
              <>
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {props.tasks.map((task: any, index: any) => (
                    <Task
                      key={task.id}
                      task={task}
                      index={index}
                      onSaveTaskEdit={(content: any) =>
                        props.onSaveTaskEdit(task.id, content)
                      }
                      onTaskDoubleClick={() => props.onTaskDoubleClick(task)}
                      isTaskEditing={props.isTaskEditing(task)}
                    />
                  ))}
                </TaskList>
                {provided.placeholder}
              </>
            )}
          </Droppable>
          <NewTaskBar>
            {isAddingNewTask ? (
              <EditInput
                key="newtask"
                value=""
                onSave={onSaveTask}
                margin="8px"
              />
            ) : (
              <NewTaskButton onClick={() => setIsAddingNewTask(true)}>
                <AiOutlinePlus /> New Task
              </NewTaskButton>
            )}
          </NewTaskBar>
        </CardContainer>
      )}
    </Draggable>
  );
}

export default Card;

const CardContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h3`
  padding: 0 12px;
  font-size: 1.2em;
  text-overflow: ellipsis;
`;
const Cross = styled.div`
  padding: 20px 12px;
  cursor: pointer;
  font-size: 1rem;
  text-align: right;
  color: grey;
`;

type TaskList = {
  isDraggingOver: any;
};

const TaskList = styled.div<TaskList>`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  min-height: 100px;
  height: 100%;
`;

const NewTaskButton = styled.div`
  padding: 10px;
  margin: 10px 7px;
  cursor: pointer;
  text-align: right;
  color: grey;
  font-size: 0.9rem;

  :hover {
    background-color: #598ae7;
    border-radius: 3px;
    color: white;
  }
`;

const NewTaskBar = styled.div`
  display: flex;
`;
