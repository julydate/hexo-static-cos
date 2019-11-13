'use strict';
hexo.on('generateBefore', function () {
  if (!hexo.config.qcloudcos || !hexo.config.qcloudcos.enable) {
    return;
  }
  if (hexo.config.qcloudcos.onlypost) {
    /* only replace static source on post */
    hexo.extend.filter.register('after_post_render', function (data) {
      data.content = cosProcessImg.call(this, data.content);
      data.content = cosProcess.call(this, data.content);
      return data;
    }, hexo.config.qcloudcos.priority);
  } else {
    /* replace all static source */
    hexo.extend.filter.register('after_render:html', function (str, data) {
      str = cosProcessImg.call(this, str);
      str = cosProcess.call(this, str);
      return str;
    }, hexo.config.qcloudcos.priority);
    /* restore img tag on post when set post_asset_folder */
    if(hexo.config.post_asset_folder && hexo.config.qcloudcos.img){
      hexo.extend.filter.register('after_post_render', function (data) {
        data.content = restoreImg.call(this, data.content);
        return data;
      }, 9);
      hexo.extend.filter.register('after_post_render', function (data) {
        data.content = cosProcessImg.call(this, data.content);
        return data;
      }, hexo.config.qcloudcos.priority);
    }
  }
});

function cosProcess(htmlContent) {
  let cosUrl = '\/\/' + hexo.config.qcloudcos.domain;
  /* exclude external source with https:// http:// or // header */
  let regUrl = /^([a-zA-z]+:\/\/|\/\/)/gi;
  /* reg of static source tag */
  let regLink = /<link(.*?)href="(.*?)"(.*?)>/gi;
  let regScript = /<script(.*?)src="(.*?)"(.*?)>/gi;
  let regAudio = /<audio(.*?)src="(.*?)"(.*?)>/gi;
  let regvideo = /<video(.*?)src="(.*?)"(.*?)>/gi;
  let regSource = /<source(.*?)src="(.*?)"(.*?)>/gi;
  let regTrack = /<track(.*?)src="(.*?)"(.*?)>/gi;
  let regArea  = /<area(.*?)href="(.*?)"(.*?)>/gi;
  if(hexo.config.qcloudcos.link) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regLink);
  if(hexo.config.qcloudcos.script) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regScript);
  if(hexo.config.qcloudcos.audio) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regAudio);
  if(hexo.config.qcloudcos.video) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regvideo);
  if(hexo.config.qcloudcos.source) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regSource);
  if(hexo.config.qcloudcos.track) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regTrack);
  if(hexo.config.qcloudcos.area) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regArea);
  /* return all replaced content */
  return htmlContent;
}

function cosProcessImg(htmlContent) {
  let cosUrl = '\/\/' + hexo.config.qcloudcos.domain;
  /* exclude external source with https:// http:// or // header */
  let regUrl = /^([a-zA-z]+:\/\/|\/\/)/gi;
  /* reg of static source tag */
  let regImg = /<img(\s*?)src="(.*?)"(.*?)>/gi;
  if(hexo.config.qcloudcos.img) htmlContent = replaceContent(htmlContent, cosUrl, regUrl, regImg);
  return htmlContent;
}

/* match src or href of static source tag and replace */
function replaceContent(htmlContent, cosUrl, regUrl, regTag){
  htmlContent = htmlContent.replace(regTag, (str, p1, p2) => {
    if(!p2.match(regUrl)){
      str = str.replace(p2, cosUrl + p2);
      console.info("update static link as:-->" + cosUrl + p2);
    }
    return str;
  });
  return htmlContent;
}

/* restore img tag */
function restoreImg(postContent){
  let cosUrl = "\/\/" + hexo.config.qcloudcos.domain;
  let regImg = /<img(\s*?)src="(.*?)"(.*?)>/gi;
  let regCos = new RegExp("^(" + cosUrl + ")", "gi");
  let regCosTag = new RegExp(cosUrl,"gi");
  postContent = postContent.replace(regImg, (str, p1, p2) => {
    if(p2.match(regCos)){
      str = str.replace(regCosTag, '');
      console.info("restore post img tag as:-->" + str);
    }
    return str;
  });
  return postContent;
}