import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const Task = ({ task }) => {
  const { dispatch } = useTaskContext();
  const { user } = useAuthContext();

  const [form, showForm] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDesc, setNewDesc] = useState(task.desc);

  const removeTaskHandler = async () => {
    if (!user) {
      alert("You must be logged in");
      return;
    }
    const response = await fetch("/api/tasks/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
    if (!response.ok) {
      alert(json.err);
    }
  };
  const showFormHandler = () => {
    showForm(true);
  };
  const updateTaskHandler = async () => {
    showForm(false);

    if (!user) {
      alert("You must be logged in");
      return;
    }

    const response = await fetch("/api/tasks/" + task._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title: newTitle, desc: newDesc }),
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);

      dispatch({ type: "UPDATE_TASK", payload: json });
    }
    if (!response.ok) {
      alert(json.err);
      console.log("not okay");
    }
  };

  return (
    <div className="flex justify-between mx-auto bg-emerald-200 border border-teal-700 rounded-md my-4 px-5 py-4 w-[330px] md:w-1/3">
      {!form &&
      <div className="flex justify-between w-full">
        <div>
        <h2 className="text-xl text-emerald-950 mb-1">{task.title}</h2>
        <p className="text-slate-900 text-sm">{task.desc}</p>
      </div>
      <div className="flex md:flex-col">
        <button onClick={removeTaskHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 md:mb-2 text-gray-900">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
        </svg>
        </button>
        <button onClick={showFormHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 md:mb-2 text-gray-900">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
        </svg>
      </button>
      </div>
      

      
        </div>}

      {form && (
        <div className="flex flex-col w-full">
          <input className="rounded mb-3 outline-0 p-1 border border-teal-700 bg-teal-50 text-sm w-full"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            type="text"
          />
          <input className="rounded mb-3 outline-0 p-1 border border-teal-700 bg-teal-50 text-sm w-full"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            type="text"
          />
          <button className="border text-emerald-950 h-7 rounded w-20 text-sm border-teal-800" onClick={updateTaskHandler}> update</button>
        </div>
      )}
    </div>
  );
};

export default Task;
