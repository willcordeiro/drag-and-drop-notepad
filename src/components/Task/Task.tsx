import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import EditInput from "../EditInput/EditInput";

function Task(props: any) {
  return (
    <TaskContainer>
      {props.isTaskEditing ? (
        <EditInput
          key={props.task.id}
          value={props.task.content}
          onSave={props.onSaveTaskEdit}
          margin="0 0 8px 0"
        />
      ) : (
        <Draggable draggableId={props.task.id} index={props.index}>
          {(provided, snapshot) => (
            <TaskContent
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              onDoubleClick={props.onTaskDoubleClick}
            >
              {props.task.content}
            </TaskContent>
          )}
        </Draggable>
      )}
    </TaskContainer>
  );
}

export default Task;

const TaskContainer = styled.div`
  display: flex;
`;

type TaskContent = {
  isDragging: any;
};

const TaskContent = styled.div<TaskContent>`
  border: 1px solid ${(props) => (props.isDragging ? "#598ae7" : "lightgrey")};
  padding: 7px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? "#598ae7" : "white")};
  width: 95%;
  height: 100%;
  font-size: 1.1rem;
  overflow-wrap: break-word;
  cursor: pointer;
  color: ${(props) => (props.isDragging ? "white" : "black")};

  :hover {
    opacity: 0.7;
  }
`;
