# Node framework20.9.0

![image](https://github.com/w3point0/framework20.9.0/assets/993459/3c3901a9-464c-47f6-a235-6c1f1138dc18)

### Motivation 

While prototyping code generation using ChatGPT, I set out to create a Node.js server template with best-of-breed design principles. The goal was to enable developers to focus on functions that could be unit tested without the typical request-response coupling. This decoupling simplifies debugging and allows for running unit tests without needing the service to be running. The ultimate goal is to achieve 100% code coverage.



## AI Prompts and Middleware Centric Node.JS Code Best Practices  

Fun Facts  

- Node version 20.9.0
- Node native test runner
- Mongo July 2025. MongoDB 7.0 
- Debian GNU/Linux 10 (buster) as of 5/23/2024
- Pure HTML and Components
- No React, Angular or other heavy framework. Pure HTML and custom components (next wave)
- No transpilers, compilers -- just plan old ECMAScript 2023
- No setup, if you use Codespaces 

### First Things 

- Nothing! If you use Git's Codespaces everything is setup. Talking about infrastructure as code. Dive in.
- node app.mjs will start the web application. That's all folks.


This project has been developed using GitHub Codespaces and includes 
all the infrastructure components needed to get you started. See .devcontainer for more details.

AI is a fundamental basis for this project, providing creativity, review, clarity, and code quality. AI is a developer's best friend.

## Prompts (Your best friend)

Code Prompt
```
You are a Node.js expert developer working with version 20.9.0, 
leveraging the latest ECMAScript features and module syntax. 
Your development approach prioritizes testing from the outset,
 focusing on creating highly cohesive functions with minimal 
 coupling. This practice ensures that each function performs 
 a single task effectively and can be independently tested. 
 You strive for 100% unit test coverage using Node.js's 
 Native Test Runner, ensuring robust and reliable code. 
 Your expertise also encompasses best practices in code 
 maintainability and readability, making your codebase both 
 efficient and easy to navigate. Simplicity is a key 
 goal for quality in your work, and you adhere to high standards 
 in all aspects of development. Use async and await 
 as the primary pattern, assuming functions are asynchronous 
 and avoiding promises. 
```


Unit Test Prompt
```
Write me unit test using the Native Test Runner features  
Using: node v20.9.0 ECMAScript features
<paste code here that will be unit tested>
```

## Demo Notes  
- When you start the app you can open an html file that is in the public folder. This will show two buttons
- At the browser window add the path /stream and you will see a simple message. Please view the console output for verification of the /stream run. See app.mjs get /stream

### Secrets (Don't let an accident happen)
Use Codespaces secrets to load environment variables  
![image](https://github.com/w3point0/framework20.9.0/assets/993459/e602e046-1061-4fd6-9be9-7c718ed6dad8)


### Linter (Pick up your socks and don't keep a messy room)
```
npx eslint model/user.js  
```

### Test (Code Shift Happens)
```
npm test
npm run coverage
```
# Appendix

Node.js version 20.9.0 supports a variety of ECMAScript features thanks to the integration of the V8 JavaScript engine version 11.3. Here are some of the notable ECMAScript features and updates supported:

1. **String Methods**:
   - `String.prototype.isWellFormed` and `String.prototype.toWellFormed`: Ensure proper string format, particularly useful for handling surrogate pairs correctly.

2. **Array and TypedArray Methods**:
   - Methods that modify arrays by creating copies, preserving the original arrays.

3. **Resizable ArrayBuffer and Growable SharedArrayBuffer**:
   - Enhanced flexibility in managing memory allocation.

4. **RegExp Enhancements**:
   - The `v` flag for regular expressions, adding support for set notation and properties of strings.

5. **WebAssembly Tail Call**:
   - Optimization for specific types of function calls in WebAssembly.

6. **Stable Features**:
   - The `import.meta.resolve()` function is now synchronous, improving the efficiency of module resolution.

Additionally, Node.js 20.9.0 introduces several other improvements and experimental features:

- **Permission Model**:
  - Experimental permission flags (`--experimental-permission`, `--allow-fs-read`, `--allow-fs-write`, etc.) that provide granular control over file system access and process spawning.

- **Native Test Runner**:
  - A stable test runner module that allows for creating and running test suites without needing third-party modules.

- **Single Executable Applications (SEA)**:
  - Experimental support for bundling Node.js applications into a single executable file, simplifying distribution.

These updates and features ensure that Node.js 20.9.0 is aligned with the latest ECMAScript specifications, enhancing performance and providing new capabilities for developers.

For further details, you can refer to the official Node.js release notes and other resources:
- [Node.js 20 Release Notes](https://nodejs.org/en/blog/release/v20.0.0)
- [Kinsta Blog on Node.js 20](https://kinsta.com/blog/node-js-20)
- [SitePoint on Node.js 20 Features](https://www.sitepoint.com/node-js-20-features/)
