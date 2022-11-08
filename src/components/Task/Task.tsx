import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import EditInput from "../EditInput/EditInput";
import { ThemeProps } from "../../styles/Themes";

type GlobalThemeProps = {
  theme: ThemeProps;
};

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
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) =>
    props.isDragging
      ? "#8a43f2"
      : ({ theme }: GlobalThemeProps) => theme.background};
  width: 95%;
  height: 100%;
  font-size: 1.1rem;
  overflow-wrap: break-word;
  cursor: pointer;
  color: ${(props) =>
    props.isDragging ? "white" : ({ theme }: GlobalThemeProps) => theme.color};

  :hover {
    opacity: 0.7;
  }
`;
