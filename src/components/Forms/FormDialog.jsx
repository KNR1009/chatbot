import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextInput from "./TextImport"



export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: "",
    };
    this.inputEmail = this.inputEmail.bind();
    this.inputDescription = this.inputDescription.bind();
    this.inputName = this.inputName.bind();
  }

  
  

  // 入力値を更新する
  inputName = (event) => {
    this.setState({ name: event.target.value });
    console.log(this.state.name);
  };
  inputEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  inputDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  // フォームを送信する内容

  submitForm(){

      // 入力値を変数に格納する
      const name = 'テスト'
      const email = 'emailです'
      const description = 'テストです'

      // スラッグに送る処理
      const payload = {
        text: 'お問い合わせがありました\n'+
        'お名前' + name + '\n' +
        'Email' + email + '\n' +
        'お問い合わせ内容: \n' + description
      }

        const url = "https://hooks.slack.com/services/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";

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(payload)
        }).then(()=>{
            alert('送信が完了しました。追って連絡します')
            // stateを初期化する
            this.setState({
              name: "",
              email: "",
              description: "",
            })
            return this.props.handleClose()
        })


      }

  


  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextInput
              label={"お名前(必須)"}
              multiline={false}
              rows={1}
              value={this.state.name}
              type={"text"}
              onChange={this.inputName}
            />
            <TextInput
              label={"メールアドレス(必須)"}
              multiline={false}
              rows={1}
              value={this.state.email}
              type={"text"}
              onChange={this.inputEmail}
            />
            <TextInput
              label={"お問い合わせ内容"}
              multiline={true}
              rows={5}
              value={this.state.description}
              type={"text"}
              onChange={this.inputDescription}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={this.submitForm} color="primary" autoFocus>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}