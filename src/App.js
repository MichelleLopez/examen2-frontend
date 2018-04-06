import React, { Component}  from 'react';
import { Button, Card, Row, Col } from 'react-materialize';

class ClimateList extends React.Component {
  constructor(props) {     
    super(props);     
      this.state = {       
        climate: [],       
        newclimate: {}     
      };      
      this.handleInputChange = this.handleInputChange.bind(this);   
      this.refreshList = this.refreshList.bind(this);   
      this.handleClick = this.handleClick.bind(this);   
  }

  handleClick(event){
    const header = {
      'Content-Type' : 'application/json'
    }
    const body = {climate: this.state.newclimate}
    console.log(JSON.stringify(body))
    fetch(`https://examen2-climate-backend.herokuapp.com/climates`, {method: 'POST', headers: header, body: JSON.stringify(body)})
        .then((response) => this.refreshList())
  }

  handleInputChange(event) {
    const value = event.target.value
    const name = event.target.name
    this.state.newclimate[name]=value
  }

  refreshList(){
    fetch(`https://examen2-climate-backend.herokuapp.com/climates`).then((response)=>response.json()).then((json)=>this.setState({climate: json}))
  }

  componentDidMount() {
    this.refreshList();
  }



  render() {
    const climate = this.state.climate.sort((a, b) => (
      b.created_at - a.created_at
      ));
      const climateComponents = climate.map((climate) => (
        <Climate
          key={'climate-' + climate.id}
          id={climate.id}
          city={climate.city}
          temperature={climate.temperature}
          status={climate.status}
          created_at={climate.created_at}
        />
    ));
    return (
      <div className='ui unstackable items'>
        {climateComponents}
          <div class="row">
            <div class="input-field col s12">
              <input name="city" value={this.state.newclimate.city} onChange={this.handleInputChange} type="text" class="validate"/>
              <label class="active" for="first_name2">City</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input name="temperature" value={this.state.newclimate.temperature} onChange={this.handleInputChange} type="text" class="validate"/>
              <label class="active" for="first_name2">Temperature</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input name="status" value={this.state.newclimate.status} onChange={this.handleInputChange} type="text" class="validate"/>
              <label class="active" for="first_name2">Status</label>
            </div>
          </div>
          <a id="add" onClick={this.handleClick} class="waves-effect waves-light btn">Post</a>
        </div>
      );
  }
}
class Climate extends React.Component {
  render() {
    return (
      <div class="col s12">
        <div class="card teal lighten-2">
          <div class="card-content white-text">
            <span class="card-title"> City: {this.props.city}</span>
            <p>Temperature: {this.props.temperature}°</p>
            <p class="col s6">Status: {this.props.status}</p>
            <p class="col s6">Posted at: {this.props.created_at}</p>
          </div>
        </div>
      </div>
      
      );
  }
}

export default ClimateList;
