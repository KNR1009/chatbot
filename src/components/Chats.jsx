import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import {Chat} from "./index";


const useStyles = makeStyles(() =>
  createStyles({
    chats: {
      height: "400px",
      padding: "0px",
      overflow: 'auto'
    },
  })
);


const Chats  = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.chats} id={"scroll-area"}>
      {props.chats.map((chat, index) => {
        return <Chat text={chat.text} type={chat.type} key={index} className={classes.Chat}/>;
      })}
    </List>
  );
}

export default Chats;