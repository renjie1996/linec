'use strict';

var fs = require('fs');
var path = require('path');
var ignore = require('ignore');
var ROOTPATH = process.cwd();

/**
 * @param {path} cPath
 */
function handleIgnode(cPath) {
    try {
        var currentPath = path.join(ROOTPATH, '.gitignore');
        var fileData = fs.readFileSync(currentPath, 'utf-8');
        var ignoreList = fileData.split('\n');
        var filterList = filterData(ignoreList);
        var ig = ignore().add(filterList);
        return ig.ignores(cPath);
    } catch (e) {
        return false;
    }
}

/**
 * @param {Array} list
 */
function filterData(list) {
    return list.filter(function (item) {
        return item.trim() !== '' && item.trim() !== '\r' && !item.startsWith('#');
    });
}

module.exports = handleIgnode;