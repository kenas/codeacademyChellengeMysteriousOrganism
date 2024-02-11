// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
 // console.log(dnaBases[Math.floor(Math.random() * 4)]);
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


// Since you need to create multiple objects, create a factory function pAequorFactory() that has two parameters:

//     -The first parameter is a number (no two organisms should have the same number).
//     -The second parameter is an array of 15 DNA bases.

// pAequorFactory() should return an object that contains the properties specimenNum and dna that correspond to the parameters provided.

// You’ll also add more methods to this returned object in the later steps.


const pAequorFactory = (number, mockUpStrand) => {

  //check if the data type is a number than returning true or false
  const makeSureNumber = typeof number  === 'number';
  
  if (makeSureNumber) {
    return {
      specimenNum: number,
      dna: mockUpStrand(),


      // Your team wants you to simulate P. aequor‘s high rate of mutation (change in its DNA).

      // To simulate a mutation, in pAequorFactory()‘s returned object, add the method .mutate().

      // .mutate() is responsible for randomly selecting a base in the object’s dna property and changing the current base to a different base. Then .mutate() will return the object’s dna.

      // For example, if the randomly selected base is the 1st base and it is 'A', the base must be changed to 'T', 'C', or 'G'. But it cannot be 'A' again.

      mutate() {

        let newDna = [];

        for(let i = 0; i < this.dna.length; i++) {

          let currentDna = this.dna[i];
          let newBase = returnRandBase();

          while(currentDna === newBase) {
            newBase = returnRandBase();
          }

          this.dna[i] = newBase;
          newDna.push(newBase);
        }

        return newDna;

      },

      /*  Your research team wants to be able to compare the DNA sequences of different P. aequor. 
          You’ll have to add a new method (.compareDNA()) to the returned object of the factory function.
          .compareDNA() has one parameter, another pAequor object.

          The behavior of .compareDNA() is to compare the current pAequor‘s .dna with the passed in pAequor‘s .dna and 
          compute how many bases are identical and in the same locations. .compareDNA() does not return anything, 
          but prints a message that states the percentage of DNA the two objects have in common — use the .specimenNum
          to identify which pAequor objects are being compared.

          For example:

          ex1 = ['A', 'C', 'T', 'G']
          ex2 = ['C', 'A', 'T', 'T']

          ex1 and ex2 only have the 3rd element in common ('T') and therefore, have 25% (1/4) of their DNA in 
          common. The resulting message would read something along the lines of: specimen #1 and specimen #2 
          have 25% DNA in common.
      */

      compareDNA(object) {

        const testingDNA = object.dna;

        let matches = this.dna.filter((currentDna, index) => currentDna === testingDNA[index]);

        matches = matches.length / this.dna.length * 100;

        const procentage = matches + '%';
        
        return `specimen ${this.specimenNum} and specimen ${object.specimenNum} have ${procentage} DNA in common.`; 
      },

      /*  
          P. aequor have a likelier chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.
          In the returned object of pAequorFactory(), add another method .willLikelySurvive().

          .willLikelySurvive() returns true if the object’s .dna array contains at least 60% 'C' or 'G' bases. 
          Otherwise, .willLikelySurvive() returns false. 
      */

      willLikelySurvive() {

        //Find matches of C and G and return them into matches
        let matches = this.dna.filter((currentDna, index) => currentDna === 'C' || currentDna === 'G');
        
        // If there are no 'C' or 'G' bases, return false
        if (matches.length === 0) {
          return false;
        }

        let countC = 0;
        let countG = 0;

        //Find how many C and G are in the matches and if there is, count them
        for(let i = 0; i < matches.length; i++) {
          console.log(matches[i]);
          if(matches[i] === 'C') {
            countC ++;

          } else if(matches[i] === 'G') {
            countG ++;
          }
        }

        //console.log('From the count C ' + countC);
        //console.log('From the count G ' + countG); 

        countC = countC / this.dna.length * 100;
        countG = countG / this.dna.length * 100;
        
        //console.log(countC === 60);


        //Finaly return true or false
        return countC >= 60 || countG >= 60;

        //console.log(countC)
        //console.log(countG)
      
      }
    }
  }
}

/*  With the factory function set up, your team requests that you create 30 instances of pAequor
    that can survive in their natural environment. Store these instances in an array for your team to
    study later. 
*/

const survivorsResult = () => {
    const survivors = [];
    const test = [];

    for(let i = 0; i < 30; i++) {
      const instance = pAequorFactory(i, mockUpStrand);
  
      //console.log(instance.willLikelySurvive());
      if (instance.willLikelySurvive()) {
            
        //console.log(instance);
        test.push({index: i, instance});
       
      }
    }
    
     survivors.push(test);

    return survivors;
}


//console.log(pAequorFactory(1, mockUpStrand));
const pAequor1 =  pAequorFactory(2, mockUpStrand);


//console.log(pAequor1.mutate());
//console.log(pAequor1.compareDNA(pAequor1));
//console.log(pAequor1.willLikelySurvive(pAequor2));

console.log(pAequor1.willLikelySurvive())
//console.log(survivorsResult());