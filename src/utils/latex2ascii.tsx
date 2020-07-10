// super duper efficient O(1) lookup for LaTeX characters

export default function latex2ascii(symbol: string): string {
    switch(symbol) {
        case '$\\Gamma$':
            return 'Γ';
        case '$B_1$$\\mid$B':
            return '𝘉₁|B';
        case 'X$\\mid$Q':
            return 'X|Q';
        case '$P_1$':
            return 'P₁';
        case 'Z$\\mid$L':
            return 'Z|L'
        default:
            return symbol;
    }
}