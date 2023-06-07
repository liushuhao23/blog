/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-15 14:36:04
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-24 18:40:49
 */

import { typeMain } from '@web/type/global';
import mitter from './emit';

const dataListener = (res: typeMain) => {
    console.log(res, '主应用数据')
    mitter.emit('WorkSpace',  res)
}


window.microApp && window.microApp.addDataListener(dataListener, true)
