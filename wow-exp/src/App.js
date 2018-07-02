import React, { Component } from 'react';
import './App.css';
import Wowlist from './components/wowlist';
import axios from 'axios';
import Comment from './components/comment/comment';
import Header from './components/header/header';

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
        <Header headerName="Why I love World of Warcraft"/>
        <Wowlist  filterComment={this.filterComment}/>
        <Header headerName="Post Your Story" />
        <div> 
        <p> Choose an expansion, then share your story</p>
        <br/>
        <div className="commentLine">
        <select onChange={(e)=> this.selectedExpansionFunc(e.target.value)}>
          <option>Vanilla</option>
          <option>Burning Crusade</option>
          <option>Wrath of the Lich King</option>
          <option>Cataclysm</option>
          <option>Mist of Pandaria</option>
          <option>Warlords of Draenor</option>
          <option>Legion</option>
        </select>
        <textarea className="commentBox" onChange={(e)=> this.changeHandler(e.target.value)} placeholder="Write your story here">
        </textarea>
        <button className="standardButton" onClick={()=>this.postComment()}> Post Story</button>
        <button className="standardButton" onClick={()=>this.getUserComments()}> Display all stories</button>
        </div>
         <div> {this.state.comments.map(comment => 
          <Comment expansion={comment.expansion} id={comment.id} key={comment.id} text={comment.text} edit={this.editComment} remove={this.deleteComment}/>)} </div>
        </div>
      </div>
    );
  }
}

export default App;
