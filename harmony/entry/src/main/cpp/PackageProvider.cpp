#include "RNOH/PackageProvider.h"
#include "generated/rtn_calculator/RNOH/generated/BaseRtnCalculatorPackage.h"
#include "generated/RNOHGeneratedPackage.h"

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    return {
//         std::make_shared<BaseRtnCalculatorPackage>(ctx)
        std::make_shared<RNOHGeneratedPackage>(ctx),
        std::make_shared<BaseRtnCalculatorPackage>(ctx)
    };
}