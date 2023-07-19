"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostResolverService = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var rxjs_1 = require("rxjs");
var PostAction = require("../Post/post.actions");
var PostResolverService = /** @class */ (function () {
    function PostResolverService(store, action$) {
        this.store = store;
        this.action$ = action$;
    }
    PostResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        return this.store.select('posts').pipe((0, rxjs_1.take)(1), (0, rxjs_1.map)(function (state) {
            return state.posts;
        }), (0, rxjs_1.switchMap)(function (posts) {
            if (posts.length == 0) {
                _this.store.dispatch(new PostAction.FetchPosts);
                return _this.action$.pipe((0, effects_1.ofType)(PostAction.ActionTypes.SET_POSTS), (0, rxjs_1.take)(1));
            }
            else {
                console.log("[Recipe Resolver]: ", posts);
                return (0, rxjs_1.of)(posts);
            }
        }));
    };
    PostResolverService = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root'
        })
    ], PostResolverService);
    return PostResolverService;
}());
exports.PostResolverService = PostResolverService;
