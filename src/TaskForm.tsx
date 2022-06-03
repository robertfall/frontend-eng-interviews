import React, { useState, ChangeEventHandler, FormEventHandler } from "react";

const TaskForm = ({ onSubmit }: { onSubmit: Function }) => {
  const [formDescription, setFormDescription] = useState<string>();

  const handleFormDescriptionChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormDescription(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      onSubmit({
          description: formDescription
      });
      setFormDescription('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        placeholder="Todo Description"
        value={formDescription}
        onChange={handleFormDescriptionChange}
      />
      <input type="submit" value="Add" />
    </form>
  );
};

export default TaskForm;
