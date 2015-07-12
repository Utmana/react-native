//
//  ExternalManager.h
//  UtmanaProject
//
//  Created by Aleksandar Radulovic on 12/07/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#ifndef UtmanaProject_ExternalManager_h
#define UtmanaProject_ExternalManager_h

#import "RCTBridgeModule.h"

@interface ExternalManager : NSObject <RCTBridgeModule>

- (void)sendUsername:(NSString *)username;

@end

#endif
