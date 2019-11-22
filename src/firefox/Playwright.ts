/**
 * Copyright 2017 Google Inc. All rights reserved.
 * Modifications copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Browser } from './Browser';
import { BrowserFetcher } from './BrowserFetcher';
import { ConnectionTransport } from '../ConnectionTransport';
import { DeviceDescriptors } from '../DeviceDescriptors';
import * as Errors from '../Errors';
import { Launcher } from './Launcher';

export class Playwright {
  private _projectRoot: string;
  private _launcher: Launcher;

  constructor(projectRoot: string, preferredRevision: string) {
    this._projectRoot = projectRoot;
    this._launcher = new Launcher(projectRoot, preferredRevision);
  }

  launch(options: any): Promise<Browser> {
    return this._launcher.launch(options);
  }

  connect(options: (any & {
      browserWSEndpoint?: string;
      browserURL?: string;
      transport?: ConnectionTransport; })): Promise<Browser> {
    return this._launcher.connect(options);
  }

  executablePath(): string {
    return this._launcher.executablePath();
  }

  get devices(): any {
    const result = DeviceDescriptors.slice();
    for (const device of DeviceDescriptors)
      result[device.name] = device;
    return result;
  }

  get errors(): any {
    return Errors;
  }

  defaultArgs(options: any | undefined): string[] {
    return this._launcher.defaultArgs(options);
  }

  createBrowserFetcher(options: any | undefined): BrowserFetcher {
    return new BrowserFetcher(this._projectRoot, { browser: 'firefox', ...options });
  }
}