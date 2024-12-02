这是一个学习React Native鸿蒙端的项目


## Codegen

[使用指导](https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/codegen.md)


codegenConfig配置时version的区别：

- version1:适用于创建Turbomodule或者ArkTS组件的场景；
- version2:适用于创建CAPI组件的场景；

```shell

react-native codegen-harmony --cpp-output-path ./harmony/entry/src/main/cpp/generated --rnoh-module-path ./harmony/entry/oh_modules/@rnoh/react-native-openharmony"

```

**codegen-harmony参数**

- rnoh-module-path: Native 工程内， RNOH SDK 模块的相对路径（如果通过 har 包安装，则需指向安装后的地址，如：xxx/oh_modules/@rnoh/react-native-openharmony）
- cpp-output-path:` 指定⽤于存储⽣成的 C++ 文件的输出⽬录的相对路径，默认./harmony/entry/src/main/cpp/generated
- project-root-path: Native 工程根⽬录的相对路径


### 胶水文件类型：

### TurboModule相关

```cpp
// RNXXX.h
class JSI_EXPORT RNDeviceInfo : public ArkTSTurboModule {
  public:
    RNDeviceInfo(const ArkTSTurboModule::Context ctx, const std::string name);
};

// RNXXX.cpp
RNDeviceInfo::RNDeviceInfo(const ArkTSTurboModule::Context ctx, const std::string name) : ArkTSTurboModule(ctx, name) {
    methodMap_ = {
        ARK_ASYNC_METHOD_METADATA(getApiLevel, 0),
        ARK_METHOD_METADATA(getApiLevelSync, 0),
        ARK_METHOD_METADATA(getBrand, 0),
        // ... 其他方法
    };
}

```

作用：

- 定义了原生模块的接口和实现
- 负责JS和原生代码之间的方法映射
- 处理方法调用的参数转换和返回值处理

### 组件渲染相关


```cpp

// ComponentDescriptors.h
namespace facebook {
namespace react {

using QDGestureFloatComponentDescriptor = ConcreteComponentDescriptor<QDGestureFloatShadowNode>;
} 
} 

// 属性定义
namespace facebook {
namespace react {
  struct Props {
    // 组件属性定义
  };
}
}

```

作用：

- 定义组件的属性和事件
- 处理组件的布局和渲染
- 管理组件的生命周期



### 事件处理相关文件

```cpp

namespace facebook {
namespace react {
  class EventEmitter {
    // 事件发射器定义
  };
}
}

```

作用：

- 处理组件的事件发射
- 管理事件的注册和触发
- 处理事件参数的转换


### 状态管理相关文件

```cpp

namespace facebook {
namespace react {
  struct State {
    // 状态定义
  };
}
}

```

作用：

- 管理组件的状态
- 处理状态的更新
- 状态变化的同步


### 影子节点相关文件

```cpp
namespace facebook {
namespace react {
  class ShadowNode : public ConcreteViewShadowNode<
      ShadowNode,
      ViewProps,
      ViewEventEmitter> {
    // 影子节点定义
  };
}
}
```

作用：

- 维护组件树结构
- 处理布局计算
- 管理组件的更新和重绘

### 包注册相关文件

```cpp

class RNOHGeneratedPackageTurboModuleFactoryDelegate : public TurboModuleFactoryDelegate {
  public:
    SharedTurboModule createTurboModule(Context ctx, const std::string &name) const override {
        if (name == "RNDeviceInfo") {
            return std::make_shared<RNDeviceInfo>(ctx, name);
        }
        return nullptr;
    };
};

```

作用：

- 注册原生模块
- 管理模块的创建和销毁
- 处理模块的依赖关系




## CMakeLists




## Harmony OS 打包命令参数：

--dev：如何设置为false，警告关闭、bundle被压缩
--entry-file <path>：指定入口文件，相对项目根目录，默认值index.js
--config <path>：指定配置文件，相对项目根目录，默认值metro.config.js
--bundle-output <path>：指定bundle输出路径，相对项目根目录，默认值dist
--assets-dest <path>：指定资源输出路径，相对项目根目录，默认值dist
--sourcemap-output <path>：映射文件输出位置
--minify <boolean>：是否压缩打包




## 踩过的坑


## Har依赖时没有声明文件，找不到RNDeviceInfoPackage

官方目前（2024.11.29）还不支持AutoLink，所以当你添加了一个第三方库时，需要手动在原生侧也添加依赖。添加device-info这个库时，如果使用
har的方式依赖，那么会找不到RNDeviceInfoPackage这个类，因为他的包里没有ts.ts这个声明文件。所以需要手动拷贝一下，或者使用源码方式依赖。


## react-native-oh-tpl/async-storage使用tgz依赖

远程依赖的文件结构有变化