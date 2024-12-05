#include "RNOH/PackageProvider.h"
#include "generated/rtn_calculator/RNOH/generated/BaseRtnCalculatorPackage.h"
#include "generated/RNOHGeneratedPackage.h"
#include "RNCNetInfoPackage.h"
#include "AsyncStoragePackage.h"
#include "SafeAreaViewPackage.h"
#include "GestureHandlerPackage.h"
#include "SliderPackage.h"
#include "ReanimatedPackage.h"
#include "MaskedPackage.h"
#include "FlashListPackage.h"
#include "FastImagePackage.h"


using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    return {
//         std::make_shared<BaseRtnCalculatorPackage>(ctx)
        std::make_shared<RNOHGeneratedPackage>(ctx),
        std::make_shared<BaseRtnCalculatorPackage>(ctx),
        std::make_shared<RNCNetInfoPackage>(ctx),
        std::make_shared<AsyncStoragePackage>(ctx),
        std::make_shared<SafeAreaViewPackage>(ctx),
        std::make_shared<GestureHandlerPackage>(ctx),
        std::make_shared<SliderPackage>(ctx),
        std::make_shared<ReanimatedPackage>(ctx),
        std::make_shared<MaskedPackage>(ctx),
        std::make_shared<FlashListPackage>(ctx),
        std::make_shared<FastImagePackage>(ctx),
    };
}