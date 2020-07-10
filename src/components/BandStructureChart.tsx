import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { IBandStructure } from '../models/BandStructure';
import Plotly, { Shape, PlotData, redraw } from 'plotly.js';
import latex2ascii from '../utils/latex2ascii';
import BandStructureTable from './BandStructureTable';

interface IProps {
    data: IBandStructure,
    setSelectedElement: Function
}

const BandStructureChart = ({data, setSelectedElement}: IProps) => {

        // band labels on xaxis
        const bandLabels: Partial<PlotData> = {
            x: data.ticks.distance
                .map((tick, i): number => data.ticks.label[i].length === 1? tick + 0.075 : tick + 0.125),
            y: data.ticks.distance.map(_ => 1),
            text: data.ticks.label.map((label): string => latex2ascii(label)),
            showlegend: false,
            mode: 'text',
        }
    
        // create series of contiguous traces for upspin and downspin
        const upspin = data.energy[0]['1'].map((_, i): Partial<PlotData> => {
            return {
                x: data.distances.flat(),
                y: data.distances.map((_, j) => data.energy[j]['1'][i]).flat(),
                type: 'scatter',
                mode: 'lines',
                marker: { color: 'red' },
                name: `Upspin ${i + 1}`
            };
        })
    
        const downspin = data.energy[0]['-1'].map((_, i): Partial<PlotData> => {
            return {
                x: data.distances.flat(),
                y: data.distances.map((_, j) => data.energy[j]['-1'][i]).flat(),
                type: 'scatter',
                mode: 'lines',
                marker: { color: 'blue' },
                name: `Downspin ${i + 1}`
            }
        });

    // opacity of watermark in plot
    const [opacity, setOpacity] = useState(0);

    // putting plot data in useState was intended to get the specific trace of an element on click
    const [plotData, setPlotData] = useState<Partial<PlotData>[]>([bandLabels, ...upspin, ...downspin]);

    // create vertical bands for plot
    const bands = data.ticks.distance.map((tick): Partial<Shape> => {
        return {
            type: 'line',
            x0: tick,
            y0: -5,
            x1: tick,
            y1: 5,
            line: {
                color: 'black',
                width: 2
            }
        };
    });

    // pass selected  element event points to parent state for display
    const handleClick = (event: any) => {
        setSelectedElement(event.points);
    }

    // add watermark to plot and then download, async required to redraw
    const handleDownloadPlot = async () => {
        setOpacity(0.15);
        await redraw('plot');
        Plotly.downloadImage('plot', {
            format: 'png',
            width: window.innerWidth,
            height: 600,
            filename: 'plot'
        });
        // hide watermark when download is complete
        setOpacity(0);
        redraw('plot')
    }

    const buttonStyle = {
        marginLeft: '50px',
        marginBottom: '20px',
    }

    return (
        <>
            <Plot
                divId="plot"
                data={plotData}
                layout={ {
                    title: 'Band Scructure',
                    width: window.innerWidth,
                    height: 600,
                    shapes: bands,
                    hovermode: 'closest',
                    xaxis: {
                        title: 'Wave Vector',
                        showticklabels: false,
                    },
                    // watermark for downloads
                    images: [{
                        source: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIcfL6fMt_2uIw_X2C_BVBd-Fd-7wA60LJ5A&usqp=CAU',
                        xref: 'paper',
                        yref: 'y',
                        xanchor: 'center',
                        yanchor: 'middle',
                        x: 0.5,
                        y: 0.5,
                        sizex: 2.5,
                        sizey: 2.5,
                        opacity: opacity,
                        layer: 'below',
                    }],
                    yaxis: {
                        title: 'E - Eғ (eV)',
                        range: [-5, 5]
                    }
                } }
                onClick={(e) => handleClick(e)}
                config={{modeBarButtonsToRemove: ['toImage']}}
            />
            <button style={buttonStyle} onClick={handleDownloadPlot}>Download Plot</button>
            <BandStructureTable data={data}></BandStructureTable>
        </>
    )
}

export default BandStructureChart;