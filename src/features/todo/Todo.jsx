import React from "react";
import Button from "@mui/material/Button";
import styles from "./todo.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllTodos } from "./todos.api";
import { deleteTodo } from "./todos.api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Todo = ({ todo }) => {
  const [open, setOpen] = React.useState(false);
  const [pop, setPop] = React.useState(todo.body);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  //UPDATE BUTTON
  const handleUpdate = async (id, body) => {
    console.log(id);
    await axios.patch(`http://localhost:3000/data/${id}`, {
      body,
    });
    setOpen(false);
    dispatch(getAllTodos());
  };

  //DELETE BUTTON
  const handleDelete = async (id) => {
    dispatch(deleteTodo(id));
    dispatch(getAllTodos());
    console.log(id);
  };

  return (
    <div>
      <div className={styles.todo}>
        <h3>{todo.title}</h3>
        <p>{todo.body}</p>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <label>
              Update <h2 style={{ display: "inline" }}>{todo.title}</h2>'s
              details
            </label>
            <br />
            <br />
            <TextField
              id="outlined-basic"
              placeholder="search Title"
              variant="outlined"
              value={pop}
              onChange={(e) => setPop(e.target.value)}
            />
            <br />
            <br />

            <Button
              onClick={() => handleUpdate(todo.id, pop)}
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </Modal>

        <Button onClick={handleOpen}>Update</Button>
        <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
      </div>
    
    </div>
  );
};

export default Todo;
