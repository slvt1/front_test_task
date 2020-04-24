import React from 'react';
import logo from './logo.svg';
import './App.css';
import TableCard from './TableCard';

class Table extends React.Component{
  constructor(props){
    super(props);

    this.state = {data: this.props.data, clicked: []};
    this.formatDate = this.formatDate.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  handleClick = (id) => {
    this.setState(state => ({
      clicked: this.state.clicked.includes(id)? this.state.clicked.filter(i => i !== id) : [...this.state.clicked, id]
    }));
  } 
  formatDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toDateString();
  }

  sendData = () => {
    console.table(this.state.clicked
      .sort((a, b) => a - b)
      .map((d) => {return this.props.data.filter((v) => v.id === d)[0]}));
  } 


  render(){
    let tableHeader = this.state.data.filter((v, i, a) => a.indexOf(v) === i).map((d)=>{
      return d.category;
    });
    let firstRow = this.state.data
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a.date - b.date);
    

    let tableData = [...Array(tableHeader.length)].map(e => Array(firstRow.length));
    for(let i = 0; i < tableHeader.length; i++){
      for(let j = 0; j < firstRow.length; j++){
        let res = this.state.data.filter((d) => d.category === tableHeader[i])
        res = res.filter((d) => d.date === firstRow[j].date);
        if(res.length !== 0){
          tableData[i][j] = res[0];
        }else{
          tableData[i][j] = null;
        }
      }
    }

    return(
      <div className="Table">
        <table>
          <thead><tr>{["", ...tableHeader].map((d) => <th>{d}</th>)}</tr></thead>
          <tbody>
            {tableData.map((row, i) => <tr>{[this.formatDate(firstRow[i].date) , ...row.map((card_data) => {
              return card_data!==null? <td><TableCard cur_price={card_data.current_price} rec_price={card_data.recommend_price} date={card_data.date} key={card_data.id} 
              checked={this.state.clicked.includes(card_data.id)}
              onclick={this.handleClick.bind(this, card_data.id)}></TableCard></td> : <td>-</td>})]}</tr>)}
          </tbody>
          <button onClick={this.sendData}>Apply</button>
        </table>
      </div>
    );
  }
}
export default Table;
