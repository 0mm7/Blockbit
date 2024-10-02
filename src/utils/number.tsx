import React from "react";

export function getReadableSmallNumber(small_number: number, length = 15) {
  if (isNaN(small_number)) {
    return 0;
  }

  let i = 0
  for (; i < length; i++) {
    if (small_number === parseFloat(Number(small_number).toFixed(i))) {
      return Number(small_number).toFixed(i);
    }
  }

  return Number(small_number).toFixed(i);
}

export function getReadableBigNumber(big_number: number) {
  if (big_number == Math.pow(10, 9)) {
    return `1.0 B`;
  }

  if (big_number > Math.pow(10, 9)) {
    const small_number = (big_number / Math.pow(10, 9)).toFixed(3);
    return `${small_number} B`;
  }

  if (big_number == Math.pow(10, 6)) {
    return `1.0 M`;
  }

  if (big_number > Math.pow(10, 6)) {
    const small_number = (big_number / Math.pow(10, 6)).toFixed(3);
    return `${small_number} M`;
  }

  if (big_number == Math.pow(10, 3)) {
    return `1.0 K`;
  }

  if (big_number > Math.pow(10, 3)) {
    const small_number = (big_number / Math.pow(10, 3)).toFixed(3);
    return `${small_number} K`;
  }

  return big_number;
}

export function coloriseValue(label: string, value: number, showSign = true, threshold: number = 0, direction: boolean = true) {
  if (value == threshold) {
    return label;
  }

  const sign = showSign ? (value > 0) ? '+' : '' : '';
  const signedLabel = `${sign}${label}`;

  if (direction) {
    if (value > threshold) {
      return <span className="text-positive">{signedLabel}</span>;
    }

    return <span className="text-negative">{signedLabel}</span>;
  } else {
    if (value < threshold) {
      return <span className="text-positive">{signedLabel}</span>;
    }

    return <span className="text-negative">{signedLabel}</span>;
  }
}

export function coloriseValueRange(
  label: string,
  value: number,
  min: number = 0,
  max: number = 0,
  show_sign: boolean = false
) {
  const sign = value > 0 ? '+' : '';
  const show_label = show_sign ? sign + label : label;
  
  if (value >= min && value <= max) {
    return <span className="text-positive">{show_label}</span>;
  }

  return <span className="text-negative">{show_label}</span>;
}
