import React, { Component } from 'react';
import './App.css';
import Wowlist from './components/wowlist';
import axios from 'axios';
import Comment from './components/comment/comment';

const baseUrl = "/api/comments"

class App extends Component {
  constructor(){
    super(); 
    this.state = {
      comments: [],
      expansion:'Vanilla',
      text:'',
    }
 }

  selectedExpansionFunc = (expansion) => {
    this.setState({
      expansion: expansion
    })
  }

  changeHandler = (text) => {
    this.setState({
      text: text
    })
  }

  postComment = () => {
   axios.post(baseUrl, {expansion: this.state.expansion, text: this.state.text}).then( response => 
      this.setState({
        comments: response.data,
        })
    ).catch(error => console.log( '-------postComment',error))
    this.setState({text: '',});
  }


  getUserComments = () => {
    axios.get(baseUrl).then(response => {
      this.setState({
        comments: response.data
      })
    }).catch(error => console.log( '-------getUserComments',error))
  }

  deleteComment = (id) => {
    axios.delete(`${baseUrl}/${id}`).then(response => {
      this.setState({
        comments: response.data
      })
    }).catch(error => console.log('-----deleteComment',error))
  }
  
  editComment = (id, text) => {
    axios.put(`${baseUrl}/${id}`, {text}).then(response => {
      this.setState({
        comments: response.data
      })
    }).catch(error => console.log('-----editComment',error))
  } 
  
  filterComment = (expansion) => {
    console.log('---expansion', expansion)
    axios.get(`${baseUrl}/search?expansion=${expansion}`).then(response => {
      this.setState({
        comments: response.data
      })
  }).catch(error => console.log('-----filterComment',error))
}  

  render() {

    return (
      <div>
        <header>
        <h1> Why I love World of Warcraft </h1>
        </header>
        <Wowlist  filterComment={this.filterComment}/>
        <header>
        <h1> Post Your Story </h1>
        </header>
        <div> 
        <button className="standardButton" onClick={()=>this.getUserComments()}> Show all Comments</button>
        <p> Choose an expansion, then make a comment</p>
        <br/>
        <select onChange={(e)=> this.selectedExpansionFunc(e.target.value)}>
          <option>Vanilla</option>
          <option>Burning Crusade</option>
          <option>Wrath of the Lich King</option>
          <option>Cataclysm</option>
          <option>Mist of Pandaria</option>
          <option>Warlords of Draenor</option>
          <option>Legion</option>
        </select>
        <textarea className="commentBox" onChange={(e)=> this.changeHandler(e.target.value)} placeholder="Place your comment here">
        </textarea>
        <button className="standardButton" onClick={()=>this.postComment()}> Post Comment</button>
         <div> {this.state.comments.map(comment => 
          <Comment expansion={comment.expansion} id={comment.id} key={comment.id} text={comment.text} edit={this.editComment} remove={this.deleteComment}/>)} </div>
        </div>
      </div>
    );
  }
}

export default App;
