# Ours-Blog
一个node-express页面应用，较为简单朴素，但是基本功能都有。express框架，jade模板，mysql数据库，passport验证登录注册。
<br>

<h3>使用方法（Usage）：</h3>
  <pre>div2img(options);</pre>
  <p>方法返回一个转换之后的canvas的DOM对象，故也可以声明一个变量来接收该对象：</p>
  <pre>var canvas = div2img(options);</pre>
  <p>其中options为配置选项对象，定义如下。</p>
<h3>配置项（Options）：</h3>
  <pre>var options = {
    id: 'divid',              // 页面元素id（container id）
    name: 'imgName',          // 保存图片的名字（image name）
    backgroundColor: '#f00',  // 背景颜色，只有在页面元素有透明元素或不能完全覆盖背景时可见(background color)
    download: true            // 是否下载，默认false不下载(download or not)
}</pre>

<h3>演示（Demo）</h3>
  http://liuxinlei.com/works/div2img/demo/

