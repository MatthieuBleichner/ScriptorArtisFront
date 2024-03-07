import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { gql } from "../src/__generated__/gql";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
// import Icon from "@mui/material/Icon";
interface ITaskProps {
  id: number;
  index: number;
}

const GET_TASK = gql(/* GraphQL */ `
  query task($id: Int!) {
    task(id: $id) {
      id
      title
      description
      priority
      date
      owner {
        firstName
        lastName
      }
    }
  }
`);

interface ItemProps {
  ownerName: string;
  ownerSrc: string;
  title?: string;
  priority?: string | null;
  date?: string | null;
}

function Item({
  ownerName,
  ownerSrc,
  title,
  priority,
  date,
}: ItemProps): JSX.Element {
  return (
    <ListItem
      // alignItems="center"
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
      sx={{ width: 345, bgcolor: "background.paper", margin: 1 }}
    >
      <ListItemAvatar>
        <Avatar alt={ownerName} src={ownerSrc} sx={{ bgcolor: "#81c784" }} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ color: "black" }}
        primary={title}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {priority}
            </Typography>
            {date}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

function Task({ id, index }: ITaskProps): JSX.Element {
  const { loading, data } = useQuery(GET_TASK, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          style={{ flex: 1 }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Item
            ownerName={`${data?.task?.owner?.firstName} ${data?.task?.owner?.lastName}`}
            ownerSrc="/static/images/avatar/1.jpg"
            title={data?.task?.title}
            priority={data?.task?.priority}
            date={data?.task?.date}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Task;
