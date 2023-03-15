export const reverse = (array) => {
    let reverse = [];
    for (let i = array.length - 1; i >= 0; i--) reverse.push(array[i]);
    return reverse;
}

export const flatten = (map) => Array.from(map);

export const coordinatesDistance = (a: number[], b: number[]) => {
    return Math.acos(Math.sin(a[0]) * Math.sin(b[0]) + Math.cos(a[0]) * Math.cos(b[0]) * Math.cos(b[1] - a[1])) * 6371;
};