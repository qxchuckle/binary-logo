import * as QxCanvas from 'qx-canvas';
import { BinaryDataType, DrawLogoOptionsType, RenderDataType } from './types';
import { stringToBinary } from '@qx/utils';

// Canvas上画Logo
export class DrawLogo {
  private logoName: string; // Logo名称
  private options: DrawLogoOptionsType = {
    invertBit: false,
    bitLength: 8,
    scale: 1,
  }; // 配置项
  private canvas: QxCanvas.App; // QXCanvas实例
  private renderData: RenderDataType = []; // 渲染数据
  private binaryData: BinaryDataType = []; // 二进制数据

  /**
   * 构造函数
   * @param el 画布元素
   * @param logoName Logo名称
   */
  constructor(
    el: string | HTMLCanvasElement,
    logoName: string,
    options?: Partial<DrawLogoOptionsType>,
  ) {
    this.logoName = logoName;
    this.options = { ...this.options, ...options };
    // 创建QXCanvasApp实例
    const canvas =
      typeof el === 'string'
        ? (document.querySelector(el)! as HTMLCanvasElement)
        : el;
    this.canvas = new QxCanvas.App({
      canvas,
    });
    // 初始化
    this.init();
    // 渲染
    this.render();
  }

  /**
   * 初始化
   */
  init() {
    // 将Logo名称转换为二进制数据
    this.binaryData = stringToBinary(this.logoName, this.options);
    this.binaryToRenderData();
  }

  /**
   * 二进制数据转换为渲染数据
   */
  binaryToRenderData() {
    this.renderData = this.binaryData.map((binary) => {
      return binary.split('').map((bit) => {
        return {
          color: bit === '1' ? '#000000' : '#FFFFFF',
          opacity: 1,
          render: true,
        };
      });
    });
  }

  /**
   * 渲染
   */
  render() {
    const box = {
      width: 10,
      height: 10,
    };
    let x = 0;
    let y = 0;
    const grid = new QxCanvas.Graphics();
    this.canvas.stage.add(grid);
    this.canvas.resize(
      this.renderData[0].length * box.width * this.options.scale,
      this.renderData.length * box.height * this.options.scale,
    );
    this.canvas.stage.setScale(this.options.scale, this.options.scale);
    this.renderData.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        grid
          .beginFill({
            color: item.color,
          })
          .drawRect(x, y, box.width, box.height)
          .endFill();
        x += box.width;
      });
      x = 0;
      y += box.height;
    });
  }
}
