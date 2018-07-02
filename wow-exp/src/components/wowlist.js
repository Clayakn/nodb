import React, { Component } from 'react';
import './wowlist.css'; 
import VanillaWowLogo from '../image/Vanilla_wow_logo.png'
import BCWowLogo from '../image/BC_wow_logo.png';
import WotLKWowLogo from '../image/WotLK_wow_logo.png';
import CataclysmWowLogo from '../image/Cataclysm_wow_logo.png';
import MoPWowLogo from '../image/MoP_wow_logo.png';
import WoDWowLogo from '../image/WoD_wow_logo.png';
import LegionWowLogo from '../image/Legion_wow_logo.jpeg';
import Button from './button';


class Wowlist extends Component {
    render() {
      return (
        <div className="App">
        <div className="container">
            <ul className="accordion">
              <li className="tab">
                <div className="social vanilla">
                <a rel="noopener noreferrer" href="https://worldofwarcraft.com/en-us/" 
                  target='_blank'>Wow</a>
                </div>
                <div className="content">
                  <h1>World of Warcraft: Classic</h1>
                  <Button className="vanillaButton"input='Vanilla' action={this.props.filterComment} buttonName={'Filter Vanilla Comment'}/>
                  <img src={VanillaWowLogo} alt="Vanilla world of warcraft logo"/>
                </div>
              </li>
              <li className="tab">
                <div className="social crusade">
                  <a target='_blank'>BC</a>
                </div>
                <div className="content">
                <img src={BCWowLogo} alt="Burning Crusade world of warcraft logo"/>
                  <h1>World of Warcraft: The Burning Crusade</h1>
                  <Button className="bcButton"input='Burning Crusade' action={this.props.filterComment}  buttonName={'Filter BC Comment'}/>
                </div>
              </li>
              <li className="tab">
                <div className="social wrath">
                  <a target='_blank'>Wotlk</a>
                </div>
                <div className="content">
                <img src={WotLKWowLogo} alt="Wrath of the Lich King world of warcraft logo"/>
                  <h1>World of Warcraft: Wrath of the Lich King</h1>
                  <Button className="wrathButton"input='Wrath of the Lich King' action={this.props.filterComment}  buttonName={'Filter WotLK Comment'}/>
                </div>
              </li>
              <li className="tab">
                <div className="social cata">
                  <a target='_blank'>Cata</a>
                </div>
                <div className="content">
                <img src={CataclysmWowLogo} alt="Cataclysm world of warcraft logo"/>
                  <h1>World of Warcraft: Cataclysm</h1>
                  <Button className="cataButton" input='Cataclysm' action={this.props.filterComment}  buttonName={'Filter Cata Comment'}/>
                </div>
              </li>
              <li className="tab">
                <div className="social pandaria">
                  <a target='_blank'>MoP</a>
                </div>
                <div className="content">
                <img src={MoPWowLogo} alt="Mist of Pandaria world of warcraft logo"/>
                  <h1>World of Warcraft: Mist of Pandaria</h1>
                  <Button className="mopButton" input='Mist of Pandaria' action={this.props.filterComment}  buttonName={'Filter MoP Comment'}/>
                </div>
              </li>
              <li className="tab">
                <div className="social warlords">
                  <a target='_blank'>WoD</a>
                </div>
                <div className="content">
                <img src={WoDWowLogo} alt="Warlords of Draenor world of warcraft logo"/>
                  <h1>World of Warcraft: Warlords of Draenor</h1>
                  <Button className="wodButton" input='Warlords of Draenor' action={this.props.filterComment}  buttonName={'Filter WoD Comment'}/>
                </div>
              </li>
              <li className="tab">
                <div className="social legion">
                  <a target='_blank'>Legion</a>
                </div>
                <div className="content">
                <img src={LegionWowLogo} alt="Legion world of warcraft logo"/>
                  <h1>World of Warcraft: Legion</h1>
                  <Button className="legionButton" input='Legion' action={this.props.filterComment}  buttonName={'Filter Legion Comment'}/>
                </div>
              </li>
            </ul>
        </div>
      </div>
      );
    }
  }
  
  export default Wowlist;