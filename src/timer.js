export default class Timer {
  
  constructor(trainingTime, pauseTime, prepTime = 6) {
    
    this.isTurn = false
    this.isPause = false
    this.isPrep = true
    this.rounds = 1

    this.prepTime = prepTime
    this.pauseTime = pauseTime
    this.trainingTime = trainingTime

    this.time = this.prepTime
  }
 
  tick() {
    
    this.isTurn = false 

    if (this.time <= 1) {

      this.isTurn = true

      if (this.isPrep) {

        this.isPrep = false

        this.time = this.trainingTime

        return
      }


      this.isPause = !this.isPause

      this.rounds = !this.isPause ? this.rounds + 1 : this.rounds

      this.time = this.isPause ? this.pauseTime : this.trainingTime
    } 

    else {

      this.time = this.time - 1
    }
  }
}