import React, { Component } from 'react';

import Vivus from 'vivus';
import svg from '../images/logo_stroke.svg';

// import Loading from Utils/loading
// parametres : height ='px'
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: true,
      ready: false,
    };
  }

  componentDidMount() {
    this.setState({ ready: true });
  }


  render() {
    if (this.state.ready) {
      if (this.state.started) {
        this.setState({ started: false });
        const myVivus = new Vivus('my-svg',
          {
            type: 'delayed',
            duration: 150,
            animTimingFunction: Vivus.EASE,
          },
          () => {
            this.setState({ started: true });
          });
      }
    }


    return (
      <div className="AdminNav">
        <object id="my-svg" type="image/svg+xml" data={svg} style={{ height: this.props.height }} />

      </div>

    );
  }
}

export default Loading;
