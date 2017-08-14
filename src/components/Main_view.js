import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import { addComponent } from '../actions/index';

import RenderComponent from './Render_component';
import ComponentResult from './Component_result';

class MainView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			term: "",
			validation: null
		};
	}

	onInputChange(event) {
		this.setState({
			term: event.target.value
		});
	}

	onFormSubmit(event) {
		event.preventDefault();

		let term = this.state.term.trim();
		let hasDuplicates = false;
		
		if(term === "") {
			this.setState({
				term: "",
				validation: "error"
			});
			return;
		}

		for (let i = 0; i < this.props.componentList.length; i++) {
			if (term === this.props.componentList[i].name) {
				this.setState({
					term: "",
					validation: "error"
				});
				return;
			}
		}

		this.props.addComponent(term);
		this.setState({
			term: "",
			validation: null
		});
	}

	render() {
		return(
			<div>
				<Row>
					<Col md={12}>
						<Form inline onSubmit={this.onFormSubmit.bind(this)}>
							<FormGroup 
								controlId="formComponentName"
								validationState={this.state.validation}>
								<ControlLabel>
									Enter a Component Name!
								</ControlLabel>
								<FormControl 
									type="text"
									placeholder="Enter Component Name"
									value={this.state.term}
									onChange={this.onInputChange.bind(this)}
								/>
							</FormGroup>
							<Button 
								type="button"
								onClick={this.onFormSubmit.bind(this)}>
								Add
							</Button>
						</Form>
					</Col>
					<Col md={12}>
						<RenderComponent />
					</Col>
					<Col md={12}>
						<ComponentResult />
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { 
		componentList: state.component.componentList 
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ addComponent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);