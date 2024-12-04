project(rnapp) # 定义项目名
cmake_minimum_required(VERSION 3.4.1) # 定义cmake最低版本
set(CMAKE_SKIP_BUILD_RPATH TRUE) # 当设置为 TRUE 时，CMake 在构建时不会将 RPATH 信息嵌入到生成的可执行文件或共享库中
set(OH_MODULE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules") # 设置变量
set(RNOH_APP_DIR "${CMAKE_CURRENT_SOURCE_DIR}")
set(NODE_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../../../node_modules")
set(RNOH_CPP_DIR "${OH_MODULE_DIR}/@rnoh/react-native-openharmony/src/main/cpp")
# 1、设置自定义控件的生成目录
set(RNOH_GENERATED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/generated") # 第三方库胶水文件的生成目录
set(CMAKE_ASM_FLAGS "-Wno-error=unused-command-line-argument -Qunused-arguments") # 设置汇编编译器标志，忽略未使用的命令行参数错误。
set(CMAKE_CXX_FLAGS "-fstack-protector-strong -Wl,-z,relro,-z,now,-z,noexecstack -s -fPIE -pie") # 设置 C++ 编译器标志，启用堆栈保护、重定位只读、立即绑定、无执行堆栈、静态链接和位置无关可执行文件
set(WITH_HITRACE_SYSTRACE 1) # for other CMakeLists.txt files to use
set(CMAKE_VERBOSE_MAKEFILE ON)
add_compile_definitions(WITH_HITRACE_SYSTRACE) # 启用HiTrace


# add_subdirectory 将子目录添加到构建过程中，每个子目录都有一个CMakeLists.txt
# 手动链接第三方库 第一步 begin：
add_subdirectory("${RNOH_CPP_DIR}" ./rn)
add_subdirectory("${OH_MODULE_DIR}/@react-native-oh-tpl/netinfo/src/main/cpp" ./netinfo)
add_subdirectory("${OH_MODULE_DIR}/@react-native-oh-tpl/async-storage/src/main/cpp" ./async-storage)
add_subdirectory("${OH_MODULE_DIR}/@react-native-oh-tpl/react-native-safe-area-context/src/main/cpp" ./safe-area)
add_subdirectory("${OH_MODULE_DIR}/@react-native-oh-tpl/react-native-gesture-handler/src/main/cpp" ./gesture-handler)
add_subdirectory("${OH_MODULE_DIR}/@react-native-oh-tpl/slider/src/main/cpp" ./slider)
add_subdirectory("${OH_MODULE_DIR}/@react-native-oh-tpl/react-native-reanimated/src/main/cpp" ./reanimated)
add_subdirectory("${OH_MODULE_DIR}/@react-native-oh-tpl/masked-view/src/main/cpp" ./masked-view)
add_subdirectory("${OH_MODULE_DIR}/@react-native-oh-tpl/flash-list/src/main/cpp" ./flash-list)
# 手动链接第三方库 第一步 end：



# 2、配置自定义module的目录
set(rtn_calculator_generated_dir "${RNOH_GENERATED_DIR}/rtn_calculator")
file(GLOB_RECURSE rtn_calculator_generated_dir_SRC "${rtn_calculator_generated_dir}/**/*.cpp") # 递归获取目录下的所有cpp文件
file(GLOB rtn_calculator_package_SRC CONFIGURE_DEPENDS *.cpp)

#file(GLOB GENERATED_CPP_FILES "./generated/*.cpp")
file(GLOB GENERATED_CPP_FILES "${CMAKE_CURRENT_SOURCE_DIR}/generated/*.cpp") # this line is needed by codegen v1





message(WARNING "<><><><><><><><>111<><><><><>><><><>" )
message(WARNING "rtn_calculator_generated_dir_SRC: ${rtn_calculator_generated_dir_SRC}" )
message(WARNING "rtn_calculator_package_SRC:${rtn_calculator_package_SRC}" )
message(WARNING "GENERATED_CPP_FILES: ${GENERATED_CPP_FILES}" )
message(WARNING "CONFIGURE_DEPENDS>>>>  ${CONFIGURE_DEPENDS}")
message(WARNING ">>>>  ${CMAKE_CURRENT_SOURCE_DIR}/generated/*.cpp")
message(WARNING "<><><><><><><><>222<><><><><>><><><>" )


# 添加共享库
add_library(rnoh_app SHARED
    ${rtn_calculator_generated_dir_SRC}
    ${rtn_calculator_package_SRC}
    ${GENERATED_CPP_FILES}
    "./PackageProvider.cpp"
    "${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
)


# 3、指定头文件目录
target_include_directories(rnoh_app PUBLIC ${rtn_calculator_generated_dir})
target_include_directories(rnoh_app PUBLIC ${GENERATED_CPP_FILES})




# 用于指定目标（如可执行文件或库）所依赖的库。这个命令会将指定的库链接到目标，使目标能够使用这些库中的符号和功能。
# 手动链接第三方库 第二步 begin：
target_link_libraries(rnoh_app PUBLIC rnoh)
target_link_libraries(rnoh_app PUBLIC rnoh_netinfo)
target_link_libraries(rnoh_app PUBLIC rnoh_async_storage)
target_link_libraries(rnoh_app PUBLIC rnoh_safe_area)
target_link_libraries(rnoh_app PUBLIC rnoh_gesture_handler)
target_link_libraries(rnoh_app PUBLIC rnoh_slider)
target_link_libraries(rnoh_app PUBLIC rnoh_reanimated)
target_link_libraries(rnoh_app PUBLIC rnoh_masked_view)
target_link_libraries(rnoh_app PUBLIC rnoh_flash_list)
# 手动链接第三方库 第二步 end：