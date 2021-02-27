import React, { Component } from 'react';

type UnitRenewalHistory = {
	date: string;
	list: string[];
};

type RenewalHistory = UnitRenewalHistory[];

export default class extends Component {
	render() {
		const renewalData = require(`${process.env.DOCUMENT_PATH}/renewal_history.json`) as RenewalHistory;
		return renewalData.map((unitData) => {
			return (<div key={unitData.date}>
				<hr />
				{ unitData.date }
				<ul >
					{ unitData.list.map((data, index) => 
						<li key={index}>{data}</li>
					)}
				</ul>
			</div>);
		});
	}
}
