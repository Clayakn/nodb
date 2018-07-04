import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Wowlist from './components/wowlist/wowlist';
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
 // Sets state of expansion 
  selectedExpansionFunc = (expansion) => {
    console.log('--------selectedExpansionFunc(expansion)', expansion)
    this.setState({
      expansion: expansion
    })
  }
  // Sets state of text
  changeHandler = (text) => {
    console.log('--------changeHandler(text)', text)
    this.setState({
      text: text
    })
  }
  // Post story with changed text + expansion
  postStory = () => {
   axios.post(baseUrl, {expansion: this.state.expansion, text: this.state.text}).then( response => 
      this.setState({
        storyboards: response.data,
        })
    ).catch(error => console.log( '-------postStory',error))
  }
  // Display all stories from server
  getUserStories = () => {
    axios.get(baseUrl).then(response => {
      this.setState({
        storyboards: response.data
      })
    }).catch(error => console.log( '-------getUserStories',error))
  }
  // Delete story from server based on given id
  deleteStory = (id) => {
    axios.delete(`${baseUrl}/${id}`).then(response => {
      this.setState({
        storyboards: response.data
      })
    }).catch(error => console.log('-----deleteStory',error))
  }
  // Edit story from server based on given id with given text
  editStory = (id, text) => {
    axios.put(`${baseUrl}/${id}`, {text}).then(response => {
      this.setState({
        storyboards: response.data
      })
    }).catch(error => console.log('-----editStory',error))
  } 
  // Filter stories from server based on given expansion
  filterStory = (expansion) => {
    axios.get(`${baseUrl}/search?expansion=${expansion}`).then(response => {
      this.setState({
        storyboards: response.data
      })
  }).catch(error => console.log('-----filterStory',error))
  } 
  // Randomly picks number based on array boss length then filters based on random number
  pickRandomBoss = () => {
    let num = Math.floor(Math.random()* this.state.boss.length)
    let randomBoss = this.state.boss.filter(e => e.id === num)
    this.setState({
      randomBoss: randomBoss
    })
      console.log('randomBoss', randomBoss)
  }
  // Gets bosses from external API and puts them into boss array
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
    return (
      <div>
        <Header headerName="Why I love World of Warcraft"/>
        <Wowlist  filterStory={this.filterStory}/>
        <Header headerName="Post Your Story" />
        <h3> Choose an expansion, then share your story </h3>
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
          <button className="standardButton" onClick={()=>this.getUserStories()}> Display all Stories</button>
        </div>
         {this.state.storyboards.map(story => 
          <Message expansion={story.expansion} id={story.id} key={story.id} text={story.text} edit={this.editStory} remove={this.deleteStory}/>)} 
        <Header headerName="Boss List"/>
        <button className="bossButton" onClick={() => this.pickRandomBoss()}>Get a random boss</button>
        {this.state.randomBoss.map(e => <div className="bossPanel"><p className="bossName"> {e.name}</p> <p className="bossDescriptionHeader">Description:</p> {e.description}</div>)}
        <Header headerName="Favorite Boss List"/>
        <ScrollUpButton/>
      </div>
    );
  }
}

export default App;
