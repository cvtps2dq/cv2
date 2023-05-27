/*
'use strict';
import CryptoJS from "crypto-js";
import express from "express";
import bodyParser from 'body-parser';
import WebSocket from "ws";
var http_port = process.env.HTTP_PORT|| 3001;
var p2p_port = process.env.P2P_PORT|| 6001;
var initialPeers = process.env.PEERS? process.env.PEERS.split(',') : [];

class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
    }
}

var sockets = [];
var MessageType = {
    QUERY_LATEST:0,
    QUERY_ALL:1,
    RESPONSE_BLOCKCHAIN:2
};

var Genesis = () => {
    return new Block(0, "0", 1685204847821, "cvtps2dq Genesis" )
}
*/

function intToChar(num) {
  return num
    .toString()    // convert number to string
    .split('')     // convert string to array of characters
    .map(Number)   // parse characters as numbers
    .map(n => (n || 10) + 64)   // convert to char code, correcting for J
    .map(c => String.fromCharCode(c))   // convert char codes to strings
    .join('');     // join values together
}

function stringsplit(str, size) {
  if (str == null)
    return [];
  str = String(str);
  return size > 0 ? str.match(new RegExp('.{1,' + size + '}', 'g')) : [str];
}

function cv2(datain) {
  var  i, chr, salt = "", target = '', shiftval = 0, res = 0;

  if (datain.length === 0) return 0;

  // create blocks
  var blocks = [];
  blocks = stringsplit(datain, 8);
  // prepare blocks (add salt)
  for(i = 0; i < blocks.length; i++){
    blocks[i] = intToChar(i) + blocks[i] + intToChar(i + 1);
  }

  var output = [];

  for(const block of blocks){
    res = 0;
    for (var ix = 0; ix < block.length; ix++ ){
      chr = block.charCodeAt(ix);
      res = res + (((res << 5) - res) + chr);
    }
    output.push((res >>> 0).toString(16));
  }

  return output.join('');
}

str = 'cvtps2dq';
console.log(cv2(str));