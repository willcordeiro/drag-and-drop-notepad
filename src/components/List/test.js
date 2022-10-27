const { DragDropContext, Draggable, Droppable } = ReactBeautifulDnd;
const { useState, useEffect, Fragment } = React;

const TaskList = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  min-height: 100px;
  height: 100%;
`;
const NewTaskBar = styled.div`
  display: flex;
`;
const NewTaskButton = styled.div`
  padding: 8px;
  margin: 8px;
  cursor: pointer;
  text-align: right;
  color: grey;
`;

const TaskContainer = styled.div`
  display: flex;
`;
const TaskContent = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  width: 100%;
`;
function Task(props) {
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

const Input = styled.input`
  font-size: ${(props) => props.fontSize || "inherit"};
  font-family: inherit;
  margin: ${(props) => props.margin || "inherit"};
  padding: 8px;
  width: 100%;
`;
function EditInput(props) {
  const [val, setVal] = useState(props.value);
  return (
    <Input
      type="text"
      autoFocus
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onKeyPress={(event) => {
        if (event.key === "Enter" || event.key === "Escape") {
          props.onSave(val);
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onBlur={() => props.onSave(val)}
      fontSize={props.fontSize}
      margin={props.margin}
    />
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

function genRandomID() {
  return (Math.random() + 1).toString(36).substring(7);
}
