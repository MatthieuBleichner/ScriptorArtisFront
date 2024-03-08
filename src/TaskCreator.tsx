import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Priority, type Task as ITask } from "../src/__generated__/graphql";
import AddCircle from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "../src/__generated__/gql";

const CREATE_TASK = gql(/* GraphQL */ `
  mutation CreateTask($input: createTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      state {
        id
      }
    }
  }
`);

const GET_ALL_USERS = gql(/* GraphQL */ `
  query users {
    users {
      id
      firstName
      lastName
    }
  }
`);

interface TaskCreatorProps {
  onTaskCreated?: (task: ITask) => void;
}

function TaskCreator({ onTaskCreated }: TaskCreatorProps): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<Priority>(Priority.P0);
  const [userId, setUserId] = useState<number>();
  const [date, setDate] = useState<string>();

  const [createTask] = useMutation(CREATE_TASK);

  const {
    // loading: tasksLoading,
    // error: tasksError,
    data: usersData,
  } = useQuery(GET_ALL_USERS, {});

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onPriorityChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPriority(e.target.value as Priority);
  };

  const onUserChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserId(parseInt(e.target.value));
  };

  const onDateChanged = (value: Date | null): void => {
    if (value !== null) setDate(value.toISOString());
  };

  const onCreateTask = (): void => {
    createTask({
      variables: {
        input: {
          title,
          priority,
          ownerId: userId,
          stateId: 1,
          date,
        },
      },
    })
      .then((res) => {
        if (
          res?.data?.createTask !== null &&
          res?.data?.createTask !== undefined
        ) {
          onTaskCreated?.(res?.data?.createTask as ITask);
        }
      })
      .catch(() => {});
  };

  return (
    <Stack
      //   style={{
      //     width: "100%",
      //     flexDirection: "row",
      //     borderWidth: 1,
      //     alignItems: "flex-start",
      //     justifyContent: "space-around",
      //   }}
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <p style={{ color: "black" }}>Create task</p>
      <TextField
        required
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onChange={onTitleChanged}
        sx={{ bgcolor: "background.paper" }}
      />

      <TextField
        id="outlined-select-priority"
        select
        label="Priority"
        defaultValue="P0"
        onChange={onPriorityChanged}
        sx={{ bgcolor: "background.paper" }}
      >
        {Object.keys(Priority).map((_, index) => (
          <MenuItem
            key={Object.keys(Priority)[index]}
            value={Object.keys(Priority)[index]}
          >
            {Object.values(Priority)[index]}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-select-user"
        select
        defaultValue={1}
        label="User"
        onChange={onUserChanged}
        sx={{ bgcolor: "background.paper" }}
      >
        {usersData?.users?.map((user, index) => (
          <MenuItem key={user.id} value={user.id}>
            {`${user.firstName} ${user.lastName}`}
          </MenuItem>
        ))}
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={onDateChanged} />
      </LocalizationProvider>
      <IconButton edge="end" aria-label="delete" onClick={onCreateTask}>
        <AddCircle
          sx={{
            color: "green",
            width: 40,
            height: 40,
            bgcolor: "background.paper",
          }}
        />
      </IconButton>
    </Stack>
  );
}

export default TaskCreator;
