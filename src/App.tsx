import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos } from './actions';
import { StoreState } from './reducers';

interface AppProps {
	todos: Todo[];
	fetchTodos(): any;
}

class App extends React.Component<AppProps> {
	//Both ways are correct
	// onButtonClick(): void {
	//     console.log(this.props)
	//     this.props.fetchTodos();
	// }

	onButtonClick = (): void => {
		this.props.fetchTodos();
	};

	renderList(): JSX.Element[] {
		return this.props.todos.map((todo: Todo) => {
			return <div>{todo.title}</div>;
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.onButtonClick}>Fetch </button>
				{/* <button onClick={()=>{this.onButtonClick()}}>Fetch </button> */}
				{this.renderList()}
			</div>
		);
	}
}

const mapStateToProps = (state: StoreState) => {
	return { todos: state.todos };
};

const mapDispatchToProps = () => ({
	fetchTodos
});

export default connect(mapStateToProps, mapDispatchToProps())(App);
