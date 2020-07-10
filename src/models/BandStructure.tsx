export interface IBandStructure {
    ticks: {
        distance: number[],
        label: string[]
    },
    distances: number[][];
    energy: {
        '1': number[][];
        '-1': number[][]
    }[]
    vbm: number[][];
    cbm: number[][];
    lattice: {
        '@module': string;
        '@class': string;
        matrix: number[][];
    }
    zero_energy: number;
    is_metal: boolean;
    band_gap: string;
}