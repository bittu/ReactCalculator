import React, { Component } from 'react';
import { 
		View,
		Text,
		AppRegistry 
	} from 'react-native';

import Style from './Style';

import InputButton from './InputButton';

const inputButtons = [
	[1, 2, 3, '/'],
	[4, 5, 6, '*'],
	[7, 8, 9, '-'],
	[0, '.', '=', '+'],
	['c', 'ce']
];

class ReactCalculator extends Component {

	constructor(props) {
		super(props);

		this.state = {
			previousInputValue: 0,
			inputValue: 0,
			selectedSymbol: null
		}

		this.state = this.initialState;
	}

	_renderInputButtons() {
		let views = [];

		for(let i = 0; i < inputButtons.length; i++) {
			let row = inputButtons[i];

			let inputRow = [];
			for(let j = 0; j < row.length; j++) {
				let input  = row[j];
				inputRow.push(
					<InputButton 
						value={input} 
						key={i + '-' + j} 
						onPress={ this._onInputButtonPressed.bind(this, input) }
						highlight={ this.state.selectedSymbol === input }/>
				)
			}
			views.push(
				<View style={ Style.inputRow } key={'row-' + i}>
					{inputRow}
				</View>
			)
		}
		return views;
	}

	_onInputButtonPressed(input) {
		switch(typeof input) {
			case 'number':
				return this._handleNumberInput(input)
			case 'string':
				return this._handleStringInput(input)
		}
	}

	_handleNumberInput(num) {
		let inputValue = (this.state.inputValue * 10) + num;

		this.setState({
			inputValue: inputValue
		})
	}

	_handleStringInput(str) {
		switch(str) {
			case '/':
			case '*':
			case '+':
			case '-':
				this.setState({
					selectedSymbol: str,
					previousInputValue: this.state.inputValue,
					inputValue: 0
				})
				break;
			case '=':
				let { selectedSymbol, inputValue, previousInputValue } = this.state;

				if(!selectedSymbol) {
					return;
				}

				this.setState({
					previousInputValue: 0,
					inputValue: eval(previousInputValue + selectedSymbol + inputValue),
					selectedSymbol: null
				})
				break;

			case 'ce':
                this.setState(this.initialState);
                    break;

            case 'c':
                this.setState({inputValue: 0});
                break;

		}
	}

	render() {
		return (
			<View style={ Style.rootContainer }>
				<View style={ Style.displayContainer }>
					<Text style={ Style.displayText }>
						{ this.state.inputValue }
					</Text>
				</View>
				<View style={ Style.inputContainer }>
					{this._renderInputButtons()}
				</View>
			</View>
		)
	}
}

AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);