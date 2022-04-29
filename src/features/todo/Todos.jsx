import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "./todos.api";
import { addTodo } from "./todos.api";
import CircularProgress from "@mui/material/CircularProgress";
import Todo from "./Todo";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

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

const Todos = () => {
  const [open, setOpen] = React.useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const { todos, isLoading, error } = useSelector((state) => state.todos);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlecreate = async (postTitle, postBody) => {
    const payload = {
      title: postTitle,
      body: postBody,
    };
    dispatch(addTodo(payload));
    dispatch(getAllTodos());
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  if (isLoading) {
    return <CircularProgress style={{ margin: "auto", marginTop: "100px" }} />;
  } else if (error) {
    return <h1>Error in request</h1>;
  } else {
    return (
      <div>
        <div>
          <Button onClick={handleOpen}>
            <h2>Create New</h2>
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                id="outlined-basic"
                placeholder="postTitle"
                variant="outlined"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                placeholder="postBody"
                variant="outlined"
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
              />
              <br />
              <br />

              <Button
                onClick={() => handlecreate(postTitle, postBody)}
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </Modal>
        </div>
        <hr />
        <br />
        <TextField
          id="outlined-basic"
          placeholder="search Country"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />
        {todos
          .filter((item) => {
            if (title === "") {
              return item;
            } else if (item.title.toLowerCase().includes(title.toLowerCase())) {
              return item;
            }
          })
          .map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
      </div>
    );
  }
};

export default Todos;
