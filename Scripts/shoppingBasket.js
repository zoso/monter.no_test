
var AllItems = React.createClass({
	buildRows: function() {
		var rows = [];
		var onQtyChanged = this.props.onQtyChanged;
		var onRemoveItem = this.props.onRemoveItem;
		var x = 0;
		this.props.items.forEach(function(cartItem) {
			rows.push(<ShoppingItem key={cartItem.id} id={x} info={cartItem.info} price={cartItem.price} qty={cartItem.qty} onQtyChanged={onQtyChanged} onRemoveItem={onRemoveItem} />);
			x++;
		});
		return rows;
	},

	render: function() {
		return (
			<tbody>
				{this.buildRows()}
			</tbody>
		)
	}
});

var ShoppingItem = React.createClass({
	getTotal: function() {
		return Number(this.props.price * this.props.qty).toFixed(2);
	},
	render: function() {
		return (
			<tr>
			<td>{this.props.info} {this.props.id}</td>
			<td>{this.props.price}</td>
			<td>
				<button type={"button"} className={"btn btn-subtract"} onClick={this.props.onQtyChanged.bind(null, this.props.id, 'subtract')}>-</button>
				<input id="number-stepper-value" step="1" name="" value={this.props.qty} min="0" max="100" role="alert" aria-live="assertive" pattern="[0-9]*" type="text" />
				<button type={"button"} className={"btn btn-add"} onClick={this.props.onQtyChanged.bind(null, this.props.id, 'add')}>+</button>
			</td>
            <td>{this.getTotal()}</td>
			<td>
				<button type={"button"} onClick={this.props.onRemoveItem.bind(null, this.props.id)} >X</button>
			</td>
			</tr>
		)
	}
});

var ShoppingBasket = React.createClass({
	loadData: function() {
		$.ajax({
		      url: this.props.url,
		      dataType: 'json',
		      cache: false,
		      success: function(data) {
		        this.setState({data});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		    });
	},
	getInitialState: function() {
   		return {items};
  	},
  	componentDidMount: function() {
 		this.loadData();
  	},
  	handleQtyChanged: function(cartItemIndex, direction) {
  		console.log("handleQtyChanged ", cartItemIndex);
	    if (direction === 'add') {
	      items[(cartItemIndex)].qty++;
	    } else {
	      items[(cartItemIndex)].qty--;
	    }
	    this.setState({data: items});
	},
	removeItem: function(id) {
		var items = this.state.items;
		items.splice(id, 1);
		this.setState({items});
	},
	render: function() {
		return (
			<table className={"simple"}>
			<thead>
				<tr>
				<th>Vare</th>
				<th>Pris</th>
				<th>Antall</th>
				<th>Total</th>
				<th></th>
			</tr>
			</thead>
				<AllItems items={this.state.items} onQtyChanged={this.handleQtyChanged} onRemoveItem={this.removeItem} />
			</table>
		)
	}
});

ReactDOM.render(<ShoppingBasket url="http://localhost:3000/Scripts/basket.json" />, document.getElementById("shoppingBasket"));