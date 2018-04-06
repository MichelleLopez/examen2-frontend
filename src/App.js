import React, { Component}  from 'react';

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
      b.temperature - a.temperature
      ));
      const climateComponents = climate.map((climate) => (
        <Climate
          key={'climate-' + climate.id}
          id={climate.id}
          city={climate.city}
          temperature={climate.temperature}
          status={climate.status}
        />
    ));
    return (
      <div className='ui unstackable items'>
      {climateComponents}
      city
      <input name="city" value={this.state.newclimate.city} onChange={this.handleInputChange}/>
      temperature
      <input name="temperature" value={this.state.newclimate.temperature} onChange={this.handleInputChange}/>
      status
      <input name="status" value={this.state.newclimate.status} onChange={this.handleInputChange}/>
      <button onClick={this.handleClick}>Submit</button>
      </div>
      );
  }
}
class Climate extends React.Component {
  render() {
    return (
      <div className='item'>
        <div className='city'>
            <h2>
              {this.props.city}
            </h2>
          </div>
          <div className='temperature'>
            <p>
              {this.props.temperature}
            </p>
          </div>
          <div className='status'>
            <p>
              {this.props.status}
            </p>
          </div>
      </div>
      );
  }
}

export default ClimateList;
