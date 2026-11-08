import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitText from './components/SplitText.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const screens = [
  { id:'plaza', name:'拼单广场', eyebrow:'01 / 发现需求', title:'在组织里，找到刚好同路的人。', text:'按已加入组织浏览拼单；卡片呈现发布人、商品、进度、截止时间与交接地点。筛选帮助成员快速找到合适的茶咖需求。', points:['组织切换与范围筛选','分格进度与发布时间','查看详情后再决定参与'] },
  { id:'detail', name:'需求详情', eyebrow:'02 / 看清约定', title:'参与之前，先把关键信息看清楚。', text:'需求详情汇总发起人、参与成员及各自选购商品，并持续展示杯数进度和截止倒计时。交接地点在参与前明确呈现。', points:['交接地点提前公开','参与成员头像与商品明细','截止倒计时和目标进度'] },
  { id:'publish', name:'发起拼单', eyebrow:'03 / 发布需求', title:'把商品、时间和交接安排一次说明白。', text:'发起人填写品牌、门店、商品、目标杯数、截止时间、预计送达时间和公共交接地点，再向当前组织成员发布。', points:['需求归属当前组织','必须填写明确交接地点','主动终止需填写原因并通知参与者'] },
  { id:'join', name:'参与拼单', eyebrow:'04 / 选择商品', title:'选好商品，再确认是否加入。', text:'参与者核对商品、剩余杯数、截止时间和交接地点后选择商品数量。提交前再次确认关键约定，减少误解。', points:['参与前展示交接地点','校验剩余杯数','提交后更新拼单进度'] },
  { id:'orders', name:'我的拼单', eyebrow:'05 / 跟进进度', title:'我发起的、我参与的，都有迹可循。', text:'集中查看本人发起和参与且尚未终止的拼单，了解当前状态、截止时间、杯数和下一步操作。', points:['按发起 / 参与查看','追踪拼单状态','进入详情继续处理'] },
  { id:'profile', name:'个人中心', eyebrow:'06 / 个人入口', title:'消息、记录与组织，从这里进入。', text:'个人中心汇集消息、历史拼单、我的组织、交易与信用等入口，让用户找到自己的重要记录。', points:['消息中心入口','历史拼单记录','组织与个人资料管理'] },
  { id:'org', name:'我的组织', eyebrow:'07 / 组织管理', title:'加入多个组织，也能管理自己的成员关系。', text:'查看组织名称、组织 ID、成员数、管理员和邀请码。用户可以加入多个组织，也可以主动退出。', points:['组织信息与邀请码','退出组织前二次确认','页面底部加入组织'] },
  { id:'messages', name:'消息中心', eyebrow:'08 / 及时通知', title:'关键状态变化，不错过。', text:'展示拼单参与、撮合成功、需求终止、付款与履约等相关消息。正式版本结合站内消息和微信订阅消息。', points:['拼单状态通知','发起人终止原因通知参与者','评价与申诉结果提醒'] },
  { id:'review', name:'履约评价', eyebrow:'09 / 完成闭环', title:'交接之后，用评价把履约结果记录下来。', text:'拼单成功并完成线下交接后，参与者提交履约评价；未履约需要填写原因，并按规则进入处理、处罚或申诉流程。', points:['评价结果留痕','未履约原因必填','保留处罚与申诉处理记录'] },
];

function Phone({ page }) {
  if (page.id === 'plaza') return <div className="phone actual"><img src="./screens/plaza.svg" alt="拼单广场 SVG 页面原型" /></div>;
  const names = {detail:'霸王茶姬 · 学院路店',publish:'发起一笔新拼单',join:'确认你的茶饮',orders:'我的拼单',profile:'个人中心',org:'我的组织',messages:'消息中心',review:'履约评价'};
  return <div className="phone"><div className="phone-status"><span>9:41</span><span>●●●　▰</span></div><div className="phone-head"><span>‹</span>{names[page.id]}<span>•••</span></div><div className="phone-body">
    {page.id==='detail' && <><div className="mini-cover"><small>正在拼单</small><b>霸王茶姬</b><span>学院路店　·　预计 15:20 送达</span></div><div className="mini-progress"><i/><i/><i/><i className="empty"/></div><p className="mini-count">已拼 3 / 4 杯 <span>剩余 18分32秒</span></p><div className="mini-block"><b>参与成员与已选商品</b><p>🌿 小林　伯牙绝弦 ×2</p><p>☁️ 阿哲　茉莉奶绿 ×1</p></div><div className="mini-place">📍 交接地点　教学楼一层大厅</div><button className="mini-cta">选商品参与</button></>}
    {page.id==='publish' && <><div className="mini-field">奶茶品牌　霸王茶姬　⌄</div><div className="mini-field">门店名称　学院路店</div><div className="mini-field">拼单商品　伯牙绝弦</div><div className="mini-field">目标杯数　4 杯</div><div className="mini-field">截止时间　13:30</div><div className="mini-field">预计送达　15:20</div><div className="mini-field">交接地点　教学楼一层大厅</div><button className="mini-cta">发布拼单</button></>}
    {page.id==='join' && <><div className="mini-product">🍵<div><b>伯牙绝弦</b><small>中杯 · 少冰 · 三分糖</small></div><strong>−　1　＋</strong></div><div className="mini-place">📍 教学楼一层大厅<br/><small>参与前确认线下交接位置</small></div><div className="mini-total">预计分摊 <b>¥ 18.00</b></div><button className="mini-cta">确认参与</button></>}
    {page.id==='orders' && <><div className="mini-tabs">我发起　　<span>我参与</span></div><div className="mini-order"><b>茶百道 · 科技园店</b><small>拼单中　3 / 6 杯</small><small>截止 12:10 · 交接 A 座大厅</small><button>查看进度　›</button></div><div className="mini-order"><b>沪上阿姨 · 南门店</b><small>撮合成功　4 杯</small><small>预计送达 12:25</small><button>进入订单　›</button></div></>}
    {page.id==='profile' && <><div className="mini-user"><div>王</div><section><b>小王同学</b><small>已加入 2 个组织</small></section><span>编辑资料　›</span></div>{['消息中心　　›','历史拼单　　›','我的组织　　›','交易记录　　›','信用与申诉　›'].map(x=><div className="mini-menu" key={x}>{x}</div>)}</>}
    {page.id==='org' && <><div className="mini-org"><small>当前组织</small><b>中央财经大学金融学院2017级</b><span>组织 ID：CUFE2017　·　86 位成员</span><span>管理员：林老师</span><div>邀请码　CUFE2017　复制</div><button>退出组织</button></div><button className="mini-cta">＋ 加入组织</button></>}
    {page.id==='messages' && <>{[['拼单成功','你的拼单已凑满目标杯数','刚刚'],['需求终止','发起人说明了终止原因','10:35'],['履约提醒','请确认本次线下交接结果','昨天']].map(x=><div className="mini-message" key={x[0]}><i>茶</i><section><b>{x[0]}</b><small>{x[1]}</small></section><time>{x[2]}</time></div>)}</>}
    {page.id==='review' && <><div className="mini-review-title">这次拼单完成了吗？</div><div className="mini-rating">★　★　★　★　★</div><div className="mini-field">选择履约结果　已履约　⌄</div><div className="mini-field">补充说明（未履约时必填）</div><button className="mini-cta">提交评价</button><small className="mini-note">未履约事件将按平台规则记录，并可发起申诉。</small></>}
  </div><div className="phone-tab"><span>拼单广场</span><span>我的拼单</span><b>个人中心</b></div></div>;
}

export default function App() {
  const requestedPage = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('page') : null;
  const [active, setActive] = useState(() => screens.some(screen => screen.id === requestedPage) ? requestedPage : 'plaza');
  const stage = useRef(null);
  const selected = screens.find(s => s.id === active) || screens[0];
  useEffect(() => {
    if (requestedPage) requestAnimationFrame(() => document.getElementById('page-showcase')?.scrollIntoView());
  }, []);
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.09 });
    let rafId;
    const raf = time => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);
  useGSAP(() => {
    gsap.from('.hero-word', { y: 80, opacity: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 });
    gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, { y: 38, opacity: 0, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 86%' } }));
  }, []);
  useGSAP(() => { gsap.fromTo(stage.current, { opacity:.45, y:10 }, { opacity:1, y:0, duration:.38, ease:'power2.out' }); }, { dependencies:[active], scope:stage });
  function goPage(id) { setActive(id); history.replaceState(null, '', `#page-${id}`); document.getElementById('page-showcase')?.scrollIntoView({ behavior:'smooth', block:'start' }); }
  return <>
    <header className="topbar"><a className="brand" href="#top">茶搭子<span>产品作品集</span></a><nav><a href="#story">项目故事</a><a href="#journey">使用流程</a><a href="#page-showcase">主要页面</a><a href="#roadmap">后续规划</a></nav><a className="top-cta" href="#page-showcase">探索页面 ↗</a><a className="lang-link" href="/en.html">EN</a></header>
    <main>
      <section className="hero" id="top"><div className="hero-grain"/><div className="hero-copy"><p className="overline hero-word">A SOCIAL TEA & COFFEE ORDERING EXPERIENCE　/　2025—26</p><h1><span className="hero-word">茶搭子</span><small className="hero-word">基于组织关系的茶咖拼单小程序/APP</small></h1><p className="owner hero-word">项目主理人：vivianwang</p><p className="owner-contact hero-word">联系方式：wv199959@gmail.com / wechat：vvv_0509</p><div className="hero-desc"><SplitText className="reactbits-split" text="让组织里的每一杯需求，" tag="p" splitType="chars" effect="rise" trigger="load" delay={42} duration={0.72}/><p>都更容易找到同行的人。</p></div><a className="hero-link hero-word" href="#story">向下探索项目 <span>↓</span></a></div><div className="hero-art"><div className="sun"/><div className="tea-cup"><div className="cup-lid"/><div className="cup-body"><span>茶</span></div><div className="cup-shadow"/></div><div className="hero-sticker">从组织<br/>开始连接</div><div className="hero-caption">A cup shared<br/>a little closer.</div></div><div className="hero-index">01 <i/> 09</div></section>
      <section className="intro section-pad" id="story"><div className="section-kicker reveal">01 / 项目缘起 <span>PROJECT BACKGROUND</span></div><div className="intro-grid"><h2 className="reveal">一杯奶茶，<br/>为什么要找人拼？</h2><div className="intro-text reveal"><p>单人下单常常难以达到优惠或配送门槛；临时找人效率有限，和陌生人拼单又让付款、商品核对、线下交接变得不确定。</p><p>茶搭子从一个更熟悉的起点出发：让同一学校、企业或班级里有相近需求的人，先在共同组织中找到彼此，再完成一场信息清楚、过程可追踪的茶咖拼单。茶搭子也帮助用户认识共同组织中原本不那么熟悉的人，拓展人脉圈，让拼单成为社交破圈的轻量入口。</p><a href="#value">了解产品定位　↘</a></div></div><div className="pain-row reveal"><div><b>01</b><span>难凑门槛<br/><small>优惠与配送要求难独自满足</small></span></div><div><b>02</b><span>邀约低效<br/><small>临时寻找同伴，时间成本高</small></span></div><div><b>03</b><span>协作不清<br/><small>商品、付款、交接容易有遗漏</small></span></div></div></section>
      <section className="position section-pad" id="value"><div className="section-kicker reveal">02 / 产品定位 <span>POSITIONING & VALUE</span></div><div className="position-grid"><h2 className="reveal">不只是凑单，<br/>也是<span>协作约定。</span></h2><div className="position-note reveal">一个以共同组织关系为基础、以本地茶咖拼单为切入点的需求撮合与协同工具。<p>用共同组织降低陌生感，用透明信息减少协作误会，用记录与评价帮助用户完成履约。</p></div></div><div className="value-lines"><div className="value-line reveal"><b>01</b><h3>组织连接</h3><p>加入多个组织，按当前组织浏览成员发布的需求。</p><span>TRUST / 共同身份关系</span></div><div className="value-line reveal"><b>02</b><h3>信息透明</h3><p>杯数、时间、商品与交接地点，在参与前说清楚。</p><span>CLARITY / 参与前知情</span></div><div className="value-line reveal"><b>03</b><h3>过程留痕</h3><p>从参与到评价，关键状态和处理结论可追溯。</p><span>FOLLOW-THROUGH / 履约闭环</span></div></div></section>
      <section className="journey section-pad" id="journey"><div className="section-kicker reveal">03 / 使用流程 <span>FROM NEED TO PICKUP</span></div><h2 className="reveal">从发布需求，到<span>线下交接</span></h2><div className="journey-rail"><div className="journey-line"/><div className="journey-step reveal"><i>01</i><b>加入组织</b><p>通过邀请码加入学校、企业或班级组织。</p></div><div className="journey-step reveal"><i>02</i><b>发布 / 发现</b><p>发起需求，或浏览当前组织的拼单广场。</p></div><div className="journey-step reveal"><i>03</i><b>确认后参与</b><p>先查看商品、截止时间和交接地点，再选购。</p></div><div className="journey-step reveal"><i>04</i><b>统一下单</b><p>发起人外部平台下单，记录费用与付款状态。</p></div><div className="journey-step reveal"><i>05</i><b>交接评价</b><p>线下领取后评价履约，异常可记录并申诉。</p></div></div><div className="journey-note reveal"><span>关键原则</span> 参与之前明确交接地点　·　发起人主动终止须填写原因并通知参与者　·　拼单成功后完成履约评价</div></section>
      <section className="showcase section-pad" id="page-showcase"><div className="section-kicker reveal">04 / 主要页面 <span>ONE PAGE AT A TIME</span></div><div className="showcase-heading"><h2 className="reveal">每个页面，<br/><span className="showcase-line-two">都在推进一件事。</span></h2><p className="reveal">选择页面，查看界面示意和它承担的产品任务。<br/>页面间可点击切换。</p></div><div className="showcase-layout"><div className="page-list" role="tablist" aria-label="主要产品页面">{screens.map((page,i)=><button key={page.id} id={`tab-${page.id}`} className={active===page.id?'page-link selected':'page-link'} onClick={()=>goPage(page.id)} role="tab" aria-controls="selected-screen" aria-selected={active===page.id}><span>{String(i+1).padStart(2,'0')}</span>{page.name}<b>↗</b></button>)}</div><div className="screen-stage" ref={stage} id="selected-screen" role="tabpanel" aria-labelledby={`tab-${active}`}><div className="screen-copy"><span className="screen-eyebrow">{selected.eyebrow}</span><h3>{selected.title}</h3><p>{selected.text}</p><ul>{selected.points.map(point=><li key={point}>{point}</li>)}</ul><div className="screen-arrows"><button onClick={()=>goPage(screens[(screens.findIndex(x=>x.id===active)+screens.length-1)%screens.length].id)}>← 上一页</button><button onClick={()=>goPage(screens[(screens.findIndex(x=>x.id===active)+1)%screens.length].id)}>下一页　→</button></div></div><Phone page={selected}/></div></div><div className="showcase-foot"><span>页面原型示意　/　功能与业务规则依据 PRD V2.2</span><span>当前为前端演示，不代表已接入真实服务</span></div></section>
      <section className="guardrails section-pad" id="rules"><div className="guardrail-title reveal"><div className="section-kicker">05 / 规则如何被看见 <span>DESIGNING FOR TRUST</span></div><h2>让重要约定<br/>不藏在<span>小字里。</span></h2></div><div className="guardrail-list"><div className="guardrail reveal"><b>参与前</b><p>明确展示公共交接地点，用户确认后再加入拼单。</p><i>01</i></div><div className="guardrail reveal"><b>发起人终止</b><p>主动终止必须填写原因，并通知所有已参与用户。</p><i>02</i></div><div className="guardrail reveal"><b>拼单成功后</b><p>成员完成履约评价；未履约事件按规则记录，保留处理与申诉流程。</p><i>03</i></div></div></section>
      <section className="roadmap section-pad" id="roadmap"><div className="section-kicker reveal">06 / 后续二、三阶段 <span>FUTURE DIRECTIONS</span></div><div className="roadmap-intro"><h2 className="reveal">从拼成一单，<br/>到<span>持续连接。</span></h2><p className="reveal">以下为尚未实现的后续构想，用示意图展示可能的产品延展，不代表当前版本已提供这些能力。</p></div><div className="future-grid"><article className="future reveal"><div className="future-top"><span>PHASE 02</span><small>体验与关系沉淀</small></div><h3>积分与信用激励</h3><p>围绕有效参与、按约交接和真实评价设计积分规则；用户可查看积分变化与信用记录。规则需避免诱导虚假拼单或以积分替代履约责任。</p><div className="points-flow"><div><i>拼单履约</i><b>＋</b><i>真实评价</i><b>＋</b><i>获得积分</i></div><div className="point-wallet"><span>我的积分</span><strong>120 <small>示意</small></strong><em>可兑换小额权益　→</em></div></div><div className="future-caption">示意：行为记录 → 积分账户 → 权益兑换</div></article><article className="future reveal"><div className="future-top"><span>PHASE 03</span><small>组织社区扩展</small></div><h3>组织内茶咖社区</h3><p>在拼单闭环稳定后，探索组织内新品讨论、口味推荐和主题活动。社区内容与交易状态分区，保留举报和管理入口。</p><div className="community-map"><div className="community-center">组织茶咖社区</div><i className="node n1">新品讨论</i><i className="node n2">口味推荐</i><i className="node n3">主题活动</i><i className="node n4">组织动态</i><span className="link l1"/><span className="link l2"/><span className="link l3"/><span className="link l4"/></div><div className="future-caption">示意：围绕共同组织关系形成轻量交流空间</div></article></div></section>
      <footer className="footer" id="closing"><div className="section-kicker">茶搭子　/　PRODUCT PORTFOLIO</div><h2>让下一杯，<br/>更容易一起喝。</h2><p>项目主理人：vivianwang</p><p className="footer-contact">联系方式：wv199959@gmail.com / wechat：vvv_0509</p><a href="#top">回到首页　↑</a><div className="footer-small">基于 PRD V2.2 与页面原型整理　·　产品仍处于原型演示阶段</div></footer>
    </main>
  </>;
}

