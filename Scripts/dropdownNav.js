var DropDownItem = React.createClass({
	render: function() {
		return (
			<li className={"page-navigation-dropdown-item"}>
				<a href="#">Some dropdown shit</a>
			</li>
		)
	}
});

var MenuItem = React.createClass({
	getInitialState: function() {
		return { open: ''};
	},

	toggleDropDown: function(e) {
		console.log("toggle ", this.state.open);
		if (this.state.open === '') {
			this.setState({open: 'is-open'});
		} else {
			this.setState({open: ''});
		}
		//this.setState({open: this.state.open === '' ? '})
	},
	render: function() {
		var ddCN = "page-navigation-dropdown " + this.state.open;
		return (
				<li className={"page-navigation-item"}>
					<a href="#" onClick={this.toggleDropDown}>Some shit</a>
					<ul className={ddCN}>
						<DropDownItem></DropDownItem>
						<DropDownItem></DropDownItem>
						<DropDownItem></DropDownItem>
						<DropDownItem></DropDownItem>
						<DropDownItem></DropDownItem>
					</ul>
				</li>
		)
	}
});

var MainMenu = React.createClass({
	render: function() {
		return (
			<ul className={"page-navigation-list"}>
			<MenuItem></MenuItem>
			<MenuItem></MenuItem>
			<MenuItem></MenuItem>
			<MenuItem></MenuItem>
			<MenuItem></MenuItem>
			</ul>
		)
	}
});

ReactDOM.render(<MainMenu />, document.getElementById("main-nav"));