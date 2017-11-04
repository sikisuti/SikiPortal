webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_auth_guard_service__ = __webpack_require__("../../../../../src/app/service/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_home_home_component__ = __webpack_require__("../../../../../src/app/component/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_learning_learning_component__ = __webpack_require__("../../../../../src/app/component/learning/learning.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_login_login_component__ = __webpack_require__("../../../../../src/app/component/login/login.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var appRoutes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_3__component_home_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__service_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'learn', component: __WEBPACK_IMPORTED_MODULE_4__component_learning_learning_component__["a" /* LearningComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_5__component_login_login_component__["a" /* LoginComponent */] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(appRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".content {\r\n    height: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\n      <router-outlet></router-outlet>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';*/
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HammerConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__ = __webpack_require__("../../../flex-layout/@angular/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_word_service__ = __webpack_require__("../../../../../src/app/service/word.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_auth_guard_service__ = __webpack_require__("../../../../../src/app/service/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_auth_service__ = __webpack_require__("../../../../../src/app/service/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__component_learn_type_flip_card_flip_card_component__ = __webpack_require__("../../../../../src/app/component/learn-type/flip-card/flip-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__component_learning_learning_component__ = __webpack_require__("../../../../../src/app/component/learning/learning.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_hammer_timejs__ = __webpack_require__("../../../../hammer-timejs/hammer-time.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_hammer_timejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_hammer_timejs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__component_main_menu_main_menu_component__ = __webpack_require__("../../../../../src/app/component/main-menu/main-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__component_login_login_component__ = __webpack_require__("../../../../../src/app/component/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__component_home_home_component__ = __webpack_require__("../../../../../src/app/component/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__component_learn_type_word_directive__ = __webpack_require__("../../../../../src/app/component/learn-type/word.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__component_learn_type_type_card_type_card_component__ = __webpack_require__("../../../../../src/app/component/learn-type/type-card/type-card.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var HammerConfig = (function (_super) {
    __extends(HammerConfig, _super);
    function HammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            'swipe': { direction: __WEBPACK_IMPORTED_MODULE_14_hammerjs__["DIRECTION_ALL"] }
        };
        return _this;
    }
    return HammerConfig;
}(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["e" /* HammerGestureConfig */]));

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_12__component_learn_type_flip_card_flip_card_component__["a" /* FlipCardComponent */],
            __WEBPACK_IMPORTED_MODULE_13__component_learning_learning_component__["a" /* LearningComponent */],
            __WEBPACK_IMPORTED_MODULE_16__component_main_menu_main_menu_component__["a" /* MainMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_17__component_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_18__component_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_19__component_learn_type_word_directive__["a" /* WordDirective */],
            __WEBPACK_IMPORTED_MODULE_20__component_learn_type_type_card_type_card_component__["a" /* TypeCardComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["b" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_10__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__["a" /* FlexLayoutModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__service_word_service__["a" /* WordService */],
            __WEBPACK_IMPORTED_MODULE_8__service_auth_guard_service__["a" /* AuthGuardService */],
            __WEBPACK_IMPORTED_MODULE_9__service_auth_service__["a" /* AuthService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["d" /* HAMMER_GESTURE_CONFIG */],
                useClass: HammerConfig
            }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* AppComponent */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_12__component_learn_type_flip_card_flip_card_component__["a" /* FlipCardComponent */], __WEBPACK_IMPORTED_MODULE_20__component_learn_type_type_card_type_card_component__["a" /* TypeCardComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/component/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".content {\r\n    height: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"center stretch\" fxLayoutGap=\"10px\" class=\"content\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\n  <button mat-raised-button (click)=\"goLearn()\" fxFlex=\"50\">Learn</button>\n</div>\n<div fxLayout=\"row\" fxLayoutAlign=\"center center\">\n  <button mat-raised-button color=\"primary\" (click)=\"goNew()\" fxFlex=\"50\">New</button>\n</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/component/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(router) {
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.goLearn = function () {
        this.router.navigate(['/learn']);
    };
    HomeComponent.prototype.goNew = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/component/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/learn-type/flip-card/flip-card.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".content {\r\n    height: 100vh;\r\n}\r\n\r\n.flip-card {\r\n    width: 80%;\r\n    height: 150px;\r\n    box-shadow: 5px 5px 10px #888888;\r\n    background-color: lightgray;\r\n    font-weight: bold;\r\n    font-size: 20px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/learn-type/flip-card/flip-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"content\">\n  <div class=\"flip-card\" \n    (click)=\"onClick()\" (swiperight)=\"onSwipeRight($event)\" (swipedown)=\"onSwipeDown($event)\" \n    (keydown.arrowright)=\"onSwipeRight($event)\" (keydown.arrowdown)=\"onSwipeDown($event)\"\n    [@reviseWord]='reviseWordStarter' (@reviseWord.done)='reviseWordDone($event)' \n    [@skipWord]='skipWordStarter' (@skipWord.done)='reviseWordDone($event)'\n    [@newWord]='word?.id' \n    fxLayout=\"row\" fxLayoutAlign=\"center center\">\n      <span>{{word?.native}}</span>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/component/learn-type/flip-card/flip-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlipCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_word__ = __webpack_require__("../../../../../src/app/model/word.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FlipCardComponent = (function () {
    function FlipCardComponent() {
        this.wordFinished = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.reviseWordStarter = 'init';
        this.skipWordStarter = 'init';
    }
    FlipCardComponent.prototype.ngOnInit = function () {
    };
    FlipCardComponent.prototype.onClick = function () {
    };
    FlipCardComponent.prototype.onSwipeRight = function (event) {
        this.reviseWordStarter = 'revise';
    };
    FlipCardComponent.prototype.onSwipeDown = function (event) {
        this.skipWordStarter = 'skip';
    };
    FlipCardComponent.prototype.reviseWordDone = function (event) {
        if (event['toState'] !== 'init') {
            this.wordFinished.next(event['toState']);
        }
    };
    FlipCardComponent.prototype.handleKeyboardEvent = function (event) {
        this.onSwipeRight(event);
    };
    return FlipCardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__model_word__["a" /* Word */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__model_word__["a" /* Word */]) === "function" && _a || Object)
], FlipCardComponent.prototype, "word", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */])('window:keydown.arrowright', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FlipCardComponent.prototype, "onSwipeRight", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */])('window:keydown.arrowdown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FlipCardComponent.prototype, "onSwipeDown", null);
FlipCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-flip-card',
        template: __webpack_require__("../../../../../src/app/component/learn-type/flip-card/flip-card.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/learn-type/flip-card/flip-card.component.css")],
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_37" /* trigger */])('reviseWord', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('init', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ opacity: 1, transform: 'translateX(0)' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('revise', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ opacity: 0, transform: 'translateX(300px)' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('init => revise', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])('200ms'))
            ]),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_37" /* trigger */])('skipWord', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('init', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ opacity: 1, transform: 'translateY(0)' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('skip', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ opacity: 0, transform: 'translateY(300px)' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('init => skip', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])('200ms'))
            ]),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_37" /* trigger */])('newWord', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('* => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ opacity: 0, transform: 'translateX(-300px)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ opacity: 1, transform: 'translateX(0)', offset: 1 })
                    ]))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], FlipCardComponent);

var _a;
//# sourceMappingURL=flip-card.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/learn-type/type-card/type-card.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".type-card {\r\n    width:  200px;\r\n    height: 100px;\r\n    background-color: green;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/learn-type/type-card/type-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"type-card\">\n  <span>{{word?.native}}</span>\n</div>"

/***/ }),

/***/ "../../../../../src/app/component/learn-type/type-card/type-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_word__ = __webpack_require__("../../../../../src/app/model/word.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TypeCardComponent = (function () {
    function TypeCardComponent() {
    }
    TypeCardComponent.prototype.ngOnInit = function () {
    };
    return TypeCardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__model_word__["a" /* Word */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__model_word__["a" /* Word */]) === "function" && _a || Object)
], TypeCardComponent.prototype, "word", void 0);
TypeCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-type-card',
        template: __webpack_require__("../../../../../src/app/component/learn-type/type-card/type-card.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/learn-type/type-card/type-card.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TypeCardComponent);

var _a;
//# sourceMappingURL=type-card.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/learn-type/word.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WordDirective = (function () {
    function WordDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    return WordDirective;
}());
WordDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */])({
        selector: '[word-host]',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewContainerRef */]) === "function" && _a || Object])
], WordDirective);

var _a;
//# sourceMappingURL=word.directive.js.map

/***/ }),

/***/ "../../../../../src/app/component/learning/learning.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".header {\r\n    height: 8vh;\r\n}\r\n\r\n.sub-content {\r\n    position: absolute;\r\n    height: 100vh;\r\n    width: 100vW;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/learning/learning.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\">\n  <div class=\"header\">\n    <span>abc</span>\n  </div>\n  <div class=\"sub-content\">\n    <ng-template word-host></ng-template>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/component/learning/learning.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LearningComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_word_service__ = __webpack_require__("../../../../../src/app/service/word.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__learn_type_flip_card_flip_card_component__ = __webpack_require__("../../../../../src/app/component/learn-type/flip-card/flip-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__learn_type_word_directive__ = __webpack_require__("../../../../../src/app/component/learn-type/word.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LearningComponent = (function () {
    function LearningComponent(wordService, componentFactoryResolver, changeDetectorRef) {
        this.wordService = wordService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;
        this.words = [];
    }
    LearningComponent.prototype.ngOnInit = function () {
    };
    LearningComponent.prototype.ngAfterViewInit = function () {
        this.startSession();
    };
    LearningComponent.prototype.loadComponent = function () {
        var _this = this;
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_2__learn_type_flip_card_flip_card_component__["a" /* FlipCardComponent */]);
        var viewContainerRef = this.wordHost.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.word = this.words[this.actIndex];
        this.changeDetectorRef.detectChanges();
        componentRef.instance.wordFinished.subscribe(function (msg) { return _this.onSendResult(msg); });
    };
    LearningComponent.prototype.ngOnDestroy = function () {
    };
    LearningComponent.prototype.startSession = function () {
        var _this = this;
        this.wordService.startSession().then(function (x) {
            _this.getWords();
        });
    };
    LearningComponent.prototype.getWords = function () {
        console.log('getWords()');
        this.words = this.wordService.getSet();
        this.actIndex = 0;
        this.loadComponent();
    };
    LearningComponent.prototype.onSendResult = function (message) {
        switch (message) {
            case 'revise':
                this.actIndex = (this.actIndex + 1) % this.words.length;
                this.loadComponent();
                break;
            case 'skip':
                this.words.splice(this.actIndex, 1);
                if (this.words.length === 0) {
                    this.getWords();
                }
                else {
                    this.actIndex = this.actIndex % this.words.length;
                    this.loadComponent();
                }
                break;
            default:
                console.log(message);
        }
    };
    return LearningComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__learn_type_word_directive__["a" /* WordDirective */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__learn_type_word_directive__["a" /* WordDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__learn_type_word_directive__["a" /* WordDirective */]) === "function" && _a || Object)
], LearningComponent.prototype, "wordHost", void 0);
LearningComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-learning',
        template: __webpack_require__("../../../../../src/app/component/learning/learning.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/learning/learning.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__service_word_service__["a" /* WordService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_word_service__["a" /* WordService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ComponentFactoryResolver */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* ChangeDetectorRef */]) === "function" && _d || Object])
], LearningComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=learning.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".content {\r\n    height: 100%;\r\n}\r\n\r\n.form-signin {\r\n    max-width: 330px;\r\n    padding: 15px;\r\n    margin: 0 auto;\r\n    color: #2125E5;\r\n}\r\n.form-signin .form-signin-heading,\r\n.form-signin .checkbox {\r\n    margin-bottom: 10px;\r\n}\r\n.form-signin .checkbox {\r\n    font-weight: 400;\r\n}\r\n.form-signin .form-control {\r\n    position: relative;\r\n    box-sizing: border-box;\r\n    height: auto;\r\n    padding: 10px;\r\n    font-size: 16px;\r\n}\r\n.form-signin .form-control:focus {\r\n    z-index: 2;\r\n}\r\n.form-signin input[type=\"email\"] {\r\n    margin-bottom: -1px;\r\n    border-bottom-right-radius: 0;\r\n    border-bottom-left-radius: 0;\r\n}\r\n.form-signin input[type=\"password\"] {\r\n    margin-bottom: 10px;\r\n    border-top-left-radius: 0;\r\n    border-top-right-radius: 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"content\">\n\n  <div class=\"form-signin\">\n    <h2 class=\"form-signin-heading\">Please sign in</h2>\n    <label for=\"inputUsername\" class=\"sr-only\">Username</label>\n    <input [(ngModel)]=\"username\" type=\"text\" id=\"inputUsername\" class=\"form-control\" placeholder=\"Username\" required autofocus>\n    <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n    <input [(ngModel)]=\"password\" type=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\" required>\n    <div class=\"checkbox\">\n      <label>\n        <input type=\"checkbox\" value=\"remember-me\"> Remember me\n      </label>\n    </div>\n    <button class=\"btn btn-lg btn-primary btn-block\" (click)=\"login()\">Sign in</button>\n  </div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/component/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_auth_service__ = __webpack_require__("../../../../../src/app/service/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.username = null;
        this.password = null;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        // console.log('username: ' + this.username + ' password: ' + this.password);
        this.authService.login(this.username, this.password).subscribe(function (res) {
            if (_this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/home';
                // Redirect the user
                _this.router.navigate([redirect]);
            }
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent.prototype.logout = function () {
        this.authService.logout();
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/component/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/main-menu/main-menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".menu-container {\r\n    width: 60%;\r\n    height: 200px;\r\n    background-color: green;\r\n    margin: auto auto;\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/main-menu/main-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"menu-container\" [@stateChange]=\"state\">\n  {{state}}\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/component/main-menu/main-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MainMenuComponent = (function () {
    function MainMenuComponent() {
    }
    MainMenuComponent.prototype.ngOnInit = function () {
    };
    return MainMenuComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", String)
], MainMenuComponent.prototype, "state", void 0);
MainMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-main-menu',
        template: __webpack_require__("../../../../../src/app/component/main-menu/main-menu.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/main-menu/main-menu.component.css")],
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('stateChange', [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                    transform: 'translateY(0)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('out', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                    transform: 'translateY(-300px)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('in => out', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('200ms ease-in')),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('out => in', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('200ms ease-out'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], MainMenuComponent);

//# sourceMappingURL=main-menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/mock/mock-sentences.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SENTENCES; });
var SENTENCES = [
    { id: 1, foreign: 'sentence1', native: 'mondat1' },
    { id: 2, foreign: 'sentence2', native: 'mondat2' },
    { id: 3, foreign: 'sentence3', native: 'mondat3' },
    { id: 4, foreign: 'sentence4', native: 'mondat4' },
    { id: 5, foreign: 'sentence5', native: 'mondat5' },
    { id: 6, foreign: 'sentence6', native: 'mondat6' },
    { id: 7, foreign: 'sentence7', native: 'mondat7' },
    { id: 8, foreign: 'sentence8', native: 'mondat8' },
    { id: 8, foreign: 'sentence9', native: 'mondat9' },
    { id: 9, foreign: 'sentence10', native: 'mondat10' }
];
//# sourceMappingURL=mock-sentences.js.map

/***/ }),

/***/ "../../../../../src/app/mock/mock-words.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WORDS; });
var WORDS = [
    { id: 1, foreign: 'book', native: 'könyv' },
    { id: 2, foreign: 'forest', native: 'erdő' },
    { id: 3, foreign: 'phone', native: 'telefon' },
    { id: 4, foreign: 'space', native: 'űr' },
    { id: 5, foreign: 'window', native: 'ablak' },
    { id: 6, foreign: 'chair', native: 'szék' },
    { id: 7, foreign: 'work', native: 'munka' },
    { id: 8, foreign: 'heating', native: 'fűtés' },
    { id: 9, foreign: 'computer', native: 'számítógép' }
];
//# sourceMappingURL=mock-words.js.map

/***/ }),

/***/ "../../../../../src/app/model/word.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Word; });
var Word = (function () {
    function Word() {
    }
    return Word;
}());

//# sourceMappingURL=word.js.map

/***/ }),

/***/ "../../../../../src/app/service/auth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__("../../../../../src/app/service/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardService = (function () {
    function AuthGuardService(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.authService.isAuthenticated().map(function (authenticated) {
            if (!authenticated) {
                _this.authService.redirectUrl = state.url;
                _this.router.navigate(['/login']);
            }
            return authenticated;
        });
    };
    return AuthGuardService;
}());
AuthGuardService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AuthGuardService);

var _a, _b;
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.isLoggedIn = false;
    }
    AuthService.prototype.isAuthenticated = function () {
        var _this = this;
        return this.http.get('/authorization/check').map(function (body) {
            console.log(body);
            _this.isLoggedIn = body['Authorized'];
            return body['Authorized'];
        });
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        // console.log('username: ' + username + ' password: ' + password);
        var data = {
            'username': username,
            'password': password
        };
        var config = {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
        };
        return this.http.post('/authorization/login', data, config).map(function (result) {
            _this.isLoggedIn = true;
            return result;
        });
    };
    AuthService.prototype.logout = function () {
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/word.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_mock_words__ = __webpack_require__("../../../../../src/app/mock/mock-words.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mock_mock_sentences__ = __webpack_require__("../../../../../src/app/mock/mock-sentences.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WordService = (function () {
    function WordService() {
    }
    WordService.prototype.startSession = function () {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.words = __WEBPACK_IMPORTED_MODULE_1__mock_mock_words__["a" /* WORDS */];
                _this.sentences = __WEBPACK_IMPORTED_MODULE_2__mock_mock_sentences__["a" /* SENTENCES */];
                _this.sentences.forEach(function (sentence) { sentence['side'] = 0; });
                _this.round = 0;
                resolve();
            }, 2000);
        });
    };
    WordService.prototype.getSet = function () {
        this.round += 1;
        if (this.round === 11) {
            //      sendData();
        }
        var tempList = this.shuffle(this.words.slice());
        if (this.round < 4) {
            tempList.forEach(function (word) { word['side'] = 0; });
            tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
        }
        else if (this.round < 7) {
            tempList.forEach(function (word) { word['side'] = 1; });
            tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
        }
        else {
            tempList.forEach(function (word) { word['side'] = Math.round(Math.random()); });
            tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
            this.round += 1;
            for (var i = 0; i < this.words.length; i++) {
                tempList[i + this.words.length + 1] = Object.assign({}, tempList[i]);
                tempList[i + this.words.length + 1]['side'] = Math.abs(tempList[i]['side'] - 1);
            }
            tempList.push(this.sentences[(this.round - 1) % this.sentences.length]);
        }
        console.log('round: ' + this.round);
        console.log(JSON.stringify(tempList));
        return tempList;
    };
    WordService.prototype.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    return WordService;
}());
WordService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], WordService);

//# sourceMappingURL=word.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map