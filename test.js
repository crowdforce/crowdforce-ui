/* eslint-disable */
(function (window) {
  (function (window) {
    window.__parseFunction = function (__func, __attrs) {
      __attrs = __attrs || [];
      __func = `(function(${__attrs.join(',')}){${__func}})`;
      return window.execScript ? window.execScript(__func) : eval(__func);
    };
  }(window));
  (function (window) {
    function addEvent(el, event, handler) {
      const events = event.split(/\s+/);
      for (let i = 0; i < events.length; i++) {
        if (el.addEventListener) {
          el.addEventListener(events[i], handler);
        } else {
          el.attachEvent(`on${events[i]}`, handler);
        }
      }
    }
    function removeEvent(el, event, handler) {
      const events = event.split(/\s+/);
      for (let i = 0; i < events.length; i++) {
        if (el.removeEventListener) {
          el.removeEventListener(events[i], handler);
        } else {
          el.detachEvent(`on${events[i]}`, handler);
        }
      }
    }
    function getCssProperty(el, prop) {
      if (window.getComputedStyle) {
        return window.getComputedStyle(el, '').getPropertyValue(prop) || null;
      } if (el.currentStyle) {
        return el.currentStyle[prop] || null;
      }
      return null;
    }

    const getWidgetsOrigin = function (default_origin, dev_origin) {
      const link = document.createElement('A'); let
        origin;
      link.href = document.currentScript && document.currentScript.src || default_origin;
      origin = link.origin || `${link.protocol}//${link.hostname}`;
      if (origin == 'https://telegram.org') {
        origin = default_origin;
      } else if (origin == 'https://telegram-js.azureedge.net' || origin == 'https://tg.dev') {
        origin = dev_origin;
      }
      return origin;
    };

    function getXHR() {
      if (navigator.appName == 'Microsoft Internet Explorer') {
        return new ActiveXObject('Microsoft.XMLHTTP');
      }
      return new XMLHttpRequest();
    }

    function initWidget(widgetEl) {
      let widgetId; let widgetElId; let widgetsOrigin; let existsEl;
      let src; const styles = {}; let allowedAttrs = [];
      let defWidth; let defHeight; let onInitAuthUser; let onAuthUser; let
        onUnauth;
      if (!widgetEl.tagName
          || !(widgetEl.tagName.toUpperCase() == 'SCRIPT'
            || widgetEl.tagName.toUpperCase() == 'BLOCKQUOTE'
            && widgetEl.classList.contains('telegram-post'))) {
        return null;
      }
      if (widgetId = widgetEl.getAttribute('data-telegram-post')) {
        widgetsOrigin = getWidgetsOrigin('https://t.me', 'https://post.tg.dev');
        widgetElId = `telegram-post-${widgetId.replace(/[^a-z0-9_]/ig, '-')}`;
        src = `${widgetsOrigin}/${widgetId}?embed=1`;
        allowedAttrs = ['userpic', 'single?'];
        defWidth = widgetEl.getAttribute('data-width') || '100%';
        defHeight = '';
        styles.minWidth = '320px';
      } else if (widgetEl.hasAttribute('data-telegram-login')) {
        widgetId = widgetEl.getAttribute('data-telegram-login');
        widgetsOrigin = getWidgetsOrigin('https://oauth.telegram.org', 'https://oauth.tg.dev');
        widgetElId = `telegram-login-${widgetId.replace(/[^a-z0-9_]/ig, '-')}`;
        src = `${widgetsOrigin}/embed/${widgetId}?origin=${encodeURIComponent(location.origin || `${location.protocol}//${location.hostname}`)}`;
        allowedAttrs = ['size', 'userpic', 'init_auth', 'request_access', 'radius', 'min_width', 'max_width', 'lang'];
        defWidth = 186;
        defHeight = 28;
        if (widgetEl.hasAttribute('data-size')) {
          const size = widgetEl.getAttribute('data-size');
          if (size == 'small') defWidth = 148, defHeight = 20;
          else if (size == 'large') defWidth = 238, defHeight = 40;
        }
        if (widgetEl.hasAttribute('data-onauth')) {
          onInitAuthUser = onAuthUser = __parseFunction(widgetEl.getAttribute('data-onauth'), ['user']);
        } else if (widgetEl.hasAttribute('data-auth-url')) {
          const a = document.createElement('A');
          a.href = widgetEl.getAttribute('data-auth-url');
          onAuthUser = function (user) {
            let authUrl = a.href;
            authUrl += (authUrl.indexOf('?') >= 0) ? '&' : '?';
            const params = [];
            for (const key in user) {
              params.push(`${key}=${encodeURIComponent(user[key])}`);
            }
            authUrl += params.join('&');
            location.href = authUrl;
          };
        }
        if (widgetEl.hasAttribute('data-onunauth')) {
          onUnauth = __parseFunction(widgetEl.getAttribute('data-onunauth'));
        }
      } else if (widgetId = widgetEl.getAttribute('data-telegram-share-url')) {
        widgetsOrigin = getWidgetsOrigin('https://t.me', 'https://post.tg.dev');
        widgetElId = `telegram-share-${window.btoa(widgetId)}`;
        src = `${widgetsOrigin}/share/embed?origin=${encodeURIComponent(location.origin || `${location.protocol}//${location.hostname}`)}`;
        allowedAttrs = ['telegram-share-url', 'comment', 'size', 'text'];
        defWidth = 60;
        defHeight = 20;
        if (widgetEl.getAttribute('data-size') == 'large') {
          defWidth = 76;
          defHeight = 28;
        }
      } else {
        return null;
      }
      existsEl = document.getElementById(widgetElId);
      if (existsEl) {
        return existsEl;
      }
      for (let i = 0; i < allowedAttrs.length; i++) {
        let attr = allowedAttrs[i];
        const novalue = attr.substr(-1) == '?';
        if (novalue) {
          attr = attr.slice(0, -1);
        }
        const data_attr = `data-${attr.replace(/_/g, '-')}`;
        if (widgetEl.hasAttribute(data_attr)) {
          const attr_value = novalue ? '1' : encodeURIComponent(widgetEl.getAttribute(data_attr));
          src += `&${attr}=${attr_value}`;
        }
      }
      function visibilityHandler() {
        try {
          if (isVisible(iframe, 50)) {
            const data = { event: 'visible', frame: widgetElId };
            iframe.contentWindow.postMessage(JSON.stringify(data), '*');
            // console.log('send', data);
          }
        } catch (e) {}
      }
      function postMessageHandler(event) {
        if (event.source !== iframe.contentWindow
            || event.origin != widgetsOrigin) {
          return;
        }
        try {
          var data = JSON.parse(event.data);
        } catch (e) {
          var data = {};
        }
        if (data.event == 'resize') {
          if (data.height) {
            iframe.style.height = `${data.height}px`;
          }
          if (data.width) {
            iframe.style.width = `${data.width}px`;
          }
        } else if (data.event == 'visible_off') {
          removeEvent(window, 'scroll', visibilityHandler);
          removeEvent(window, 'resize', visibilityHandler);
        } else if (data.event == 'auth_user') {
          if (data.init) {
            onInitAuthUser && onInitAuthUser(data.auth_data);
          } else {
            onAuthUser && onAuthUser(data.auth_data);
          }
        } else if (data.event == 'unauthorized') {
          onUnauth && onUnauth();
        }
      }
      var iframe = document.createElement('iframe');
      iframe.id = widgetElId;
      iframe.src = src;
      iframe.width = defWidth;
      iframe.height = defHeight;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('scrolling', 'no');
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      for (const prop in styles) {
        iframe.style[prop] = styles[prop];
      }
      if (widgetEl.parentNode) {
        widgetEl.parentNode.insertBefore(iframe, widgetEl);
        if (widgetEl.tagName.toUpperCase() == 'BLOCKQUOTE') {
          widgetEl.parentNode.removeChild(widgetEl);
        }
      }
      addEvent(iframe, 'load', () => {
        removeEvent(iframe, 'load', visibilityHandler);
        addEvent(window, 'scroll', visibilityHandler);
        addEvent(window, 'resize', visibilityHandler);
        visibilityHandler();
      });
      addEvent(window, 'message', postMessageHandler);
      return iframe;
    }
    function isVisible(el, padding) {
      let node = el; let
        val;
      const visibility = getCssProperty(node, 'visibility');
      if (visibility == 'hidden') return false;
      while (node) {
        if (node === document.documentElement) break;
        const display = getCssProperty(node, 'display');
        if (display == 'none') return false;
        const opacity = getCssProperty(node, 'opacity');
        if (opacity !== null && opacity < 0.1) return false;
        node = node.parentNode;
      }
      if (el.getBoundingClientRect) {
        padding = +padding || 0;
        const rect = el.getBoundingClientRect();
        const html = document.documentElement;
        if (rect.bottom < padding
            || rect.right < padding
            || rect.top > (window.innerHeight || html.clientHeight) - padding
            || rect.left > (window.innerWidth || html.clientWidth) - padding) {
          return false;
        }
      }
      return true;
    }
    if (!document.currentScript
        || !initWidget(document.currentScript)) {
      let widgets;
      if (document.querySelectorAll) {
        widgets = document.querySelectorAll('script[data-telegram-post],blockquote.telegram-post,script[data-telegram-login],script[data-telegram-share-url]');
      } else {
        widgets = Array.prototype.slice.apply(document.getElementsByTagName('SCRIPT'));
        widgets = widgets.concat(Array.prototype.slice.apply(document.getElementsByTagName('BLOCKQUOTE')));
      }
      for (let i = 0; i < widgets.length; i++) {
        initWidget(widgets[i]);
      }
    }

    var TelegramLogin = {
      popups: {},
      auth(options, callback) {
        const bot_id = parseInt(options.bot_id);
        if (!bot_id) {
          throw new Error('Bot id required');
        }
        const width = 550;
        const height = 470;
        const left = Math.max(0, (screen.width - width) / 2) + (screen.availLeft | 0);
        const top = Math.max(0, (screen.height - height) / 2) + (screen.availTop | 0);
        const onMessage = function (event) {
          try {
            var data = JSON.parse(event.data);
          } catch (e) {
            var data = {};
          }
          if (!TelegramLogin.popups[bot_id]) return;
          if (event.source !== TelegramLogin.popups[bot_id].window) return;
          if (data.event == 'auth_result') {
            onAuthDone(data.result);
          }
        };
        var onAuthDone = function (authData) {
          if (!TelegramLogin.popups[bot_id]) return;
          if (TelegramLogin.popups[bot_id].authFinished) return;
          callback && callback(authData);
          TelegramLogin.popups[bot_id].authFinished = true;
          removeEvent(window, 'message', onMessage);
        };
        var checkClose = function (bot_id) {
          if (!TelegramLogin.popups[bot_id]) return;
          if (!TelegramLogin.popups[bot_id].window
              || TelegramLogin.popups[bot_id].window.closed) {
            return TelegramLogin.getAuthData(options, (origin, authData) => {
              onAuthDone(authData);
            });
          }
          setTimeout(checkClose, 100, bot_id);
        };
        const popup_url = `${Telegram.Login.widgetsOrigin}/auth?bot_id=${encodeURIComponent(options.bot_id)}&origin=${encodeURIComponent(location.origin || `${location.protocol}//${location.hostname}`)}${options.request_access ? `&request_access=${encodeURIComponent(options.request_access)}` : ''}${options.lang ? `&lang=${encodeURIComponent(options.lang)}` : ''}`;
        const popup = window.open(popup_url, `telegram_oauth_bot${bot_id}`, `width=${width},height=${height},left=${left},top=${top},status=0,location=0,menubar=0,toolbar=0`);
        TelegramLogin.popups[bot_id] = {
          window: popup,
          authFinished: false,
        };
        if (popup) {
          addEvent(window, 'message', onMessage);
          popup.focus();
          checkClose(bot_id);
        }
      },
      getAuthData(options, callback) {
        const bot_id = parseInt(options.bot_id);
        if (!bot_id) {
          throw new Error('Bot id required');
        }
        const xhr = getXHR();
        const url = `${Telegram.Login.widgetsOrigin}/auth/get`;
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (typeof xhr.responseBody === 'undefined' && xhr.responseText) {
              try {
                var result = JSON.parse(xhr.responseText);
              } catch (e) {
                var result = {};
              }
              if (result.user) {
                callback(result.origin, result.user);
              } else {
                callback(result.origin, false);
              }
            } else {
              callback('*', false);
            }
          }
        };
        xhr.onerror = function () {
          callback('*', false);
        };
        xhr.withCredentials = true;
        xhr.send(`bot_id=${encodeURIComponent(options.bot_id)}${options.lang ? `&lang=${encodeURIComponent(options.lang)}` : ''}`);
      },
    };

    if (!window.Telegram) {
      window.Telegram = {};
    }
    window.Telegram.Login = {
      auth: TelegramLogin.auth,
      widgetsOrigin: getWidgetsOrigin('https://oauth.telegram.org', 'https://oauth.tg.dev'),
    };
  }(window));
}(window));
