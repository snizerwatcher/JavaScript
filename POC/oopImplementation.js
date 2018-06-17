//Unnamed
module.exports  = function() {

    this.a = 1;
    this.b = 2;
    
    this.aPlusB = function() {
        return this.a + this.b;
    } 

};
//Named 
module.exports.calc  = function() {

    this.a = 2;
    this.b = 2;
    
    this.aPlusB = function() {
        return this.a + this.b;
    } 

};






