import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from './actions';
import { StoreState } from './reducers';

interface AppProps {
	todos: Todo[];
	fetchTodos: Function; // there is no easy way to say that fetchTodos is thunk (types definition files)
	deleteTodo: typeof deleteTodo;
}

interface AppState {
	fetching: boolean;
}

class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = { fetching: false };
	}

	//state = { fetching: false } -> this is correct way too. Overriding state of parent class.

	//Both ways are correct
	// onButtonClick(): void {
	//     console.log(this.props)
	//     this.props.fetchTodos();
	// }

	componentDidUpdate(prevProps: AppProps) {
		// !prevProps.todos.length => prevProps.todos.length === 0
		// this.props.todos.length => this.props.todos.length > 0
		if (!prevProps.todos.length && this.props.todos.length) {
			this.setState({ fetching: false });
		}
	}

	onButtonClick = (): void => {
		this.props.fetchTodos();
		this.setState({ fetching: true });
	};

	onTodoClick = (id: number): void => {
		this.props.deleteTodo(id);
	};

	renderList(): JSX.Element[] {
		return this.props.todos.map((todo: Todo) => {
			return (
				<div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
					{todo.title}
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.onButtonClick}>Fetch </button>
				{/* <button onClick={()=>{this.onButtonClick()}}>Fetch </button> */}
				{console.log(this.state.fetching)}
				{this.state.fetching ? 'Loading' : null}
				{this.renderList()}
			</div>
		);
	}
}

const mapStateToProps = (state: StoreState) => {
	return { todos: state.todos };
};

const mapDispatchToProps = () => ({
	fetchTodos,
	deleteTodo
});

export default connect(mapStateToProps, mapDispatchToProps())(App);
