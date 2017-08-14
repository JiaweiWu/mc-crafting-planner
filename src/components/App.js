import React, { Component } from 'react';
import { Button, Row, Col, Grid } from 'react-bootstrap';

import MainView from './Main_view';
import Sidebar from './Sidebar';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import style from '../style/style.css';

class App extends Component {

	render() {
		return (
			<div>
				<Grid fluid={false}>
					<Row>
						<Col md={3}>
							<Sidebar />
						</Col>
						<Col md={9}>
							<MainView />
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(App);
