/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const path = require('path');
const fs = require('fs');
const {downloadBrowserWithProgressBar} = require('playwright-core/download-browser');

(async function() {
  const crExecutablePath = await downloadBrowserWithProgressBar(path.join(__dirname, '.local-browsers', 'chromium'), 'chromium', true /* respectGlobalInstall */);
  const ffExecutablePath = await downloadBrowserWithProgressBar(path.join(__dirname, '.local-browsers', 'firefox'), 'firefox', true /* respectGlobalInstall */);
  const wkExecutablePath = await downloadBrowserWithProgressBar(path.join(__dirname, '.local-browsers', 'webkit'), 'webkit', true /* respectGlobalInstall */);
  await fs.promises.writeFile(path.join(__dirname, '.downloaded-browsers.json'), JSON.stringify({crExecutablePath, ffExecutablePath, wkExecutablePath, }));
})();
