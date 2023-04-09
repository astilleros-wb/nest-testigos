import { Transaction } from "../../../common/enums";

export enum TransactionFotocasa {
    compraventa = 'comprar',
    alquiler = 'alquiler',
    compartir = 'compartir',
    //opcion_compra =  'opcion_compra' // AS EXTRA FEATURE
}

export const transactionCodeToCode: { [key: number]: Transaction } = {
    1: Transaction.compraventa, 
    3: Transaction.alquiler,
}  

export const transactionToCode: { [key: string]: Transaction } = {
    'comprar': Transaction.compraventa, 
    'alquilar': Transaction.alquiler,
    'compartir': Transaction.compartir,
}  

export const codetoTransaction: { [key: number]: TransactionFotocasa } = {
    0: TransactionFotocasa.compraventa, 
    1: TransactionFotocasa.alquiler,
    4: TransactionFotocasa.compartir
}