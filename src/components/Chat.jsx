import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

// 以下でアイコン画像をインポートしていく
import NoProfile from '../assets/imgae/no-profile.png'
import Torahack from '../assets/imgae/torahack.png'


const Chat = (props) => {
    // クエッションなのかアンサーなのかを判別する真偽値を作成する

    const isQuestion = (props.type === 'question');
    const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";

    return (
      <ListItem className={classes}>
        <ListItemAvatar>
          {isQuestion ? (
            <Avatar alt="Remy Sharp" src={Torahack} />
          ) : (
            <Avatar alt="Remy Sharp" src={NoProfile} />
          )}
        </ListItemAvatar>
        <div className="p-chat__bubble">{props.text}</div>
      </ListItem>
    );
};

export default Chat;
