import React, { Component } from 'react';
import './comment.css';
import IoEdit from 'react-icons/lib/io/edit';
import IoTrashA from 'react-icons/lib/io/trash-a';

export default class Comment extends Component {
    constructor(props){
    super(props);
    this.state = {
        editting: false,
        text: props.text
      }
      this.changeHandle = this.changeHandle.bind( this );
      this.edit = this.edit.bind( this );
    }

    changeHandle = (event) => {
        this.setState({
            text: event.target.value,
            expansion: this.props.expansion
        })
    }

    edit( event ) {
        console.log('this.state.Comment')
        let {text} = this.state; 
        console.log('this.props.Comment',this.props)
        let {id, edit} = this.props;
        if( event.key === "Enter" && this.state.text.length !== 0 ) {
          edit(id, text);
          this.setState({ editting: false });
        }
    }

      render() {
        const { id, text, remove, expansion} = this.props;
        console.log('----this.props',this.props)
        const { editting } = this.state;
        return (
          <div>
            {
              editting
              ?
                <input className="Message__input" value={ this.state.text } onChange={ this.changeHandle } onKeyPress={this.edit}/>
              :
                <span className="Message__text">{expansion}: {text}</span>
            }
            <span className="Message__edit" onClick={ () => this.setState({ editting: !this.state.editting, text}) } onKeyPress={this.edit}> <IoEdit/> </span>
            <span className="Message__delete" onClick={ () => remove( id ) }> <IoTrashA/> </span>
          </div>
        )
      }
}