/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-15 15:35:46
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-16 13:56:33
 */
import mitter from "../communication/emit"


const WorkSpaceData: any = {}

const getWorkSpace = (val?: any) => {
    WorkSpaceData.jwt = val.jwt
}

mitter.on('WorkSpace', getWorkSpace)

export { WorkSpaceData }