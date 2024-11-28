import router from '@ohos.router';

@Entry
@Component
struct Index {

  build() {
    RelativeContainer() {
      Column() {
        Button() {
          Text('RNApp Page')
        }.padding(10).onClick(() => {
          router.pushUrl({
            url: 'pages/RNAppPage',
          })
        })

        Button('RNSurface Page')
          .margin(10)
          .fontSize(20)
          .onClick(() => {
            router.pushUrl({ url: 'pages/RNSurfacePage' }, router.RouterMode.Standard, (err) => {
              if (err) {
                console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
                return;
              }
              console.info('Invoke pushUrl succeeded.');
            })
          })

      }
      .height('100%')
      .width('100%')
      .alignItems(HorizontalAlign.Center)
      .alignSelf(ItemAlign.Center)
      .justifyContent(FlexAlign.Center)

    }
  }
}