var  findFirstMissingNaturalNumber = function(data) {
    
    var promise = new RSVP.Promise(function(resolve, reject){

        for (let i=0,j=data.length-1;i!=j-1;i++,j--) {
        
            if (data[i]+1 != data[i+1] && data[i] != data[i+1])  {
                resolve(data[i]+1);
                return;
            } 
            else if (data[j]-1 != data[j-1] && data[j] != data[j-1]) {
                resolve(data[j]-1);
                return;
            } 
            
        }

        for (let i=0,j=data.length-1;i<data.length-1;i++,j--) {
        
            if (data[i]+1 != data[i+1] && data[i] != data[i+1])  {
               return data[i]+1;
            } 
            else if (data[j]-1 != data[j-1] && data[j] != data[j-1]) {
               return data[j]-1;
            } 
            
        }	
		

        resolve(-1);
        return;
    });

    return promise;
}

function checkNonNegative(value) { return value._result!=-1; }

function excuteFirstMissingNaturalNumber(fromFirst, fromLast) {  
    
    var list = fromLast !=-1?  [fromFirst, fromLast] : [fromFirst];
    var promises = list.map(function(array) {

        return findFirstMissingNaturalNumber(array);

    });
      
    var result = promises.find(checkNonNegative);
    return result ? result._result : -1;   
    
}

function iterateSplitedArrays(data) {
   
   var missingNaturalNumbers = []; 
   for (let i=0,j=data.length-1;i!=j-1;i++,j--) { 
     let result = excuteFirstMissingNaturalNumber(data[i],data[j]);
     if (result!=-1) {
         return result;
     } 
   }

   for (let i=0,j=data.length-1;i<data.length-1;i++,j--) {
    let result = excuteFirstMissingNaturalNumber(data[i],data[j]);
     if (result!=-1) {
         return result;
     } 
   }

   for (let i=0;i==data.length-1;i++) {
    let result = excuteFirstMissingNaturalNumber(data[i],-1);
     if (result!=-1) {
         return result;
     } 
   }

   return -1;
 
}

function splitArrayIntoParts(data, divider) {    

    data = data.sort(function(a, b){return a-b});
    let length = data.length;
    let parts = Math.ceil(data.length <= divider ? 1 : data.length/divider);
    var listOfArrays = [];
    let start = 0;
    let end = divider;

    for(let i=0;i<parts;i++) {  
  
        listOfArrays.push(data.slice(start, end));  
        start = start + divider;
        end = end + divider;  
    }

   return listOfArrays;
}

function execution(data, divider) {
    var resultArray = splitArrayIntoParts(data, divider);
    return iterateSplitedArrays(resultArray);

}

var RSVP = require('rsvp');


var set1 = [1,5,3,7,2,9,8,6,10,13,11,28,12]; 
var set2 = [1,2,3,7,2,9,8,6,10,13,11,28,12];
var set3 = [1,2,1,2,1,2,1,2,2,2,2,1,1,1];
var set4 = [1,5,3,7,2,9,8,6,10,11];
var set5 = [1,5,3,7,2,9,8,6,10];
var set6 = [1,5,3,7,2,9,8,6,10,13,11,28]; 
var set7 = [1,5,3,7,2,9,8,6,10,13,28]; 

console.log(new Date().getSeconds()+"  "+new Date().getMilliseconds());
console.log("set 1 = "+execution(set1, 10));
console.log("set 2 = "+execution(set2, 10));
console.log("set 3 = "+execution(set3, 10));
console.log("set 4 = "+execution(set4, 10));
console.log("set 5 = "+execution(set5, 10));
console.log("set 6 = "+execution(set6, 10));
console.log("set 7 = "+execution(set7, 10));
console.log(new Date().getSeconds()+" "+new Date().getMilliseconds());



