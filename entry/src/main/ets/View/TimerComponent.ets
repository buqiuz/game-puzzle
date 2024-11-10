@Component
export struct TimerComponent{

  @Link gameTime:number

  build() {
    Row() {
      Text(`Time:0${Math.floor(this.gameTime / 60)}:${this.gameTime % 60 < 10
        ? 0 + this.gameTime % 60 : this.gameTime % 60}`)
        .id('time')
        .margin({ top: 5, bottom: 5 })
        .fontColor(Color.Blue)
        .fontWeight(600)
    }
  }
}