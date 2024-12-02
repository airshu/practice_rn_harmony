import { RNInstance } from "@rnoh/react-native-openharmony"

@Component
export struct TestView {
  // 调试相关参数
  @StorageProp('deviceWidth') private deviceWidth: number = 0
  @StorageProp('deviceHeight') private deviceHeight: number = 0
  @StorageProp('statusBarHeight') private statusBarHeight: number = 0
  @StorageProp('naviIndicatorHeight') private naviIndicatorHeight: number = 0
  @State offsetX: number = 0
  @State offsetY: number = 0
  @State positionX: number = 0
  @State positionY: number = 0
  private isDebug = true
  private panOption: PanGestureOptions = new PanGestureOptions()
  private defaultY = this.deviceHeight / 3
  private testSize: number = 50


  test() {
    LoadManager.cpInstance.emitDeviceEvent("onTest", { params: {name: "zhangsan"}})

    // LoadManager.cpInstance.emitComponentEvent("TestView", "onTest", { params: {name: "zhangsan"}})

    // LoadManager.cpInstance.callRNFunction("TestView", "onTest", ["a", "b"])
  }

  build() {
    if (this.isDebug) {
      Column() {
        Text("Test")
          .fontSize(12)
          .fontColor(Color.Red)
      }
      .zIndex(999)
      .width(this.testSize)
      .height(this.testSize)
      .borderRadius(this.testSize)
      .clip(true)
      .justifyContent(FlexAlign.End)
      .backgroundImage($r('app.media.startIcon'))
      .backgroundImageSize(ImageSize.Contain)
      .onClick(() => {
        this.test()
        // RouterModule.push({
        //   builderName: BuilderNameConstants.Test_Test,
        // })
      })
      .animation({
        duration: 250,
      })
      .position({
        left: 0,
        top: this.defaultY,
      })
      .translate({ x: this.offsetX, y: this.offsetY, z: 0 })
      // 拖动触发该手势事件
      .gesture(
        PanGesture(this.panOption)
          .onActionUpdate((event: GestureEvent) => {
            if (event) {
              this.offsetX = this.positionX + event.offsetX
              this.offsetY = this.positionY + event.offsetY
            }
          })
          .onActionEnd((event: GestureEvent) => {
            // 限制拖动范围
            if (this.offsetX > (this.deviceWidth - this.testSize) / 2) {
              this.offsetX = this.deviceWidth - this.testSize
            } else {
              this.offsetX = 0
            }
            //
            if (this.offsetY > (this.deviceHeight - this.testSize - this.defaultY - this.naviIndicatorHeight)) {
              this.offsetY = this.deviceHeight - this.testSize - this.defaultY - this.naviIndicatorHeight
            } else if (this.offsetY < this.statusBarHeight - this.defaultY) {
              this.offsetY = -this.defaultY + this.statusBarHeight
            }
            this.positionX = this.offsetX
            this.positionY = this.offsetY
          })
      )
    }
  }
}

export class LoadManager {
  public static cpInstance: RNInstance
}