import React from 'react'
import ReactDOM from 'react-dom'

interface AppProps {
    color: string;
}

interface AppState {
    counter: number;
}

class App extends React.Component<AppProps, AppState> {
    //state = { counter: 0 }  # we define state of App class we are not override state in React.Component

    constructor(props: AppProps){
        super(props)
        //overriding state in Component class
        this.state = {counter: 0}
    }

    onIncrement = (): void => {
        this.setState((prevState: AppState)=>({ counter: prevState.counter + 1 }))
    }

    onDecrement = (): void => {
        this.setState((prevState: AppState)=>({ counter: prevState.counter -1 }))
    }

    public render() {
        return(
            <div>
                {this.state.counter}
                <button onClick={this.onIncrement}>Increment</button>
                <button onClick={this.onDecrement}>Decrement</button>
            </div>
        )
    }
}


ReactDOM.render(<App color="red"/>, document.querySelector("#root"))