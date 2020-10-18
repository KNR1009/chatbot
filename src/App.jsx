import React from 'react';
import './assets/styles/style.css'
import { AnswersList, Chats } from "./components/index";
import  FormDialog  from "./components/Forms/FormDialog";
import {db} from "./firebase/index";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentID: "init",
      dataset:{},
      open: false,
    };

    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question',
    });

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentID: nextQuestionId,
    });
  };

  selectAnswer = (selectAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === "init":
        this.displayNextQuestion(nextQuestionId);
        break;
      // urlできた場合の実装
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
      
        // contactだった場合にもーだるウィ開く
        case nextQuestionId === "contact":
          this.handleClickOpen();
          break;

      default: 
        const chat = {
          text: selectAnswer,
          type: "answer",
        };

        const chats = this.state.chats;
        chats.push(chat);

        this.setState({
          chats: chats,
        });
        // 遅延時間を使って回答するようにする(2つの引数を取れる)
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);

        break;
    }
  };

  // モーダルの開閉操作のメソット(上でbindしている)

  handleClickOpen(){
    this.setState({
      open: true,
    });
  }

  handleClose(){
    this.setState({
      open: false,
    });
  }

  initChats() {
    const initDataset = this.state.dataset[this.state.currentID];
    const chat = {
      text: initDataset.question,
      type: "question",
    };
    const chats = this.state.chats;
    chats.push(chat);

    this.setState({
      chats: chats,
    });
  }

  initDataset = (dataset) => {
    this.setState({dataset:dataset})
  }

  componentDidMount() {
      (async() => {
        const dataset = this.state.dataset

        await db.collection('questions').get().then(snapshots => {
          snapshots.forEach(doc => {
            const id = doc.id
            const data = doc.data()
            dataset[id] = data
          })
        })
        this.initDataset(dataset);
         const initAnswer = "";
         this.selectAnswer(initAnswer, this.state.currentID);
      })()
  
  }

  

  componentDidUpdate() {
    // スクロールが自動的に下がる実装する
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer}
          />
          <FormDialog open={this.state.open}
          handleClose = {this.handleClose}
          />
        </div>
      </section>
    );
  }
}
