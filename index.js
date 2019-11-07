'use strict';
hexo.on('generateBefore', function () {
  if (!hexo.config.qcloudcos || !hexo.config.qcloudcos.enable) {
    return;
  }
  if (hexo.config.qcloudcos.onlypost) {
    /* 只替换文章内静态资源 */
    hexo.extend.filter.register('after_post_render', function (data) {
      data.content = cosProcess.call(this, data.content);
      return data;
    });
  } else {
    /* 替换全部静态资源 */
    hexo.extend.filter.register('after_render:html', function (str, data) {
      return cosProcess.call(this, str);
    });
  }
});

function cosProcess(htmlContent) {
  let cosUrl = '\/\/' + hexo.config.qcloudcos.domain;
  /* 排除 https:// http:// 或 // 等开头的网络资源 */
  let regUrl = /^([a-zA-z]+:\/\/|\/\/)/gi;
  /* 静态资源标签正则 */
  let regImg = /<img(\s*?)src="(.*?)"(.*?)>/gi;
  let regLink = /<link(.*?)href="(.*?)"(.*?)>/gi;
  let regScript = /<script(.*?)src="(.*?)"(.*?)>/gi;
  let regAudio = /<audio(.*?)src="(.*?)"(.*?)>/gi;
  let regvideo = /<video(.*?)src="(.*?)"(.*?)>/gi;
  let regSource = /<source(.*?)src="(.*?)"(.*?)>/gi;
  let regTrack = /<track(.*?)src="(.*?)"(.*?)>/gi;
  let regArea  = /<area(.*?)href="(.*?)"(.*?)>/gi;
  if(hexo.config.qcloudcos.img) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regImg);
  if(hexo.config.qcloudcos.link) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regLink);
  if(hexo.config.qcloudcos.script) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regScript);
  if(hexo.config.qcloudcos.audio) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regAudio);
  if(hexo.config.qcloudcos.video) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regvideo);
  if(hexo.config.qcloudcos.source) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regSource);
  if(hexo.config.qcloudcos.track) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regTrack);
  if(hexo.config.qcloudcos.area) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regArea);
  /* 匹配静态资源src或href内容并替换 */
  function replaceContent(htmlContent, cosUrl, regUrl, regTag){
    htmlContent = htmlContent.replace(regTag, (str, p1, p2) => {
      if(!p2.match(regUrl)) str = str.replace(p2, cosUrl + p2);
      return str;
    });
    return htmlContent;
  }
  /* 返回全部替换后的内容 */
  return htmlContent;
}