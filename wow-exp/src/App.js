import React, { Component } from 'react';
import './App.css';
import Wowlist from './components/wowlist/wowlist';
import axios from 'axios';
import Message from './components/message/message';
import Header from './components/header/header';
import ScrollUpButton from "react-scroll-up-button";

const baseUrl = "/api/storyboards"

class App extends Component {
  constructor(){
    super(); 
    this.state = {
      storyboards: [],
      expansion:'Vanilla',
      text:'',
      boss: [],
      randomBoss: []
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

  postStory = () => {
   axios.post(baseUrl, {expansion: this.state.expansion, text: this.state.text}).then( response => 
      this.setState({
        storyboards: response.data,
        })
    ).catch(error => console.log( '-------postStory',error))
  }


  getUserStories = () => {
    axios.get(baseUrl).then(response => {
      this.setState({
        storyboards: response.data
      })
    }).catch(error => console.log( '-------getUserStories',error))
  }

  deleteStory = (id) => {
    axios.delete(`${baseUrl}/${id}`).then(response => {
      this.setState({
        storyboards: response.data
      })
    }).catch(error => console.log('-----deleteStory',error))
  }
  
  editStory = (id, text) => {
    axios.put(`${baseUrl}/${id}`, {text}).then(response => {
      this.setState({
        storyboards: response.data
      })
    }).catch(error => console.log('-----editStory',error))
  } 
  
  filterStory = (expansion) => {
    console.log('---expansion', expansion)
    axios.get(`${baseUrl}/search?expansion=${expansion}`).then(response => {
      this.setState({
        storyboards: response.data
      })
  }).catch(error => console.log('-----filterStory',error))
  } 
  
  pickRandomBoss = () => {
    let num = Math.floor(Math.random()* 709)
    let randomBoss = this.state.boss.filter(e => e.id === num)
    this.setState({
      randomBoss: randomBoss
    })
      console.log('randomBoss', randomBoss)
  }

  componentDidMount() {
    axios.get('https://us.api.battle.net/wow/boss/?locale=en_US&apikey=g59f3ye6npb82vwetwdhem3x6qyubd82').then(response => {
      console.log( 'response from getBoss',response)
   let bosses =  response.data.bosses.map((e,index) => {
    return {id: index,name: e.name,description: e.description ? e.description : 'None'}
    }) 
    this.setState({
      boss: bosses
    })
    console.log('bosses from external api',bosses)
    })}

  render() {
    const displayBoss = this.state.randomBoss
    console.log(displayBoss)
    // const name = displayBoss.name
    
    return (
      <div>
        <Header headerName="Why I love World of Warcraft"/>
        <Wowlist  filterStory={this.filterStory}/>
        <Header headerName="Post Your Story" />
        <div> 
        <p> Choose an expansion, then share your story</p>
        <br/>
        <div className="storyLine">
        <select onChange={(e)=> this.selectedExpansionFunc(e.target.value)}>
          <option>Vanilla</option>
          <option>Burning Crusade</option>
          <option>Wrath of the Lich King</option>
          <option>Cataclysm</option>
          <option>Mist of Pandaria</option>
          <option>Warlords of Draenor</option>
          <option>Legion</option>
        </select>
        <textarea className="storyBox" onChange={(e)=> this.changeHandler(e.target.value)} placeholder="Write your story here">
        </textarea>
        <button className="standardButton" onClick={()=>this.postStory()}> Post Story</button>
        <button className="standardButton" onClick={()=>this.getUserStories()}> Display all stories</button>
        </div>
         <div> {this.state.storyboards.map(story => 
          <Message expansion={story.expansion} id={story.id} key={story.id} text={story.text} edit={this.editStory} remove={this.deleteStory}/>)} </div>
        </div>
        <Header headerName="Boss List"/>
        <button className="bossButton" onClick={() => this.pickRandomBoss()}>Get a random boss</button>
        {this.state.randomBoss.map(e => <div className="bossPanel"><p className="bossName"> {e.name}</p> <p className="descriptionHeader">Description:</p> {e.description}</div>)}
        <ScrollUpButton/>
      </div>
    );
  }
}

export default App;
