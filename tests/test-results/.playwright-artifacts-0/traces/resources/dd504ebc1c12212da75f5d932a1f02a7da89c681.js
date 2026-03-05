(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/core/components/ui/link.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/components.ts [app-client] (ecmascript)");
"use client";
;
;
;
const Link = (param)=>{
    let { disabled, noHoverUnderline, ...props } = param;
    if (disabled) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-disabled": true,
            className: "group/link contents",
            children: props.children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/core/components/ui/link.tsx",
            lineNumber: 16,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group/link", "w-fit underline-offset-5 transition", "text-primary-light", !noHoverUnderline && "link-hover:underline", "link-focused:underline", "link-disabled:text-inherit", props.className)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/link.tsx",
        lineNumber: 23,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Link;
var _c;
__turbopack_context__.k.register(_c, "Link");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/components/ui/heading.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Heading",
    ()=>Heading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/components.ts [app-client] (ecmascript)");
;
;
;
const headingVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("font-semibold text-text-primary", {
    variants: {
        variant: {
            h1: "text-2xl",
            h2: "text-xl",
            h3: "text-sm"
        }
    },
    defaultVariants: {
        variant: "h1"
    }
});
const Heading = (param)=>{
    let { variant, className, ...props } = param;
    const headings = {
        h1: "h1",
        h2: "h2",
        h3: "h3"
    };
    const Component = headings[variant !== null && variant !== void 0 ? variant : "h1"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(headingVariants({
            variant
        }), className)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/heading.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Heading;
var _c;
__turbopack_context__.k.register(_c, "Heading");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/components/ui/page/components.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageContent",
    ()=>PageContent,
    "PageDescription",
    ()=>PageDescription,
    "PageFooter",
    ()=>PageFooter,
    "PageHeader",
    ()=>PageHeader,
    "PageHeaderActions",
    ()=>PageHeaderActions,
    "PageRoot",
    ()=>PageRoot,
    "PageTitle",
    ()=>PageTitle,
    "PageTitleContainer",
    ()=>PageTitleContainer,
    "PageWithSidebar",
    ()=>PageWithSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/components.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$heading$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/heading.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
const PageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    hasSidebar: false
});
const PageScrollableContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(false);
const PageWithSidebar = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageContext.Provider, {
        value: {
            hasSidebar: true
        },
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PageWithSidebar;
const WITH_SIDEBAR_CONTAINER = "max-w-(--breakpoint-lg)";
const WITHOUT_SIDEBAR_CONTAINER = "max-w-(--breakpoint-lg)";
const PageRoot = (param)=>{
    let { scrollable, ...props } = param;
    _s();
    const { hasSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PageContext);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full flex-1 flex-col gap-6 pt-10 pb-16", (!hasSidebar || scrollable === undefined) && "overflow-auto", props.className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageScrollableContext.Provider, {
            value: scrollable !== null && scrollable !== void 0 ? scrollable : true,
            children: props.children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
            lineNumber: 41,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
        lineNumber: 34,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PageRoot, "9dPfoJiT8kUUhMuABgHSq9xRqE8=");
_c1 = PageRoot;
const PageContent = /*#__PURE__*/ _s1((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = _s1((props, ref)=>{
    _s1();
    const { hasSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PageContext);
    const hasParentScrollable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PageScrollableContext);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...props,
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("container flex flex-1 flex-col gap-6", hasSidebar && "flex-1", !hasParentScrollable && hasSidebar && "overflow-auto", hasSidebar ? WITH_SIDEBAR_CONTAINER : WITHOUT_SIDEBAR_CONTAINER, props.className),
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
        lineNumber: 56,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
}, "/4sM43KRO83t867aQ4Bxd+M07rA=")), "/4sM43KRO83t867aQ4Bxd+M07rA=");
_c3 = PageContent;
const PageHeader = (props)=>{
    _s2();
    const { hasSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PageContext);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("container flex min-h-12 shrink-0 items-center justify-between gap-6", hasSidebar ? WITH_SIDEBAR_CONTAINER : WITHOUT_SIDEBAR_CONTAINER, props.className),
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
        lineNumber: 75,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(PageHeader, "9dPfoJiT8kUUhMuABgHSq9xRqE8=");
_c4 = PageHeader;
const PageHeaderActions = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between gap-2", props.className),
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c5 = PageHeaderActions;
const PageDescription = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-text-secondary text-sm", props.className),
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c6 = PageDescription;
const PageTitleContainer = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-1 flex-col", props.className),
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c7 = PageTitleContainer;
const PageTitle = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$heading$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Heading"], {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium", props.className),
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c8 = PageTitle;
const PageFooter = (props)=>{
    _s3();
    const { hasSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PageContext);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("container flex shrink-0 items-center justify-between gap-6", hasSidebar ? WITH_SIDEBAR_CONTAINER : WITHOUT_SIDEBAR_CONTAINER, props.className),
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/page/components.tsx",
        lineNumber: 121,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s3(PageFooter, "9dPfoJiT8kUUhMuABgHSq9xRqE8=");
_c9 = PageFooter;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "PageWithSidebar");
__turbopack_context__.k.register(_c1, "PageRoot");
__turbopack_context__.k.register(_c2, "PageContent$forwardRef");
__turbopack_context__.k.register(_c3, "PageContent");
__turbopack_context__.k.register(_c4, "PageHeader");
__turbopack_context__.k.register(_c5, "PageHeaderActions");
__turbopack_context__.k.register(_c6, "PageDescription");
__turbopack_context__.k.register(_c7, "PageTitleContainer");
__turbopack_context__.k.register(_c8, "PageTitle");
__turbopack_context__.k.register(_c9, "PageFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/components/ui/icons/SvgGithub.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SvgGithub",
    ()=>SvgGithub
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const SvgGithub = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "42",
        height: "41",
        viewBox: "0 0 42 41",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M21 0.166626C18.2641 0.166626 15.555 0.705496 13.0274 1.75247C10.4998 2.79944 8.20315 4.33401 6.2686 6.26857C2.36159 10.1756 0.166656 15.4746 0.166656 21C0.166656 30.2083 6.14582 38.0208 14.4167 40.7916C15.4583 40.9583 15.7917 40.3125 15.7917 39.75V36.2291C10.0208 37.4791 8.79166 33.4375 8.79166 33.4375C7.83332 31.0208 6.47916 30.375 6.47916 30.375C4.58332 29.0833 6.62499 29.125 6.62499 29.125C8.70832 29.2708 9.81249 31.2708 9.81249 31.2708C11.625 34.4375 14.6875 33.5 15.875 33C16.0625 31.6458 16.6042 30.7291 17.1875 30.2083C12.5625 29.6875 7.70832 27.8958 7.70832 19.9583C7.70832 17.6458 8.49999 15.7916 9.85416 14.3125C9.64582 13.7916 8.91666 11.625 10.0625 8.81246C10.0625 8.81246 11.8125 8.24996 15.7917 10.9375C17.4375 10.4791 19.2292 10.25 21 10.25C22.7708 10.25 24.5625 10.4791 26.2083 10.9375C30.1875 8.24996 31.9375 8.81246 31.9375 8.81246C33.0833 11.625 32.3542 13.7916 32.1458 14.3125C33.5 15.7916 34.2917 17.6458 34.2917 19.9583C34.2917 27.9166 29.4167 29.6666 24.7708 30.1875C25.5208 30.8333 26.2083 32.1041 26.2083 34.0416V39.75C26.2083 40.3125 26.5417 40.9791 27.6042 40.7916C35.875 38 41.8333 30.2083 41.8333 21C41.8333 18.2641 41.2945 15.555 40.2475 13.0274C39.2005 10.4998 37.6659 8.20312 35.7314 6.26857C33.7968 4.33401 31.5002 2.79944 28.9726 1.75247C26.4449 0.705496 23.7359 0.166626 21 0.166626Z",
            fill: "white"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/core/components/ui/icons/SvgGithub.tsx",
            lineNumber: 12,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/icons/SvgGithub.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c = SvgGithub;
var _c;
__turbopack_context__.k.register(_c, "SvgGithub");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/components/ui/icons/SvgGitlab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SvgGitlab",
    ()=>SvgGitlab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const SvgGitlab = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "42",
        height: "42",
        viewBox: "0 0 42 41",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M40.9352 16.8597L40.8772 16.7114L35.2636 2.06128C35.1493 1.77409 34.947 1.53047 34.6858 1.36532C34.4244 1.20296 34.1195 1.12474 33.8122 1.14123C33.505 1.15772 33.2102 1.26812 32.9677 1.45753C32.7282 1.65262 32.5544 1.9165 32.4696 2.21353L28.6794 13.8101H13.3314L9.54089 2.21353C9.45849 1.91487 9.28424 1.6497 9.0428 1.45556C8.80031 1.26615 8.50552 1.15575 8.19827 1.13926C7.89102 1.12277 7.58611 1.20099 7.32474 1.36335C7.06406 1.52918 6.86197 1.77259 6.74691 2.05931L1.12285 16.7029L1.06707 16.8512C-0.592919 21.1887 0.816706 26.1017 4.52452 28.8986L4.54388 28.9137L4.59539 28.9501L13.1467 35.3538L17.3772 38.5557L19.9543 40.5014C20.2557 40.7304 20.6238 40.8544 21.0023 40.8544C21.3808 40.8544 21.7489 40.7304 22.0503 40.5014L24.6274 38.5557L28.8579 35.3538L37.4607 28.9114L37.4821 28.8944C41.181 26.0968 42.5883 21.1926 40.9352 16.8597Z",
                fill: "#E24329"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/core/components/ui/icons/SvgGitlab.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M40.9352 16.8597L40.8772 16.7114C38.1419 17.273 35.5643 18.4316 33.3286 20.1046L21 29.4269C25.1984 32.6032 28.8533 35.3627 28.8533 35.3627L37.4561 28.9203L37.4775 28.9032C41.1823 26.1053 42.5916 21.1962 40.9352 16.8597Z",
                fill: "#FC6D26"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/core/components/ui/icons/SvgGitlab.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13.1467 35.3624L17.3772 38.5642L19.9543 40.51C20.2557 40.739 20.6238 40.8629 21.0023 40.8629C21.3808 40.8629 21.7489 40.739 22.0503 40.51L24.6274 38.5642L28.8579 35.3624C28.8579 35.3624 25.1987 32.5943 21.0003 29.4266C18.3808 31.403 15.7629 33.3816 13.1467 35.3624Z",
                fill: "#FCA326"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/core/components/ui/icons/SvgGitlab.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8.66907 20.1046C6.43535 18.4279 3.85837 17.2663 1.12285 16.7029L1.06707 16.8512C-0.592919 21.1887 0.816706 26.1017 4.52452 28.8986L4.54388 28.9137L4.59539 28.9501L13.1467 35.3538L21 29.4181L8.66907 20.1046Z",
                fill: "#FC6D26"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/core/components/ui/icons/SvgGitlab.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/core/components/ui/icons/SvgGitlab.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c = SvgGitlab;
var _c;
__turbopack_context__.k.register(_c, "SvgGitlab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/auth/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProviders",
    ()=>AuthProviders,
    "SSOProtocol",
    ()=>SSOProtocol
]);
var AuthProviders = /*#__PURE__*/ function(AuthProviders) {
    AuthProviders["CREDENTIALS"] = "credentials";
    AuthProviders["GOOGLE"] = "google";
    AuthProviders["GITHUB"] = "github";
    AuthProviders["GITLAB"] = "gitlab";
    AuthProviders["SSO"] = "sso";
    return AuthProviders;
}({});
var SSOProtocol = /*#__PURE__*/ function(SSOProtocol) {
    SSOProtocol["SAML"] = "saml";
    SSOProtocol["OIDC"] = "oidc";
    return SSOProtocol;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/(auth)/components/oauth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OAuthButtons",
    ()=>OAuthButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$icons$2f$SvgGithub$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/icons/SvgGithub.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$icons$2f$SvgGitlab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/icons/SvgGitlab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next-auth/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/auth/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const OAuthButtons = (param)=>{
    let { isSignUp = false } = param;
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    let callbackUrl = searchParams.get("callbackUrl");
    if (isSignUp) callbackUrl = "/setup";
    const handleProviderLogin = async (provider)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])(provider, {
            redirect: true,
            redirectTo: callbackUrl !== null && callbackUrl !== void 0 ? callbackUrl : isSignUp ? "/setup" : "/"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: "lg",
                variant: "helper",
                className: "w-full",
                onClick: ()=>handleProviderLogin(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].GITHUB),
                leftIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$icons$2f$SvgGithub$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SvgGithub"], {}, void 0, false, {
                    fileName: "[project]/apps/web/src/app/(auth)/components/oauth.tsx",
                    lineNumber: 34,
                    columnNumber: 27
                }, void 0),
                children: [
                    "Sign ",
                    isSignUp ? "up" : "in",
                    " with Github"
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/(auth)/components/oauth.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: "lg",
                variant: "helper",
                className: "w-full",
                onClick: ()=>handleProviderLogin(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].GITLAB),
                leftIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$icons$2f$SvgGitlab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SvgGitlab"], {}, void 0, false, {
                    fileName: "[project]/apps/web/src/app/(auth)/components/oauth.tsx",
                    lineNumber: 43,
                    columnNumber: 27
                }, void 0),
                children: [
                    "Sign ",
                    isSignUp ? "up" : "in",
                    " with Gitlab"
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/(auth)/components/oauth.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/(auth)/components/oauth.tsx",
        lineNumber: 23,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(OAuthButtons, "a+DZx9DY26Zf8FVy1bxe3vp9l1w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = OAuthButtons;
var _c;
__turbopack_context__.k.register(_c, "OAuthButtons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/components.ts [app-client] (ecmascript)");
;
;
;
;
const cardVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("flex flex-col overflow-hidden rounded-xl shadow-sm", {
    variants: {
        color: {
            none: "bg-transparent shadow-none",
            lv1: "bg-card-lv1",
            lv2: "bg-card-lv2",
            lv3: "bg-card-lv3"
        }
    },
    defaultVariants: {
        color: "lv2"
    }
});
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, color, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(cardVariants({
            color
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/card.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex w-full flex-col gap-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/card.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-bold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/card.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-text-secondary text-sm font-normal", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/card.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex-1 p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/card.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex shrink-0 items-center gap-2 p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/card.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/components.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("text-sm font-medium text-text-primary select-none leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(labelVariants(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/label.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Label;
Label.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Label$React.forwardRef");
__turbopack_context__.k.register(_c1, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/components/ui/form-control.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormControl",
    ()=>FormControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/components.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/label.tsx [app-client] (ecmascript)");
;
;
;
const FormControlRoot = (props)=>{
    const { loading, ...rest } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col", loading && "opacity-50", props.className)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/form-control.tsx",
        lineNumber: 13,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = FormControlRoot;
const FormControlInput = (props)=>props.children;
_c1 = FormControlInput;
const FormControlLabel = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mb-1 w-fit text-sm", props.className),
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/form-control.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = FormControlLabel;
const FormControlHelper = (param)=>{
    let { children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-text-secondary mt-1.5 text-[13px] leading-none font-normal", props.className),
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/form-control.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = FormControlHelper;
const FormControlError = (props)=>{
    if (!props.children) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-danger mt-1.5 text-[13px] leading-none", props.className),
        children: props.children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/form-control.tsx",
        lineNumber: 54,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c4 = FormControlError;
const FormControl = {
    Root: FormControlRoot,
    Label: FormControlLabel,
    Input: FormControlInput,
    Error: FormControlError,
    Helper: FormControlHelper
};
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "FormControlRoot");
__turbopack_context__.k.register(_c1, "FormControlInput");
__turbopack_context__.k.register(_c2, "FormControlLabel");
__turbopack_context__.k.register(_c3, "FormControlHelper");
__turbopack_context__.k.register(_c4, "FormControlError");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/components.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/spinner.tsx [app-client] (ecmascript)");
;
;
;
;
;
const inputVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex w-full items-center rounded-xl text-sm ring-1 transition", "bg-card-lv2 ring-card-lv3", "placeholder:text-text-placeholder/50", "textinput-focused:ring-3 textinput-focused:brightness-120", "textinput-invalid:border-danger", "textinput-focused-invalid:ring-danger", "textinput-hover:brightness-120", "textinput-disabled:cursor-not-allowed textinput-disabled:bg-text-placeholder/30 textinput-disabled:ring-text-placeholder/30", "textinput-loading:cursor-wait"), {
    variants: {
        size: {
            md: "h-10 px-5",
            lg: "h-12 px-6"
        }
    },
    defaultVariants: {
        size: "lg"
    }
});
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, leftIcon: LeftIcon, rightIcon: RightIcon, disabled, loading, error, size, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex-1 min-w-0",
        children: [
            LeftIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-y-0 left-4 z-1 flex items-center [&_svg]:size-5 [&_svg]:text-current",
                children: LeftIcon
            }, void 0, false, {
                fileName: "[project]/apps/web/src/core/components/ui/input.tsx",
                lineNumber: 58,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: ref,
                disabled: disabled || loading,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$components$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(inputVariants({
                    size
                }), !!error && "ring-danger", LeftIcon && "pl-12", RightIcon && "pr-12", className),
                ...props,
                ...!!error && {
                    "data-invalid": true
                },
                ...disabled && {
                    "data-disabled": true
                },
                ...loading && {
                    "data-loading": true
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/core/components/ui/input.tsx",
                lineNumber: 63,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            (loading || RightIcon) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-[bounding-box] absolute inset-y-0 right-4 z-1 flex items-center [&_svg]:size-5 [&_svg]:text-current",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                    className: "fill-card-lv3 text-primary-light"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/core/components/ui/input.tsx",
                    lineNumber: 82,
                    columnNumber: 29
                }, ("TURBOPACK compile-time value", void 0)) : RightIcon
            }, void 0, false, {
                fileName: "[project]/apps/web/src/core/components/ui/input.tsx",
                lineNumber: 80,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/core/components/ui/input.tsx",
        lineNumber: 56,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/enums/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AutomationType",
    ()=>AutomationType,
    "AutomationsTagsEnum",
    ()=>AutomationsTagsEnum,
    "GIT_INTEGRATIONS_KEY",
    ()=>GIT_INTEGRATIONS_KEY,
    "INTEGRATIONS_KEY",
    ()=>INTEGRATIONS_KEY,
    "INTEGRATIONS_TYPES",
    ()=>INTEGRATIONS_TYPES,
    "TeamRole",
    ()=>TeamRole,
    "UserRole",
    ()=>UserRole,
    "UserStatus",
    ()=>UserStatus
]);
const GIT_INTEGRATIONS_KEY = {
    GITHUB: "github",
    GITLAB: "gitlab",
    BITBUCKET: "bitbucket",
    AZURE_REPOS: "azure_repos",
    FORGEJO: "forgejo"
};
const INTEGRATIONS_KEY = {
    ...GIT_INTEGRATIONS_KEY
};
const INTEGRATIONS_TYPES = {
    CODE_MANAGEMENT: "codeManagement"
};
var TeamRole = /*#__PURE__*/ function(TeamRole) {
    TeamRole["TEAM_LEADER"] = "team_leader";
    TeamRole["TEAM_MEMBER"] = "team_member";
    return TeamRole;
}({});
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["OWNER"] = "owner";
    UserRole["BILLING_MANAGER"] = "billing_manager";
    UserRole["REPO_ADMIN"] = "repo_admin";
    UserRole["CONTRIBUTOR"] = "contributor";
    return UserRole;
}({});
var UserStatus = /*#__PURE__*/ function(UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
    UserStatus["PENDING"] = "pending";
    UserStatus["EMAIL_PENDING"] = "pending_email";
    UserStatus["AWAITING_APPROVAL"] = "awaiting_approval";
    UserStatus["REMOVED"] = "removed";
    return UserStatus;
}({});
var AutomationsTagsEnum = /*#__PURE__*/ function(AutomationsTagsEnum) {
    AutomationsTagsEnum["ENSURE_BEST_PRACTICE"] = "Ensure Best Practice";
    AutomationsTagsEnum["IMPROVE_PRODUCTIVITY"] = "Improve Productivity";
    AutomationsTagsEnum["IMPROVE_DELIVERY_VISIBILITY"] = "Improve Delivery Visibility";
    AutomationsTagsEnum["IMPROVE_DELIVERY_RISKS"] = "Mitigate Delivery Risks";
    return AutomationsTagsEnum;
}({});
var AutomationType = /*#__PURE__*/ function(AutomationType) {
    AutomationType["AUTOMATION_CODE_REVIEW"] = "AutomationCodeReview";
    return AutomationType;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/utils/self-hosted.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSelfHosted",
    ()=>isSelfHosted
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const isSelfHosted = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.WEB_NODE_ENV === "self-hosted";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/utils/server-side.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isServerSide",
    ()=>isServerSide
]);
const isServerSide = "object" === "undefined";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/utils/helpers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "codeReviewConfigRemovePropertiesNotInType",
    ()=>codeReviewConfigRemovePropertiesNotInType,
    "createUrl",
    ()=>createUrl,
    "formatNameToAvatar",
    ()=>formatNameToAvatar,
    "formatPeriodLabel",
    ()=>formatPeriodLabel,
    "greeting",
    ()=>greeting,
    "isJwtExpired",
    ()=>isJwtExpired,
    "parseJwt",
    ()=>parseJwt,
    "pathToApiUrl",
    ()=>pathToApiUrl,
    "unformatConfig",
    ()=>unformatConfig,
    "waitFor",
    ()=>waitFor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/jose/dist/webapi/util/decode_jwt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/jose/dist/webapi/util/decode_protected_header.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/tiny-invariant/dist/esm/tiny-invariant.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$self$2d$hosted$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/self-hosted.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$server$2d$side$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/server-side.ts [app-client] (ecmascript)");
;
;
;
;
const containerName = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLOBAL_API_CONTAINER_NAME || "kodus_api";
function pathToApiUrl(path, params) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(path, "Api path doesn't exist");
    let hostName = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.WEB_HOSTNAME_API;
    // if 'true' we are in the server and hostname is not a domain
    if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$server$2d$side$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServerSide"] && hostName === "localhost") {
        hostName = containerName;
    }
    if (params) {
        Object.keys(params).forEach((key)=>{
            path = path.replace(":".concat(key), params[key].toString());
        });
    }
    const port = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.WEB_PORT_API;
    return createUrl(hostName, port, path);
}
function createUrl(hostName, port, path, options) {
    let finalPort;
    let protocol;
    const defaultOptions = {
        containerName
    };
    const config = {
        ...defaultOptions,
        ...options
    };
    const isProduction = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.WEB_NODE_ENV === "production";
    if (isProduction || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$self$2d$hosted$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSelfHosted"] && hostName !== "localhost" && hostName !== config.containerName) {
        // Cases: Production OR (SelfHosted with a specific domain)
        protocol = "https";
        finalPort = "";
    } else {
        // Cases: Development OR (SelfHosted running on localhost)
        // Also implicitly covers isDevelopment(), because if it's not production nor self-hosted with a domain,
        // and isDevelopment() is true, it will fall here.
        // If it's self-hosted and hostname === "localhost", it will also fall here.
        const HTTP = "http://";
        const HTTPS = "https://";
        if (hostName === null || hostName === void 0 ? void 0 : hostName.includes(HTTP)) {
            protocol = "http";
            hostName = hostName.replace(HTTP, "");
        } else if (hostName === null || hostName === void 0 ? void 0 : hostName.includes(HTTPS)) {
            protocol = "https";
            hostName = hostName.replace(HTTPS, "");
        } else {
            protocol = "http";
        }
        finalPort = port ? ":".concat(port) : "";
    }
    return "".concat(protocol, "://").concat(hostName).concat(finalPort).concat(path);
}
function isJwtExpired(expirationDate) {
    const THRESHOLD = 300;
    const expirationInMilliseconds = expirationDate * 1000;
    return Date.now() > expirationInMilliseconds - THRESHOLD;
}
function parseJwt(jwt) {
    if (!jwt) return null;
    try {
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeProtectedHeader"])(jwt);
        const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJwt"])(jwt);
        if (!payload || !headers) return null;
        return {
            headers,
            payload
        };
    } catch (error) {
        console.warn("Error decoding jwt token:", error);
        return null;
    }
}
function formatNameToAvatar(name) {
    var _nameSplit_, _nameSplit_1, _nameSplit_2;
    if (!name) return "";
    const nameSplit = name === null || name === void 0 ? void 0 : name.split(" ");
    const lettersAvatar = (nameSplit === null || nameSplit === void 0 ? void 0 : nameSplit.length) === 1 ? (_nameSplit_ = nameSplit[0]) === null || _nameSplit_ === void 0 ? void 0 : _nameSplit_.substring(0, 2) : ((_nameSplit_1 = nameSplit[0]) === null || _nameSplit_1 === void 0 ? void 0 : _nameSplit_1.substring(0, 1)) + ((_nameSplit_2 = nameSplit[1]) === null || _nameSplit_2 === void 0 ? void 0 : _nameSplit_2.substring(0, 1));
    var _lettersAvatar_toUpperCase;
    return (_lettersAvatar_toUpperCase = lettersAvatar === null || lettersAvatar === void 0 ? void 0 : lettersAvatar.toUpperCase()) !== null && _lettersAvatar_toUpperCase !== void 0 ? _lettersAvatar_toUpperCase : "";
}
function greeting(name) {
    const hour = new Date().getHours();
    let message = "";
    if (hour >= 6 && hour < 12) {
        message = "👋 Good morning";
    } else if (hour >= 12 && hour < 18) {
        message = "👋 Good afternoon";
    } else {
        message = "👋 Good evening";
    }
    if (name) message += " ".concat(name);
    message += "!";
    return message;
}
const formatPeriodLabel = (period)=>{
    const labels = {
        today: "Today",
        yesterday: "Yesterday",
        threeDaysAgo: "3 days ago",
        fourDaysAgo: "4 days ago",
        fiveDaysAgo: "5 days ago",
        sixDaysAgo: "6 days ago",
        lastWeek: "Last week",
        twoWeeksAgo: "Two weeks ago",
        older: "Older",
        setup: "Setup"
    };
    return labels[period] || period;
};
const codeReviewConfigRemovePropertiesNotInType = (config)=>{
    const newConfig = {};
    const expectedKeys = [
        "path",
        "automatedReviewActive",
        "showStatusFeedback",
        "reviewCadence",
        "baseBranches",
        "ignoredTitleKeywords",
        "ideRulesSyncEnabled",
        "ignorePaths",
        "reviewOptions",
        "kodusConfigFileOverridesWebPreferences",
        "pullRequestApprovalActive",
        "suggestionControl",
        "summary",
        "isRequestChangesActive",
        "kodyRulesGeneratorEnabled",
        "llmGeneratedMemoriesRequireApproval",
        "runOnDraft",
        "codeReviewVersion",
        "enableCommittableSuggestions",
        "crossFileDependenciesAnalysis",
        // New v2 prompt overrides for categories/severity customization
        "v2PromptOverrides"
    ];
    expectedKeys.forEach((key)=>{
        if (!config.hasOwnProperty(key)) return;
        newConfig[key] = config[key];
    });
    return newConfig;
};
const waitFor = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
const unformatConfig = (node)=>{
    const unformattedConfig = {};
    Object.keys(node).forEach((key)=>{
        const property = node[key];
        if (property && typeof property === "object" && "value" in property) {
            unformattedConfig[key] = property.value;
        } else if (property && typeof property === "object") {
            // Nested object, recurse
            unformattedConfig[key] = unformatConfig(property);
        } else {
            // Primitive value, assign directly
            unformattedConfig[key] = property;
        }
    });
    return unformattedConfig;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/config/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut,
    "unstable_update",
    ()=>unstable_update
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$enums$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/enums/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next-auth/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next-auth/providers/credentials.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@auth/core/providers/credentials.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$providers$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next-auth/providers/github.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@auth/core/providers/github.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$providers$2f$gitlab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next-auth/providers/gitlab.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$gitlab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@auth/core/providers/gitlab.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$fetchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/auth/fetchers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/auth/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/helpers.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const getDataFromPayload = (accessToken)=>{
    var _parseJwt;
    const payload = (_parseJwt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJwt"])(accessToken)) === null || _parseJwt === void 0 ? void 0 : _parseJwt.payload;
    if (!payload) return {};
    var _payload_role;
    return {
        userId: payload.sub,
        email: payload.email,
        status: payload.status,
        organizationId: payload.organizationId,
        role: (_payload_role = payload.role) !== null && _payload_role !== void 0 ? _payload_role : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$enums$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].CONTRIBUTOR,
        iat: payload.iat,
        exp: payload.exp,
        jti: payload.jti
    };
};
const credentialsProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].CREDENTIALS,
    name: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].CREDENTIALS,
    credentials: {
        email: {
            label: "Email",
            type: "text"
        },
        password: {
            label: "Password",
            type: "password"
        }
    },
    async authorize (credentials) {
        try {
            var _response_data;
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$fetchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginEmailPassword"])({
                email: credentials.email,
                password: credentials.password
            });
            return response === null || response === void 0 ? void 0 : (_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.data;
        } catch (error) {
            console.error("loginEmailPassword:", error);
            return null;
        }
    }
});
const githubProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].GITHUB,
    clientId: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.WEB_OAUTH_GITHUB_CLIENT_ID,
    clientSecret: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.WEB_OAUTH_GITHUB_CLIENT_SECRET
});
const gitlabProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$gitlab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].GITLAB,
    clientId: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.WEB_OAUTH_GITLAB_CLIENT_ID,
    clientSecret: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.WEB_OAUTH_GITLAB_CLIENT_SECRET
});
const ssoProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].SSO,
    name: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].SSO,
    credentials: {
        accessToken: {
            label: "AccessToken",
            type: "password"
        },
        refreshToken: {
            label: "RefreshToken",
            type: "password"
        }
    },
    async authorize (credentials) {
        if (credentials.accessToken && credentials.refreshToken) {
            return {
                accessToken: credentials.accessToken,
                refreshToken: credentials.refreshToken
            };
        }
        console.error("SSO credentials not found");
        return null;
    }
});
var _process_env_WEB_NEXTAUTH_SECRET, _ref, _ref1;
const authOptions = {
    providers: [
        credentialsProvider,
        githubProvider,
        gitlabProvider,
        ssoProvider
    ],
    session: {
        strategy: "jwt"
    },
    secret: (_ref1 = (_ref = (_process_env_WEB_NEXTAUTH_SECRET = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.WEB_NEXTAUTH_SECRET) !== null && _process_env_WEB_NEXTAUTH_SECRET !== void 0 ? _process_env_WEB_NEXTAUTH_SECRET : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXTAUTH_SECRET) !== null && _ref !== void 0 ? _ref : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.AUTH_SECRET) !== null && _ref1 !== void 0 ? _ref1 : ("TURBOPACK compile-time truthy", 1) ? "kodus-web-dev-insecure-secret" : "TURBOPACK unreachable",
    pages: {
        signIn: "/sign-in",
        error: "/error"
    },
    callbacks: {
        redirect: (param)=>{
            let { url } = param;
            return url;
        },
        authorized: (param)=>{
            let { auth } = param;
            return !!auth;
        },
        async jwt (param) {
            let { token, user, trigger, session: _session } = param;
            var _getDataFromPayload;
            // on trigger update
            if (trigger === "update") {
                const session = _session;
                return {
                    ...token,
                    ...session,
                    reason: undefined,
                    ...getDataFromPayload(session.accessToken)
                };
            }
            // on token expiration
            const exp = (_getDataFromPayload = getDataFromPayload(token === null || token === void 0 ? void 0 : token.accessToken)) === null || _getDataFromPayload === void 0 ? void 0 : _getDataFromPayload.exp;
            if (exp && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJwtExpired"])(exp)) {
                try {
                    const newTokens = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$fetchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                        refreshToken: token.refreshToken
                    });
                    return {
                        ...token,
                        accessToken: newTokens.accessToken,
                        refreshToken: newTokens.refreshToken,
                        reason: "expired-token",
                        ...getDataFromPayload(newTokens.accessToken)
                    };
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
            // on user login by oauth or credentials
            if (user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    reason: undefined,
                    ...getDataFromPayload(user.accessToken)
                };
            }
            // already logged, only return data
            return {
                ...token,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                reason: undefined,
                ...getDataFromPayload(token.accessToken)
            };
        },
        async session (param) {
            let { session, token } = param;
            return {
                ...session,
                user: token
            };
        },
        async signIn (param) {
            let { account, user } = param;
            switch(account === null || account === void 0 ? void 0 : account.provider){
                case __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].GITHUB:
                case __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].GITLAB:
                case __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].GOOGLE:
                    if (!user.name || !user.email || !account.access_token) {
                        return false;
                    }
                    try {
                        const { data: response } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$fetchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginOAuth"])(user.name, user.email, account.access_token, account.provider);
                        if (response && (response === null || response === void 0 ? void 0 : response.data)) {
                            Object.assign(user, {
                                accessToken: response.data.accessToken,
                                refreshToken: response.data.refreshToken
                            });
                            return true;
                        }
                    } catch (error) {
                        console.error("OAuth login error", error);
                        return false;
                    }
                    return false;
                case __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].SSO:
                case __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProviders"].CREDENTIALS:
                    return true;
                default:
                    return false;
            }
        }
    },
    trustHost: true
};
const { auth, handlers, signIn, unstable_update, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(authOptions);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/utils/session.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getJWTToken",
    ()=>getJWTToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$services$2f$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/services/fetch.ts [app-client] (ecmascript)");
;
const getJWTToken = async ()=>{
    var _session_user;
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$services$2f$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typedFetch"])("/api/auth/session");
    return session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.accessToken;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/utils/url.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSearchParamsToUrl",
    ()=>addSearchParamsToUrl
]);
const addSearchParamsToUrl = function(url) {
    let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const qIndex = url.indexOf("?");
    const path = qIndex === -1 ? url : url.substring(0, qIndex);
    const existingQuery = qIndex === -1 ? "" : url.substring(qIndex + 1);
    const searchParams = new URLSearchParams(existingQuery);
    for (const [k, v] of Object.entries(params)){
        if (v === null || v === undefined) continue;
        const valueAsString = v.toString();
        if (!valueAsString.length) continue;
        searchParams.set(k, valueAsString);
    }
    const newQueryString = searchParams.toString();
    return newQueryString ? "".concat(path, "?").concat(newQueryString) : path;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/services/fetch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypedFetchError",
    ()=>TypedFetchError,
    "authorizedFetch",
    ()=>authorizedFetch,
    "typedFetch",
    ()=>typedFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/config/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$server$2d$side$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/server-side.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/url.ts [app-client] (ecmascript)");
;
;
;
;
;
;
class TypedFetchError extends Error {
    static isError(error) {
        return error instanceof this;
    }
    constructor(statusCode, statusText, url, body){
        super("Request error: ".concat(statusCode, " ").concat(statusText, " in URL: ").concat(url)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "statusCode", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "statusText", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "url", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "body", void 0);
        this.name = "TypedFetchError";
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.url = url;
        this.body = body;
    }
}
const authorizedFetch = async (url, config)=>{
    let accessToken;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$server$2d$side$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServerSide"]) {
        const jwtPayload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"])();
        accessToken = jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.user.accessToken;
    } else {
        accessToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJWTToken"])();
    }
    try {
        const response = await typedFetch(url, {
            ...config,
            headers: {
                ...config === null || config === void 0 ? void 0 : config.headers,
                Authorization: "Bearer ".concat(accessToken)
            }
        });
        return response.data;
    } catch (error1) {
        if (TypedFetchError.isError(error1)) {
            if (error1.statusCode === 401) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("[authorizedFetch] 401", {
                        url: error1.url,
                        statusText: error1.statusText,
                        body: error1.body
                    });
                }
                if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$server$2d$side$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServerSide"]) (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirect"])("/sign-out");
                return null;
            }
        }
        // Propagar o erro para que o chamador possa tratar
        throw error1;
    }
};
const typedFetch = async (url, config)=>{
    const { params = {}, ...configRest } = config !== null && config !== void 0 ? config : {};
    const urlWithParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addSearchParamsToUrl"])(url.toString(), params);
    try {
        const response = await fetch(urlWithParams, {
            ...configRest,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...configRest.headers
            }
        });
        if (!response.ok) {
            let errorBody = undefined;
            try {
                errorBody = await response.json();
            } catch (e) {
            // ignore JSON parse errors, keep body undefined
            }
            throw new TypedFetchError(response.status, response.statusText, urlWithParams, errorBody);
        }
        return await response.json();
    } catch (error) {
        // Re-throw the error with more context if it's a network error
        if (error instanceof Error && (error.message.includes("ENOTFOUND") || error.message.includes("ECONNREFUSED"))) {
            throw new Error("Network error: ".concat(error.message));
        }
        if (error instanceof TypeError) {
            throw new Error("Network error while requesting ".concat(urlWithParams, ": ").concat(error.message));
        }
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/config/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_ROUTES",
    ()=>API_ROUTES
]);
const API_ROUTES = {
    login: "/auth/login",
    register: "/auth/signup",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    confirmEmail: "/auth/confirm-email",
    resendEmail: "/auth/resend-email",
    resetPassword: "/auth/reset-password",
    createNewPassword: "/auth/create-new-password",
    refreshToken: "/auth/refresh",
    getInviteData: "/user/invite",
    completeUserInvitation: "/user/invite/complete-invitation",
    segmentTrack: "/segment/track",
    posthogTrack: "/posthog/track",
    loginOAuth: "/auth/oauth",
    checkForEmailExistence: "/user/email",
    getOrganizationsByDomain: "/organization/domain",
    ssoCallback: "/auth/saml/callback",
    ssoLogin: "/auth/sso/login",
    ssoCheck: "/auth/sso/check"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/utils/axios.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "axiosApi",
    ()=>axiosApi,
    "axiosAuthorized",
    ()=>axiosAuthorized
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/session.ts [app-client] (ecmascript)");
;
;
const axiosClient = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
});
const axiosApi = {
    get: (url, params)=>axiosClient.get(url, {
            ...params
        }),
    post: (url, data, params)=>axiosClient.post(url, data, {
            ...params
        }),
    patch: (url, data, params)=>axiosClient.patch(url, data, {
            ...params
        }),
    delete: (url, params)=>axiosClient.delete(url, {
            ...params
        })
};
const fetcher = async (url, params)=>{
    const headers = {
        Authorization: "Bearer " + await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJWTToken"])()
    };
    const axiosParams = {
        headers,
        withCredentials: true,
        ...params
    };
    return axiosApi.get(url, axiosParams).then((res)=>res.data);
};
const post = async (url, data, params)=>{
    const headers = {
        Authorization: "Bearer " + await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJWTToken"])()
    };
    const axiosParams = {
        ...params,
        headers,
        withCredentials: true
    };
    return axiosApi.post(url, data, axiosParams).then((res)=>res.data);
};
const patch = async (url, data, params)=>{
    const headers = {
        Authorization: "Bearer " + await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJWTToken"])()
    };
    const axiosParams = {
        ...params,
        headers,
        withCredentials: true
    };
    return axiosApi.patch(url, data, axiosParams).then((res)=>res.data);
};
const deleted = async (url, params)=>{
    const headers = {
        Authorization: "Bearer " + await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJWTToken"])()
    };
    const axiosParams = {
        ...params,
        headers,
        withCredentials: true
    };
    return axiosApi.delete(url, axiosParams).then((res)=>res.data);
};
const axiosAuthorized = {
    post,
    fetcher,
    deleted,
    patch
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/auth/fetchers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkForEmailExistence",
    ()=>checkForEmailExistence,
    "completeUserInvitation",
    ()=>completeUserInvitation,
    "confirmEmail",
    ()=>confirmEmail,
    "createNewPassword",
    ()=>createNewPassword,
    "forgotPassword",
    ()=>forgotPassword,
    "getInviteData",
    ()=>getInviteData,
    "getOrganizationsByDomain",
    ()=>getOrganizationsByDomain,
    "loginEmailPassword",
    ()=>loginEmailPassword,
    "loginOAuth",
    ()=>loginOAuth,
    "logout",
    ()=>logout,
    "refreshAccessToken",
    ()=>refreshAccessToken,
    "registerUser",
    ()=>registerUser,
    "resendConfirmEmail",
    ()=>resendConfirmEmail,
    "resetPassword",
    ()=>resetPassword,
    "sendForgotPasswordMail",
    ()=>sendForgotPasswordMail,
    "ssoCheck",
    ()=>ssoCheck,
    "ssoLogin",
    ()=>ssoLogin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$services$2f$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/services/fetch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/config/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/utils/helpers.ts [app-client] (ecmascript)");
;
;
;
;
const checkForEmailExistence = (email)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].get((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].checkForEmailExistence), {
        params: {
            email
        }
    });
};
const loginEmailPassword = (credentials)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].login), credentials);
};
const registerUser = (payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].register), payload);
};
const forgotPassword = (payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].forgotPassword), payload);
};
const createNewPassword = (payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].createNewPassword), payload);
};
const completeUserInvitation = (payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].completeUserInvitation), payload);
};
const logout = (payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].logout), payload);
};
const refreshAccessToken = async (payload)=>{
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$services$2f$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typedFetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].refreshToken), {
        method: "POST",
        body: JSON.stringify({
            refreshToken: payload.refreshToken
        })
    });
    return response.data;
};
const getInviteData = async (userId)=>{
    try {
        const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$services$2f$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typedFetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].getInviteData), {
            params: {
                userId
            }
        });
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Failed to fetch invite data: ".concat(error.message));
        }
        throw error;
    }
};
const loginOAuth = (name, email, refreshToken, authProvider)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].loginOAuth), {
        name,
        email,
        refreshToken,
        authProvider
    });
};
const ssoLogin = async (organizationId)=>{
    window.location.href = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].ssoLogin, "/").concat(organizationId));
};
const ssoCheck = async (domain)=>{
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$services$2f$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typedFetch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].ssoCheck), {
        params: {
            domain
        }
    });
    return res.data;
};
const sendForgotPasswordMail = async (email)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].forgotPassword), {
        email
    });
};
const confirmEmail = async (token)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosAuthorized"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].confirmEmail), {
        token
    });
};
const resendConfirmEmail = async (email)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosAuthorized"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].resendEmail), {
        email
    });
};
const resetPassword = async (newPassword, token)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosApi"].post((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].resetPassword), {
        newPassword,
        token
    });
};
const getOrganizationsByDomain = async (domain)=>{
    try {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosAuthorized"].fetcher((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pathToApiUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ROUTES"].getOrganizationsByDomain), {
            params: {
                domain
            }
        });
        return data.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Failed to fetch organizations by domain: ".concat(error.message));
        }
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserAuthForm",
    ()=>UserAuthForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$form$2d$control$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/form-control.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangleIcon$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$closed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeClosed$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/lucide-react/dist/esm/icons/eye-closed.js [app-client] (ecmascript) <export default as EyeClosed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogInIcon$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/lucide-react/dist/esm/icons/log-in.js [app-client] (ecmascript) <export default as LogInIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next-auth/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$fetchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/auth/fetchers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const signInFormSchema = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email({
        message: "Please use a valid email address"
    }),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
function UserAuthForm() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const callbackUrl = searchParams.get("callbackUrl");
    const reason = searchParams.get("reason");
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("email");
    const [typePassword, setTypePassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("password");
    const [isCheckingSSO, setIsCheckingSSO] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ssoAvailable, setSsoAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    var _searchParams_has;
    const isError = (_searchParams_has = searchParams === null || searchParams === void 0 ? void 0 : searchParams.has("error")) !== null && _searchParams_has !== void 0 ? _searchParams_has : false;
    const getReasonMessage = ()=>{
        switch(reason){
            case "removed":
                return "Your account has been removed from the organization.";
            case "inactive":
                return "Your account is inactive. Please contact your administrator.";
            default:
                return null;
        }
    };
    const reasonMessage = getReasonMessage();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserAuthForm.useEffect": ()=>{
            if (callbackUrl === null || callbackUrl === void 0 ? void 0 : callbackUrl.includes("setup_action=install")) {
                const urlParams = new URL(callbackUrl);
                const installationId = urlParams.searchParams.get("installation_id");
                router.push("/github-integration?installation_id=".concat(installationId));
            }
        }
    }["UserAuthForm.useEffect"], [
        callbackUrl,
        router
    ]);
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        mode: "onSubmit",
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(signInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const checkSsoAvailability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UserAuthForm.useCallback[checkSsoAvailability]": async (email)=>{
            try {
                const domain = email.split("@")[1];
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$fetchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ssoCheck"])(domain);
                setSsoAvailable(response);
                return response;
            } catch (error) {
                setSsoAvailable(null);
                return null;
            }
        }
    }["UserAuthForm.useCallback[checkSsoAvailability]"], []);
    const handleEmailStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UserAuthForm.useCallback[handleEmailStep]": async (email)=>{
            setIsCheckingSSO(true);
            const ssoResponse = await checkSsoAvailability(email);
            setIsCheckingSSO(false);
            if ((ssoResponse === null || ssoResponse === void 0 ? void 0 : ssoResponse.active) && ssoResponse.organizationId) {
                setStep("sso-choice");
            } else {
                setStep("password");
            }
        }
    }["UserAuthForm.useCallback[handleEmailStep]"], [
        checkSsoAvailability
    ]);
    const handleSsoLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UserAuthForm.useCallback[handleSsoLogin]": async ()=>{
            if (ssoAvailable === null || ssoAvailable === void 0 ? void 0 : ssoAvailable.organizationId) {
                setIsSubmitting(true);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$fetchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ssoLogin"])(ssoAvailable.organizationId);
                setIsSubmitting(false);
            }
        }
    }["UserAuthForm.useCallback[handleSsoLogin]"], [
        ssoAvailable
    ]);
    const handlePasswordLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UserAuthForm.useCallback[handlePasswordLogin]": async (email, password)=>{
            setIsSubmitting(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("credentials", {
                email,
                password,
                redirect: true,
                redirectTo: callbackUrl !== null && callbackUrl !== void 0 ? callbackUrl : "/"
            });
            setIsSubmitting(false);
        }
    }["UserAuthForm.useCallback[handlePasswordLogin]"], [
        callbackUrl
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (step === "email") {
            const isValid = await form.trigger("email");
            if (!isValid) return;
            const email = form.getValues("email");
            await handleEmailStep(email);
        } else if (step === "password") {
            const isValid = await form.trigger();
            if (!isValid) return;
            const { email, password } = form.getValues();
            await handlePasswordLogin(email, password);
        }
    };
    const resetFlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UserAuthForm.useCallback[resetFlow]": ()=>{
            setStep("email");
            setSsoAvailable(null);
            form.setValue("password", "");
            form.clearErrors();
        }
    }["UserAuthForm.useCallback[resetFlow]"], [
        form
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "grid w-full gap-6",
        children: [
            reasonMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-danger/10 text-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    className: "flex-row items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangleIcon$3e$__["AlertTriangleIcon"], {
                            className: "text-danger size-5"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                            lineNumber: 159,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: reasonMessage
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                            lineNumber: 160,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                    lineNumber: 158,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                lineNumber: 157,
                columnNumber: 17
            }, this),
            isError && !reasonMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-warning/10 text-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    className: "flex-row items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangleIcon$3e$__["AlertTriangleIcon"], {
                            className: "text-warning size-5"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                            lineNumber: 168,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "No user found with this email and password."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                            lineNumber: 169,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                    lineNumber: 167,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                lineNumber: 166,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                name: "email",
                control: form.control,
                render: (param)=>{
                    let { field, fieldState } = param;
                    var _fieldState_error;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$form$2d$control$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"].Root, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$form$2d$control$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"].Label, {
                                htmlFor: field.name,
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                lineNumber: 180,
                                columnNumber: 25
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$form$2d$control$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"].Input, {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    ...field,
                                    id: field.name,
                                    type: "email",
                                    placeholder: "Your corporate email address",
                                    error: fieldState.error,
                                    autoCapitalize: "none",
                                    autoCorrect: "off",
                                    disabled: isSubmitting || isCheckingSSO || step !== "email",
                                    rightIcon: step !== "email" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "helper",
                                        size: "xs",
                                        type: "button",
                                        onClick: resetFlow,
                                        className: "text-muted-foreground hover:text-primary text-xs",
                                        children: "Change"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                        lineNumber: 199,
                                        columnNumber: 41
                                    }, void 0) : undefined
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                    lineNumber: 184,
                                    columnNumber: 29
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                lineNumber: 183,
                                columnNumber: 25
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$form$2d$control$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"].Error, {
                                children: (_fieldState_error = fieldState.error) === null || _fieldState_error === void 0 ? void 0 : _fieldState_error.message
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                lineNumber: 211,
                                columnNumber: 25
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                        lineNumber: 179,
                        columnNumber: 21
                    }, void 0);
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                lineNumber: 175,
                columnNumber: 13
            }, this),
            step === "sso-choice" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-in fade-in slide-in-from-top-2 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-muted text-muted-foreground rounded-md p-4 text-sm",
                        children: [
                            "Single Sign-On is available for",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: form.getValues("email").split("@")[1]
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                lineNumber: 223,
                                columnNumber: 25
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                        lineNumber: 221,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "secondary",
                        size: "lg",
                        className: "w-full",
                        onClick: handleSsoLogin,
                        disabled: isSubmitting,
                        rightIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {}, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                            lineNumber: 234,
                            columnNumber: 36
                        }, void 0),
                        loading: isSubmitting,
                        children: "Continue with SSO"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                        lineNumber: 227,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                lineNumber: 220,
                columnNumber: 17
            }, this),
            step === "password" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-in fade-in slide-in-from-top-2 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                        name: "password",
                        control: form.control,
                        render: (param)=>{
                            let { field, fieldState } = param;
                            var _fieldState_error;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$form$2d$control$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"].Root, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$form$2d$control$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"].Label, {
                                        htmlFor: field.name,
                                        children: "Password"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                        lineNumber: 249,
                                        columnNumber: 33
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$form$2d$control$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"].Input, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            ...field,
                                            id: field.name,
                                            type: typePassword,
                                            placeholder: "Type your password",
                                            error: fieldState.error,
                                            autoComplete: "current-password",
                                            disabled: isSubmitting,
                                            rightIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "helper",
                                                size: "icon-sm",
                                                type: "button",
                                                className: "-mr-2",
                                                onClick: ()=>setTypePassword((prev)=>prev === "password" ? "text" : "password"),
                                                children: typePassword === "password" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$closed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeClosed$3e$__["EyeClosed"], {
                                                    className: "size-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 53
                                                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    className: "size-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 53
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                                lineNumber: 263,
                                                columnNumber: 45
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                            lineNumber: 254,
                                            columnNumber: 37
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                        lineNumber: 253,
                                        columnNumber: 33
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$form$2d$control$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"].Error, {
                                        children: (_fieldState_error = fieldState.error) === null || _fieldState_error === void 0 ? void 0 : _fieldState_error.message
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                        lineNumber: 284,
                                        columnNumber: 33
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                                lineNumber: 248,
                                columnNumber: 29
                            }, void 0);
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                        lineNumber: 244,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        type: "submit",
                        variant: "primary",
                        className: "w-full",
                        disabled: isSubmitting,
                        rightIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogInIcon$3e$__["LogInIcon"], {}, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                            lineNumber: 297,
                            columnNumber: 36
                        }, void 0),
                        loading: isSubmitting,
                        children: "Sign in"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                        lineNumber: 291,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                lineNumber: 243,
                columnNumber: 17
            }, this),
            step === "email" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: "lg",
                type: "submit",
                variant: "primary",
                className: "w-full",
                disabled: isSubmitting || isCheckingSSO,
                rightIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {}, void 0, false, {
                    fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                    lineNumber: 312,
                    columnNumber: 32
                }, void 0),
                loading: isSubmitting || isCheckingSSO,
                children: "Continue"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
                lineNumber: 306,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/(auth)/components/user-auth-form.tsx",
        lineNumber: 155,
        columnNumber: 9
    }, this);
}
_s(UserAuthForm, "HMQRUkZd3VH/CZSb8INvF75vKPI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = UserAuthForm;
var _c;
__turbopack_context__.k.register(_c, "UserAuthForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_5bf4fbb1._.js.map