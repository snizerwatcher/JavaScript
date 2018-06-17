function testThis() {
    this.a = 1;
    this.b = 2;

    var aPlusB = function() {    
        return this.a + this.b;
    }

   
} 

var res = new testThis();
console.log(res.aPlusB());  //undefined  //error for var aPlusB   only give result for if we replace var with this.aPlusB
console.log(testThis().aPlusB());  //undefined // error for var aPlusB

function testThis1() {
    this.a = 2;
    this.b = 2;

    this.aPlusB = function() {   
        return this.a + this.b;
    }

} 

var res1 = new testThis1(); 
console.log(res1.aPlusB()); // 4
console.log(testThis1().aPlusB());  //undefined // error for var aPlusB

 

