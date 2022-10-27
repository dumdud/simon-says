export default class Simon {
  constructor(Refs) {
    this.colors = ["red", "green", "yellow", "blue"];
    this.sequence = [];
    this.playerSequence = [];
    this.buttonRefs = Refs;
    this.speed = 1000;
    this.score = 0;
  }

  addRandomColor() {
    let rand = Math.floor(Math.random() * this.colors.length);
    this.sequence.push(this.colors[rand]);
  }

  #sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async showSequence() {
    this.addRandomColor();

    for (let i = 0; i < this.sequence.length; i++) {
      this.buttonRefs[this.sequence[i]].current.buttonDown();
      await this.#sleep(this.speed);
      this.buttonRefs[this.sequence[i]].current.buttonUp();
      await this.#sleep(this.speed);
    }
  }

  startNewGame() {
    this.sequence = [];
    // this.addRandomColor();
    this.showSequence();
  }

  async compareSequences(id) {
    if (this.sequence.length === 0) return;

    this.playerSequence.push(id);
    console.log(this.playerSequence);

    for (let i = 0; i < this.playerSequence.length; i++) {
      if (this.playerSequence[i] !== this.sequence[i]) {
        console.log("wrong");
        this.playerSequence = [];
        this.sequence = [];
        await this.#sleep(200);
        return alert("you lose");
      }

      if (
        this.playerSequence.length === this.sequence.length &&
        this.playerSequence[i] === this.sequence[i]
      ) {
        console.log("correct");
        this.score += this.playerSequence.length;
        this.playerSequence = [];
        if (this.speed > 100) this.speed -= 100;
        await this.#sleep(200);

        return this.showSequence();
      }
    }
  }
}
