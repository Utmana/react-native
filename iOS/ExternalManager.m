//
//  ExternalManager.m
//  UtmanaProject
//
//  Created by Aleksandar Radulovic on 12/07/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "ExternalManager.h"

@implementation ExternalManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (void)sendUsername:(NSString *)username
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"UsernameEvent" body:@{@"id": username}];
}

@end