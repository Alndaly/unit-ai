import * as util from 'util';
import * as cp from 'child_process'

export const exec = util.promisify(cp.exec); 