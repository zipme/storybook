"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponentClassFromStoryTemplate = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var app_token_1 = require("./app.token");
var RenderNgAppService_1 = require("./RenderNgAppService");
/**
 * Wraps the story template into a component
 *
 * @param template {string}
 * @param styles {string[]}
 */
exports.createComponentClassFromStoryTemplate = function (template, styles) {
    var StoryBookTemplateWrapperComponent = /** @class */ (function () {
        // eslint-disable-next-line no-useless-constructor
        function StoryBookTemplateWrapperComponent(storyProps$, changeDetectorRef) {
            this.storyProps$ = storyProps$;
            this.changeDetectorRef = changeDetectorRef;
        }
        StoryBookTemplateWrapperComponent.prototype.ngOnInit = function () {
            var _this = this;
            // Subscribes to the observable storyProps$ to keep these properties up to date
            this.storyPropsSubscription = this.storyProps$.subscribe(function (storyProps) {
                if (storyProps === void 0) { storyProps = {}; }
                // All props are added as component properties
                Object.assign(_this, storyProps);
                _this.changeDetectorRef.detectChanges();
                _this.changeDetectorRef.markForCheck();
            });
        };
        StoryBookTemplateWrapperComponent.prototype.ngOnDestroy = function () {
            if (this.storyPropsSubscription != null) {
                this.storyPropsSubscription.unsubscribe();
            }
        };
        StoryBookTemplateWrapperComponent = __decorate([
            core_1.Component({
                selector: RenderNgAppService_1.RenderNgAppService.SELECTOR_STORYBOOK_WRAPPER,
                template: template,
                styles: styles,
            }),
            __param(0, core_1.Inject(app_token_1.STORY_PROPS)),
            __metadata("design:paramtypes", [rxjs_1.Subject,
                core_1.ChangeDetectorRef])
        ], StoryBookTemplateWrapperComponent);
        return StoryBookTemplateWrapperComponent;
    }());
    return StoryBookTemplateWrapperComponent;
};
