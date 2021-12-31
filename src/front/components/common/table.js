import React, { Component } from "react";
import _ from "lodash";

class Table extends Component {

    renderCell = (item, column) => {
        if(column.content) return column.content(item);
        return _.get(item, column.path);
    };

    render() {
        const { columns, data } = this.props;
        return <React.Fragment>
            <table className="table table-hover">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.path}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item._id}>
                            {columns.map(column => <td key={column.path}>{this.renderCell(item, column)}</td>)}</tr>
                    ))}
                    {data.length===0?<tr><td className="text-center" colSpan={columns.length}>No Record Found</td></tr>: null}
                </tbody>
            </table>
        </React.Fragment>
    }

}

export default Table;
