
---
title: "React 18 計畫"
---

2021 年 6 月 8 日，由 [Andrew Clark](https://twitter.com/acdlite)、[Brian Vaughn](https://github.com/bvaughn)、[Christine Abernathy](https://twitter.com/abernathyca)、[Dan Abramov](https://twitter.com/dan_abramov)、[Rachel Nabors](https://twitter.com/rachelnabors)、[Rick Hanlon](https://twitter.com/rickhanlonii)、[Sebastian Markbåge](https://twitter.com/sebmarkbage) 和 [Seth Webster](https://twitter.com/sethwebster) 共同發表。

<Intro>

React 團隊很高興分享一些更新：

1. 我們已經開始了 React 18 的版本，這將是我們的下一個主要版本。
2. 我們建立了一個工作小組，以準備社區逐步採用 React 18 的新功能。
3. 我們已經發布了 React 18 Alpha，以便庫作者可以嘗試並提供反饋。

這些更新主要針對第三方庫的維護者。如果您正在學習、教學或使用 React 構建面向用戶的應用程序，您可以安全地忽略此帖子。但如果您感到好奇，歡迎關注 React 18 工作小組的討論！

---

## React 18 中有什麼新功能 {/*whats-coming-in-react-18*/}

當 React 18 發布時，它將包括開箱即用的改進（例如[自動批處理](https://github.com/reactwg/react-18/discussions/21)）、新的 API（例如 [`startTransition`](https://github.com/reactwg/react-18/discussions/41)）和一個[新的流式服務器渲染器](https://github.com/reactwg/react-18/discussions/37)，內置對 `React.lazy` 的支持。

這些功能得益於我們在 React 18 中添加的一個新的選擇機制。它被稱為“並行渲染”，它讓 React 同時準備多個版本的 UI。這個改變大多是在幕後進行的，但它解鎖了改善應用程序實際和感知性能的新可能性。

如果您一直在關注我們對 React 未來的研究（我們不指望您這樣做！），您可能聽說過“並行模式”或它可能會破壞您的應用程序。響應社區的反饋，我們重新設計了漸進式採用的升級策略。與其說是一個全是或全非的“模式”，並行渲染只會在由其中一個新功能觸發的更新中啟用。實際上，這意味著**您將能夠在不重寫代碼的情況下採用 React 18，並按自己的節奏嘗試新功能。**

## 逐步採用策略 {/*a-gradual-adoption-strategy*/}

由於 React 18 中的並行性是可選的，因此組件行為沒有顯著的開箱即用的破壞性變化。**您可以通過最小或不需要更改應用程序代碼的方式升級到 React 18，其付出的努力程度與典型的主要 React 版本相當**。基於我們將幾個應用程序轉換為 React 18 的經驗，我們預計許多用戶將能夠在一個下午內升級。

我們成功地將並行功能交付給 Facebook 的成千上萬個組件，在我們的經驗中，我們發現大多數 React 組件“只需工作”，而無需進行其他更改。我們致力於確保整個社區都能平穩升級，因此今天我們宣布了 React 18 工作小組。

## 與社區合作 {/*working-with-the-community*/}

對於這個版本，我們正在嘗試一些新的東西：我們邀請了來自 React 社區的專家、開發人員、庫作者和教育工作者參加我們的 [React 18 工作小組](https://github.com/reactwg/react-18)，以提供反饋、提問和協作。我們無法邀請每個人參加這個初始的小組，但如果這個實驗成功，我們希望未來會有更多！

**React 18 工作小組的目標是通過現有應用程序和庫的平穩、逐步採用，為生態系統做好準備。** 工作小組位於 [GitHub 討論區](https://github.com/reactwg/react-18/discussions)，公眾可以閱讀。工作小組的成員可以留下反饋、提問和分享想法。核心團隊也將使用討論庫來分享我們的研究發現。隨著穩定版本的接近，任何重要信息也將張貼在此博客上。

有關升級到 React 18 或有關發布的其他資源的更多信息，請參見 [React 18 公告帖子](https://github.com/reactwg/react-18/discussions/4)。

## 訪問 React 18 工作小組 {/*accessing-the-react-18-working-group*/}

每個人都可以閱讀 [React 18 工作小組庫](https://github.com/reactwg/react-18)中的討論。

由於我們預計工作小組將引起初期的興趣激增，因此只有受邀成員才能創建或評論主題。但是，這些主題對公眾完全可見，因此每個人都可以訪問相同的信息。我們認為這是在為工作小組成員創造一個生產環境的同時，保持與廣大社區的透明度之間的良好折衷。

如往常一樣，您可以將錯誤報告、問題和一般反饋提交到我們的 [問題跟踪器](https://github.com/facebook/react/issues)。

## 如何立即嘗試 React 18 Alpha {/*how-to-try-react-18-alpha-today*/}

新的 alpha 版本會[定期使用 `@alpha` 標籤發布到 npm](https://github.com/reactwg/react-18/discussions/9)。這些版本是使用我們主要存儲庫中最近的提交構建的。當功能或錯誤修復合併時，它將在下一個工作日的 alpha 版本中出現。

不同的 alpha 版本之間可能存在重大的行為或 API 更改。請記住，**不建議將 alpha 版本用於面向用戶的生產應用程序**。

## 預計的 React 18 發布時間表 {/*projected-react-18-release-timeline*/}

我們沒有特定的發布日期安排，但我們預計需要幾個月的反饋和迭代才能使 React 18 適用於大多數生產應用程序。

* Library Alpha：今天可用
* 公共 Beta：至少幾個月
* 發布候選版（RC）：Beta 至少幾週後
* 一般可用性：RC 至少幾週後

有關我們預計的發布時間表的更多詳細信息，請參閱[工作組中的相關討論](https://github.com/reactwg/react-18/discussions/9)。當我們接近公開發布時，我們將在此博客上發布更新。
