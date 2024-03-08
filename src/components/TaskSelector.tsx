import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import {
  Priority,
  type TaskFilters,
  type User,
} from "../__generated__/graphql";
import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";

const GET_ALL_USERS = gql(/* GraphQL */ `
  query users {
    users {
      id
      firstName
      lastName
    }
  }
`);

interface TaskSelectorProps {
  onApplyFilters?: (filters: TaskFilters) => void;
}

const allPriorities = {
  All: "All",
  ...Priority,
};

const defaultUser = { id: -1, firstName: "All", lastName: "" };

function TaskSelector({ onApplyFilters }: TaskSelectorProps): JSX.Element {
  const [priority, setPriority] = useState<Priority | undefined>();
  const [userId, setUserId] = useState<number | undefined>();

  const { data: usersData } = useQuery(GET_ALL_USERS, {});

  const onPriorityChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const prio =
      e.target.value === allPriorities.All
        ? undefined
        : (e.target.value as Priority);
    onApplyFilters?.({
      priority: prio,
      ownerId: userId,
    });

    setPriority(e.target.value as Priority);
  };

  const onUserChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const ownerId =
      e.target.value === defaultUser.id.toString()
        ? undefined
        : parseInt(e.target.value);

    onApplyFilters?.({
      priority,
      ownerId,
    });
    setUserId(ownerId);
  };

  const allUsers = [defaultUser];
  if (usersData?.users !== null && usersData?.users !== undefined) {
    allUsers.push(...(usersData?.users as User[]));
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <p style={{ color: "black" }}>Filtering criteria</p>
      <TextField
        id="outlined-select-priority"
        select
        label="Priority"
        defaultValue="All"
        onChange={onPriorityChanged}
        sx={{ bgcolor: "background.paper" }}
      >
        {Object.keys(allPriorities).map((_, index) => (
          <MenuItem
            key={Object.keys(allPriorities)[index]}
            value={Object.keys(allPriorities)[index]}
          >
            {Object.values(allPriorities)[index]}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-select-user"
        select
        defaultValue={defaultUser.id.toString()}
        label="User"
        onChange={onUserChanged}
        sx={{ bgcolor: "background.paper" }}
      >
        {allUsers?.map((user, index) => (
          <MenuItem key={user.id} value={`${user.id}`}>
            {`${user.firstName} ${user.lastName}`}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

export default TaskSelector;
