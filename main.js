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
  
  function strHex(datain) {
    var hex, i;
  
    var result = "";
    for (i = 0; i < datain.length; i++) {
      hex = datain.charCodeAt(i).toString(16);
      result += ("" + hex).slice(-4);
    }
  
    return result
  }
  
  function cv2(datain) {
  
    // cvtps2dq, 2023
    // advanced hash algorhythm
    // input - any string
    // output - hexadecimal string
    var hash = 0, i, chr, salt, target = '', shiftval = 0;
  
    if (datain.length === 0) return hash;
  
    // create salt
    for (i = 0; i < datain.length; i++) {
  
      salt += intToChar('' + datain.charCodeAt(i) ^ datain.charCodeAt(i - 1));
  
    }
    salt = strHex(salt);
  
    // mix salt with input data
  
  
    for (i = 0; i < datain.length; i++) {
  
      target += salt[i] + datain[i];
  
    }
  
    // get shift val
  
    shiftval = target.charCodeAt(0);
  
    console.log(shiftval);
    // first interation hashing
    for (i = 0; i < target.length; i++) {
  
      chr = target.charCodeAt(i);
      hash = '' + (((hash << 5) - hash) + chr);
  
    }
  
    // second iteration hash
    for (i = 0; i < target.length; i++) {
      chr = target.charCodeAt(i);
      hash = '' + (((hash << 3) - hash) + chr);
  
    } 
  
    hash = strHex(hash);
    
    return hash;
  }
  
  str = 'hash mtereshfsfg';
  console.log(cv2(str));