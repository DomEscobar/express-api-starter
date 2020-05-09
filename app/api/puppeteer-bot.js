const UserAgent = require('user-agents');
const crypto = require('crypto');

const WEBGL_RENDERERS = ['ANGLE (NVIDIA Quadro 2000M Direct3D11 vs_5_0 ps_5_0)', 'ANGLE (NVIDIA Quadro K420 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA Quadro 2000M Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA Quadro K2000M Direct3D11 vs_5_0 ps_5_0)', 'ANGLE (Intel(R) HD Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics Family Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (ATI Radeon HD 3800 Series Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics 4000 Direct3D11 vs_5_0 ps_5_0)', 'ANGLE (Intel(R) HD Graphics 4000 Direct3D11 vs_5_0 ps_5_0)', 'ANGLE (AMD Radeon R9 200 Series Direct3D11 vs_5_0 ps_5_0)', 'ANGLE (Intel(R) HD Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics Family Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics Family Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics 4000 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics 3000 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Mobile Intel(R) 4 Series Express Chipset Family Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) G33/G31 Express Chipset Family Direct3D9Ex vs_0_0 ps_2_0)', 'ANGLE (Intel(R) Graphics Media Accelerator 3150 Direct3D9Ex vs_0_0 ps_2_0)', 'ANGLE (Intel(R) G41 Express Chipset Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 6150SE nForce 430 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics 4000)', 'ANGLE (Mobile Intel(R) 965 Express Chipset Family Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics Family)', 'ANGLE (NVIDIA GeForce GTX 760 Direct3D11 vs_5_0 ps_5_0)', 'ANGLE (NVIDIA GeForce GTX 760 Direct3D11 vs_5_0 ps_5_0)', 'ANGLE (NVIDIA GeForce GTX 760 Direct3D11 vs_5_0 ps_5_0)', 'ANGLE (AMD Radeon HD 6310 Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) Graphics Media Accelerator 3600 Series Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) G33/G31 Express Chipset Family Direct3D9 vs_0_0 ps_2_0)', 'ANGLE (AMD Radeon HD 6320 Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) G33/G31 Express Chipset Family (Microsoft Corporation - WDDM 1.0) Direct3D9Ex vs_0_0 ps_2_0)', 'ANGLE (Intel(R) G41 Express Chipset)', 'ANGLE (ATI Mobility Radeon HD 5470 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) Q45/Q43 Express Chipset Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 310M Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) G41 Express Chipset Direct3D9 vs_3_0 ps_3_0)', 'ANGLE (Mobile Intel(R) 45 Express Chipset Family (Microsoft Corporation - WDDM 1.1) Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GT 440 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (ATI Radeon HD 4300/4500 Series Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 7310 Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics)', 'ANGLE (Intel(R) 4 Series Internal Chipset Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon(TM) HD 6480G Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (ATI Radeon HD 3200 Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 7800 Series Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) G41 Express Chipset (Microsoft Corporation - WDDM 1.1) Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 210 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GT 630 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 7340 Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) 82945G Express Chipset Family Direct3D9 vs_0_0 ps_2_0)', 'ANGLE (NVIDIA GeForce GT 430 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 7025 / NVIDIA nForce 630a Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) Q35 Express Chipset Family Direct3D9Ex vs_0_0 ps_2_0)', 'ANGLE (Intel(R) HD Graphics 4600 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 7520G Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD 760G (Microsoft Corporation WDDM 1.1) Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GT 220 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 9500 GT Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics Family Direct3D9 vs_3_0 ps_3_0)', 'ANGLE (Intel(R) Graphics Media Accelerator HD Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 9800 GT Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) Q965/Q963 Express Chipset Family (Microsoft Corporation - WDDM 1.0) Direct3D9Ex vs_0_0 ps_2_0)', 'ANGLE (NVIDIA GeForce GTX 550 Ti Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) Q965/Q963 Express Chipset Family Direct3D9Ex vs_0_0 ps_2_0)', 'ANGLE (AMD M880G with ATI Mobility Radeon HD 4250 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GTX 650 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (ATI Mobility Radeon HD 5650 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (ATI Radeon HD 4200 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 7700 Series Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) G33/G31 Express Chipset Family)', 'ANGLE (Intel(R) 82945G Express Chipset Family Direct3D9Ex vs_0_0 ps_2_0)', 'ANGLE (SiS Mirage 3 Graphics Direct3D9Ex vs_2_0 ps_2_0)', 'ANGLE (NVIDIA GeForce GT 430)', 'ANGLE (AMD RADEON HD 6450 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (ATI Radeon 3000 Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) 4 Series Internal Chipset Direct3D9 vs_3_0 ps_3_0)', 'ANGLE (Intel(R) Q35 Express Chipset Family (Microsoft Corporation - WDDM 1.0) Direct3D9Ex vs_0_0 ps_2_0)', 'ANGLE (NVIDIA GeForce GT 220 Direct3D9 vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 7640G Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD 760G Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 6450 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GT 640 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 9200 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GT 610 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 6290 Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (ATI Mobility Radeon HD 4250 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 8600 GT Direct3D9 vs_3_0 ps_3_0)', 'ANGLE (ATI Radeon HD 5570 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 6800 Series Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) G45/G43 Express Chipset Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (ATI Radeon HD 4600 Series Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA Quadro NVS 160M Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics 3000)', 'ANGLE (NVIDIA GeForce G100)', 'ANGLE (AMD Radeon HD 8610G + 8500M Dual Graphics Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Mobile Intel(R) 4 Series Express Chipset Family Direct3D9 vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 7025 / NVIDIA nForce 630a (Microsoft Corporation - WDDM) Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) Q965/Q963 Express Chipset Family Direct3D9 vs_0_0 ps_2_0)', 'ANGLE (AMD RADEON HD 6350 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (ATI Radeon HD 5450 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce 9500 GT)', 'ANGLE (AMD Radeon HD 6500M/5600/5700 Series Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Mobile Intel(R) 965 Express Chipset Family)', 'ANGLE (NVIDIA GeForce 8400 GS Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (Intel(R) HD Graphics Direct3D9 vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GTX 560 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GT 620 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GTX 660 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon(TM) HD 6520G Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA GeForce GT 240 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (AMD Radeon HD 8240 Direct3D9Ex vs_3_0 ps_3_0)', 'ANGLE (NVIDIA Quadro NVS 140M)', 'ANGLE (Intel(R) Q35 Express Chipset Family Direct3D9 vs_0_0 ps_2_0)'];

const generateUserAgent = new UserAgent({
  deviceCategory: 'desktop',
  platform: 'Win32',
});

const FINGERPRINTS = Array(100).fill().map(() => generateUserAgent());

const UINT32_MAX = (2 ** 32) - 1;

function getBrowserFingerprint(buid) {
  const buidHash = crypto.createHash('sha512').update(buid).digest();

  const WEBGL_PARAMETER = {
    WEBGL_VENDOR: 'Google Inc.',
    WEBGL_RENDERER: WEBGL_RENDERERS[Math.floor(Math.random() * WEBGL_RENDERERS.length)],
  };
  const FINGERPRINT = Object.assign(FINGERPRINTS[Math.floor(Math.random() * FINGERPRINTS.length)].data, WEBGL_PARAMETER);
  FINGERPRINT.BUID = buidHash.toString('base64');
  FINGERPRINT.random = (index) => {
    const idx = index % 124;
    if (idx < 62) return buidHash.readUInt32BE(idx) / UINT32_MAX;
    return buidHash.readUInt32LE(idx - 62) / UINT32_MAX;
  };
  return FINGERPRINT;
}


const disguisePage = async function disguisePage(page, {
  browserUniqueID = '4f5e968b-0acd-43d0-b3c9-cf800c4389ef',
  logger,
  minWidth = 1280,
  minHeight = 1024,
  disguiseFlags = [],
} = {}) {
  const FINGERPRINT = getBrowserFingerprint(browserUniqueID || uuid.v4());
  console.log(`fingerprint-webgl-vendor-${FINGERPRINT.WEBGL_VENDOR}`);
  console.log(`fingerprint-webgl-renderer-${FINGERPRINT.WEBGL_RENDERER}`);
  console.log(`fingerprint-ua-ua-${FINGERPRINT.userAgent}`);
  console.log(`fingerprint-ua-platform-${FINGERPRINT.platform}`);
  console.log(`fingerprint-deviceCategory-${FINGERPRINT.deviceCategory}`);
  console.log(`fingerprint-viewportHeight-${FINGERPRINT.viewportHeight}`);
  console.log(`fingerprint-viewportWidth-${FINGERPRINT.viewportWidth}`);


  const LOG_OVERRIDE = true;
  if (LOG_OVERRIDE) {
    await page.on('pageerror', err => console.log('PAGE ERR:', err));
  }

  const DIMENSION = {
    isLandscape: true,
    width: minWidth > FINGERPRINT.viewportWidth ? minWidth : (parseInt(minWidth + (FINGERPRINT.random(0)
      * (FINGERPRINT.screenWidth - minWidth)), 10)),
    height: minHeight > FINGERPRINT.viewportHeight ? minHeight : (parseInt(minHeight + (FINGERPRINT.random(1)
      * (FINGERPRINT.screenHeight - minHeight)), 10)),
  };

  /* eslint-disable no-undef, no-restricted-properties, no-underscore-dangle */
  await page.evaluateOnNewDocument((fingerprint, LO, isVisibleStr, D, flags) => {
    const F = new Set(flags);


    function buildPlugin(spec) {
      const plugin = spec;
      plugin.length = spec.mimeTypes.length;
      spec.mimeTypes.forEach((m, i) => {
        plugin[i] = m;
        Object.assign(m, {
          enabledPlugin: plugin,
        });
      });
      // eslint-disable-next-line no-param-reassign
      delete spec.mimeTypes;
      return plugin;
    }

    const plugins = {
      length: 4,
      0: buildPlugin({
        mimeTypes: [{
          type: 'application/x-google-chrome-pdf',
          suffixes: 'pdf',
          description: 'Portable Document Format',
          enabledPlugin: true,
        }],
        name: 'Chrome PDF Plugin',
        description: 'Portable Document Format',
        filename: 'internal-pdf-viewer',
      }),
      1: buildPlugin({
        mimeTypes: [{
          type: 'application/pdf',
          suffixes: 'pdf',
          description: '',
          enabledPlugin: true,
        }],
        name: 'Chrome PDF Viewer',
        description: '',
        filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
      }),
      2: buildPlugin({
        mimeTypes: [{
          type: 'application/x-nacl',
          suffixes: '',
          description: 'Native Client Executable',
          enabledPlugin: true,
        }, {
          type: 'application/x-pnacl',
          suffixes: '',
          description: 'Portable Native Client Executable',
          enabledPlugin: true,
        }],
        name: 'Native Client',
        description: '',
        filename: 'internal-nacl-plugin',
      }),
      3: buildPlugin({
        mimeTypes: [{
          type: 'application/x-ppapi-widevine-cdm',
          suffixes: '',
          description: 'Widevine Content Decryption Module',
          enabledPlugin: true,
        }],
        name: 'Widevine Content Decryption Module',
        description: 'Enables Widevine licenses for playback of HTML audio/video content. (version: 1.4.9.1070)',
        filename: fingerprint.platform === 'Win32' ? 'widevinecdmadapter.dll' : 'widevinecdmadapter.plugin',
      }),
    };


    window.screen.__defineGetter__('width', function () { return fingerprint.screenWidth });
    window.screen.__defineGetter__('availWidth', function () { return fingerprint.screenWidth });
    window.__defineGetter__('innerWidth', function () { return D.width });
    window.__defineGetter__('outerWidth', function () { D.width });
    window.screen.__defineGetter__('height', function () { fingerprint.screenHeight });
    window.screen.__defineGetter__('availHeight', function () { fingerprint.screenHeight });
    window.__defineGetter__('innerHeight', function () { D.height - 74 });
    window.__defineGetter__('outerHeight', function () { D.height });
    window.navigator.__defineGetter__('userAgent', function () { fingerprint.userAgent });
    window.navigator.__defineGetter__('platform', function () { fingerprint.platform });
    window.navigator.__defineGetter__('appName', function () { fingerprint.appName });
    window.navigator.__defineGetter__('webdriver', function () { undefined });
    window.navigator.__defineGetter__('plugins', function () { plugins });

    // reject webRTC fingerprinting
    window.__defineGetter__('MediaStreamTrack', function () { undefined });
    window.__defineGetter__('RTCPeerConnection', function () { undefined });
    window.__defineGetter__('RTCSessionDescription', function () { undefined });
    window.__defineGetter__('webkitMediaStreamTrack', function () { undefined });
    window.__defineGetter__('webkitRTCPeerConnection', function () { undefined });
    window.__defineGetter__('webkitRTCSessionDescription', function () { undefined });
    var canvas;
    // spoof canvas detection
    if (!F.has('-canvas')) {
      function WebGLRenderingContext(cvs) {
        this.extension = {
          UNMASKED_VENDOR_WEBGL: 37445,
          UNMASKED_RENDERER_WEBGL: 37446,
        };
        this.canvas = cvs;
        this.parameter = '';
        this.viewportWidth = cvs.width;
        this.viewportHeight = cvs.height;
        this.supportedExtensions = ['ANGLE_instanced_arrays', 'EXT_blend_minmax', 'EXT_color_buffer_half_float', 'EXT_frag_depth', 'EXT_shader_texture_lod', 'EXT_texture_filter_anisotropic', 'WEBKIT_EXT_texture_filter_anisotropic', 'EXT_sRGB', 'OES_element_index_uint', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear', 'OES_vertex_array_object', 'WEBGL_color_buffer_float', 'WEBGL_compressed_texture_s3tc', 'WEBKIT_WEBGL_compressed_texture_s3tc', 'WEBGL_compressed_texture_s3tc_srgb', 'WEBGL_debug_renderer_info', 'WEBGL_debug_shaders', 'WEBGL_depth_texture', 'WEBKIT_WEBGL_depth_texture', 'WEBGL_draw_buffers', 'WEBGL_lose_context', 'WEBKIT_WEBGL_lose_context'];


        this.getExtension = function () {
          return this.extension;
        }

        this.getParameter = function () {
          return this.extension;
        }

        this.getSupportedExtensions = function () {
          return this.supportedExtensions;
        }
      }


      const originalFunction = HTMLCanvasElement.prototype.toDataURL;
      HTMLCanvasElement.prototype.toDataURL = function (type) {
        if (type === 'image/png' && this.width === 220 && this.height === 30) {
          // this is likely a fingerprint attempt, return fake fingerprint
          return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAAAeCAAAAABiES/iAAACeElEQVRYw+2YzUtUURjGf47OmDPh5AyFomUiEeEmyghXtWsh4dcswlYV2KYWfZh/QRBUVLhTCCJXEgmKUCIkFhJREARBkbkyKBlTRmUC82lxZ7z3TjM4whwXwz2ry3vO87znx33Pey4XFfHAg/PgPDgPzoPz4Dy4rFIKscSkAfmnsUY+iTfXFhxue4Zm4QpfaKbg8k+EsZNsGG6iNVzRMrkZeRPmjp6eCgcae5f+3wJIgtWLldG+DUnfzoail1etaVsEa1f2lUqw2hPd3T7nCrkMtlkQ24YDwP8+FZkI+gY3uq2cTcu54GIA/dJCDUAnSE4RdAESdALUxZ0hl4E5OMs49iE528E5a+cj5YFhDVI3vLA2c4K+zLXpvR37tNRDs3STg1OJqXqQSwS14wlJUD+VeHWAW86Qy8BwQ5Ek/WK/JBgqC72UTvJakmY5lAvurTRPSDrMmKRRcIvgeUo2KmmEI86Qy8DwmVu/ezQIBCSBLzwjKZhujv5cZZmUNkAq57ekRXCLYDG12pre5Qy5DAzDXbPfIOB/JqmCzNafCZd+dMA5RfZxdsBlNTAMF+FJfD2eSvSI0iGpmXe5GnbG3qyyHAO3yCZxlGV2uBLWDcJVMZKc7UrnfIBvQI+pHpxbS34ZaNkK7gYN0yvTDSCXyCZxNJTscFFe/DUH1w3QvpnzPiUPdTXfsvxZDdBGmeQU2SQd9lWQHS5m9J6Ln4/suZCwc96D25qM1formq5/3ApOX1uDkZ7P7JXkENkkK5eqQm3flRtuvitSYgCucKOf0zv01bazcG3Tyz8GKukvSjjrlB3/U5Rw42dqAo29yypKOO8figeX1/gH+zX9JqfOeUwAAAAASUVORK5CYII=';
        }
        // otherwise, just use the original function
        return originalFunction.apply(this, arguments);
      };
    }

    function hookPrototypeMethods(prefix, object) {
      // TODO: also hook getters
      if (!object) return;
      const originals = {};
      const prototype = Object.getPrototypeOf(object);
      Object
        .getOwnPropertyNames(prototype)
        .filter((n) => {
          try {
            return typeof prototype[n] === 'function';
          } catch (error) {
            return false;
          }
        })
        .forEach((n) => {
          originals[n] = prototype[n];
          // eslint-disable-next-line func-names
          prototype[n] = function fn(...args) {
            if (prefix === '2d' && (n === 'strokeText' || n === 'fillText')) {
              const temp = Array.from(args);
              temp[0] = fingerprint.BUID;
              temp[1] = Math.max(0, temp[1] - 2);
              temp[2] = Math.max(0, temp[2] - 2);
              originals[n].call(this, ...temp);
            }

            const result = originals[n].call(this, ...args);
            if (LO) {
              let jsonResult;
              try {
                jsonResult = JSON.stringify(result);
                // eslint-disable-next-line no-empty
              } catch (e) { }
              // eslint-disable-next-line no-console
              console.log('function called', prefix, n, JSON.stringify(args), 'result:', result, jsonResult, `${result}`);
            }
            return result;
          };
        });
    }

    const gls = [];
    try {
      gls.push(document.createElement('canvas').getContext('webgl'));
      gls.push(document.createElement('canvas').getContext('experimental-webgl'));
      // eslint-disable-next-line no-empty
    } catch (e) { }

    gls.forEach((gl) => {
      const glProto = Object.getPrototypeOf(gl);
      const origGetParameter = glProto.getParameter;
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (gl) {
        glProto.getParameter = function getParameter(...args) {
          if (args[0] === debugInfo.UNMASKED_VENDOR_WEBGL) return logOverride('gl.getParameter.UNMASKED_VENDOR_WEBGL', fingerprint.WEBGL_VENDOR);
          if (args[0] === debugInfo.UNMASKED_RENDERER_WEBGL) return logOverride('gl.getParameter.UNMASKED_RENDERER_WEBGL', fingerprint.WEBGL_RENDERER);
          if (args[0] === 33901) return new Float32Array([1, 8191]);
          if (args[0] === 3386) return new Int32Array([16384, 16384]);
          if (args[0] === 35661) return 80;
          if (args[0] === 34076) return 16384;
          if (args[0] === 36349) return 1024;
          if (args[0] === 34024) return 16384;
          if (args[0] === 3379) return 16384;
          if (args[0] === 34921) return 16;
          if (args[0] === 36347) return 1024;

          return origGetParameter.call(this, ...args);
        };
      }
    });

    if (LO) {
      if (!F.has('-canvas')) {
        hookPrototypeMethods('webgl', document.createElement('canvas').getContext('webgl'));
        hookPrototypeMethods('experimental-webgl', document.createElement('canvas').getContext('experimental-webgl'));
        hookPrototypeMethods('2d', document.createElement('canvas').getContext('2d'));
      }
      hookPrototypeMethods('screen', window.screen);
      hookPrototypeMethods('navigator', window.navigator);
      hookPrototypeMethods('history', window.history);
    }
  }, FINGERPRINT, 'true', DIMENSION, disguiseFlags);
  /* eslint-enable */

  // refresh page to hook getters (overrides)
  await page.goto('about:blank');

  // eslint-disable-next-line no-undef
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
  });

  await page.setViewport(DIMENSION);
  await page.setDefaultNavigationTimeout(120000);
  await page.setDefaultTimeout(120000);
}

module.exports = {
  disguisePage
}