webpackHotUpdate_N_E("pages/posts/[slug]",{

/***/ "./src/pages/posts/[slug].tsx":
/*!************************************!*\
  !*** ./src/pages/posts/[slug].tsx ***!
  \************************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSG", function() { return __N_SSG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlogPost; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_mdx_remote_hydrate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-mdx-remote/hydrate */ "./node_modules/next-mdx-remote/hydrate.js");
/* harmony import */ var next_mdx_remote_hydrate__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_mdx_remote_hydrate__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_Link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/Link */ "./node_modules/next/Link.js");
/* harmony import */ var next_Link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_Link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/layout */ "./src/components/layout.tsx");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/seo */ "./src/components/seo.tsx");
/* harmony import */ var _components_svg_comments_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/svg/comments-icon */ "./src/components/svg/comments-icon.tsx");
/* harmony import */ var _components_svg_like_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/svg/like-icon */ "./src/components/svg/like-icon.tsx");
/* harmony import */ var _components_svg_retweet_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/svg/retweet-icon */ "./src/components/svg/retweet-icon.tsx");
/* harmony import */ var _components_svg_twitter_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/svg/twitter-icon */ "./src/components/svg/twitter-icon.tsx");
/* harmony import */ var _components_text_link__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/text-link */ "./src/components/text-link.tsx");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/format */ "./src/utils/format.ts");



var _jsxFileName = "C:\\Coding\\Web Dev\\Production\\quests-in-code\\src\\pages\\posts\\[slug].tsx",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;












var __N_SSG = true;
function BlogPost(props) {
  _s();

  var _this = this;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      webmentions = _useState[0],
      setWebmentions = _useState[1];

  var postUrl = "https://questsincode.com/posts/".concat(props.slug, "/");
  var twitterShareUrl = "https://twitter.com/share?url=".concat(postUrl, "&text=\u201C").concat(props.title, "\u201D, a post from Danny Libin.&via=Dayn1l");
  var twitterSearchUrl = "https://twitter.com/search?q=".concat(postUrl, "/");
  console.time('postHydration');
  var hydratedPost = next_mdx_remote_hydrate__WEBPACK_IMPORTED_MODULE_3___default()(props.source);
  console.timeEnd('postHydration');
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    function getWebmentions() {
      return _getWebmentions.apply(this, arguments);
    }

    function _getWebmentions() {
      _getWebmentions = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fetch("https://webmention.io/api/mentions.json?per-page=1000&page=0&target=".concat(postUrl));

              case 3:
                _context.next = 5;
                return _context.sent.json();

              case 5:
                res = _context.sent;
                setWebmentions(res.links);
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.log('Failed to get webmentions', _context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));
      return _getWebmentions.apply(this, arguments);
    }

    getWebmentions();
  }, []);
  var hearts = []; //for (let i = 0; i < Math.ceil(timeToRead / 3); i++) {

  for (var i = 0; i < 3; i++) {
    hearts.push(__jsx("img", {
      key: i,
      src: "/images/heart.png",
      alt: "Pixel heart",
      style: {
        height: '24px',
        imageRendering: 'pixelated'
      },
      className: i > 0 ? 'ml-1' : '',
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 7
      }
    }));
  }

  var postTags = !props.tags.length ? null : props.tags.map(function (tag, index) {
    return __jsx(next_Link__WEBPACK_IMPORTED_MODULE_4___default.a, {
      key: index,
      href: "/topics?topic=".concat(tag),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 9
      }
    }, __jsx("span", {
      className: 'py-1 px-4 ml-4 text-sm font-semibold tracking-widest rounded-full cursor-pointer transition duration-200 ease-in-out bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-700',
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 11
      }
    }, tag));
  });
  var webmentionContent = !webmentions ? null : webmentions.filter(function (mention, i) {
    var _mention$activity, _mention$activity2, _mention$data, _mention$data$author, _mention$data2, _mention$data2$author, _mention$data3, _mention$data3$author;

    var isComment = ((_mention$activity = mention.activity) === null || _mention$activity === void 0 ? void 0 : _mention$activity.type) === 'link' || ((_mention$activity2 = mention.activity) === null || _mention$activity2 === void 0 ? void 0 : _mention$activity2.type) === 'reply';
    var hasAuthor = ((_mention$data = mention.data) === null || _mention$data === void 0 ? void 0 : (_mention$data$author = _mention$data.author) === null || _mention$data$author === void 0 ? void 0 : _mention$data$author.name) && ((_mention$data2 = mention.data) === null || _mention$data2 === void 0 ? void 0 : (_mention$data2$author = _mention$data2.author) === null || _mention$data2$author === void 0 ? void 0 : _mention$data2$author.photo) && ((_mention$data3 = mention.data) === null || _mention$data3 === void 0 ? void 0 : (_mention$data3$author = _mention$data3.author) === null || _mention$data3$author === void 0 ? void 0 : _mention$data3$author.url);
    return isComment && hasAuthor;
  }).sort(function (a, b) {
    if (!a.data.published_ts || !b.data.published_ts) return 999;
    return a.data.published_ts - b.data.published_ts;
  }).map(function (mention, i) {
    var longMention = mention.data.content.length > 1000;
    return __jsx("div", {
      key: i,
      className: 'flex justify-between mt-6 p-2' + (mention.data.author.url === 'https://twitter.com/mxbck' ? ' rounded-md bg-gray-200 dk:bg-gray-800' : ''),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 13
      }
    }, __jsx("div", {
      className: "w-1/12 mt-1",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 15
      }
    }, __jsx("a", {
      href: mention.data.url,
      target: "_blank",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 17
      }
    }, __jsx("img", {
      src: mention.data.author.photo,
      alt: mention.data.author.name,
      className: "rounded-full w-12",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 139,
        columnNumber: 19
      }
    }))), __jsx("div", {
      className: "w-11/12",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 146,
        columnNumber: 15
      }
    }, __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 17
      }
    }, __jsx(_components_text_link__WEBPACK_IMPORTED_MODULE_12__["default"], {
      href: mention.data.url,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 148,
        columnNumber: 19
      }
    }, __jsx("span", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 21
      }
    }, mention.data.author.name)), ' ', "\u22C5", ' ', __jsx("span", {
      className: "text-gray-700 dk:text-gray-500 text-base",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 19
      }
    }, Object(_utils_format__WEBPACK_IMPORTED_MODULE_13__["humanDateFromEpoch"])(mention.data.published_ts))), __jsx("div", {
      className: "mt-1 comments-text",
      dangerouslySetInnerHTML: {
        __html: dompurify__WEBPACK_IMPORTED_MODULE_2___default.a.sanitize(longMention ? mention.activity.sentence_html : mention.data.content)
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 17
      }
    })));
  });
  return __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_6__["default"], {
    path: '',
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 5
    }
  }, __jsx(_components_seo__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: props.title,
    description: props.description,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 7
    }
  }), __jsx("div", {
    className: "mt-24",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "text-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "flex flex-wrap justify-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 11
    }
  }, postTags), __jsx("h1", {
    className: "my-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 11
    }
  }, props.title), __jsx("div", {
    className: "mb-8 text-gray-700 dk:text-gray-500 flex justify-center flex-col sm:flex-row sm:text-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 11
    }
  }, __jsx("span", {
    className: "mr-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 13
    }
  }, props.date, " ", __jsx("span", {
    className: "hidden sm:inline-block",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 28
    }
  }, "\u2022"), ' '), __jsx("span", {
    className: "flex items-center justify-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 13
    }
  }, __jsx("span", {
    className: "flex mr-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 15
    }
  }, hearts), " ", 3, " minute read"))), __jsx("div", {
    className: "w-full",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 9
    }
  }), __jsx("div", {
    className: "mt-20",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 9
    }
  }, hydratedPost), __jsx("a", {
    href: twitterShareUrl,
    target: "_blank",
    className: "flex flex-row mt-12",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 9
    }
  }, __jsx(_components_svg_twitter_icon__WEBPACK_IMPORTED_MODULE_11__["default"], {
    className: "text-dblue-500 hover:text-dblue-300 transition-colors ease-in-out duration-300 w-24",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200,
      columnNumber: 11
    }
  }), __jsx("span", {
    className: "ml-4 p-4 bg-dblue-200 dk:bg-dblue-800 text-dblue-800 dk:text-dblue-200 text-2xl rounded-md",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201,
      columnNumber: 11
    }
  }, "Found this article useful? Click to share, discuss and spread the word!! \uD83C\uDF89")), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 206,
      columnNumber: 9
    }
  }, "Webmentions (", __jsx(_components_text_link__WEBPACK_IMPORTED_MODULE_12__["default"], {
    href: "https://indieweb.org/Webmention",
    className: "text-lg border-b-0",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 11
    }
  }, "\u2754"), ")"), !webmentions || !webmentions.length ? __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 217,
      columnNumber: 11
    }
  }, "No comments yet.", ' ', __jsx(_components_text_link__WEBPACK_IMPORTED_MODULE_12__["default"], {
    href: twitterShareUrl,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 219,
      columnNumber: 13
    }
  }, "Start the conversation!"), ' ', "Your post will show up here.") : __jsx("div", {
    className: "mt-10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 11
    }
  }, __jsx("a", {
    href: twitterSearchUrl,
    target: "_blank",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "flex",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "flex",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226,
      columnNumber: 17
    }
  }, __jsx(_components_svg_like_icon__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: "w-6 text-red-600",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 227,
      columnNumber: 19
    }
  }), ' ', __jsx("span", {
    className: "ml-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 228,
      columnNumber: 19
    }
  }, webmentions.filter(function (mention) {
    return mention.activity.type === 'like';
  }).length)), __jsx("div", {
    className: "flex ml-6",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 17
    }
  }, __jsx(_components_svg_retweet_icon__WEBPACK_IMPORTED_MODULE_10__["default"], {
    className: "w-8 text-blue-500",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 19
    }
  }), ' ', __jsx("span", {
    className: "ml-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 19
    }
  }, webmentions.filter(function (mention) {
    return mention.activity.type === 'repost';
  }).length)), __jsx("div", {
    className: "flex ml-6",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 17
    }
  }, __jsx(_components_svg_comments_icon__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "w-6 text-blue-500",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 19
    }
  }), ' ', __jsx("span", {
    className: "ml-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 19
    }
  }, webmentions.filter(function (mention) {
    return mention.activity.type === 'reply';
  }).length)))), __jsx("div", {
    className: "mt-6",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 13
    }
  }, __jsx(_components_text_link__WEBPACK_IMPORTED_MODULE_12__["default"], {
    href: twitterSearchUrl,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 259,
      columnNumber: 15
    }
  }, "Join the conversation!")), __jsx("div", {
    className: "mt-6",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 263,
      columnNumber: 13
    }
  }, webmentionContent))));
}

_s(BlogPost, "NWbU30DNvCbh/NrJXyW+y1tUhLA=");

_c = BlogPost;

var _c;

$RefreshReg$(_c, "BlogPost");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL3Bvc3RzL1tzbHVnXS50c3giXSwibmFtZXMiOlsiQmxvZ1Bvc3QiLCJwcm9wcyIsInVzZVN0YXRlIiwid2VibWVudGlvbnMiLCJzZXRXZWJtZW50aW9ucyIsInBvc3RVcmwiLCJzbHVnIiwidHdpdHRlclNoYXJlVXJsIiwidGl0bGUiLCJ0d2l0dGVyU2VhcmNoVXJsIiwiY29uc29sZSIsInRpbWUiLCJoeWRyYXRlZFBvc3QiLCJoeWRyYXRlIiwic291cmNlIiwidGltZUVuZCIsInVzZUVmZmVjdCIsImdldFdlYm1lbnRpb25zIiwiZmV0Y2giLCJqc29uIiwicmVzIiwibGlua3MiLCJsb2ciLCJoZWFydHMiLCJpIiwicHVzaCIsImhlaWdodCIsImltYWdlUmVuZGVyaW5nIiwicG9zdFRhZ3MiLCJ0YWdzIiwibGVuZ3RoIiwibWFwIiwidGFnIiwiaW5kZXgiLCJ3ZWJtZW50aW9uQ29udGVudCIsImZpbHRlciIsIm1lbnRpb24iLCJpc0NvbW1lbnQiLCJhY3Rpdml0eSIsInR5cGUiLCJoYXNBdXRob3IiLCJkYXRhIiwiYXV0aG9yIiwibmFtZSIsInBob3RvIiwidXJsIiwic29ydCIsImEiLCJiIiwicHVibGlzaGVkX3RzIiwibG9uZ01lbnRpb24iLCJjb250ZW50IiwiaHVtYW5EYXRlRnJvbUVwb2NoIiwiX19odG1sIiwiRE9NUHVyaWZ5Iiwic2FuaXRpemUiLCJzZW50ZW5jZV9odG1sIiwiZGVzY3JpcHRpb24iLCJkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUlBO0FBRUE7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBZ0NlLFNBQVNBLFFBQVQsQ0FDYkMsS0FEYSxFQUViO0FBQUE7O0FBQUE7O0FBQUEsa0JBQ3NDQyxzREFBUSxDQUFlLElBQWYsQ0FEOUM7QUFBQSxNQUNPQyxXQURQO0FBQUEsTUFD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QUFVLFFBQUksRUFBRXJCLGdCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQURGLENBbkNGLEVBd0NFO0FBQUssYUFBUyxFQUFDLE1BQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF1QnlCLGlCQUF2QixDQXhDRixDQWpESixDQUZGLENBREY7QUFrR0Q7O0dBMU51QmxDLFE7O0tBQUFBLFEiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvcG9zdHMvW3NsdWddLjBjNDI1OTA1NjEzMDliYjYyOTdhLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRE9NUHVyaWZ5IGZyb20gJ2RvbXB1cmlmeSc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInO1xyXG5pbXBvcnQgeyBJbmZlckdldFN0YXRpY1Byb3BzVHlwZSB9IGZyb20gJ25leHQnO1xyXG5pbXBvcnQgaHlkcmF0ZSBmcm9tICduZXh0LW1keC1yZW1vdGUvaHlkcmF0ZSc7XHJcbmltcG9ydCByZW5kZXJUb1N0cmluZyBmcm9tICduZXh0LW1keC1yZW1vdGUvcmVuZGVyLXRvLXN0cmluZyc7XHJcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvTGluayc7XHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBoaWdobGlnaHQgZnJvbSAncmVoeXBlLWhpZ2hsaWdodCc7XHJcbmltcG9ydCB2aXNpdCBmcm9tICd1bmlzdC11dGlsLXZpc2l0JztcclxuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xheW91dCc7XHJcbmltcG9ydCBTRU8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zZW8nO1xyXG5pbXBvcnQgQ29tbWVudHNJY29uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3ZnL2NvbW1lbnRzLWljb24nO1xyXG5pbXBvcnQgTGlrZUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zdmcvbGlrZS1pY29uJztcclxuaW1wb3J0IFJldHdlZXRJY29uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3ZnL3JldHdlZXQtaWNvbic7XHJcbmltcG9ydCBUd2l0dGVySWNvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL3N2Zy90d2l0dGVyLWljb24nO1xyXG5pbXBvcnQgVGV4dExpbmsgZnJvbSAnLi4vLi4vY29tcG9uZW50cy90ZXh0LWxpbmsnO1xyXG5pbXBvcnQgeyBodW1hbkRhdGVGcm9tRXBvY2ggfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQnO1xyXG5pbXBvcnQgeyBQb3N0TWF0dGVyIH0gZnJvbSAnLi4vcG9zdHMnO1xyXG5cclxuaW50ZXJmYWNlIFdlYm1lbnRpb24ge1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG4gIHZlcmlmaWVkOiBib29sZWFuO1xyXG4gIHZlcmlmaWVkX2RhdGU6IHN0cmluZztcclxuICBpZDogbnVtYmVyO1xyXG4gIHByaXZhdGU6IGJvb2xlYW47XHJcbiAgZGF0YToge1xyXG4gICAgYXV0aG9yOiB7XHJcbiAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgdXJsOiBzdHJpbmc7XHJcbiAgICAgIHBob3RvOiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgLyoqIHVybCBsaW5rIHRvIHRoZSBwb3N0aW5nIGxvY2F0aW9uIChlLmcuIFR3aXR0ZXIgcG9zdCkgKi9cclxuICAgIHVybDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nIHwgbnVsbDtcclxuICAgIC8qKiBUaGUgZnVsbCBjb250ZW50IG9mIHRoZSBtZW50aW9uLCBhcHBsaWNhYmxlIG9ubHkgdG8gcmVwbHkgdHlwZT8gKi9cclxuICAgIGNvbnRlbnQ6IHN0cmluZyB8IG51bGw7XHJcbiAgICAvKiogT25seSByZXBsaWVzIGhhdmUgcHVibGlzaCBkYXRlcyAqL1xyXG4gICAgcHVibGlzaGVkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHVibGlzaGVkX3RzOiBudW1iZXIgfCBudWxsO1xyXG4gIH07XHJcbiAgYWN0aXZpdHk6IHtcclxuICAgIHR5cGU6ICdsaW5rJyB8ICdsaWtlJyB8ICdyZXBseScgfCAncmVwb3N0JyB8ICdtZW50aW9uJyB8ICdib29rbWFyayc7XHJcbiAgICBzZW50ZW5jZTogJ3N0cmluZyc7XHJcbiAgICBzZW50ZW5jZV9odG1sOiAnc3RyaW5nJztcclxuICB9O1xyXG4gIHRhcmdldDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCbG9nUG9zdChcclxuICBwcm9wczogSW5mZXJHZXRTdGF0aWNQcm9wc1R5cGU8dHlwZW9mIGdldFN0YXRpY1Byb3BzPlxyXG4pIHtcclxuICBjb25zdCBbd2VibWVudGlvbnMsIHNldFdlYm1lbnRpb25zXSA9IHVzZVN0YXRlPFdlYm1lbnRpb25bXT4obnVsbCk7XHJcblxyXG4gIGNvbnN0IHBvc3RVcmwgPSBgaHR0cHM6Ly9xdWVzdHNpbmNvZGUuY29tL3Bvc3RzLyR7cHJvcHMuc2x1Z30vYDtcclxuICBjb25zdCB0d2l0dGVyU2hhcmVVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZT91cmw9JHtwb3N0VXJsfSZ0ZXh0PeKAnCR7cHJvcHMudGl0bGV94oCdLCBhIHBvc3QgZnJvbSBEYW5ueSBMaWJpbi4mdmlhPURheW4xbGA7XHJcbiAgY29uc3QgdHdpdHRlclNlYXJjaFVybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL3NlYXJjaD9xPSR7cG9zdFVybH0vYDtcclxuXHJcbiAgY29uc29sZS50aW1lKCdwb3N0SHlkcmF0aW9uJyk7XHJcbiAgY29uc3QgaHlkcmF0ZWRQb3N0ID0gaHlkcmF0ZShwcm9wcy5zb3VyY2UpO1xyXG4gIGNvbnNvbGUudGltZUVuZCgncG9zdEh5ZHJhdGlvbicpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0V2VibWVudGlvbnMoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgKFxyXG4gICAgICAgICAgYXdhaXQgZmV0Y2goXHJcbiAgICAgICAgICAgIGBodHRwczovL3dlYm1lbnRpb24uaW8vYXBpL21lbnRpb25zLmpzb24/cGVyLXBhZ2U9MTAwMCZwYWdlPTAmdGFyZ2V0PSR7cG9zdFVybH1gXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKS5qc29uKCk7XHJcbiAgICAgICAgc2V0V2VibWVudGlvbnMocmVzLmxpbmtzKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gZ2V0IHdlYm1lbnRpb25zJywgZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFdlYm1lbnRpb25zKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoZWFydHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW1nJ11bXSA9IFtdO1xyXG4gIC8vZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLmNlaWwodGltZVRvUmVhZCAvIDMpOyBpKyspIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgaGVhcnRzLnB1c2goXHJcbiAgICAgIDxpbWdcclxuICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgc3JjPVwiL2ltYWdlcy9oZWFydC5wbmdcIlxyXG4gICAgICAgIGFsdD1cIlBpeGVsIGhlYXJ0XCJcclxuICAgICAgICBzdHlsZT17eyBoZWlnaHQ6ICcyNHB4JywgaW1hZ2VSZW5kZXJpbmc6ICdwaXhlbGF0ZWQnIH19XHJcbiAgICAgICAgY2xhc3NOYW1lPXtpID4gMCA/ICdtbC0xJyA6ICcnfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBvc3RUYWdzID0gIXByb3BzLnRhZ3MubGVuZ3RoXHJcbiAgICA/IG51bGxcclxuICAgIDogcHJvcHMudGFncy5tYXAoKHRhZywgaW5kZXgpID0+IChcclxuICAgICAgICA8TGluayBrZXk9e2luZGV4fSBocmVmPXtgL3RvcGljcz90b3BpYz0ke3RhZ31gfT5cclxuICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgJ3B5LTEgcHgtNCBtbC00IHRleHQtc20gZm9udC1zZW1pYm9sZCB0cmFja2luZy13aWRlc3Qgcm91bmRlZC1mdWxsIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24gZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0IGJnLWRibHVlLTEwMCB0ZXh0LWRibHVlLTcwMCBob3ZlcjpiZy1kYmx1ZS0yMDAgZGs6YmctYmx1ZS05MDAgZGs6dGV4dC1kYmx1ZS0xMDAgZGstaG92ZXI6YmctYmx1ZS03MDAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3RhZ31cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L0xpbms+XHJcbiAgICAgICkpO1xyXG5cclxuICBjb25zdCB3ZWJtZW50aW9uQ29udGVudCA9ICF3ZWJtZW50aW9uc1xyXG4gICAgPyBudWxsXHJcbiAgICA6IHdlYm1lbnRpb25zXHJcbiAgICAgICAgLmZpbHRlcigobWVudGlvbiwgaSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaXNDb21tZW50ID1cclxuICAgICAgICAgICAgbWVudGlvbi5hY3Rpdml0eT8udHlwZSA9PT0gJ2xpbmsnIHx8XHJcbiAgICAgICAgICAgIG1lbnRpb24uYWN0aXZpdHk/LnR5cGUgPT09ICdyZXBseSc7XHJcbiAgICAgICAgICBjb25zdCBoYXNBdXRob3IgPVxyXG4gICAgICAgICAgICBtZW50aW9uLmRhdGE/LmF1dGhvcj8ubmFtZSAmJlxyXG4gICAgICAgICAgICBtZW50aW9uLmRhdGE/LmF1dGhvcj8ucGhvdG8gJiZcclxuICAgICAgICAgICAgbWVudGlvbi5kYXRhPy5hdXRob3I/LnVybDtcclxuICAgICAgICAgIHJldHVybiBpc0NvbW1lbnQgJiYgaGFzQXV0aG9yO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgIGlmICghYS5kYXRhLnB1Ymxpc2hlZF90cyB8fCAhYi5kYXRhLnB1Ymxpc2hlZF90cykgcmV0dXJuIDk5OTtcclxuICAgICAgICAgIHJldHVybiBhLmRhdGEucHVibGlzaGVkX3RzIC0gYi5kYXRhLnB1Ymxpc2hlZF90cztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5tYXAoKG1lbnRpb24sIGkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGxvbmdNZW50aW9uID0gbWVudGlvbi5kYXRhLmNvbnRlbnQubGVuZ3RoID4gMTAwMDtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgICdmbGV4IGp1c3RpZnktYmV0d2VlbiBtdC02IHAtMicgK1xyXG4gICAgICAgICAgICAgICAgKG1lbnRpb24uZGF0YS5hdXRob3IudXJsID09PSAnaHR0cHM6Ly90d2l0dGVyLmNvbS9teGJjaydcclxuICAgICAgICAgICAgICAgICAgPyAnIHJvdW5kZWQtbWQgYmctZ3JheS0yMDAgZGs6YmctZ3JheS04MDAnXHJcbiAgICAgICAgICAgICAgICAgIDogJycpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEvMTIgbXQtMVwiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj17bWVudGlvbi5kYXRhLnVybH0gdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICBzcmM9e21lbnRpb24uZGF0YS5hdXRob3IucGhvdG99XHJcbiAgICAgICAgICAgICAgICAgICAgYWx0PXttZW50aW9uLmRhdGEuYXV0aG9yLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIHctMTJcIlxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMS8xMlwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgPFRleHRMaW5rIGhyZWY9e21lbnRpb24uZGF0YS51cmx9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnttZW50aW9uLmRhdGEuYXV0aG9yLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L1RleHRMaW5rPnsnICd9XHJcbiAgICAgICAgICAgICAgICAgIOKLhXsnICd9XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZGs6dGV4dC1ncmF5LTUwMCB0ZXh0LWJhc2VcIj5cclxuICAgICAgICAgICAgICAgICAgICB7aHVtYW5EYXRlRnJvbUVwb2NoKG1lbnRpb24uZGF0YS5wdWJsaXNoZWRfdHMpfVxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMSBjb21tZW50cy10ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcclxuICAgICAgICAgICAgICAgICAgICBfX2h0bWw6IERPTVB1cmlmeS5zYW5pdGl6ZShcclxuICAgICAgICAgICAgICAgICAgICAgIGxvbmdNZW50aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbWVudGlvbi5hY3Rpdml0eS5zZW50ZW5jZV9odG1sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbWVudGlvbi5kYXRhLmNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxMYXlvdXQgcGF0aD17Jyd9PlxyXG4gICAgICA8U0VPIHRpdGxlPXtwcm9wcy50aXRsZX0gZGVzY3JpcHRpb249e3Byb3BzLmRlc2NyaXB0aW9ufSAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTI0XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBqdXN0aWZ5LWNlbnRlclwiPntwb3N0VGFnc308L2Rpdj5cclxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJteS0yXCI+e3Byb3BzLnRpdGxlfTwvaDE+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTggdGV4dC1ncmF5LTcwMCBkazp0ZXh0LWdyYXktNTAwIGZsZXgganVzdGlmeS1jZW50ZXIgZmxleC1jb2wgc206ZmxleC1yb3cgc206dGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXItMlwiPlxyXG4gICAgICAgICAgICAgIHtwcm9wcy5kYXRlfSA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lLWJsb2NrXCI+4oCiPC9zcGFuPnsnICd9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IG1yLTJcIj57aGVhcnRzfTwvc3Bhbj4gezN9IG1pbnV0ZSByZWFkXHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsXCI+XHJcbiAgICAgICAgICB7LyogPEltYWdlXHJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInotMCByb3VuZGVkLW1kXCJcclxuICAgICAgICAgICAgICAgZmx1aWQ9e2ZlYXR1cmVkSW1hZ2UuY2hpbGRJbWFnZVNoYXJwLmZsdWlkfVxyXG4gICAgICAgICAgICAgICBhbHQ9e2Zyb250bWF0dGVyLnRpdGxlfVxyXG4gICAgICAgICAgICAgLz4gKi99XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yMFwiPntoeWRyYXRlZFBvc3R9PC9kaXY+XHJcbiAgICAgICAgPGFcclxuICAgICAgICAgIGhyZWY9e3R3aXR0ZXJTaGFyZVVybH1cclxuICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IG10LTEyXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VHdpdHRlckljb24gY2xhc3NOYW1lPVwidGV4dC1kYmx1ZS01MDAgaG92ZXI6dGV4dC1kYmx1ZS0zMDAgdHJhbnNpdGlvbi1jb2xvcnMgZWFzZS1pbi1vdXQgZHVyYXRpb24tMzAwIHctMjRcIiAvPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWwtNCBwLTQgYmctZGJsdWUtMjAwIGRrOmJnLWRibHVlLTgwMCB0ZXh0LWRibHVlLTgwMCBkazp0ZXh0LWRibHVlLTIwMCB0ZXh0LTJ4bCByb3VuZGVkLW1kXCI+XHJcbiAgICAgICAgICAgIEZvdW5kIHRoaXMgYXJ0aWNsZSB1c2VmdWw/IENsaWNrIHRvIHNoYXJlLCBkaXNjdXNzIGFuZCBzcHJlYWQgdGhlXHJcbiAgICAgICAgICAgIHdvcmQhISDwn46JXHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxoMj5cclxuICAgICAgICAgIFdlYm1lbnRpb25zIChcclxuICAgICAgICAgIDxUZXh0TGlua1xyXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9pbmRpZXdlYi5vcmcvV2VibWVudGlvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtbGcgYm9yZGVyLWItMFwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIOKdlFxyXG4gICAgICAgICAgPC9UZXh0TGluaz5cclxuICAgICAgICAgIClcclxuICAgICAgICA8L2gyPlxyXG4gICAgICAgIHshd2VibWVudGlvbnMgfHwgIXdlYm1lbnRpb25zLmxlbmd0aCA/IChcclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIE5vIGNvbW1lbnRzIHlldC57JyAnfVxyXG4gICAgICAgICAgICA8VGV4dExpbmsgaHJlZj17dHdpdHRlclNoYXJlVXJsfT5TdGFydCB0aGUgY29udmVyc2F0aW9uITwvVGV4dExpbms+eycgJ31cclxuICAgICAgICAgICAgWW91ciBwb3N0IHdpbGwgc2hvdyB1cCBoZXJlLlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTBcIj5cclxuICAgICAgICAgICAgPGEgaHJlZj17dHdpdHRlclNlYXJjaFVybH0gdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXhcIj5cclxuICAgICAgICAgICAgICAgICAgPExpa2VJY29uIGNsYXNzTmFtZT1cInctNiB0ZXh0LXJlZC02MDBcIiAvPnsnICd9XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3ZWJtZW50aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb24gPT4gbWVudGlvbi5hY3Rpdml0eS50eXBlID09PSAnbGlrZSdcclxuICAgICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBtbC02XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxSZXR3ZWV0SWNvbiBjbGFzc05hbWU9XCJ3LTggdGV4dC1ibHVlLTUwMFwiIC8+eycgJ31cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHdlYm1lbnRpb25zLmZpbHRlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvbiA9PiBtZW50aW9uLmFjdGl2aXR5LnR5cGUgPT09ICdyZXBvc3QnXHJcbiAgICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggbWwtNlwiPlxyXG4gICAgICAgICAgICAgICAgICA8Q29tbWVudHNJY29uIGNsYXNzTmFtZT1cInctNiB0ZXh0LWJsdWUtNTAwXCIgLz57JyAnfVxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtbC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2VibWVudGlvbnMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uID0+IG1lbnRpb24uYWN0aXZpdHkudHlwZSA9PT0gJ3JlcGx5J1xyXG4gICAgICAgICAgICAgICAgICAgICAgKS5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNlwiPlxyXG4gICAgICAgICAgICAgIDxUZXh0TGluayBocmVmPXt0d2l0dGVyU2VhcmNoVXJsfT5cclxuICAgICAgICAgICAgICAgIEpvaW4gdGhlIGNvbnZlcnNhdGlvbiFcclxuICAgICAgICAgICAgICA8L1RleHRMaW5rPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC02XCI+e3dlYm1lbnRpb25Db250ZW50fTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L0xheW91dD5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUGF0aHMoKSB7XHJcbiAgY29uc3QgZm9sZGVyTmFtZXMgPSBmcy5yZWFkZGlyU3luYyhcclxuICAgIGpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYycsICdjb250ZW50JywgJ3Bvc3RzJylcclxuICApO1xyXG4gIHJldHVybiB7XHJcbiAgICBwYXRoczogZm9sZGVyTmFtZXMubWFwKG5hbWUgPT4gKHsgcGFyYW1zOiB7IHNsdWc6IG5hbWUgfSB9KSksXHJcbiAgICBmYWxsYmFjazogZmFsc2VcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoeyBwYXJhbXMgfSkge1xyXG4gIGNvbnN0IGZpbGVDb250ZW50cyA9IGZzLnJlYWRGaWxlU3luYyhcclxuICAgIGpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYycsICdjb250ZW50JywgJ3Bvc3RzJywgcGFyYW1zLnNsdWcsICdpbmRleC5tZHgnKSxcclxuICAgICd1dGYtOCdcclxuICApO1xyXG5cclxuICBjb25zdCBtYXR0ZXJSZXN1bHQgPSBtYXR0ZXIoZmlsZUNvbnRlbnRzKTtcclxuXHJcbiAgY29uc3QgbWR4U291cmNlID0gYXdhaXQgcmVuZGVyVG9TdHJpbmcobWF0dGVyUmVzdWx0LmNvbnRlbnQsIHtcclxuICAgIG1keE9wdGlvbnM6IHtcclxuICAgICAgcmVtYXJrUGx1Z2luczogW1xyXG4gICAgICAgIGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgIHJldHVybiB0cmVlID0+XHJcbiAgICAgICAgICAgIHZpc2l0KHRyZWUsICdjb2RlJywgKG5vZGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gU3BsaXQgb2ZmIHRoZSB0aXRsZSBmcm9tIHRoZSBsYW5ndWFnZSBhbmQgaW5zZXJ0IGF0IHRpdGxlIGFib3ZlIHRoZSBjb2RlXHJcbiAgICAgICAgICAgICAgY29uc3QgW2xhbmd1YWdlSGwsIHRpdGxlXSA9ICgobm9kZS5sYW5nIHx8ICcnKSBhcyBzdHJpbmcpLnNwbGl0KFxyXG4gICAgICAgICAgICAgICAgJzp0aXRsZT0nXHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgY29uc3QgaGFzSGlnaGxpZ2h0cyA9IGxhbmd1YWdlSGwubWF0Y2goL3soLiopfS9nbSk7XHJcblxyXG4gICAgICAgICAgICAgIGxldCBsYW5ndWFnZSA9IGxhbmd1YWdlSGw7XHJcbiAgICAgICAgICAgICAgaWYgKGhhc0hpZ2hsaWdodHMpIHtcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlID0gbGFuZ3VhZ2VIbC5yZXBsYWNlKC97KC4qKX0vZ20sICcnKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIG5vZGUubGFuZyA9IGxhbmd1YWdlO1xyXG5cclxuICAgICAgICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9ICdyZW1hcmstY29kZS10aXRsZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGVOb2RlID0ge1xyXG4gICAgICAgICAgICAgICAgICB0eXBlOiAnaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPiR7dGl0bGV9PC9kaXY+YC50cmltKClcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdHJlZS5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIHRpdGxlTm9kZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC8vIFRPRE8gRmluZCBhbmQgaGlnaGxpZ2h0IGxpbmVzIGlmIGhhc0hpZ2hsaWdodHNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICByZWh5cGVQbHVnaW5zOiBbaGlnaGxpZ2h0XVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICBzb3VyY2U6IG1keFNvdXJjZSxcclxuICAgICAgc2x1ZzogcGFyYW1zLnNsdWcsXHJcbiAgICAgIC4uLihtYXR0ZXJSZXN1bHQuZGF0YSBhcyBQb3N0TWF0dGVyKVxyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==