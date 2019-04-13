
#import "RNTensorflowLite.h"
#import <React/RCTLog.h>

@implementation RNTensorflowLite

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(createImageRecognizer:(NSDictionary*)data,
                 createImageRecognizerWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"createImageRecognizer Worked!");
    resolve(@"createImageRecognizer Worked!");
}

RCT_REMAP_METHOD(recognize:(NSDictionary*)data,
                 recognizeWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"recognize Worked!");
    resolve(@"recognize Worked!");
}

RCT_REMAP_METHOD(close,
                 rejecterWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"createNativeModules Worked!");
    resolve(@"createNativeModules Worked!");
}
@end


