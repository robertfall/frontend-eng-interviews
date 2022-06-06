import React from "react";

const Task = ({ tid, description, completed, onComplete }: TaskParams ) => {
  return (
    <div key={tid}>
      {description}
      {!completed && <input type="button" value="complete" onClick={() => onComplete(tid) } /> }
    </div>
  );
};

type TaskParams = Task & { onComplete: Function };

export default Task;
