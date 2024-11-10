if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AgreementDialog_Params {
    logTag?: string;
    domainId?: number;
    dialogController?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
    clickHyperlinkText?: () => void;
    privacyText?: loginComponentManager.PrivacyText[];
}
interface QuickLoginButtonComponent_Params {
    logTag?: string;
    domainId?: number;
    quickLoginAnonymousPhone?: string;
    isSelected?: boolean;
    // 定义LoginWithHuaweiIDButton展示的隐私文本，展示应用的用户服务协议、隐私协议和华为账号用户认证协议
    privacyText?: loginComponentManager.PrivacyText[];
    // 构造LoginWithHuaweiIDButton组件的控制器
    controller?: loginComponentManager.LoginWithHuaweiIDButtonController;
    agreementDialog?: CustomDialogController;
}
interface Login_Params {
    pageInfos?: NavPathStack;
}
import util from "@ohos:util";
import authentication from "@hms:core.authentication";
import { loginComponentManager, LoginWithHuaweiIDButton } from "@hms:core.account.LoginComponent";
import hilog from "@ohos:hilog";
import type { BusinessError } from "@ohos:base";
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
export function PageLoginBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new Login(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Login.ets", line: 9, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "Login" });
    }
}
class Login extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.pageInfos = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Login_Params) {
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
    }
    updateStateVars(params: Login_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private pageInfos: NavPathStack;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Login.ets(17:7)", "entry");
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new QuickLoginButtonComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Login.ets", line: 18, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "QuickLoginButtonComponent" });
                }
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Login" });
            NavDestination.onReady((ctx: NavDestinationContext) => {
                this.pageInfos = ctx.pathStack;
            });
            NavDestination.debugLine("entry/src/main/ets/pages/Login.ets(16:5)", "entry");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class QuickLoginButtonComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.logTag = 'QuickLoginButtonComponent';
        this.domainId = 0x0000;
        this.__quickLoginAnonymousPhone = new ObservedPropertySimplePU('', this, "quickLoginAnonymousPhone");
        this.__isSelected = new ObservedPropertySimplePU(false, this, "isSelected");
        this.privacyText = [{
                text: '已阅读并同意',
                type: loginComponentManager.TextType.PLAIN_TEXT
            }, {
                text: '《用户服务协议》',
                tag: QuickLoginButtonComponent.USER_SERVICE_TAG,
                type: loginComponentManager.TextType.RICH_TEXT
            }, {
                text: '《隐私协议》',
                tag: QuickLoginButtonComponent.PRIVACY_TAG,
                type: loginComponentManager.TextType.RICH_TEXT
            }, {
                text: '和',
                type: loginComponentManager.TextType.PLAIN_TEXT
            }, {
                text: '《华为账号用户认证协议》',
                tag: QuickLoginButtonComponent.USER_AUTHENTICATION_TAG,
                type: loginComponentManager.TextType.RICH_TEXT
            }, {
                text: '。',
                type: loginComponentManager.TextType.PLAIN_TEXT
            }];
        this.controller = new loginComponentManager.LoginWithHuaweiIDButtonController()
            /**
             * 当应用使用自定义的登录页时，如果用户未同意协议，需要设置协议状态为NOT_ACCEPTED，当用户同意协议后再设置
             * 协议状态为ACCEPTED，才可以使用华为账号一键登录功能
             */
            .setAgreementStatus(loginComponentManager.AgreementStatus.NOT_ACCEPTED)
            .onClickLoginWithHuaweiIDButton((error: BusinessError | undefined, response: loginComponentManager.HuaweiIDCredential) => {
            this.handleLoginWithHuaweiIDButton(error, response);
        })
            .onClickEvent((error: BusinessError, clickEvent: loginComponentManager.ClickEvent) => {
            if (error) {
                this.dealAllError(error);
                return;
            }
            hilog.info(this.domainId, this.logTag, `onClickEvent clickEvent: ${clickEvent}`);
        });
        this.agreementDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new AgreementDialog(this, {
                    privacyText: this.privacyText,
                    cancel: () => {
                        this.agreementDialog.close();
                        this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.NOT_ACCEPTED);
                    },
                    confirm: () => {
                        this.agreementDialog.close();
                        this.isSelected = true;
                        this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.ACCEPTED);
                        // 调用此方法，同意协议与登录一并完成，无需再次点击登录按钮
                        this.controller.continueLogin((error: BusinessError) => {
                            if (error) {
                                hilog.error(this.domainId, this.logTag, `Failed to click agreementDialog continueLogin. errCode is ${error.code}, errMessage is ${error.message}`);
                            }
                            else {
                                hilog.info(this.domainId, this.logTag, 'Succeed in clicking agreementDialog continueLogin.');
                            }
                        });
                    },
                    clickHyperlinkText: () => {
                        this.agreementDialog.close();
                        this.jumpToPrivacyWebView();
                    }
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/Login.ets", line: 84, col: 14 });
                jsDialog.setController(this.agreementDialog);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        privacyText: this.privacyText,
                        cancel: () => {
                            this.agreementDialog.close();
                            this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.NOT_ACCEPTED);
                        },
                        confirm: () => {
                            this.agreementDialog.close();
                            this.isSelected = true;
                            this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.ACCEPTED);
                            // 调用此方法，同意协议与登录一并完成，无需再次点击登录按钮
                            this.controller.continueLogin((error: BusinessError) => {
                                if (error) {
                                    hilog.error(this.domainId, this.logTag, `Failed to click agreementDialog continueLogin. errCode is ${error.code}, errMessage is ${error.message}`);
                                }
                                else {
                                    hilog.info(this.domainId, this.logTag, 'Succeed in clicking agreementDialog continueLogin.');
                                }
                            });
                        },
                        clickHyperlinkText: () => {
                            this.agreementDialog.close();
                            this.jumpToPrivacyWebView();
                        }
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: false,
            alignment: DialogAlignment.Center
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: QuickLoginButtonComponent_Params) {
        if (params.logTag !== undefined) {
            this.logTag = params.logTag;
        }
        if (params.domainId !== undefined) {
            this.domainId = params.domainId;
        }
        if (params.quickLoginAnonymousPhone !== undefined) {
            this.quickLoginAnonymousPhone = params.quickLoginAnonymousPhone;
        }
        if (params.isSelected !== undefined) {
            this.isSelected = params.isSelected;
        }
        if (params.privacyText !== undefined) {
            this.privacyText = params.privacyText;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.agreementDialog !== undefined) {
            this.agreementDialog = params.agreementDialog;
        }
    }
    updateStateVars(params: QuickLoginButtonComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__quickLoginAnonymousPhone.purgeDependencyOnElmtId(rmElmtId);
        this.__isSelected.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__quickLoginAnonymousPhone.aboutToBeDeleted();
        this.__isSelected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private logTag: string;
    private domainId: number;
    // 匿名化手机号
    private __quickLoginAnonymousPhone: ObservedPropertySimplePU<string>;
    get quickLoginAnonymousPhone() {
        return this.__quickLoginAnonymousPhone.get();
    }
    set quickLoginAnonymousPhone(newValue: string) {
        this.__quickLoginAnonymousPhone.set(newValue);
    }
    // 是否勾选协议
    private __isSelected: ObservedPropertySimplePU<boolean>;
    get isSelected() {
        return this.__isSelected.get();
    }
    set isSelected(newValue: boolean) {
        this.__isSelected.set(newValue);
    }
    // 华为账号用户认证协议链接，此处仅为示例，实际开发过程中，域名不建议硬编码在本地
    private static USER_AUTHENTICATION_PROTOCOL: string = 'https://privacy.consumer.huawei.com/legal/id/authentication-terms.htm?code=CN&language=zh-CN';
    private static USER_SERVICE_TAG = '用户服务协议';
    private static PRIVACY_TAG = '隐私协议';
    private static USER_AUTHENTICATION_TAG = '华为账号用户认证协议';
    // 定义LoginWithHuaweiIDButton展示的隐私文本，展示应用的用户服务协议、隐私协议和华为账号用户认证协议
    private privacyText: loginComponentManager.PrivacyText[];
    // 构造LoginWithHuaweiIDButton组件的控制器
    private controller: loginComponentManager.LoginWithHuaweiIDButtonController;
    private agreementDialog: CustomDialogController;
    aboutToAppear(): void {
        this.getQuickLoginAnonymousPhone();
    }
    // Toast提示
    showToast(resource: string) {
        try {
            promptAction.showToast({
                message: resource,
                duration: 2000
            });
        }
        catch (error) {
            const message = (error as BusinessError).message;
            const code = (error as BusinessError).code;
            hilog.error(this.domainId, this.logTag, `showToast args  errCode is ${code}, errMessage is ${message}`);
        }
    }
    // 跳转华为账号用户认证协议页,该页面需在工程main_pages.json文件配置
    jumpToPrivacyWebView() {
        router.pushUrl({
            // 在工程main_pages.json文件配置跳转页，具体可参考AccountKit开发指南使用华为账号一键登录WebPage示例代码
            url: 'pages/WebPage',
            params: {
                isFromDialog: true,
                url: QuickLoginButtonComponent.USER_AUTHENTICATION_PROTOCOL,
            }
        }, (err) => {
            if (err) {
                hilog.error(this.domainId, this.logTag, `Failed to jumpToPrivacyWebView, errCode is ${err.code}, errMessage is ${err.message}`);
            }
        });
    }
    handleLoginWithHuaweiIDButton(error: BusinessError | undefined, response: loginComponentManager.HuaweiIDCredential) {
        if (error) {
            hilog.error(this.domainId, this.logTag, `Failed to click LoginWithHuaweiIDButton. errCode is ${error.code}, errMessage is ${error.message}`);
            if (error.code === ErrorCode.ERROR_CODE_NETWORK_ERROR) {
                AlertDialog.show({
                    message: "网络未连接，请检查网络设置。",
                    offset: { dx: 0, dy: -12 },
                    alignment: DialogAlignment.Bottom,
                    autoCancel: false,
                    confirm: {
                        value: "知道了",
                        action: () => {
                        }
                    }
                });
            }
            else if (error.code === ErrorCode.ERROR_CODE_AGREEMENT_STATUS_NOT_ACCEPTED) {
                // 未同意协议，弹出协议弹框，推荐使用该回调方式
                this.agreementDialog.open();
            }
            else if (error.code === ErrorCode.ERROR_CODE_LOGIN_OUT) {
                // 华为账号未登录提示
                this.showToast("华为账号未登录，请重试");
            }
            else if (error.code === ErrorCode.ERROR_CODE_NOT_SUPPORTED) {
                // 不支持该scopes或permissions提示
                this.showToast("该scopes或permissions不支持");
            }
            else {
                // 其他提示系统或服务异常
                this.showToast('服务或网络异常，请稍后重试');
                // TODO: 其他错误码处理，请参考API中的错误码查看详细错误原因
            }
            return;
        }
        try {
            if (this.isSelected) {
                if (response) {
                    hilog.info(this.domainId, this.logTag, 'Succeed in clicking LoginWithHuaweiIDButton.');
                    // 开发者根据实际业务情况使用以下信息
                    const authCode = response.authorizationCode;
                    const openID = response.openID;
                    const unionID = response.unionID;
                    const idToken = response.idToken;
                }
            }
            else {
                this.agreementDialog.open();
            }
        }
        catch (err) {
            hilog.error(this.domainId, this.logTag, `Failed to LoginWithHuaweiIDButton, errCode: ${err.code}, errMessage: ${err.message}`);
            AlertDialog.show({
                message: '服务或网络异常，请稍后重试',
                offset: { dx: 0, dy: -12 },
                alignment: DialogAlignment.Bottom,
                autoCancel: false,
                confirm: {
                    value: '知道了',
                    action: () => {
                    }
                }
            });
        }
    }
    // 错误处理
    dealAllError(error: BusinessError): void {
        hilog.error(this.domainId, this.logTag, `Failed to login, errorCode is ${error.code}, errorMessage is ${error.message}`);
        // TODO: 错误码处理，请参考API中的错误码根据实际情况处理
    }
    getQuickLoginAnonymousPhone() {
        // 创建授权请求，并设置参数
        const authRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
        // 获取匿名手机号需传quickLoginAnonymousPhone这个scope，传参之前需要先申请“华为账号一键登录”权限
        //(权限名称为：quickLoginMobilePhone),后续才能获取匿名手机号数据
        authRequest.scopes = ['quickLoginAnonymousPhone'];
        // 用于防跨站点请求伪造
        authRequest.state = util.generateRandomUUID();
        // 一键登录场景该参数只能设置为false
        authRequest.forceAuthorization = false;
        const controller = new authentication.AuthenticationController();
        try {
            controller.executeRequest(authRequest).then((response: authentication.AuthorizationWithHuaweiIDResponse) => {
                // 获取到UnionID、OpenID、匿名手机号
                const unionID = response.data?.unionID;
                const openID = response.data?.openID;
                const anonymousPhone = response.data?.extraInfo?.quickLoginAnonymousPhone as string;
                if (anonymousPhone) {
                    hilog.info(this.domainId, this.logTag, 'Succeeded in authentication.');
                    this.quickLoginAnonymousPhone = anonymousPhone;
                    return;
                }
                hilog.info(this.domainId, this.logTag, 'Succeeded in authentication. AnonymousPhone is empty.');
                // 未获取到匿名手机号需要跳转到应用自定义的登录页面
            }).catch((error: BusinessError) => {
                this.dealAllError(error);
            });
        }
        catch (error) {
            this.dealAllError(error);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/Login.ets(256:5)", "entry");
            Scroll.width('100%');
            Scroll.height('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Login.ets(257:7)", "entry");
            Column.justifyContent(FlexAlign.SpaceBetween);
            Column.constraintSize({ minHeight: '100%' });
            Column.margin({
                left: 16,
                right: 16
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Login.ets(258:9)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Login.ets(259:11)", "entry");
            Column.margin({
                top: 100
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777217, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/Login.ets(260:13)", "entry");
            Image.width(48);
            Image.height(48);
            Image.draggable(false);
            Image.copyOption(CopyOptions.None);
            Image.onComplete(() => {
                hilog.info(this.domainId, this.logTag, 'appIcon loading success.');
            });
            Image.onError(() => {
                hilog.error(this.domainId, this.logTag, 'appIcon loading fail.');
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777216, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/Login.ets(272:13)", "entry");
            Text.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontWeight(FontWeight.Bold);
            Text.maxFontSize({ "id": 125829676, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.minFontSize({ "id": 125829684, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.maxLines(1);
            Text.fontColor({ "id": 125829210, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.constraintSize({ maxWidth: '100%' });
            Text.margin({
                top: 12,
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('应用描述');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(285:13)", "entry");
            Text.fontSize({ "id": 125829685, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontColor({ "id": 125829216, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontFamily({ "id": 125829694, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Regular);
            Text.constraintSize({ maxWidth: '100%' });
            Text.margin({
                top: 8,
            });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Login.ets(298:11)", "entry");
            Column.margin({
                top: 64
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.quickLoginAnonymousPhone);
            Text.debugLine("entry/src/main/ets/pages/Login.ets(299:13)", "entry");
            Text.fontSize(36);
            Text.fontColor({ "id": 125829210, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.lineHeight(48);
            Text.textAlign(TextAlign.Center);
            Text.maxLines(1);
            Text.constraintSize({ maxWidth: '100%', minHeight: 48 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('华为账号绑定号码');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(309:13)", "entry");
            Text.fontSize({ "id": 125829685, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontColor({ "id": 125829216, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontFamily({ "id": 125829694, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Regular);
            Text.lineHeight(19);
            Text.textAlign(TextAlign.Center);
            Text.maxLines(1);
            Text.constraintSize({ maxWidth: '100%' });
            Text.margin({
                top: 8
            });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Login.ets(325:11)", "entry");
            Column.height(40);
            Column.margin({
                top: 56
            });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LoginWithHuaweiIDButton(this, {
                        params: {
                            // LoginWithHuaweiIDButton支持的样式
                            style: loginComponentManager.Style.BUTTON_RED,
                            // 账号登录按钮在登录过程中展示加载态
                            extraStyle: {
                                buttonStyle: new loginComponentManager.ButtonStyle().loadingStyle({
                                    show: true
                                })
                            },
                            // LoginWithHuaweiIDButton的边框圆角半径
                            borderRadius: 24,
                            // LoginWithHuaweiIDButton支持的登录类型
                            loginType: loginComponentManager.LoginType.QUICK_LOGIN,
                            // LoginWithHuaweiIDButton支持按钮的样式跟随系统深浅色模式切换
                            supportDarkMode: true,
                            // verifyPhoneNumber：如果华为账号用户在过去90天内未进行短信验证，是否拉起Account Kit提供的短信验证码页面
                            verifyPhoneNumber: true
                        },
                        controller: this.controller
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Login.ets", line: 326, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            params: {
                                // LoginWithHuaweiIDButton支持的样式
                                style: loginComponentManager.Style.BUTTON_RED,
                                // 账号登录按钮在登录过程中展示加载态
                                extraStyle: {
                                    buttonStyle: new loginComponentManager.ButtonStyle().loadingStyle({
                                        show: true
                                    })
                                },
                                // LoginWithHuaweiIDButton的边框圆角半径
                                borderRadius: 24,
                                // LoginWithHuaweiIDButton支持的登录类型
                                loginType: loginComponentManager.LoginType.QUICK_LOGIN,
                                // LoginWithHuaweiIDButton支持按钮的样式跟随系统深浅色模式切换
                                supportDarkMode: true,
                                // verifyPhoneNumber：如果华为账号用户在过去90天内未进行短信验证，是否拉起Account Kit提供的短信验证码页面
                                verifyPhoneNumber: true
                            },
                            controller: this.controller
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "LoginWithHuaweiIDButton" });
        }
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Login.ets(353:11)", "entry");
            Column.margin({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({
                type: ButtonType.Capsule,
                stateEffect: true
            });
            Button.debugLine("entry/src/main/ets/pages/Login.ets(354:13)", "entry");
            Button.fontColor({ "id": 125829231, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor({ "id": 125829510, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.focusable(true);
            Button.focusOnTouch(true);
            Button.constraintSize({ minHeight: 40 });
            Button.width('100%');
            Button.onClick(() => {
                hilog.info(this.domainId, this.logTag, 'click optionalLoginButton.');
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('其他方式登录');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(358:15)", "entry");
            Text.fontColor({ "id": 125829231, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontSize({ "id": 125829681, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.focusable(true);
            Text.focusOnTouch(true);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(1);
            Text.padding({ left: 8, right: 8 });
        }, Text);
        Text.pop();
        Button.pop();
        Column.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Login.ets(383:9)", "entry");
            Row.alignItems(VerticalAlign.Top);
            Row.margin({
                bottom: 16
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Login.ets(384:11)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Checkbox.create({ name: 'privacyCheckbox', group: 'privacyCheckboxGroup' });
            Checkbox.debugLine("entry/src/main/ets/pages/Login.ets(385:13)", "entry");
            Checkbox.width(24);
            Checkbox.height(24);
            Checkbox.focusable(true);
            Checkbox.focusOnTouch(true);
            Checkbox.margin({ top: 0 });
            Checkbox.select(this.isSelected);
            Checkbox.onChange((value: boolean) => {
                if (value) {
                    this.isSelected = true;
                    this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.ACCEPTED);
                }
                else {
                    this.isSelected = false;
                    this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.NOT_ACCEPTED);
                }
                hilog.info(this.domainId, this.logTag, `agreementChecked: ${value}`);
            });
        }, Checkbox);
        Checkbox.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Login.ets(404:11)", "entry");
            Row.margin({ left: 12 });
            Row.layoutWeight(1);
            Row.constraintSize({ minHeight: 24 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("entry/src/main/ets/pages/Login.ets(405:13)", "entry");
            Text.width('100%');
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item?.type == loginComponentManager.TextType.PLAIN_TEXT && item?.text) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create(item?.text);
                                Span.debugLine("entry/src/main/ets/pages/Login.ets(408:19)", "entry");
                                Span.fontColor({ "id": 125829216, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.fontFamily({ "id": 125829694, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.fontWeight(FontWeight.Regular);
                                Span.fontSize({ "id": 125829686, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                            }, Span);
                        });
                    }
                    else if (item?.type == loginComponentManager.TextType.RICH_TEXT && item?.text) {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create(item?.text);
                                Span.debugLine("entry/src/main/ets/pages/Login.ets(414:19)", "entry");
                                Span.fontColor({ "id": 125829231, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.fontWeight(FontWeight.Medium);
                                Span.fontSize({ "id": 125829686, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.focusable(true);
                                Span.focusOnTouch(true);
                                Span.onClick(() => {
                                    // 应用需要根据item.tag实现协议页面的跳转逻辑
                                    hilog.info(this.domainId, this.logTag, `click privacy text tag: ${item.tag}`);
                                    // 华为账号用户认证协议
                                    if (item.tag === QuickLoginButtonComponent.USER_AUTHENTICATION_TAG) {
                                        this.jumpToPrivacyWebView();
                                    }
                                });
                            }, Span);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(2, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.privacyText, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Text.pop();
        Row.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class AgreementDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.logTag = 'AgreementDialog';
        this.domainId = 0x0000;
        this.dialogController = undefined;
        this.cancel = () => {
        };
        this.confirm = () => {
        };
        this.clickHyperlinkText = () => {
        };
        this.privacyText = [];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AgreementDialog_Params) {
        if (params.logTag !== undefined) {
            this.logTag = params.logTag;
        }
        if (params.domainId !== undefined) {
            this.domainId = params.domainId;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.clickHyperlinkText !== undefined) {
            this.clickHyperlinkText = params.clickHyperlinkText;
        }
        if (params.privacyText !== undefined) {
            this.privacyText = params.privacyText;
        }
    }
    updateStateVars(params: AgreementDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private logTag: string;
    private domainId: number;
    private dialogController?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.dialogController = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    private clickHyperlinkText: () => void;
    private privacyText: loginComponentManager.PrivacyText[];
    private static USER_AUTHENTICATION_TAG = '华为账号用户认证协议';
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Login.ets(469:5)", "entry");
            Column.backgroundColor({ "id": 125830234, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Column.padding({
                left: 16,
                right: 16
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Login.ets(470:7)", "entry");
            Row.alignItems(VerticalAlign.Center);
            Row.constraintSize({ minHeight: 56, maxWidth: 400 });
            Row.margin({
                left: { "id": 125829724, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" },
                right: { "id": 125829724, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('用户协议与隐私条款');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(471:9)", "entry");
            Text.id('loginPanel_agreement_dialog_privacy_title');
            Text.maxFontSize({ "id": 125829676, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.minFontSize({ "id": 125829684, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontColor({ "id": 125829210, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(2);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Login.ets(489:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("entry/src/main/ets/pages/Login.ets(490:9)", "entry");
            Text.width('100%');
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(10);
            Text.textAlign(TextAlign.Start);
            Text.focusable(true);
            Text.focusOnTouch(true);
            Text.padding({ left: 24, right: 24 });
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item?.type == loginComponentManager.TextType.PLAIN_TEXT && item?.text) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create(item?.text);
                                Span.debugLine("entry/src/main/ets/pages/Login.ets(493:15)", "entry");
                                Span.fontSize({ "id": 125829684, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.fontColor({ "id": 125829210, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.fontFamily({ "id": 125829694, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.fontWeight(FontWeight.Regular);
                            }, Span);
                        });
                    }
                    else if (item?.type == loginComponentManager.TextType.RICH_TEXT && item?.text) {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create(item?.text);
                                Span.debugLine("entry/src/main/ets/pages/Login.ets(499:15)", "entry");
                                Span.fontSize({ "id": 125829684, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.fontColor('#CE0E2D');
                                Span.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                Span.fontWeight(FontWeight.Medium);
                                Span.focusable(true);
                                Span.focusOnTouch(true);
                                Span.onClick(() => {
                                    // 应用需要根据item.tag实现协议页面的跳转逻辑
                                    hilog.info(this.domainId, this.logTag, `click privacy text tag: ${item.tag}`);
                                    // 华为账号用户认证协议
                                    if (item.tag === AgreementDialog.USER_AUTHENTICATION_TAG) {
                                        hilog.info(this.domainId, this.logTag, 'AgreementDialog click.');
                                        this.clickHyperlinkText();
                                    }
                                });
                            }, Span);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(2, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.privacyText, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                direction: FlexDirection.Row
            });
            Flex.debugLine("entry/src/main/ets/pages/Login.ets(527:7)", "entry");
            Flex.margin({
                top: 8,
                left: { "id": 125829747, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" },
                right: { "id": 125829747, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" },
                bottom: 16
            });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消', { type: ButtonType.Capsule, stateEffect: true });
            Button.debugLine("entry/src/main/ets/pages/Login.ets(530:9)", "entry");
            Button.id('loginPanel_agreement_cancel_btn');
            Button.fontColor({ "id": 125829210, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.fontSize({ "id": 125829681, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.backgroundColor(Color.Transparent);
            Button.fontWeight(FontWeight.Medium);
            Button.focusable(true);
            Button.focusOnTouch(true);
            Button.constraintSize({ minHeight: 40, maxWidth: 400 });
            Button.width('50%');
            Button.onClick(() => {
                hilog.info(this.domainId, this.logTag, 'AgreementDialog cancel.');
                this.cancel();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('同意并登录', { type: ButtonType.Capsule, stateEffect: true });
            Button.debugLine("entry/src/main/ets/pages/Login.ets(547:9)", "entry");
            Button.id('loginPanel_agreement_dialog_huawei_id_login_btn');
            Button.fontColor(Color.White);
            Button.backgroundColor('#CE0E2D');
            Button.fontSize({ "id": 125829681, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.fontWeight(FontWeight.Medium);
            Button.focusable(true);
            Button.focusOnTouch(true);
            Button.constraintSize({ minHeight: 40, maxWidth: 400 });
            Button.width('50%');
            Button.onClick(() => {
                hilog.info(this.domainId, this.logTag, 'AgreementDialog confirm.');
                this.confirm();
            });
        }, Button);
        Button.pop();
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export enum ErrorCode {
    // 账号未登录
    ERROR_CODE_LOGIN_OUT = 1001502001,
    // 该账号不支持一键登录，如儿童账号、海外账号
    ERROR_CODE_NOT_SUPPORTED = 1001500003,
    // 网络错误
    ERROR_CODE_NETWORK_ERROR = 1001502005,
    // 用户未同意用户协议
    ERROR_CODE_AGREEMENT_STATUS_NOT_ACCEPTED = 1005300001
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("Login", wrapBuilder(PageLoginBuilder));
    }
})();
