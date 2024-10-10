// 将 vue—tsc 编译产物 d.ts 移动到 packages 对应模块的 dist 目录下
import { join } from 'node:path';
import { readdir, cp } from 'node:fs/promises';
import {
  fromRoot,
  PKGS_DIR,
  PKGS_DTS_DIR,
  PKG_ENTRY_RELATIVE_DIR,
  PKG_DTS_RELATIVE_DIR,
} from './utils';

async function main() {
  const pkgs = await match();
  const tasks = pkgs.map(resolve);
  await Promise.all(tasks);
}

/** 寻找所有需要移动 dts 的包 */
async function match() {
  const res = await readdir(PKGS_DTS_DIR, { withFileTypes: true });
  return res.filter((item) => item.isDirectory()).map((item) => item.name);
}

/**
 * 处理单个包的 dts 移动
 * @param pkgName 包名
 */
async function resolve(pkgName: string) {
  try {
    const sourceDir = join(PKGS_DTS_DIR, pkgName, PKG_ENTRY_RELATIVE_DIR);
    const targetDir = join(PKGS_DIR, pkgName, PKG_DTS_RELATIVE_DIR);
    const sourceFiles = await readdir(sourceDir);
    const cpTasks = sourceFiles.map((file) => {
      const source = join(sourceDir, file);
      const target = join(targetDir, file);
      console.log(`[${pkgName}]: moving: ${source} => ${target}`);
      return cp(source, target, {
        force: true,
        recursive: true,
      });
    });
    await Promise.all(cpTasks);
    console.log(`[${pkgName}]: moved successfully!`);
  } catch (e) {
    console.log(`[${pkgName}]: failed to move!`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
