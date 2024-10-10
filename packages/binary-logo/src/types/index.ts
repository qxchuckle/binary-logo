export * from './draw';

// 每个渲染单元信息
export interface RenderItemType {
  color: string; // 颜色
  opacity: number; // 透明度 0-1
  render: boolean; // 是否渲染
}

// 渲染数据
export type RenderDataType = RenderItemType[][];

// 二进制数据
export type BinaryDataType = string[];
