import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      secondsLeft: 10,
      timer_id: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let timerID;
    if(prevState.pokeInfo !== this.state.pokeInfo){
      if(this.state.timer_id) clearInterval(this.state.timer_id);
      console.log("changed");
      this.setState({secondsLeft: 10});
      timerID = setInterval(() => this.tick(), 1000)
      this.setState({timer_id: timerID})
    }

    if(this.state.secondsLeft === 0){
      console.log("got to 0")
      clearInterval(this.state.timer_id);
    }
  }

  tick = () => this.setState({secondsLeft: this.state.secondsLeft - 1});



  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Seconds Left: {this.state.secondsLeft}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} style={this.state.secondsLeft>0 ? {filter:'brightness(0%)'} : {filter:'brightness(100%)'}} alt="" />
          <h1 className={'pokeName'}>{this.state.secondsLeft>0 ? null : this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;