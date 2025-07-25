import type { MaskitoOptions } from '@maskito/core';
import {
  maskitoNumberOptionsGenerator,
  MaskitoNumberParams,
} from '@maskito/kit';

export const BRLMaskParams: MaskitoNumberParams = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  decimalSeparator: ',',
  thousandSeparator: '.',
  prefix: 'R$ ',
  min: 0,
};

/**
 * Exemplo de outra máscara — BRL sem entrada reversa
 * usando maskitoNumberOptionsGenerator
 */
export const maskitoBrlNormalMask: MaskitoOptions =
  maskitoNumberOptionsGenerator(BRLMaskParams);

/**
 * Exemplo de máscara para dólar (USD)
 */
export const maskitoUsdMask: MaskitoOptions = maskitoNumberOptionsGenerator({
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  decimalSeparator: '.',
  thousandSeparator: ',',
  prefix: '$ ',
  min: 0,
});

export const TELEFONE_MASK: MaskitoOptions = {
  mask: [
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d?/,
    /\d?/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
};

export const CEP_MASK: MaskitoOptions = {
  mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
};

export const CNPJ_MASK: MaskitoOptions = {
  mask: [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
};