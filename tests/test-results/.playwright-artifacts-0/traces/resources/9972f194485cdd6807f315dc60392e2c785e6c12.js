(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/core/components/ui/empty.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyComponent",
    ()=>EmptyComponent
]);
const EmptyComponent = ()=>null;
_c = EmptyComponent;
var _c;
__turbopack_context__.k.register(_c, "EmptyComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/components/ui/magic-modal/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MagicModalContext",
    ()=>MagicModalContext,
    "MagicModalPortal",
    ()=>MagicModalPortal,
    "magicModal",
    ()=>magicModal,
    "useMagicModalState",
    ()=>useMagicModalState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$empty$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/components/ui/empty.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const MagicModalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    closeable: true
});
const useMagicModalState = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MagicModalContext);
};
_s(useMagicModalState, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const magicModalRef = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"])();
const show = async (component, props)=>{
    var _magicModalRef_current_show, _magicModalRef_current;
    return (_magicModalRef_current = magicModalRef.current) === null || _magicModalRef_current === void 0 ? void 0 : (_magicModalRef_current_show = _magicModalRef_current.show) === null || _magicModalRef_current_show === void 0 ? void 0 : _magicModalRef_current_show.call(_magicModalRef_current, component, props);
};
const hide = async (returns)=>{
    var _magicModalRef_current;
    return (_magicModalRef_current = magicModalRef.current) === null || _magicModalRef_current === void 0 ? void 0 : _magicModalRef_current.hide(returns);
};
const magicModal = {
    show,
    hide,
    lock: ()=>{
        var _magicModalRef_current;
        return (_magicModalRef_current = magicModalRef.current) === null || _magicModalRef_current === void 0 ? void 0 : _magicModalRef_current.lock();
    },
    unlock: ()=>{
        var _magicModalRef_current;
        return (_magicModalRef_current = magicModalRef.current) === null || _magicModalRef_current === void 0 ? void 0 : _magicModalRef_current.unlock();
    }
};
const MagicModalPortal = ()=>{
    _s1();
    const callbackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        "MagicModalPortal.useRef[callbackRef]": ()=>{}
    }["MagicModalPortal.useRef[callbackRef]"]);
    const [Content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [closeable, setCloseable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const hide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MagicModalPortal.useCallback[hide]": async (returns)=>{
            setContent(null);
            callbackRef.current(returns);
        }
    }["MagicModalPortal.useCallback[hide]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MagicModalPortal.useEffect": ()=>{
            hide();
        }
    }["MagicModalPortal.useEffect"], [
        pathname,
        hide
    ]);
    const show = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MagicModalPortal.useCallback[show]": async function(NewComponent) {
            let props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            const { closeable = true } = props;
            setContent({
                "MagicModalPortal.useCallback[show]": ()=>NewComponent
            }["MagicModalPortal.useCallback[show]"]);
            setCloseable(closeable);
            return new Promise({
                "MagicModalPortal.useCallback[show]": (resolve)=>{
                    callbackRef.current = resolve;
                }
            }["MagicModalPortal.useCallback[show]"]);
        }
    }["MagicModalPortal.useCallback[show]"], [
        Content
    ]);
    const lock = ()=>setCloseable(false);
    const unlock = ()=>setCloseable(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(magicModalRef, {
        "MagicModalPortal.useImperativeHandle": ()=>({
                hide,
                show,
                lock,
                unlock
            })
    }["MagicModalPortal.useImperativeHandle"]);
    const RenderingContent = Content !== null && Content !== void 0 ? Content : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$components$2f$ui$2f$empty$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyComponent"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MagicModalContext.Provider, {
        value: {
            closeable
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RenderingContent, {}, void 0, false, {
            fileName: "[project]/apps/web/src/core/components/ui/magic-modal/index.tsx",
            lineNumber: 95,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/components/ui/magic-modal/index.tsx",
        lineNumber: 94,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(MagicModalPortal, "JdG3lTjX0r8jRhVo1eC8kvBWoOA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MagicModalPortal;
var _c;
__turbopack_context__.k.register(_c, "MagicModalPortal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_core_components_ui_16df0259._.js.map