(this.webpackJsonpnovel_managefront=this.webpackJsonpnovel_managefront||[]).push([[5],{536:function(e,n,t){"use strict";t.r(n),t.d(n,"UserManagementView",(function(){return h})),t.d(n,"TableTool",(function(){return O})),t.d(n,"ModalIcons",(function(){return k})),t(95);var a=t(59),o=t.n(a),i=t(0),l=t.n(i),r=t(559),c=(t(164),t(99)),s=t.n(c),u=t(39),d=t(26),p=t(75),m=t(42),f=t(538),b=t(558),v=t(560),g=t(557),h=function(){var e=function(){var e=Object(i.useRef)(),n=Object(i.useRef)(),t={options:{inline:!0,config:[{id:"userName",type:"input",name:"用户名",options:{value:""}},{id:"submit",type:"button",name:"",options:{buttonName:"搜索",htmlType:"submit",click:function(){return new Promise((function(e,n){setTimeout((function(){e()}),3e3)}))}}},{id:"reset",type:"button",name:"",options:{buttonName:"重置",htmlType:"reset",click:function(){return new Promise((function(n,t){e.current.resetData(),setTimeout((function(){n()}),3e3)}))}}}]}},a={columns:[{title:"用户名",dataIndex:"userName",key:"userName",align:"center"},{title:"登入账号",dataIndex:"name",key:"name",align:"center"},{title:"操作",dataIndex:"operates",key:"operates",align:"center",render:function(e,n,t){return O(e,n,t,N,M)}}],dataSource:[],pagination:{pageSize:100,current:1,total:1e3}},o={options:{isModal:!0,inline:!1,config:[{id:"userName",type:"input",name:"用户名",options:{value:""}},{id:"name",type:"input",name:"登录账号",options:{value:""}},{id:"password",type:"inputPassword",name:"密码",options:{value:""}}]}},l=Object(i.useState)(t.options),r=Object(u.a)(l,1)[0],c=Object(i.useState)(o.options),f=Object(u.a)(c,1)[0],b=Object(i.useState)(a),v=Object(u.a)(b,2),g=v[0],h=v[1],y=Object(i.useState)({title:"用户管理",forceRender:!0}),E=Object(u.a)(y,1)[0],j=Object(i.useState)(!1),w=Object(u.a)(j,2),S=w[0],C=w[1],F=Object(i.useState)({onCancel:function(){C(!1)},onOk:function(){C(!1)}}),T=Object(u.a)(F,1)[0],N=function(e,t,a){C(!0),setTimeout((function(){o.options.config.map((function(e){e.options&&n.current.setData(e.id,t[e.id])}))}),100)},M=function(e,n,t){s.a.confirm({title:"您确定删除该条数据吗？",icon:k(),content:"删除后的数据无法恢复,请谨慎操作",onOk:function(){},onCancel:function(){}})},P=Object(d.c)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e}),{manual:!0,requestMethod:function(e){return(new p.a).post(m.a.getUserList,e)},onSuccess:function(e,n){h(Object.assign({},g,{dataSource:e.data.page.list,pagination:{pageSize:e.data.page.pageSize,current:e.data.page.currPage,total:e.data.page.totalCount}}))}}),z=P.loading,R=P.run;return Object(d.b)((function(){R()})),{add:function(){C(!0),setTimeout((function(){n.current.resetData()}),100)},pageFormRef:e,pageModalFormRef:n,pageFormOptions:r,pageModalFormOptions:f,pageTableOptions:g,setPageTableOptions:h,pageModalOptions:E,showModal:S,setShowModal:C,loading:z,callbackOptions:T}}(),n=e.add,t=e.pageFormRef,a=e.pageFormOptions,c=e.pageTableOptions,f=e.loading,h=e.pageModalOptions,y=e.showModal,E=e.callbackOptions,j=e.pageModalFormRef,w=e.pageModalFormOptions;return l.a.createElement("div",{className:"user-management"},l.a.createElement(r.a,{name:"用户管理"},l.a.createElement(o.a,{type:"primary",onClick:n},"新增")),l.a.createElement(b.a,{ref:t,options:a}),l.a.createElement(v.a,{options:c,loading:f}),l.a.createElement(g.a,{options:h,visible:y,callbackOptions:E},l.a.createElement(b.a,{ref:j,options:w})))},O=function(e,n,t,a,i){return l.a.createElement(l.a.Fragment,null,l.a.createElement(o.a,{type:"primary",size:"small",onClick:function(){return a(e,n,t)}},"编辑"),"  ",l.a.createElement(o.a,{type:"primary",danger:!0,size:"small",onClick:function(){return i(e,n,t)}},"删除"))},k=function(){return l.a.createElement(f.a,null)};n.default=h},545:function(e,n,t){},552:function(e,n,t){},553:function(e,n,t){},557:function(e,n,t){"use strict";t.d(n,"a",(function(){return r})),t(164);var a=t(99),o=t.n(a),i=t(0),l=t.n(i),r=function(e){var n=e.options,t=e.children,a=e.callbackOptions,i=e.visible;return l.a.createElement("div",{className:"page-modal"},l.a.createElement(o.a,{afterClose:n.afterClose,bodyStyle:n.bodyStyle,cancelText:n.cancelText,centered:n.centered,closable:n.closable,closeIcon:n.closeIcon,confirmLoading:n.confirmLoading,destroyOnClose:n.destroyOnClose,footer:n.footer,forceRender:n.forceRender,keyboard:!1,mask:!0,maskClosable:!1,maskStyle:n.maskStyle,okText:n.okText,okType:n.okType,okButtonProps:n.okButtonProps,cancelButtonProps:n.cancelButtonProps,style:n.style,title:n.title,visible:i,width:n.width||600,wrapClassName:n.wrapClassName,onCancel:a.onCancel,onOk:a.onOk},t))}},558:function(e,n,t){"use strict";t(561);var a=t(574),o=t.n(a),i=(t(95),t(59)),l=t.n(i),r=(t(161),t(48)),c=t.n(r),s=t(0),u=t.n(s),d=t(101),p=t(562),m=t(39),f=t(26),b=function(e,n){var t=e.options,a=t.inline,o=t.labelCol,i=t.wrapperCol,l=t.config,r=a?null:{labelCol:Object.assign({},{span:4},o||{}),wrapperCol:Object.assign({span:20},i||{})},u=a?"inline":"horizontal",b=Object(s.useState)(r),v=Object(m.a)(b,1)[0],g=Object(s.useState)(function(e){var n={};return e.map((function(e){e.options&&e.options.value&&(n[e.id]=e.options.value)})),n}(l)),h=Object(m.a)(g,1)[0],O=Object(s.useState)([]),k=Object(m.a)(O,2),y=k[0],E=k[1],j=Object(s.useState)([]),w=Object(m.a)(j,2),S=w[0],C=w[1],F=Object(s.useState)([]),T=Object(m.a)(F,2),N=T[0],M=T[1],P=c.a.useForm(),z=Object(m.a)(P,1)[0],R=c.a.useForm(),x=Object(m.a)(R,1)[0];return Object(f.b)((function(){var e=function(e){var n=0,t=[],a=[],o=[];return e.map((function(e){"submit"!==e.id&&"reset"!==e.id?function(e){return e.options&&e.options.hidden&&"function"==typeof e.options.hidden&&e.options.hidden()}(e)||(n<4?a.push(e):o.push(e),n++):"submit"!==e.id&&"reset"!==e.id||t.push(e)})),{defaultShow:a=[].concat(Object(d.a)(a),t),defaultHidden:o}}(l);E(e.defaultShow),C(e.defaultHidden),M(e.defaultHidden.map((function(e){return e.id})))})),Object(s.useImperativeHandle)(n,(function(){return{getData:function(){var e={};return l.map((function(n){n.options&&void 0!==typeof n.options.value&&(e[n.id]=z.getFieldValue(n.id))})),N.map((function(n){return e[n]=x.getFieldValue(n)})),e},setData:function(e,n){z.setFieldsValue(Object(p.a)({},e,n))},resetData:function(){z.resetFields(),x.resetFields()}}})),{form:z,formMore:x,formItemLayout:v,layout:u,initialValues:h,onFinish:function(e){},onFinishFailed:function(e){},onFieldsChange:function(e,n){},onValuesChange:function(e,n){},defaultShow:y,defaultHidden:S}},v=(t(546),t(543)),g=t.n(v),h=(t(563),t(573)),O=t.n(h),k=(t(564),t(569)),y=t.n(k),E=(t(547),t(542)),j=t.n(E),w=(t(566),t(567)),S=t.n(w),C=(t(250),t(152)),F=t.n(C),T=function(e){var n,t,a,o,i,r,d,p,f,b,v,h,k,E,w,C,T,N,M,P,z,R,x,I=function(e){var n=Object(s.useState)(!1),t=Object(m.a)(n,2),a=t[0],o=t[1];return{btnLoading:a,PageFormItemBtnClickEvent:function(e){var n,t;(null===(n=e.options)||void 0===n?void 0:n.click)&&(o(!0),null===(t=e.options)||void 0===t||t.click(e).then((function(){return o(!1)})))}}}(e.form),V=I.btnLoading,L=I.PageFormItemBtnClickEvent,B=u.a.createElement("div",null),D=e.config;switch(D.type){case"input":B=u.a.createElement(F.a,{disabled:null===(n=D.options)||void 0===n?void 0:n.disabled});break;case"inputNumber":B=u.a.createElement(S.a,{min:null===(t=D.options)||void 0===t?void 0:t.min,max:null===(a=D.options)||void 0===a?void 0:a.max,disabled:null===(o=D.options)||void 0===o?void 0:o.disabled});break;case"inputPassword":B=u.a.createElement(F.a.Password,{disabled:null===(i=D.options)||void 0===i?void 0:i.disabled});break;case"textArea":B=u.a.createElement(F.a.TextArea,{disabled:null===(r=D.options)||void 0===r?void 0:r.disabled});break;case"select":B=u.a.createElement(j.a,{options:null===(d=D.options)||void 0===d?void 0:d.list,disabled:null===(p=D.options)||void 0===p?void 0:p.disabled});break;case"button":B=u.a.createElement(l.a,{onClick:function(){return L(D)},type:(null===(f=D.options)||void 0===f?void 0:f.buttonType)||"primary",loading:V,htmlType:(null===(b=D.options)||void 0===b?void 0:b.htmlType)||"button",block:null===(v=D.options)||void 0===v?void 0:v.block,danger:null===(h=D.options)||void 0===h?void 0:h.danger},null===(k=D.options)||void 0===k?void 0:k.buttonName);break;case"datePicker":B=u.a.createElement(y.a,{disabled:null===(E=D.options)||void 0===E?void 0:E.disabled});break;case"rangePicker":B=u.a.createElement(y.a.RangePicker,{showTime:null===(w=D.options)||void 0===w?void 0:w.showTime});break;case"switch":B=u.a.createElement(O.a,{checkedChildren:(null===(C=D.options)||void 0===C?void 0:C.checkedChildren)||"开启",unCheckedChildren:(null===(T=D.options)||void 0===T?void 0:T.unCheckedChildren)||"关闭",disabled:null===(N=D.options)||void 0===N?void 0:N.disabled,loading:null===(M=D.options)||void 0===M?void 0:M.loading});break;case"radio":B=u.a.createElement(g.a.Group,{options:null===(P=D.options)||void 0===P?void 0:P.list,disabled:null===(z=D.options)||void 0===z?void 0:z.disabled});break;case"customRender":B=(null===(R=D.options)||void 0===R?void 0:R.customRender)&&(null===(x=D.options)||void 0===x?void 0:x.customRender())}return u.a.createElement(c.a.Item,{className:"".concat("button"===D.type?"page-form-btn":""),key:D.id,name:D.id,label:D.name||"",rules:e.options.rules&&e.options.rules[D.id]?e.options.rules[D.id]:null,valuePropName:"switch"===D.type?"checked":void 0},B)},N=t(170),M=(t(552),t(537)),P=Object(s.forwardRef)((function(e,n){return u.a.createElement("div",{className:"page-form ".concat(e.options.inline?"page-form-inline":"page-form-horizontal")},z(e,n))})),z=function(e,n){var t=b(e,n),a=t.form,o=t.formMore,i=t.formItemLayout,l=t.layout,r=t.initialValues,s=t.onFinish,d=t.onFinishFailed,p=t.onFieldsChange,m=t.onValuesChange,f=t.defaultShow,v=t.defaultHidden;return e.options.isModal?u.a.createElement(c.a,Object.assign({},i,{form:a,layout:l,initialValues:r,size:"middle",onFinish:s,onFinishFailed:d,onFieldsChange:p,onValuesChange:m}),R(e,f,v,a)):u.a.createElement("div",{className:"page-form-show--wrap"},u.a.createElement(N.a,{customClassName:"page-form--scrollbar",options:{scrollY:!1}},u.a.createElement("div",{className:"page-form-show--container"},u.a.createElement(c.a,Object.assign({},i,{form:a,layout:l,initialValues:r,size:"middle",onFinish:s,onFinishFailed:d,onFieldsChange:p,onValuesChange:m}),R(e,f,v,a,o)))))},R=function(e,n,t,a,i){if(e.options.isModal)return e.options.config.map((function(n){return n.options&&n.options.hidden&&n.options.hidden()?null:x(e,n,a)}));var r=u.a.createElement("div",{className:"page-form-hidden-content"},u.a.createElement(c.a,{form:i,layout:"inline",size:"middle"},t.map((function(n){return x(e,n,a)})))),s=u.a.createElement(o.a,{content:r,placement:"bottom",title:"更多筛选",trigger:"click"},u.a.createElement(l.a,{type:"dashed",icon:u.a.createElement(M.a,null)},"更多筛选"));return u.a.createElement("div",null,n.map((function(n){return x(e,n,a)})),t.length>0&&s)},x=function(e,n,t){return u.a.createElement(T,{key:n.id,config:n,form:t,options:e.options})};n.a=P},559:function(e,n,t){"use strict";var a=t(0),o=t.n(a),i=t(39),l=t(32),r=t(26);t(545),n.a=function(e){var n=function(e){var n=Object(a.useState)(""),t=Object(i.a)(n,2),o=t[0],c=t[1],s=Object(l.a)().globalStore;return Object(r.b)((function(){!function n(t){for(var a=0;a<t.length;a++){var o;if(t[a].children&&t[a].children.length)n(t[a].children);else if((null===(o=e.location)||void 0===o?void 0:o.pathname)===t[a].path){c(t[a].name);break}}}(s.menuList)})),{defaultTitle:o}}(e).defaultTitle;return o.a.createElement("div",{className:"page-title-view-wrap"},o.a.createElement("div",{className:"page-title-view-item"},o.a.createElement("h4",{className:"page-title-view-wrap-name"},e.name||n,e.render&&e.render(),(e.info||!e.render)&&o.a.createElement("div",{className:"page-title-view-wrap-content"},o.a.createElement("i",{className:"el-icons-information"}))),o.a.createElement("div",{className:"page-title-view-wrap-setting"},e.children)))}},560:function(e,n,t){"use strict";t(575);var a=t(577),o=t.n(a),i=t(0),l=t.n(i),r=t(101),c=t(39),s=t(576),u=t.n(s),d=t(26);t(553),n.a=function(e){var n=function(e){var n=Object(i.useState)(e.columns),t=Object(c.a)(n,2),a=t[0],o=t[1],l=function(e){for(var n,t=0,a=0;a<e.toString().length;a++)t+=(n=e.toString().charCodeAt(a))>=0&&n<=128?1:2;return t};return Object(d.b)((function(){!function(){var e=[];a&&a.forEach((function(n){(void 0===n.hidden||"boolean"==typeof n.hidden&&!0!==n.hidden||"function"==typeof n.hidden&&!n.hidden())&&e.push(n)})),o(e)}()})),u()((function(){!function(){if(e.dataSource&&e.dataSource.length){var n={},t=a?a.slice():[];t.forEach((function(t){e.dataSource&&e.dataSource.map((function(e){if(t.key){n[t.key]||(n[t.key]=[]);var a=2*l(t.title),o=e[t.key]?l(e[t.key]):1,i=a>o?a:o;n[t.key].push(10*i)}})),t.width||(n[t.key]?t.render?t.width=150:t.width=Math.max.apply(Math,Object(r.a)(n[t.key])):t.width=200)})),o(t)}}()}),[e.dataSource]),{onTableChange:function(e,n,t,a){},columns:a}}(e.options),t=n.onTableChange,a=n.columns;return l.a.createElement("div",{className:"page-table"},l.a.createElement(o.a,{rowKey:"id",size:"small",tableLayout:e.options.tableLayout,columns:a,pagination:e.options.pagination?{current:e.options.pagination.current,pageSize:e.options.pagination.pageSize,total:e.options.pagination.total,showTotal:function(e){return"共".concat(e,"条")},showSizeChanger:!0,pageSizeOptions:["10","20","50","100"]}:{},dataSource:e.options.dataSource,loading:e.loading,onChange:t,scroll:{y:"calc(100vh - 346px)"}}))}}}]);