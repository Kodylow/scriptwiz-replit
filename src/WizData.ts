const MAX_INTEGER = 2147483647;
const binFixBytes = (bin: string): string => (bin.length % 8 === 0 ? bin : bin.padStart(Math.ceil(bin.length / 8) * 8, "0"));

const validBin = (bin: string): boolean => !/[^01]/u.test(bin) && bin.length % 8 === 0;

const binToBinBytes = (bin: string): string[] => {
    if (!validBin(bin)) throw "binToBinBytes: invalid bin string";
    const matches: RegExpMatchArray | null = bin.match(/.{1,8}/g);
    if (matches === null) return [];
    return matches.map((match: string) => match);
};

const binToByte = (bin: string): number => parseInt(bin, 2);

const binToBytes = (bin: string) =>
    Uint8Array.from(
        binToBinBytes(bin)
            .reverse()
            .map((binByte) => binToByte(binByte))
    );

import { bytesToBin, bytesToHex, bytesToNumber } from "./wizdata/bytes";
import { hexToBytes } from "./wizdata/hex";
import { numberToBytes } from "./wizdata/number";
import { stringToBytes } from "./wizdata/string";

export class WizData {
    input: string | number | Uint8Array;

    bytes: Uint8Array;
    bin: string;
    hex: string;

    number?: number;
    text?: string;

    label?: string;

    private constructor(hex?: string, bin?: string, number?: number, text?: string, bytes?: Uint8Array) {
        let inputVal: string | number | Uint8Array = "";
        let bytesVal: Uint8Array = new Uint8Array([]);
        let binVal: string = "";
        let hexVal: string = "";

        let numberVal: number | undefined = undefined;
        let textVal: string | undefined = undefined;

        // fromHex
        if (hex !== undefined) {
            inputVal = "0x" + hex;
            bytesVal = hexToBytes(hex);
            binVal = bytesToBin(bytesVal);
            hexVal = hex;
            numberVal = bytesToNumber(bytesVal);
            // textVal = bytesToString(bytesVal); // TODO get from stack cache
        }

        // fromBin
        else if (bin !== undefined) {
            inputVal = "0b" + bin;
            bytesVal = binToBytes(bin);
            binVal = bin;
            hexVal = bytesToHex(bytesVal);
            numberVal = bytesToNumber(bytesVal);
            // textVal = bytesToString(bytesVal); // TODO get from stack cache
        }

        // fromNumber
        else if (number !== undefined) {
            inputVal = number;
            bytesVal = numberToBytes(number);
            binVal = bytesToBin(bytesVal);
            hexVal = bytesToHex(bytesVal);
            numberVal = number;
            // textVal = bytesToString(bytesVal); // TODO get from stack cache
        }

        // fromText
        else if (text !== undefined) {
            inputVal = text;
            bytesVal = stringToBytes(text);
            binVal = bytesToBin(bytesVal);
            hexVal = bytesToHex(bytesVal);
            numberVal = bytesToNumber(bytesVal);
            textVal = text;
        }

        // fromBytes
        else if (bytes !== undefined) {
            inputVal = bytes;
            bytesVal = bytes;
            binVal = bytesToBin(bytesVal);
            hexVal = bytesToHex(bytes);
            numberVal = bytesToNumber(bytesVal);
            // textVal = bytesToString(bytesVal); // TODO get from stack cache
        }

        // set props
        this.input = inputVal;
        this.bytes = bytesVal;
        this.bin = binVal;
        this.hex = hexVal;
        if (numberVal !== undefined && -MAX_INTEGER <= numberVal && numberVal <= MAX_INTEGER) this.number = numberVal;
        this.text = textVal;
    }

    public static fromHex(hex: string): WizData {
        return new WizData(hex, undefined, undefined, undefined, undefined);
    }

    public static fromBin(bin: string): WizData {
        return new WizData(undefined, bin, undefined, undefined, undefined);
    }

    public static fromNumber(number: number): WizData {
        return new WizData(undefined, undefined, number, undefined, undefined);
    }

    public static fromText(text: string): WizData {
        return new WizData(undefined, undefined, undefined, text, undefined);
    }

    public static fromBytes(bytes: Uint8Array): WizData {
        return new WizData(undefined, undefined, undefined, undefined, bytes);
    }
}