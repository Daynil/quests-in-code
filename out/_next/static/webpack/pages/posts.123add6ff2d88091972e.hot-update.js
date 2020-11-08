webpackHotUpdate_N_E("pages/posts",{

/***/ "./src/pages/posts.tsx":
/*!*****************************!*\
  !*** ./src/pages/posts.tsx ***!
  \*****************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSG", function() { return __N_SSG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Posts; });
/* harmony import */ var next_Link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/Link */ "./node_modules/next/Link.js");
/* harmony import */ var next_Link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_Link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.tsx");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.tsx");
var _jsxFileName = "C:\\Coding\\Web Dev\\Production\\quests-in-code\\src\\pages\\posts.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




var __N_SSG = true;
function Posts(props) {
  var _this = this;

  return __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_2__["default"], {
    path: '',
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 5
    }
  }, __jsx(_components_seo__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Posts - Quests In Code",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }
  }), __jsx("div", {
    className: "mt-20",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  }, props.posts.map(function (post, index) {
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
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29,
          columnNumber: 15
        }
      }));
    }

    var postTags = !post.tags.length ? null : post.tags.map(function (tag, index) {
      return __jsx(next_Link__WEBPACK_IMPORTED_MODULE_0___default.a, {
        key: index,
        href: "/topics?topic=".concat(tag),
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 17
        }
      }, __jsx("span", {
        className: 'py-1 px-4 text-sm font-semibold tracking-widest rounded-full cursor-pointer transition duration-200 ease-in-out bg-dblue-100 text-dblue-700 hover:bg-dblue-200 dk:bg-blue-900 dk:text-dblue-100 dk-hover:bg-blue-700' + (index >= 1 ? ' ml-4' : ''),
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 19
        }
      }, tag));
    });
    return __jsx("div", {
      className: "mt-12",
      key: index,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 13
      }
    }, __jsx("div", {
      className: "mb-4 flex flex-wrap",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 15
      }
    }, postTags), __jsx(next_Link__WEBPACK_IMPORTED_MODULE_0___default.a, {
      href: "/posts/".concat(post.slug),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 15
      }
    }, __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 17
      }
    }, __jsx("h2", {
      className: "my-2",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 19
      }
    }, post.title), __jsx("div", {
      className: "mb-8 text-gray-700 dk:text-gray-500 flex flex-col sm:flex-row sm:text-center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 19
      }
    }, __jsx("span", {
      className: "mr-2",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 21
      }
    }, post.date, ' ', __jsx("span", {
      className: "hidden sm:inline-block",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 23
      }
    }, "\u2022"), ' '), __jsx("span", {
      className: "flex items-center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 21
      }
    }, __jsx("span", {
      className: "flex mr-2",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 23
      }
    }, hearts), " ", 3, " minute read")), __jsx("p", {
      className: "-mt-2",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 19
      }
    }, post.description))));
  })));
}
_c = Posts;

var _c;

$RefreshReg$(_c, "Posts");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL3Bvc3RzLnRzeCJdLCJuYW1lcyI6WyJQb3N0cyIsInByb3BzIiwicG9zdHMiLCJtYXAiLCJwb3N0IiwiaW5kZXgiLCJoZWFydHMiLCJpIiwicHVzaCIsImhlaWdodCIsImltYWdlUmVuZGVyaW5nIiwicG9zdFRhZ3MiLCJ0YWdzIiwibGVuZ3RoIiwidGFnIiwic2x1ZyIsInRpdGxlIiwiZGF0ZSIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTtBQUVBO0FBQ0E7QUFDQTs7QUFTZSxTQUFTQSxLQUFULENBQ2JDLEtBRGEsRUFFYjtBQUFBOztBQUNBLFNBQ0UsTUFBQywwREFBRDtBQUFRLFFBQUksRUFBRSxFQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHVEQUFEO0FBQUssU0FBSyxFQUFDLHdCQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQUVFO0FBQUssYUFBUyxFQUFDLE9BQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsR0FBWixDQUFnQixVQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBaUI7QUFDaEMsUUFBTUMsTUFBc0MsR0FBRyxFQUEvQyxDQURnQyxDQUVoQzs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDMUJELFlBQU0sQ0FBQ0UsSUFBUCxDQUNFO0FBQ0UsV0FBRyxFQUFFRCxDQURQO0FBRUUsV0FBRyxFQUFDLG1CQUZOO0FBR0UsV0FBRyxFQUFDLGFBSE47QUFJRSxhQUFLLEVBQUU7QUFBRUUsZ0JBQU0sRUFBRSxNQUFWO0FBQWtCQyx3QkFBYyxFQUFFO0FBQWxDLFNBSlQ7QUFLRSxpQkFBUyxFQUFFSCxDQUFDLEdBQUcsQ0FBSixHQUFRLE1BQVIsR0FBaUIsRUFMOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQURGO0FBU0Q7O0FBRUQsUUFBTUksUUFBUSxHQUFHLENBQUNQLElBQUksQ0FBQ1EsSUFBTCxDQUFVQyxNQUFYLEdBQ2IsSUFEYSxHQUViVCxJQUFJLENBQUNRLElBQUwsQ0FBVVQsR0FBVixDQUFjLFVBQUNXLEdBQUQsRUFBTVQsS0FBTjtBQUFBLGFBQ1osTUFBQyxnREFBRDtBQUFNLFdBQUcsRUFBRUEsS0FBWDtBQUFrQixZQUFJLDBCQUFtQlMsR0FBbkIsQ0FBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNFO0FBQ0UsaUJBQVMsRUFDUCwwTkFDQ1QsS0FBSyxJQUFJLENBQVQsR0FBYSxPQUFiLEdBQXVCLEVBRHhCLENBRko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQU1HUyxHQU5ILENBREYsQ0FEWTtBQUFBLEtBQWQsQ0FGSjtBQWVBLFdBQ0U7QUFBSyxlQUFTLEVBQUMsT0FBZjtBQUF1QixTQUFHLEVBQUVULEtBQTVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRTtBQUFLLGVBQVMsRUFBQyxxQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQXNDTSxRQUF0QyxDQURGLEVBRUUsTUFBQyxnREFBRDtBQUFNLFVBQUksbUJBQVlQLElBQUksQ0FBQ1csSUFBakIsQ0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFO0FBQUksZUFBUyxFQUFDLE1BQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFzQlgsSUFBSSxDQUFDWSxLQUEzQixDQURGLEVBRUU7QUFBSyxlQUFTLEVBQUMsOEVBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFO0FBQU0sZUFBUyxFQUFDLE1BQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDR1osSUFBSSxDQUFDYSxJQURSLEVBQ2MsR0FEZCxFQUVFO0FBQU0sZUFBUyxFQUFDLHdCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUZGLEVBRW9ELEdBRnBELENBREYsRUFLRTtBQUFNLGVBQVMsRUFBQyxtQkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFO0FBQU0sZUFBUyxFQUFDLFdBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBNkJYLE1BQTdCLENBREYsT0FDK0MsQ0FEL0MsaUJBTEYsQ0FGRixFQVlFO0FBQUcsZUFBUyxFQUFDLE9BQWI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFzQkYsSUFBSSxDQUFDYyxXQUEzQixDQVpGLENBREYsQ0FGRixDQURGO0FBcUJELEdBbkRBLENBREgsQ0FGRixDQURGO0FBMkREO0tBOUR1QmxCLEsiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvcG9zdHMuMTIzYWRkNmZmMmQ4ODA5MTk3MmUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInO1xyXG5pbXBvcnQgeyBJbmZlckdldFN0YXRpY1Byb3BzVHlwZSB9IGZyb20gJ25leHQnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L0xpbmsnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9sYXlvdXQnO1xyXG5pbXBvcnQgU0VPIGZyb20gJy4uL2NvbXBvbmVudHMvc2VvJztcclxuXHJcbmV4cG9ydCB0eXBlIFBvc3RNYXR0ZXIgPSB7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICB0YWdzOiBzdHJpbmdbXTtcclxuICBkYXRlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBvc3RzKFxyXG4gIHByb3BzOiBJbmZlckdldFN0YXRpY1Byb3BzVHlwZTx0eXBlb2YgZ2V0U3RhdGljUHJvcHM+XHJcbikge1xyXG4gIHJldHVybiAoXHJcbiAgICA8TGF5b3V0IHBhdGg9eycnfT5cclxuICAgICAgPFNFTyB0aXRsZT1cIlBvc3RzIC0gUXVlc3RzIEluIENvZGVcIiAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIwXCI+XHJcbiAgICAgICAge3Byb3BzLnBvc3RzLm1hcCgocG9zdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGhlYXJ0czogSlNYLkludHJpbnNpY0VsZW1lbnRzWydpbWcnXVtdID0gW107XHJcbiAgICAgICAgICAvL2ZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5jZWlsKHRpbWVUb1JlYWQgLyAzKTsgaSsrKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBoZWFydHMucHVzaChcclxuICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgICBzcmM9XCIvaW1hZ2VzL2hlYXJ0LnBuZ1wiXHJcbiAgICAgICAgICAgICAgICBhbHQ9XCJQaXhlbCBoZWFydFwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6ICcyNHB4JywgaW1hZ2VSZW5kZXJpbmc6ICdwaXhlbGF0ZWQnIH19XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2kgPiAwID8gJ21sLTEnIDogJyd9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBwb3N0VGFncyA9ICFwb3N0LnRhZ3MubGVuZ3RoXHJcbiAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICA6IHBvc3QudGFncy5tYXAoKHRhZywgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDxMaW5rIGtleT17aW5kZXh9IGhyZWY9e2AvdG9waWNzP3RvcGljPSR7dGFnfWB9PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAncHktMSBweC00IHRleHQtc20gZm9udC1zZW1pYm9sZCB0cmFja2luZy13aWRlc3Qgcm91bmRlZC1mdWxsIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24gZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0IGJnLWRibHVlLTEwMCB0ZXh0LWRibHVlLTcwMCBob3ZlcjpiZy1kYmx1ZS0yMDAgZGs6YmctYmx1ZS05MDAgZGs6dGV4dC1kYmx1ZS0xMDAgZGstaG92ZXI6YmctYmx1ZS03MDAnICtcclxuICAgICAgICAgICAgICAgICAgICAgIChpbmRleCA+PSAxID8gJyBtbC00JyA6ICcnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0YWd9XHJcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICApKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEyXCIga2V5PXtpbmRleH0+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00IGZsZXggZmxleC13cmFwXCI+e3Bvc3RUYWdzfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2AvcG9zdHMvJHtwb3N0LnNsdWd9YH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwibXktMlwiPntwb3N0LnRpdGxlfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItOCB0ZXh0LWdyYXktNzAwIGRrOnRleHQtZ3JheS01MDAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTp0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtwb3N0LmRhdGV9eycgJ31cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmUtYmxvY2tcIj7igKI8L3NwYW4+eycgJ31cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggbXItMlwiPntoZWFydHN9PC9zcGFuPiB7M30gbWludXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiLW10LTJcIj57cG9zdC5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L0xheW91dD5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoKSB7XHJcbiAgY29uc3QgZm9sZGVyTmFtZXMgPSBmcy5yZWFkZGlyU3luYyhcclxuICAgIGpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYycsICdjb250ZW50JywgJ3Bvc3RzJylcclxuICApO1xyXG5cclxuICBjb25zdCBhbGxQb3N0c01ldGEgPSBmb2xkZXJOYW1lcy5tYXAobmFtZSA9PiB7XHJcbiAgICBjb25zdCBmaWxlQ29udGVudHMgPSBmcy5yZWFkRmlsZVN5bmMoXHJcbiAgICAgIGpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYycsICdjb250ZW50JywgJ3Bvc3RzJywgbmFtZSwgJ2luZGV4Lm1keCcpLFxyXG4gICAgICAndXRmLTgnXHJcbiAgICApO1xyXG4gICAgY29uc3QgbWF0dGVyUmVzdWx0ID0gbWF0dGVyKGZpbGVDb250ZW50cyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzbHVnOiBuYW1lLFxyXG4gICAgICAuLi4obWF0dGVyUmVzdWx0LmRhdGEgYXMgUG9zdE1hdHRlcilcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwcm9wczogeyBwb3N0czogYWxsUG9zdHNNZXRhLnNvcnQoKGEsIGIpID0+IChhLmRhdGUgPCBiLmRhdGUgPyAxIDogLTEpKSB9XHJcbiAgfTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9