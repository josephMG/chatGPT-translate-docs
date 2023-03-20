
---
title: "React Conf 2021 Recap"
---

2021年12月17日，由 [Jesslyn Tannady](https://twitter.com/jtannady) 和 [Rick Hanlon](https://twitter.com/rickhanlonii) 主持

---

<Intro>

上週我們舉辦了第六屆 React Conf。在過去的幾年中，我們曾使用 React Conf 舞台來宣布改變行業的消息，例如 [_React Native_](https://engineering.fb.com/2015/03/26/android/react-native-bringing-modern-web-techniques-to-mobile/) 和 [_React Hooks_](https://reactjs.org/docs/hooks-intro.html)。今年，我們分享了我們對 React 的多平台願景，從發布 React 18 開始，逐步採用並行功能。

</Intro>

---

這是 React Conf 第一次在線上舉辦，並且免費提供8種不同語言的翻譯。來自世界各地的參與者加入了我們的會議 Discord，以及重播活動，以便在所有時區都能輕鬆訪問。超過50,000人註冊，19場演講有超過60,000次觀看，Discord 上的參與者超過5,000人。

所有演講都可以[在線上串流觀看](https://www.youtube.com/watch?v=FZ0cG47msEk&list=PLNG_1j3cPCaZZ7etkzWA7JfdmKWT0pMsa)。

以下是舞台上分享的摘要：

## React 18 和並行功能 {/*react-18-and-concurrent-features*/}

在主題演講中，我們分享了我們對未來 React 的願景，從 React 18 開始。

React 18 添加了期待已久的並行渲染器和更新的 Suspense，沒有任何重大的破壞性更改。應用程序可以升級到 React 18，並開始逐步採用並行功能，其努力程度與任何其他主要版本相當。

**這意味著沒有並行模式，只有並行功能。**

在主題演講中，我們還分享了我們對 Suspense、Server Components、新的 React 工作組以及 React Native 的長期多平台願景的看法。

在此處查看 [Andrew Clark](https://twitter.com/acdlite)、[Juan Tejada](https://twitter.com/_jstejada)、[Lauren Tan](https://twitter.com/potetotes) 和 [Rick Hanlon](https://twitter.com/rickhanlonii) 的完整主題演講：

<YouTubeIframe src="https://www.youtube.com/embed/FZ0cG47msEk" />

## 面向應用程序開發人員的 React 18 {/*react-18-for-application-developers*/}

在主題演講中，我們還宣布 React 18 RC 現已可供嘗試。在進一步收集反饋後，這就是我們明年初將發布到穩定版的 React 版本。

要嘗試 React 18 RC，請升級您的依賴項：

```bash
npm install react@rc react-dom@rc
```

並切換到新的 `createRoot` API：

```js
// before
const container = document.getElementById('root');
ReactDOM.render(<App />, container);

// after
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App/>);
```

有關升級到 React 18 的演示，請參見 [Shruti Kapoor](https://twitter.com/shrutikapoor08) 的演講：

<YouTubeIframe src="https://www.youtube.com/embed/ytudH8je5ko" />

## 使用 Suspense 進行串流服務器渲染 {/*streaming-server-rendering-with-suspense*/}

React 18 還包括使用 Suspense 改善服務器端渲染性能的功能。

串流服務器渲染可讓您從 React 組件在服務器上生成 HTML，並將該 HTML 流式傳輸給用戶。在 React 18 中，您可以使用 `Suspense` 將您的應用程序分解為較小的獨立單元，這些單元可以獨立於其他單元進行流式傳輸，而不會阻塞應用程序的其餘部分。這意味著用戶將更快地看到您的內容，並能夠更快地開始與之交互。

有關深入了解，請參見 [Shaundai Person](https://twitter.com/shaundai) 的演講：

<YouTubeIframe src="https://www.youtube.com/embed/pj5N-Khihgc" />

## 第一個 React 工作組 {/*the-first-react-working-group*/}

對於 React 18，我們創建了第一個工作組，與一個專家小組、開發人員、庫維護人員和教育工作者合作。我們共同努力創建了我們的逐步採用策略，並完善了新的 API，例如 `useId`、`useSyncExternalStore` 和 `useInsertionEffect`。

有關此工作的概述，請參見 [Aakansha' Doshi](https://twitter.com/aakansha1216) 的演講：

<YouTubeIframe src="https://www.youtube.com/embed/qn7gRClrC9U" />

## React 開發工具 {/*react-developer-tooling*/}

為了支持此版本中的新功能，我們還宣布成立了新的 React DevTools 團隊和一個新的時間軸分析器，以幫助開發人員調試其 React 應用程序。

有關更多信息和新 DevTools 功能的演示，請參見 [Brian Vaughn](https://twitter.com/brian_d_vaughn) 的演講：

<YouTubeIframe src="https://www.youtube.com/embed/oxDfrke8rZg" />

## 不使用 memo 的 React {/*react-without-memo*/}

展望未來，[Xuan Huang (黄玄)](https://twitter.com/Huxpro) 分享了我們的 React Labs 研究中的自動記憶化編譯器的更新。查看此演講以獲取更多信息和編譯器原型的演示：

<YouTubeIframe src="https://www.youtube.com/embed/lGEMwh32soc" />

## React 文件 keynote {/*react-docs-keynote*/}

[Rachel Nabors](https://twitter.com/rachelnabors) 以一個關於我們對 React [新文件](https://beta.reactjs.org/) 投資的主題演講，開啟了一系列有關學習和設計 React 的講座：

<YouTubeIframe src="https://www.youtube.com/embed/mneDaMYOKP8" />

## 還有更多... {/*and-more*/}

**我們還聽到了有關學習和設計 React 的講座：**

* Debbie O'Brien: [Things I learnt from the new React docs](https://youtu.be/-7odLW_hG7s).
* Sarah Rainsberger: [Learning in the Browser](https://youtu.be/5X-WEQflCL0).
* Linton Ye: [The ROI of Designing with React](https://youtu.be/7cPWmID5XAk).
* Delba de Oliveira: [Interactive playgrounds with React](https://youtu.be/zL8cz2W0z34).

**Relay、React Native 和 PyTorch 團隊的講座：**

* Robert Balicki: [Re-introducing Relay](https://youtu.be/lhVGdErZuN4).
* Eric Rozell and Steven Moyes: [React Native Desktop](https://youtu.be/9L4FFrvwJwY).
* Roman Rädle: [On-device Machine Learning for React Native](https://youtu.be/NLj73vrc2I8)

**社群中有關無障礙性、工具和 Server Components 的講座：**

* Daishi Kato: [React 18 for External Store Libraries](https://youtu.be/oPfSC5bQPR8).
* Diego Haz: [Building Accessible Components in React 18](https://youtu.be/dcm8fjBfro8).
* Tafu Nakazaki: [Accessible Japanese Form Components with React](https://youtu.be/S4a0QlsH0pU).
* Lyle Troxell: [UI tools for artists](https://youtu.be/b3l4WxipFsE).
* Helen Lin: [Hydrogen + React 18](https://youtu.be/HS6vIYkSNks).

## 感謝 {/*thank-you*/}

這是我們第一次自己策劃會議，我們有很多人要感謝。

首先，感謝所有演講者 [Aakansha Doshi](https://twitter.com/aakansha1216), [Andrew Clark](https://twitter.com/acdlite), [Brian Vaughn](https://twitter.com/brian_d_vaughn), [Daishi Kato](https://twitter.com/dai_shi), [Debbie O'Brien](https://twitter.com/debs_obrien), [Delba de Oliveira](https://twitter.com/delba_oliveira), [Diego Haz](https://twitter.com/diegohaz), [Eric Rozell](https://twitter.com/EricRozell), [Helen Lin](https://twitter.com/wizardlyhel), [Juan Tejada](https://twitter.com/_jstejada), [Lauren Tan](https://twitter.com/potetotes), [Linton Ye](https://twitter.com/lintonye), [Lyle Troxell](https://twitter.com/lyle), [Rachel Nabors](https://twitter.com/rachelnabors), [Rick Hanlon](https://twitter.com/rickhanlonii), [Robert Balicki](https://twitter.com/StatisticsFTW), [Roman Rädle](https://twitter.com/raedle), [Sarah Rainsberger](https://twitter.com/sarah11918), [Shaundai Person](https://twitter.com/shaundai), [Shruti Kapoor](https://twitter.com/shrutikapoor08), [Steven Moyes](https://twitter.com/moyessa), [Tafu Nakazaki](https://twitter.com/hawaiiman0), 和 [Xuan Huang (黄玄)](https://twitter.com/Huxpro)。

感謝所有提供演講反饋的人，包括 [Andrew Clark](https://twitter.com/acdlite), [Dan Abramov](https://twitter.com/dan_abramov), [Dave McCabe](https://twitter.com/mcc_abe), [Eli White](https://twitter.com/Eli_White), [Joe Savona](https://twitter.com/en_JS),  [Lauren Tan](https://twitter.com/potetotes), [Rachel Nabors](https://twitter.com/rachelnabors), 和 [Tim Yung](https://twitter.com/yungsters)。

感謝 [Lauren Tan](https://twitter.com/potetotes) 為會議 Discord 建立和擔任我們的 Discord 管理員。

感謝 [Seth Webster](https://twitter.com/sethwebster) 對整體方向的反饋，確保我們關注多樣性和包容性。

感謝 [Rachel Nabors](https://twitter.com/rachelnabors) 領導我們的審核工作，以及 [Aisha Blake](https://twitter.com/AishaBlake) 創建我們的審核指南，領導我們的審核團隊，培訓翻譯人員和審核人員，並幫助管理兩個活動的審核。

感謝我們的版主 [Jesslyn Tannady](https://twitter.com/jtannady), [Suzie Grange](https://twitter.com/missuze), [Becca Bailey](https://twitter.com/beccaliz), [Luna Wei](https://twitter.com/lunaleaps), [Joe Previte](https://twitter.com/jsjoeio), [Nicola Corti](https://twitter.com/Cortinico), [Gijs Weterings](https://twitter.com/gweterings), [Claudio Procida](https://twitter.com/claudiopro), Julia Neumann, Mengdi Chen, Jean Zhang, Ricky Li, 和 [Xuan Huang (黄玄)](https://twitter.com/Huxpro)。

感謝 [Manjula Dube](https://twitter.com/manjula_dube), [Sahil Mhapsekar](https://twitter.com/apheri0), 和 Vihang Patel 來自 [React India](https://www.reactindia.io/)，以及 [Jasmine Xie](https://twitter.com/jasmine_xby), [QiChang Li](https://twitter.com/QCL15), 和 [YanLun Li](https://twitter.com/anneincoding) 來自 [React China](https://twitter.com/ReactChina) 幫助管理我們的重播活動，讓社群保持參與度。

感謝 Vercel 發布他們的 [Virtual Event Starter Kit](https://vercel.com/virtual-event-starter-kit)，這是會議網站的基礎，還有 [Lee Robinson](https://twitter.com/leeerob) 和 [Delba de Oliveira](https://twitter.com/delba_oliveira) 分享他們在 Next.js Conf 上運行的經驗。

感謝 [Leah Silber](https://twitter.com/wifelette) 分享她運行會議的經驗，從運行 [RustConf](https://rustconf.com/) 中學到的知識，以及她的書籍 [Event Driven](https://leanpub.com/eventdriven/) 和其中包含的運行會議的建議。

感謝 [Kevin Lewis](https://twitter.com/_phzn) 和 [Rachel Nabors](https://twitter.com/rachelnabors) 分享他們運行 Women of React Conf 的經驗。

感謝 [Aakansha Doshi](https://twitter.com/aakansha1216), [Laurie Barth](https://twitter.com/laurieontech), [Michael Chan](https://twitter.com/chantastic), 和 [Shaundai Person](https://twitter.com/shaundai) 在計劃期間提供的建議和想法。

感謝 [Dan Lebowitz](https://twitter.com/lebo) 幫助設計和建立會議網站和門票。

感謝 Laura Podolak Waddell、Desmond Osei-Acheampong、Mark Rossi、Josh Toberman 和 Facebook Video Productions 團隊中的其他人員錄製 Keynote 和 Meta 員工演講的視頻。

感謝我們的合作夥伴 HitPlay 幫助組織會議，編輯流中的所有視頻，翻譯所有演講，並以多種語言管理 Discord。

最後，感謝所有參與者使這成為一個偉大的 React Conf！
