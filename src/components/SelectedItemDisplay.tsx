import React from 'react';
import '../Tables.css';

const SelectedItemDisplay = ({itemData}: any) => {
    return(
        <>
            <h3 style={{marginLeft: '20px'}}>Last Selected Element: </h3>
            <table className="table" cellSpacing="0">
                <thead>
                    <tr className="thead-row">
                        <th>Curve number</th>
                        <th>Point Index</th>
                        <th>Point Number</th>
                        <th>X</th>
                        <th>Y</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemData.map((item: any) => (
                            <tr key={item.curveNumber} className="table-row">
                                <td>{item.curveNumber}</td>
                                <td>{item.pointIndex}</td>
                                <td>{item.pointNumber}</td>
                                <td>{item.x}</td> 
                                <td>{item.y}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default SelectedItemDisplay;