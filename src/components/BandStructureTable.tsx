import React from 'react';
import '../Tables.css';
import { IBandStructure } from '../models/BandStructure';

interface IProps {
    data: IBandStructure
}

const BandStructureTable = ({data}: IProps) => {
    return (
        <table className="table">
            <thead>
                <tr className="thead-row">
                    <td colSpan={2}>
                        Band Structure Properties
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="table-row">
                    <td width="50%">Metal</td>
                    <td width="50%">{data.is_metal.toString()}</td>
                </tr>
                <tr className="table-row">
                    <td width="50%">Fermi Energy</td>
                    <td width="50%">{data.zero_energy} eV</td>
                </tr>
                <tr className="table-row">
                    <td width="50%">VBM</td>
                    <td width="50%">{JSON.stringify(data.vbm)}</td>
                </tr>
                <tr className="table-row">
                    <td width="50%">CBM</td>
                    <td width="50%">{JSON.stringify(data.cbm)}</td>
                </tr>
                <tr className="table-row">
                    <td width="50%">Lattice Module</td>
                    <td width="50%">{data.lattice['@module']}</td>
                </tr>
                <tr className="table-row">
                    <td width="50%">Lattice Class</td>
                    <td width="50%">{data.lattice['@class']}</td>
                </tr>
                <tr className="table-row">
                    <td width="50%">Lattice Matrix</td>
                    <td width="50%">{JSON.stringify(data.lattice.matrix)}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default BandStructureTable;