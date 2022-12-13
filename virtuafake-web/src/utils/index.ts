
export function invertColor(hex: string, bw: boolean) {
    function padZero(str: string, len: number = 2) {
        let zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    } else {
        // invert color components
        let hexr = (255 - r).toString(16),
            hexg = (255 - g).toString(16),
            hexb = (255 - b).toString(16);
        // pad each with zeros and return
        return "#" + padZero(hexr) + padZero(hexg) + padZero(hexb);
    }
}


export function windowFilter(array: Array<number>, size: number) : Array<number> {
    if (size <= 1 || size >= array.length) {
        return [...array]
    } else {
        let total = 0;
        let idx
        let result = []
        for (idx = 0; idx < size; idx += 1) {
            total += array[idx]
        }
        result.push(total/size)
        for (; idx < array.length; idx += 1) {
            total -= array[idx-size]
            total += array[idx]
            result.push(total/size)
        }
        return result
    }
}

export function padStart(array: Array<number>, size:number, value: number = 0) : Array<number> {
    array.unshift(...(new Array(size)).fill(value))
    return array
}

export function padEnd(array: Array<number>, size:number, value: number = 0) : Array<number> {
    array.push(...(new Array(size)).fill(value))
    return array
}