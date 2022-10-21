export function padTo2Digits(number: number): string {
    return number.toString().padStart(2, '0');
}
