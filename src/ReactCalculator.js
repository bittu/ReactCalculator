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
	[0, '.', '=', '+']
];

class ReactCalculator extends Component {

	_renderInputButtons() {
		let views = [];

		for(let i = 0; i < inputButtons.length; i++) {
			let row = inputButtons[i];

			let inputRow = [];
			for(let j = 0; j < row.length; j++) {
				let input  = row[j];
				inputRow.push(
					<InputButton value={input} key={i + '-' + j} />
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

	render() {
		return (
			<View style={ Style.rootContainer }>
				<View style={ Style.displayContainer }></View>
				<View style={ Style.inputContainer }>
					{this._renderInputButtons()}
				</View>
			</View>
		)
	}
}

AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);