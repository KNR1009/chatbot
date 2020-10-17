import React from "react";
import TextField from "@material-ui/core/TextField";


const TextInput = (props) => {
    return(
      <TextField 
      fullWidth = {true} // →幅いっぱいに広がる
      label = {props.label} // →入力フォームのラベル(propsにて送る)
      margin = {"dense"} // 密集にする
      multiline = {props.multiline} //→ 複数行ある時にこちらを利用(お問い合わせ内容のように複数行ある時)
      rows={props.rows} // 行数を指定できる(5と指定すると5行)
      value = {props.value}
      type = {props.type} //HTMLの属性と同じ
      onChange={props.onChange}
       />
    )
} 

export default TextInput