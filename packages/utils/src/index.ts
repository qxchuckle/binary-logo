export * from './functionControlUtils';

/**
 * 将字符串转换为二进制数组
 * @param str 字符串
 * @param options 配置项
 * @param options.invertBit 是否反转位
 * @param options.bitLength 二进制长度，不足的高位补 0，超过高位截断
 * @returns
 */
export function stringToBinary(
  str: string,
  options: {
    invertBit?: boolean;
    bitLength?: number;
  } = { invertBit: false },
): string[] {
  const { invertBit, bitLength } = options;
  let finalBitLength = bitLength;
  // 如果没有指定 bitLength 则使用最大二进制长度
  if (!finalBitLength) {
    // 找到字符串中字符的最大二进制长度
    const maxBitLength = Math.max(
      ...str.split('').map((char) => char.charCodeAt(0).toString(2).length),
    );
    finalBitLength = maxBitLength;
  }

  return str.split('').map((char) => {
    let binaryString = char.charCodeAt(0).toString(2);
    // 如果二进制字符串长度超过指定的 bitLength，则进行高位截断
    if (binaryString.length > finalBitLength) {
      // 截取保留后面的 bitLength 位，也就是保留低位丢弃高位
      binaryString = binaryString.slice(-finalBitLength);
    }
    // 位反转
    if (invertBit) {
      binaryString = [...binaryString]
        .map((bit) => (bit === '1' ? '0' : '1'))
        .join('');
    }
    return binaryString.padStart(finalBitLength, invertBit ? '1' : '0');
  });
}
