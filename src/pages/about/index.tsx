import * as React from "react";

interface IProps {}
interface IState {
  x: number;
}

class About extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      x: 1,
    };
  }

  onAdd() {
    this.setState({ x: this.state.x + 1 });
  }

  render() {
    return (
      <div className=''>
        <div className=''>About</div>
        <button onClick={() => this.onAdd()}>{this.state.x}</button>
      </div>
    );
  }
}

export default About;
