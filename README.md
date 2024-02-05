# React-Without-CRA
Create-React-App 명령어를 사용하지 않고 react 구조 만들기

# CRA 없이 리액트 구조 만들기

`create-react-app` 역할을 정확히 알기 위해 cra 없이 리액트 폴더 구조를 만들어보려한다.

1. 원하는 경로에 mkdir 로 폴더 생성

```jsx
$ mkdir react-without-cra
```

1. 패키지 설치를 하기위해 `npm init`
2. 리액트 설치 ⇒ `npm i react react-dom`
3. 웹팩 설치 ⇒ `npm i -D webpack webpack-cli` 
4. 바벨 설치 ⇒ `npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader` 
5. root 경로에 `dist` 폴더 생성
6. root 경로에 `index.html` 파일 생성
    
    ```jsx
    <html>
      <head>
        <meta charset='UTF-8'/>
        <title>webpack 설정</title>
      </head>
      <body>
        <div id='root'></div>
        <script src="./dist/app.js"></script>
      </body>
    </html>
    ```
    
7. root 경로에 `client.jsx` 파일 생성 
    
    ```jsx
    const React = require('react');
    const ReactDom = require('react-dom');
    ```
    
    해당 코드는 노드의 모듈 시스템에 따라 위의 형태로 불러올 수 있다. (cdn 사용 x)
    
8. root 경로에 `webpack.config.js` 파일 생성
    
    ```jsx
    module.export ={
    	
    }
    ```
    
9. `HelloWorld.jsx` 파일 생성
    
    ```jsx
    const React = require('react')
    const {Component} = React;
    
    class HelloWorld extends Component {
      state = {
    
      };
    
      render () {
    
      }
    }
    
    module.exports = HelloWorld;
    ```
    
10. `client.jsx` 에 HelloWorld 컴포넌트 불러오기
    
    ```jsx
    const React = require('react')
    const ReactDom= require('react-dom')
    
    const HelloWorld = require('./HelloWorld')
    
    ReactDom.render(<HelloWorld/>, document.querySelector('#root'))
    ```
    
11. `webpack.config.js` 세부 작성
    
    ```jsx
    const path = require('path') 
    const webpack = require('webpack')
    
    module.exports= {
      name: 'react-without-cra',
      mode: 'development', // 실서비스 : production
      devtool:'eval',
      resolve: {
        extensions: ['.js', '.jsx'] 
      },
      entry : {
        app: ['./client']
      },
      module: {
        rules: [{
          test: /\.jsx?/, 
          loader: 'babel-loader',
          options: {
            presets: [
    		    ['@babel/preset-env',{
    			target: {
    			  browsers: ['>5% in KR','last 2 chrome versions']
    			}
                        }],
    		    '@babel/preset-react'  
    		],
            plugins:[],
          }
        }]
      },
      plugins: [
        new webpack.LoaderOptionsPlugin({debug: true})
      ],
      output : {
        path: path.join(__dirname, 'dist'), 
        filename: 'app.js'
      }
    }
    ```
    
    - **path** : node 에서 제공하는 기능 → 현재 폴더의 path 를 자동으로 만들어줌
    - **resolve.extensions** : 확장자를 entry 에 일일이 넣지 않고 웹팩이 알아서 배열에 있는 확장자 파일은 자동으로 넣어줌
    - **__dirname** : 현재 폴더 경로
    - babel-loader : 최신 자바스크립트 코드를 구식 브라우저에서 실행가능한 코드로 변환해주는 역할
    - **babel/preset-env** : 코드를 브라우저 환경에 맞게 변환할 수 있음. [타겟 브라우저](https://github.com/browserslist/browserslist?tab=readme-ov-file#query-composition)를 설정할 수 도 있음
    - babel/preset-react : react 의 특정 구문을 변환하기 위한 babel 플러그인 및 설정을 모아둔 것
