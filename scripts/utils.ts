import { join } from 'node:path';

/** 以根目录为基础解析路径 */
export const fromRoot = (...paths: string[]) => join(__dirname, '..', ...paths);

/** 包的目录 */
export const PKGS_DIR = fromRoot('packages');

/** 包的 d.ts 产物目录 */
export const PKGS_DTS_DIR = fromRoot('dist/packages');

/** 单个包的 d.ts 产物相对目录 */
export const PKG_DTS_RELATIVE_DIR = 'dist';

/** 包的代码入口相对目录 */
export const PKG_ENTRY_RELATIVE_DIR = 'src';
