import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from './actions';
import { StoreState } from './reducers';

interface AppProps {
	todos: Todo[];
	fetchTodos: Function; // there is no easy way to say that fetchTodos is thunk (types definition files)
	deleteTodo: typeof deleteTodo;
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
