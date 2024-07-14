/**
 * .jsと同じファイル名の.tsファイルをトランスパイルしてクライアント側に返す
 * expressのミドルウェア関数
 */
import fs from 'fs';
import path from 'path';
import { transform } from '@swc/core';

// tsからjsへ変換する際の定義
const transform_config = {
  jsc: {
    parser: {
      syntax: 'typescript',
    },
    target: 'es5',
  },

  sourceMaps: 'inline', //jsファイル内にソースマップを保持
};

/**
 * .jsと同じファイル名の.tsファイルをトランスパイルしてクライアント側に返す
 * @param {string} root
 * @returns
 */
const tsToJs = (root) => {
  const regexp = new RegExp(`${root}/.*\.[jt]s$`, 'i');
  /**
   * @type  {import("express")}
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {import('express').NextFunction} next
   */
  const tsToJsHandler = async (req, res, next) => {
    // .tsファイル存在チェック(無ければ次のmiddlewareへ)
    if (!regexp.test(req.path)) {
      // `${root}/.*\.js`にマッチしないパスはexpress.static()に任せる
      return next();
    }

    const filename = req.path.replace('.js', '.ts');
    const filePath = path.join(path.resolve(), filename);
    if (!fs.existsSync(filePath)) {
      return next();
    }

    try {
      // .tsファイルをトランスパイルして返す(bundleはしない)
      const tsSource = fs.readFileSync(filePath, 'utf8');
      const { code } = await transform(tsSource, transform_config);
      res.type('.js');
      res.send(code);
    } catch (err) {
      next(err);
    }
  };
  return tsToJsHandler;
};

export default tsToJs;
